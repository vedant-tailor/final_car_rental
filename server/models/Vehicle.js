import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['SUV', 'Sedan', 'Sports', 'Luxury'],
  },
  specs: {
    transmission: String,
    seats: Number,
    fuel: String,
    mileage: String,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Vehicle', vehicleSchema);