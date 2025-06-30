import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            RentalHub
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/vehicles" className="text-gray-700 hover:text-blue-600">
              Vehicles
            </Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;