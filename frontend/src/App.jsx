import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Vehicles from './pages/VehicleList';
import VehicleDetails from './pages/VehicleDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminLayout from './pages/admin/AdminLayout';
import AdminVehicles from './pages/admin/AdminVehicles';
import AdminBookings from './pages/admin/AdminBookings';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminLayout>
                <Routes>
                  <Route path="vehicles" element={<AdminVehicles />} />
                  <Route path="bookings" element={<AdminBookings />} />
                </Routes>
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/vehicles" element={<Vehicles />} />
                  <Route path="/vehicles/:id" element={<VehicleDetails />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
};

export default App;