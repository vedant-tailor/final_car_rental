import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getVehicle } from '../api/vehicles';
// import { Vehicle } from '../types';
import BookingForm from '../components/BookingForm';

const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        if (!id) return;
        const data = await getVehicle(id);
        setVehicle(data);
      } catch (error) {
        toast.error('Failed to load vehicle details');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-700">Vehicle not found</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img
          src={vehicle.imageUrl}
          alt={vehicle.name}
          className="w-full h-[400px] object-cover rounded-lg shadow-md"
        />
        <div className="mt-6 space-y-4">
          <h1 className="text-3xl font-bold">
            {vehicle.brand} {vehicle.name}
          </h1>
          <p className="text-gray-600">{vehicle.type}</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Specifications</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Transmission: {vehicle.specs.transmission}</li>
                <li>Seats: {vehicle.specs.seats}</li>
                <li>Fuel: {vehicle.specs.fuel}</li>
                <li>Mileage: {vehicle.specs.mileage}</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Pricing</h3>
              <p className="text-2xl font-bold text-blue-600">
                ${vehicle.pricePerDay}/day
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        {vehicle.available ? (
          <BookingForm vehicleId={vehicle._id} pricePerDay={vehicle.pricePerDay} />
        ) : (
          <div className="bg-red-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-red-600 mb-2">
              Currently Unavailable
            </h3>
            <p className="text-gray-600">
              This vehicle is currently booked. Please check back later or browse our other vehicles.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleDetails;