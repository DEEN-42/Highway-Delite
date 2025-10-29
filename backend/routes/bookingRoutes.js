import express from 'express';
import {
  createBooking,
  getBookingByReferenceId,
  getBookingsByEmail,
  getAllBookings,
  updateBookingStatus,
  cancelBooking
} from '../controllers/bookingController.js';

const router = express.Router();

// Public routes
router.post('/', createBooking);
router.get('/reference/:referenceId', getBookingByReferenceId);
router.get('/email/:email', getBookingsByEmail);

// Admin routes (add authentication middleware here in production)
router.get('/', getAllBookings);
router.put('/:id/status', updateBookingStatus);
router.put('/:id/cancel', cancelBooking);

export default router;
