import express from 'express';
import {
  getDashboardStats,
  getAllUsers,
  updateUserStatus,
  createAdmin
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Protect all routes with admin middleware
router.use(protect, adminOnly);

router.get('/dashboard/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.patch('/users/:id/status', updateUserStatus);
router.post('/create', createAdmin);

export default router;