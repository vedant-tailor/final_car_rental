import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';
import { getAllBookings, updateBookingStatus } from '../../api/bookings';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getAllBookings();
      setBookings(data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      toast.success('Booking status updated successfully');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to update booking status');
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const bookingDate = new Date(booking.startDate);
    const matchesDateRange =
      (!startDate || bookingDate >= new Date(startDate)) &&
      (!endDate || bookingDate <= new Date(endDate));
    return matchesStatus && matchesDateRange;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Bookings</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar size={20} className="text-gray-500" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded-md p-2"
              placeholder="Start Date"
            />
            <span>to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded-md p-2"
              placeholder="End Date"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-md p-2"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dates
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBookings.map((booking) => (
              <tr key={booking._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">
                      {booking.userId.name}
                    </div>
                    <div className="text-gray-500">{booking.userId.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={booking.vehicleId.imageUrl}
                      alt={booking.vehicleId.name}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.vehicleId.brand} {booking.vehicleId.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.vehicleId.type}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {format(new Date(booking.startDate), 'MMM dd, yyyy')}
                  </div>
                  <div className="text-sm text-gray-500">
                    to {format(new Date(booking.endDate), 'MMM dd, yyyy')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${booking.totalPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusUpdate(booking._id, 'confirmed')
                          }
                          className="text-green-600 hover:text-green-800"
                          title="Confirm Booking"
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(booking._id, 'cancelled')
                          }
                          className="text-red-600 hover:text-red-800"
                          title="Cancel Booking"
                        >
                          <XCircle size={18} />
                        </button>
                      </>
                    )}
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => handleStatusUpdate(booking._id, 'completed')}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredBookings.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No bookings found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;