import React, { useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../store/auth';
import { createBooking } from '../api/bookings';

const BookingForm = ({ vehicleId, pricePerDay }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await createBooking({
        vehicleId,
        startDate,
        endDate,
      });
      toast.success('Booking created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create booking');
    }
  };

  const calculateTotalDays = () => {
    if (!startDate || !endDate) return 0;
    const days = Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return days > 0 ? days : 0;
  };

  const totalDays = calculateTotalDays();
  const totalPrice = totalDays * pricePerDay;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Book This Vehicle</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Start Date</label>
          <input
            type="date"
            min={format(new Date(), 'yyyy-MM-dd')}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">End Date</label>
          <input
            type="date"
            min={startDate || format(new Date(), 'yyyy-MM-dd')}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {totalDays > 0 && (
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between mb-2">
              <span>Days:</span>
              <span>{totalDays}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total Price:</span>
              <span>${totalPrice}</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Book Now
        </button>
      </div>
    </form>
  );
};

export default BookingForm;