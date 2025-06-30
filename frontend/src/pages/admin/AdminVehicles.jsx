import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getAllVehicles, createVehicle, updateVehicle, deleteVehicle } from '../../api/vehicles';
import VehicleForm from '../../components/admin/VehicleForm';

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

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

  const handleCreate = async (vehicleData) => {
    try {
      await createVehicle(vehicleData);
      toast.success('Vehicle created successfully');
      fetchVehicles();
      setShowForm(false);
    } catch (error) {
      toast.error('Failed to create vehicle');
    }
  };

  const handleUpdate = async (id, vehicleData) => {
    try {
      await updateVehicle(id, vehicleData);
      toast.success('Vehicle updated successfully');
      fetchVehicles();
      setEditingVehicle(null);
      setShowForm(false);
    } catch (error) {
      toast.error('Failed to update vehicle');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await deleteVehicle(id);
        toast.success('Vehicle deleted successfully');
        fetchVehicles();
      } catch (error) {
        toast.error('Failed to delete vehicle');
      }
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
        <h1 className="text-2xl font-bold">Manage Vehicles</h1>
        <button
          onClick={() => {
            setEditingVehicle(null);
            setShowForm(true);
          }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus size={20} />
          <span>Add Vehicle</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <VehicleForm
              onSubmit={editingVehicle ? 
                (data) => handleUpdate(editingVehicle._id, data) : 
                handleCreate}
              initialData={editingVehicle}
              onCancel={() => {
                setShowForm(false);
                setEditingVehicle(null);
              }}
            />
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price/Day
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
            {vehicles.map((vehicle) => (
              <tr key={vehicle._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={vehicle.imageUrl}
                      alt={vehicle.name}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {vehicle.brand} {vehicle.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vehicle.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${vehicle.pricePerDay}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      vehicle.available
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {vehicle.available ? 'Available' : 'Booked'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingVehicle(vehicle);
                        setShowForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVehicles;