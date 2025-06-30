import Vehicle from '../models/Vehicle.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createVehicle = async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['name', 'brand', 'type', 'pricePerDay'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: 'Missing required fields',
        missingFields
      });
    }

    if (!['SUV', 'Sedan', 'Sports', 'Luxury'].includes(req.body.type)) {
      return res.status(400).json({
        message: 'Invalid vehicle type'
      });
    }

    if (isNaN(req.body.pricePerDay) || req.body.pricePerDay <= 0) {
      return res.status(400).json({
        message: 'Invalid pricePerDay'
      });
    }

    const vehicleData = {
      ...req.body,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null
    };

    if (!vehicleData.imageUrl) {
      return res.status(400).json({ message: 'Vehicle image is required' });
    }

    const vehicle = await Vehicle.create(vehicleData);
    res.status(201).json(vehicle);
  } catch (error) {
    // If there's an error, delete the uploaded file
    if (req.file) {
      await fs.unlink(req.file.path).catch(console.error);
    }
    res.status(500).json({ message: error.message });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const updateData = { ...req.body };
    
    if (req.file) {
      // Delete old image if exists
      if (vehicle.imageUrl) {
        const oldImagePath = path.join(__dirname, '../../', vehicle.imageUrl);
        await fs.unlink(oldImagePath).catch(console.error);
      }
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedVehicle);
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.path).catch(console.error);
    }
    res.status(500).json({ message: error.message });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Delete image file if exists
    if (vehicle.imageUrl) {
      const imagePath = path.join(__dirname, '../../', vehicle.imageUrl);
      await fs.unlink(imagePath).catch(console.error);
    }

    await vehicle.deleteOne();
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};