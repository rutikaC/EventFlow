import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyEvents } from "../features/events/eventApi";

const Account = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const { events, status } = useSelector((state) => state.events);

  useEffect(() => {
    if (user?.role?.toLowerCase() === "organizer") {
      dispatch(getMyEvents());
    }
  }, [user, dispatch]);

  if (!user) {
    return <p className="p-6">Please log in to view your account.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6
    dark:text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Welcome, {user.name}
        </h1>

        {user.role?.toLowerCase() === "organizer" ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                My Events
              </h2>

              <Link
                to="/create/event"
                className="bg-red-600 text-white px-5 py-2 rounded-lg"
              >
                + Create Event
              </Link>
            </div>

            {status === "loading" ? (
              <p className="text-gray-600 dark:text-gray-300">
                Loading your events...
              </p>
            ) : events?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div
                    key={event._id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden"
                  >
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                    )}

                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {event.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        {event.venue}
                      </p>

                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {event.date
                          ? new Date(event.date).toLocaleDateString()
                          : "Date not set"}
                      </p>

                      <p className="mt-2 text-gray-700 dark:text-gray-200">
                        Price: ₹{event.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                You haven't created any events yet.
              </p>
            )}
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Explore Events
            </h2>

            <Link
              to="/events"
              className="inline-block bg-red-600 text-white px-5 py-3 rounded-lg"
            >
              Browse Events
            </Link>

            <Link
              to="/booking"
              className="inline-block ml-3 bg-gray-700 text-white px-5 py-3 rounded-lg"
            >
              My Bookings
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;