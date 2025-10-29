import { PromoCode } from '../model/PromoCode.js';

// Validate promo code
export const validatePromoCode = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;
    
    if (!code || !orderAmount) {
      return res.status(400).json({
        success: false,
        message: 'Promo code and order amount are required'
      });
    }
    
    const promoCode = await PromoCode.findOne({ code: code.toUpperCase() });
    
    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: 'Invalid promo code'
      });
    }
    
    const validation = promoCode.validateCode(orderAmount);
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message
      });
    }
    
    res.status(200).json({
      success: true,
      valid: true,
      discount: validation.discount,
      message: validation.message,
      promoDetails: {
        code: promoCode.code,
        discountType: promoCode.discountType,
        discountValue: promoCode.discountValue
      }
    });
  } catch (error) {
    console.error('Error validating promo code:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to validate promo code',
      error: error.message
    });
  }
};

// Get promo code by code (Admin)
export const getPromoCode = async (req, res) => {
  try {
    const { code } = req.params;
    
    const promoCode = await PromoCode.findOne({ code: code.toUpperCase() });
    
    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: 'Promo code not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: promoCode
    });
  } catch (error) {
    console.error('Error fetching promo code:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch promo code',
      error: error.message
    });
  }
};

// Get all promo codes (Admin)
export const getAllPromoCodes = async (req, res) => {
  try {
    const { isActive } = req.query;
    
    let query = {};
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }
    
    const promoCodes = await PromoCode.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: promoCodes.length,
      data: promoCodes
    });
  } catch (error) {
    console.error('Error fetching promo codes:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch promo codes',
      error: error.message
    });
  }
};

// Create promo code (Admin)
export const createPromoCode = async (req, res) => {
  try {
    const promoData = req.body;
    
    const promoCode = await PromoCode.create(promoData);
    
    res.status(201).json({
      success: true,
      message: 'Promo code created successfully',
      data: promoCode
    });
  } catch (error) {
    console.error('Error creating promo code:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create promo code',
      error: error.message
    });
  }
};

// Update promo code (Admin)
export const updatePromoCode = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const promoCode = await PromoCode.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: 'Promo code not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Promo code updated successfully',
      data: promoCode
    });
  } catch (error) {
    console.error('Error updating promo code:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update promo code',
      error: error.message
    });
  }
};

// Delete promo code (Admin)
export const deletePromoCode = async (req, res) => {
  try {
    const { id } = req.params;
    
    const promoCode = await PromoCode.findByIdAndDelete(id);
    
    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: 'Promo code not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Promo code deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting promo code:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete promo code',
      error: error.message
    });
  }
};
