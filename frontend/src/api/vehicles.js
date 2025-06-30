import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const getAllVehicles = async () => {
  const response = await axios.get(`${API_URL}/vehicles`);
  return response.data;
};

export const getVehicle = async (id) => {
  const response = await axios.get(`${API_URL}/vehicles/${id}`);
  return response.data;
};

export const createVehicle = async (vehicleData) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  
  // Append all vehicle data
  Object.entries(vehicleData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const response = await axios.post(`${API_URL}/vehicles`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    },
  });
  return response.data;
};

export const updateVehicle = async (id, vehicleData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/vehicles/${id}`, vehicleData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteVehicle = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/vehicles/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};