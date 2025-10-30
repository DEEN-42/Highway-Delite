import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  taxRate: {
    type: Number,
    required: true,
    default: 0.18, // 18% GST
    min: 0,
    max: 1
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    default: 'Adventure'
  },
  aboutText: {
    type: String,
    required: true
  },
  minAge: {
    type: Number,
    default: 0
  },
  duration: {
    type: String,
    required: true,
    default: '2 hours'
  },
  // Slot management
  availableDates: [{
    date: {
      type: String,
      required: true 
    },
    times: [{
      time: {
        type: String,
        required: true 
      },
      totalSlots: {
        type: Number,
        required: true,
        min: 1
      },
      bookedSlots: {
        type: Number,
        default: 0,
        min: 0
      }
    }]
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Virtual field for available slots
experienceSchema.virtual('slotsAvailable').get(function() {
  return this.availableDates.map(dateSlot => ({
    date: dateSlot.date,
    times: dateSlot.times.map(timeSlot => ({
      time: timeSlot.time,
      slots: timeSlot.totalSlots - timeSlot.bookedSlots
    }))
  }));
});

// Method to check slot availability
experienceSchema.methods.checkSlotAvailability = function(date, time, quantity) {
  const dateSlot = this.availableDates.find(d => d.date === date);
  
  if (!dateSlot) return false;
  
  const timeSlot = dateSlot.times.find(t => t.time === time);
  
  if (!timeSlot) return false;
  
  const availableSlots = timeSlot.totalSlots - timeSlot.bookedSlots;
  return availableSlots >= quantity;
};

// Method to book slots with atomic operation (race condition safe)
experienceSchema.methods.bookSlots = async function(date, time, quantity) {
  const ExperienceModel = this.constructor;
  
  // Find the array indices for the date and time
  const dateIndex = this.availableDates.findIndex(d => d.date === date);
  if (dateIndex === -1) throw new Error('Date not available');
  
  const timeIndex = this.availableDates[dateIndex].times.findIndex(t => t.time === time);
  if (timeIndex === -1) throw new Error('Time slot not available');
  
  const timeSlot = this.availableDates[dateIndex].times[timeIndex];
  const availableSlots = timeSlot.totalSlots - timeSlot.bookedSlots;
  
  if (availableSlots < quantity) {
    throw new Error('Not enough slots available');
  }
  
  // Calculate the maximum allowed bookedSlots after this booking
  const maxAllowedBooked = timeSlot.totalSlots - quantity;
  
  // Use atomic operation - only increment if current bookedSlots is within limit
  const result = await ExperienceModel.findOneAndUpdate(
    {
      _id: this._id,
      [`availableDates.${dateIndex}.date`]: date,
      [`availableDates.${dateIndex}.times.${timeIndex}.time`]: time,
      // Ensure current bookedSlots + quantity doesn't exceed totalSlots
      [`availableDates.${dateIndex}.times.${timeIndex}.bookedSlots`]: { $lte: maxAllowedBooked }
    },
    {
      $inc: {
        [`availableDates.${dateIndex}.times.${timeIndex}.bookedSlots`]: quantity
      }
    },
    { new: true }
  );
  
  if (!result) {
    throw new Error('Failed to book slots - slots may have been filled by another booking');
  }
  
  // Update local instance
  this.availableDates[dateIndex].times[timeIndex].bookedSlots += quantity;
  
  return true;
};

// Method to release slots with atomic operation (for cancellations)
experienceSchema.methods.releaseSlots = async function(date, time, quantity) {
  const ExperienceModel = this.constructor;
  
  // Find the array indices for the date and time
  const dateIndex = this.availableDates.findIndex(d => d.date === date);
  if (dateIndex === -1) throw new Error('Date not found');
  
  const timeIndex = this.availableDates[dateIndex].times.findIndex(t => t.time === time);
  if (timeIndex === -1) throw new Error('Time slot not found');
  
  // Use atomic operation to decrement bookedSlots
  const result = await ExperienceModel.findOneAndUpdate(
    {
      _id: this._id,
      [`availableDates.${dateIndex}.date`]: date,
      [`availableDates.${dateIndex}.times.${timeIndex}.time`]: time,
      // Ensure bookedSlots doesn't go below 0
      [`availableDates.${dateIndex}.times.${timeIndex}.bookedSlots`]: { $gte: quantity }
    },
    {
      $inc: {
        [`availableDates.${dateIndex}.times.${timeIndex}.bookedSlots`]: -quantity
      }
    },
    { new: true }
  );
  
  if (!result) {
    // If exact quantity not available, just set to 0
    await ExperienceModel.findOneAndUpdate(
      {
        _id: this._id,
        [`availableDates.${dateIndex}.date`]: date,
        [`availableDates.${dateIndex}.times.${timeIndex}.time`]: time
      },
      {
        $set: {
          [`availableDates.${dateIndex}.times.${timeIndex}.bookedSlots`]: 0
        }
      }
    );
  }
  
  // Update local instance
  this.availableDates[dateIndex].times[timeIndex].bookedSlots = Math.max(
    0,
    this.availableDates[dateIndex].times[timeIndex].bookedSlots - quantity
  );
  
  return true;
};

export const Experience = mongoose.model('Experience', experienceSchema);
