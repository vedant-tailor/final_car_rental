import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Vehicle from '../models/Vehicle.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalVehicles = await Vehicle.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const recentBookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('vehicleId', 'brand name')
      .sort('-createdAt')
      .limit(5);

    // Calculate revenue
    const bookings = await Booking.find({
      status: { $in: ['confirmed', 'completed'] }
    });
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);

    // Get booking statistics
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });

    res.json({
      totalUsers,
      totalVehicles,
      totalBookings,
      totalRevenue,
      bookingStats: {
        pending: pendingBookings,
        confirmed: confirmedBookings,
        completed: completedBookings,
        cancelled: cancelledBookings
      },
      recentBookings
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { active } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { active },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const adminExists = await User.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = await User.create({
      name,
      email,
      password,
      role: 'admin'
    });

    res.status(201).json({
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};