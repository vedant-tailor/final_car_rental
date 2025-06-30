import express from 'express';
import {
  getAllVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from '../controllers/vehicleController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllVehicles);
router.get('/:id', getVehicle);
router.post('/', protect, adminOnly, upload.single('image'), createVehicle);
router.put('/:id', protect, adminOnly, upload.single('image'), updateVehicle);
router.delete('/:id', protect, adminOnly, deleteVehicle);

export default router;