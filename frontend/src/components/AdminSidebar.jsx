import React from 'react';
import { NavLink } from 'react-router-dom';
import { Car, Calendar, Users, LogOut } from 'lucide-react';
import { useAuth } from '../store/auth';

const AdminSidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      
      <nav className="space-y-2">
        <NavLink
          to="/admin/vehicles"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`
          }
        >
          <Car size={20} />
          <span>Vehicles</span>
        </NavLink>

        <NavLink
          to="/admin/bookings"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`
          }
        >
          <Calendar size={20} />
          <span>Bookings</span>
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`
          }
        >
          <Users size={20} />
          <span>Users</span>
        </NavLink>

        <button
          onClick={logout}
          className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-800 w-full"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;