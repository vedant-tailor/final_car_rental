import Booking from '../models/Booking.js';
import Vehicle from '../models/Vehicle.js';

export const createBooking = async (req, res) => {
  try {
    const { vehicleId, startDate, endDate } = req.body;
    
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle || !vehicle.available) {
      return res.status(400).json({ message: 'Vehicle not available' });
    }

    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = days * vehicle.pricePerDay;

    const booking = await Booking.create({
      userId: req.user.id,
      vehicleId,
      startDate,
      endDate,
      totalPrice,
    });

    vehicle.available = false;
    await vehicle.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate('vehicleId')
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('vehicleId')
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    // Update vehicle availability if booking is cancelled
    if (status === 'cancelled') {
      const vehicle = await Vehicle.findById(booking.vehicleId);
      if (vehicle) {
        vehicle.available = true;
        await vehicle.save();
      }
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};