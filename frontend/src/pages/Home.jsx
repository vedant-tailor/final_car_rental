import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-16">
      <section className="text-center py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Premium Car Rentals
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Experience luxury and comfort with our premium car rental service.
        </p>
        <Link
          to="/vehicles"
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-100"
        >
          Browse Vehicles
        </Link>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <div className="text-4xl mb-4">🚗</div>
          <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
          <p className="text-gray-600">
            Choose from our diverse fleet of vehicles.
          </p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
          <p className="text-gray-600">
            Competitive rates for all our vehicles.
          </p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
          <p className="text-gray-600">
            Safe and easy online reservation system.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;