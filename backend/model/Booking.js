import mongoose from 'mongoose';

// Function to generate unique reference ID
function generateReferenceId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let refId = '';
  for (let i = 0; i < 8; i++) {
    refId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return refId;
}

const bookingSchema = new mongoose.Schema({
  referenceId: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    default: generateReferenceId
  },
  experienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: true
  },
  experienceName: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  bookingDate: {
    type: String,
    required: true
  },
  bookingTime: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  taxes: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  promoCode: {
    type: String,
    uppercase: true,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  agreedToTerms: {
    type: Boolean,
    required: true,
    validate: {
      validator: function(v) {
        return v === true;
      },
      message: 'Must agree to terms and conditions'
    }
  }
}, {
  timestamps: true
});

// Index for faster queries
bookingSchema.index({ referenceId: 1 });
bookingSchema.index({ customerEmail: 1 });
bookingSchema.index({ experienceId: 1 });

export const Booking = mongoose.model('Booking', bookingSchema);
