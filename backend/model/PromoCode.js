import mongoose from 'mongoose';

const promoCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0
  },
  minOrderValue: {
    type: Number,
    default: 0
  },
  maxDiscount: {
    type: Number,
    default: null // Only for percentage discounts
  },
  validFrom: {
    type: Date,
    required: true
  },
  validUntil: {
    type: Date,
    required: true
  },
  maxUses: {
    type: Number,
    default: null // null means unlimited
  },
  usedCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Method to validate promo code
promoCodeSchema.methods.validateCode = function(orderAmount) {
  const now = new Date();
  
  // Check if code is active
  if (!this.isActive) {
    return { valid: false, message: 'Promo code is inactive' };
  }
  
  // Check date validity
  if (now < this.validFrom || now > this.validUntil) {
    return { valid: false, message: 'Promo code has expired' };
  }
  
  // Check usage limit
  if (this.maxUses && this.usedCount >= this.maxUses) {
    return { valid: false, message: 'Promo code usage limit reached' };
  }
  
  // Check minimum order value
  if (orderAmount < this.minOrderValue) {
    return { 
      valid: false, 
      message: `Minimum order value of ₹${this.minOrderValue} required` 
    };
  }
  
  // Calculate discount
  let discount = 0;
  if (this.discountType === 'percentage') {
    discount = (orderAmount * this.discountValue) / 100;
    if (this.maxDiscount && discount > this.maxDiscount) {
      discount = this.maxDiscount;
    }
  } else {
    discount = this.discountValue;
  }
  
  return { 
    valid: true, 
    discount: Math.round(discount),
    message: 'Promo code applied successfully'
  };
};

// Method to increment usage atomically and auto-deactivate if limit reached
promoCodeSchema.methods.incrementUsage = async function() {
  const PromoCodeModel = this.constructor;
  
  // Build update query
  const updateQuery = {
    $inc: { usedCount: 1 }
  };
  
  // Build condition to check if we should allow increment
  const conditions = {
    _id: this._id,
    isActive: true
  };
  
  // Add condition to prevent exceeding maxUses (race condition protection)
  if (this.maxUses) {
    conditions.usedCount = { $lt: this.maxUses };
  }
  
  // Atomically increment only if conditions are met
  const result = await PromoCodeModel.findOneAndUpdate(
    conditions,
    updateQuery,
    { new: true }
  );
  
  // If update failed, promo was already at limit or inactive
  if (!result) {
    throw new Error('Promo code usage limit reached or code is inactive');
  }
  
  // Check if we need to deactivate after increment
  if (result.maxUses && result.usedCount >= result.maxUses) {
    await PromoCodeModel.findByIdAndUpdate(
      result._id,
      { isActive: false }
    );
    
    console.log(`Promo code ${result.code} deactivated: usage limit (${result.maxUses}) reached`);
    
    // Update local instance
    this.usedCount = result.usedCount;
    this.isActive = false;
    
    return {
      usedCount: result.usedCount,
      isActive: false,
      deactivated: true
    };
  }
  
  // Update local instance
  this.usedCount = result.usedCount;
  
  return {
    usedCount: result.usedCount,
    isActive: result.isActive,
    deactivated: false
  };
};

// Index for faster queries
promoCodeSchema.index({ code: 1 });

export const PromoCode = mongoose.model('PromoCode', promoCodeSchema);
