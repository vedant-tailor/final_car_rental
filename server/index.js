import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import vehicleRoutes from './routes/vehicles.js';
import bookingRoutes from './routes/bookings.js';
import adminRoutes from './routes/admin.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });