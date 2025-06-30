import React, { useEffect, useState } from 'react';
import { getAllVehicles } from '../api/vehicles';
import VehicleCard from '../components/VehicleCard';
// import { Vehicle } from '../types';
import { toast } from 'react-hot-toast';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getAllVehicles();
        setVehicles(data);
      } catch (error) {
        toast.error('Failed to load vehicles');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter(vehicle => 
    filter === 'all' ? true : vehicle.type === filter
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Available Vehicles</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="all">All Types</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Sports">Sports</option>
          <option value="Luxury">Luxury</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <VehicleCard key={vehicle._id} vehicle={vehicle} />
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No vehicles found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default VehicleList;