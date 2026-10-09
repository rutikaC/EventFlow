import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      
      {/* Hero Section */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing Events
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Find exciting events, book your seats, and create unforgettable
            experiences with EventFlow.
          </p>

          <Link
            to="/events"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Explore Events
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
          Why Choose EventFlow?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <div className="text-4xl mb-4">🎫</div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Easy Booking
            </h3>

            <p className="text-gray-600 dark:text-gray-300">
              Book your favorite events quickly and securely.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <div className="text-4xl mb-4">💳</div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Secure Payment
            </h3>

            <p className="text-gray-600 dark:text-gray-300">
              Make secure online payments through Razorpay.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <div className="text-4xl mb-4">📅</div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Manage Bookings
            </h3>

            <p className="text-gray-600 dark:text-gray-300">
              Easily view and manage all your event bookings.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience Something Amazing?
          </h2>

          <p className="mb-6 text-red-100">
            Explore upcoming events and reserve your seat today.
          </p>

          <Link
            to="/events"
            className="inline-block bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Browse Events
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;