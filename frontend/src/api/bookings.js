import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const createBooking = async (bookingData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/bookings`, bookingData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUserBookings = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/bookings/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAllBookings = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateBookingStatus = async (bookingId, status) => {
  const token = localStorage.getItem('token');
  const response = await axios.patch(
    `${API_URL}/bookings/${bookingId}/status`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};