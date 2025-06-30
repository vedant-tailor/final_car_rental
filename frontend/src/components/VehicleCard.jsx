import React from 'react';
import { Link } from 'react-router-dom';
// import { Vehicle } from '../types';



const VehicleCard = ({ vehicle }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={vehicle.imageUrl}
        alt={vehicle.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">
          {vehicle.brand} {vehicle.name}
        </h3>
        <p className="text-gray-600 mb-2">{vehicle.type}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-blue-600">
            ${vehicle.pricePerDay}/day
          </span>
          <span className={`px-2 py-1 rounded ${
            vehicle.available
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {vehicle.available ? 'Available' : 'Booked'}
          </span>
        </div>
        <Link
          to={`/vehicles/${vehicle._id}`}
          className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default VehicleCard;