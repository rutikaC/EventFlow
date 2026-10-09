import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBookings } from "../features/bookings/bookingApi";

const MyBookings = () => {
  const dispatch = useDispatch();

  const {
    bookings,
    status,
    error,
  } = useSelector((state) => state.bookings);
  console.log(bookings)

  // Fetch logged-in user's bookings
  useEffect(() => {
    dispatch(getMyBookings());
  }, [dispatch]);

  // Loading
  if (status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-gray-600">
          Loading your bookings...
        </p>
      </div>
    );
  }

  // Error
  if (status === "failed") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">
          {error || "Failed to load bookings"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">

      <div className="max-w-6xl mx-auto">

        {/* Page title */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          My Bookings
        </h1>

        {/* No bookings */}
        {bookings?.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-10 text-center">

            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              No bookings yet
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              You haven't booked any events yet.
            </p>

          </div>
        ) : (

          /* Bookings */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {bookings.map((booking) => (

              <div
                key={booking._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >

                {/* Event Image */}
                {booking.event?.image && (
                  <img
                    src={booking.event.image}
                    alt={booking.event.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-5">

                  {/* Event title */}
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    {booking.event?.title || "Event"}
                  </h2>

                  {/* Event information */}
                  <div className="space-y-2 text-gray-600 dark:text-gray-300">

                    <p>
                      <span className="font-semibold">
                        Venue:
                      </span>{" "}
                      {booking.event?.venue || "N/A"}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Date:
                      </span>{" "}
                      {booking.event?.date
                        ? new Date(
                            booking.event.date
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Time:
                      </span>{" "}
                      {booking.event?.startTime || "N/A"}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Seats:
                      </span>{" "}
                      {booking.quantity}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Amount:
                      </span>{" "}
                      ₹{booking.amount}
                    </p>

                  </div>

                  {/* Status */}
                  <div className="flex justify-between items-center mt-5">

                    <div>
                      <p className="text-sm text-gray-500">
                        Payment
                      </p>

                      <span
                        className={`font-semibold ${
                          booking.paymentStatus === "paid"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Booking
                      </p>

                      <span
                        className={`font-semibold ${
                          booking.bookingStatus === "confirmed"
                            ? "text-green-600"
                            : booking.bookingStatus === "cancelled"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {booking.bookingStatus}
                      </span>
                    </div>

                  </div>

                  {/* Ticket */}
                  {booking.ticketId && (
                    <div className="mt-5 p-3 bg-gray-100 dark:bg-gray-700 rounded">

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Ticket ID
                      </p>

                      <p className="font-semibold text-gray-800 dark:text-white break-all">
                        {booking.ticketId}
                      </p>

                    </div>
                  )}

                </div>
              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyBookings;