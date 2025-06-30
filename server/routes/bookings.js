import express from 'express';
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
} from '../controllers/bookingController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/user', protect, getUserBookings);
router.get('/', protect, adminOnly, getAllBookings);
router.patch('/:id/status', protect, adminOnly, updateBookingStatus);

export default router;