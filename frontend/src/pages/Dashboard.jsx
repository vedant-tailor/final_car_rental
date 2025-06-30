import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../store/auth';
import { getUserBookings } from '../api/bookings';
import { format } from 'date-fns';
// import { Booking } from '../types';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getUserBookings();
        setBookings(data);
      } catch (error) {
        toast.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h1>
        <p className="text-gray-600">Manage your bookings and account details.</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
        {bookings.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">You haven't made any bookings yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {booking.vehicleId.brand} {booking.vehicleId.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{booking.vehicleId.type}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        Start Date:{' '}
                        {format(new Date(booking.startDate), 'MMM dd, yyyy')}
                      </p>
                      <p>
                        End Date:{' '}
                        {format(new Date(booking.endDate), 'MMM dd, yyyy')}
                      </p>
                      <p>Total Price: ${booking.totalPrice}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;