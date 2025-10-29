import { Booking } from '../model/Booking.js';
import { Experience } from '../model/Experience.js';
import { PromoCode } from '../model/PromoCode.js';

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const {
      experienceId,
      customerName,
      customerEmail,
      bookingDate,
      bookingTime,
      quantity,
      subtotal,
      taxes,
      total,
      promoCode,
      agreedToTerms
    } = req.body;

    // Validate required fields
    if (!experienceId || !customerName || !customerEmail || !bookingDate || 
        !bookingTime || !quantity || !agreedToTerms) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Find experience
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    // Check slot availability
    const isAvailable = experience.checkSlotAvailability(bookingDate, bookingTime, quantity);
    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Selected time slot is not available or has insufficient slots'
      });
    }

    let discount = 0;
    let promoCodeDoc = null;

    // Validate and apply promo code if provided
    if (promoCode) {
      promoCodeDoc = await PromoCode.findOne({ code: promoCode.toUpperCase() });
      
      if (!promoCodeDoc) {
        return res.status(400).json({
          success: false,
          message: 'Invalid promo code'
        });
      }

      // Revalidate promo code (important for security - don't trust frontend)
      const validation = promoCodeDoc.validateCode(subtotal);
      
      if (!validation.valid) {
        return res.status(400).json({
          success: false,
          message: validation.message
        });
      }

      discount = validation.discount;
    }

    // Book the slots
    await experience.bookSlots(bookingDate, bookingTime, quantity);

    // Create booking
    const booking = await Booking.create({
      experienceId,
      experienceName: experience.title,
      customerName,
      customerEmail,
      bookingDate,
      bookingTime,
      quantity,
      subtotal,
      taxes,
      discount,
      total: total - discount, // Apply discount to total
      promoCode: promoCode ? promoCode.toUpperCase() : null,
      agreedToTerms
    });

    // Increment promo code usage and auto-deactivate if needed
    if (promoCodeDoc) {
      try {
        const usageResult = await promoCodeDoc.incrementUsage();
        console.log(`✅ Promo code ${promoCodeDoc.code} applied. Count: ${usageResult.usedCount}/${promoCodeDoc.maxUses || '∞'}, Active: ${usageResult.isActive}`);
        
        if (usageResult.deactivated) {
          console.log(`⚠️ Promo code ${promoCodeDoc.code} has been automatically deactivated (limit reached)`);
        }
      } catch (incrementError) {
        // If increment fails due to race condition, rollback the booking
        await Booking.findByIdAndDelete(booking._id);
        await experience.releaseSlots(bookingDate, bookingTime, quantity);
        
        return res.status(400).json({
          success: false,
          message: incrementError.message || 'Promo code is no longer available'
        });
      }
    }

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        referenceId: booking.referenceId,
        experienceName: booking.experienceName,
        bookingDate: booking.bookingDate,
        bookingTime: booking.bookingTime,
        quantity: booking.quantity,
        subtotal: booking.subtotal,
        discount: booking.discount,
        total: booking.total,
        status: booking.status
      }
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message
    });
  }
};

// Get booking by reference ID
export const getBookingByReferenceId = async (req, res) => {
  try {
    const { referenceId } = req.params;
    
    const booking = await Booking.findOne({ referenceId: referenceId.toUpperCase() })
      .populate('experienceId', 'title location image');
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking',
      error: error.message
    });
  }
};

// Get bookings by email
export const getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    
    const bookings = await Booking.find({ customerEmail: email.toLowerCase() })
      .populate('experienceId', 'title location image')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
};

// Get all bookings (Admin)
export const getAllBookings = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }
    
    const skip = (page - 1) * limit;
    
    const bookings = await Booking.find(query)
      .populate('experienceId', 'title location')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    
    const total = await Booking.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    const booking = await Booking.findById(id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // If cancelling, release the slots
    if (status === 'cancelled' && booking.status !== 'cancelled') {
      const experience = await Experience.findById(booking.experienceId);
      if (experience) {
        await experience.releaseSlots(booking.bookingDate, booking.bookingTime, booking.quantity);
      }
    }
    
    booking.status = status;
    await booking.save();
    
    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update booking',
      error: error.message
    });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    
    const booking = await Booking.findById(id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }
    
    // Release the slots
    const experience = await Experience.findById(booking.experienceId);
    if (experience) {
      await experience.releaseSlots(booking.bookingDate, booking.bookingTime, booking.quantity);
    }
    
    booking.status = 'cancelled';
    await booking.save();
    
    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking',
      error: error.message
    });
  }
};
