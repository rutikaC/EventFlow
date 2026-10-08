import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById } from "../features/events/eventApi";
import { createBooking } from "../features/bookings/bookingApi";

const Booking = () => {
  const { id: eventId } = useParams();
  console.log("eventId", eventId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Event slice
  const {event:selectedEvent, status: eventStatus } = useSelector((state) => state.events);
  console.log("selectedEvent", selectedEvent)
  // Booking slice
  const { status: bookingStatus, error } = useSelector((state) => state.bookings);

  // Fetch event details on mount
  useEffect(() => {
    if (eventId) {
      console.log("eventId param:", eventId);

      dispatch(getEventById(eventId));
    }
  }, [eventId, dispatch]);

  // Handle booking confirmation
  const handleBooking = async () => {
    try {
      await dispatch(createBooking(eventId)).unwrap();
      navigate("/my-bookings");
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  // Loading state
  if (eventStatus === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="animate-pulse text-lg text-gray-600">Loading event...</p>
      </div>
    );
  }

  // Event not found
  if (!selectedEvent) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Event not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded shadow-lg overflow-hidden">
        
        {/* Event Image */}
        {selectedEvent.image && (
          <img
            src={selectedEvent.image}
            alt={selectedEvent.title}
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-6 space-y-4">
          {/* tilte */}
          <h1 className="text-3xl font-bold p-3 text-center text-gray-800 dark:text-white">
            Confirm Your Booking
          </h1>

          {/* info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2  text-gray-700 dark:text-gray-300">
            <p><span className="font-semibold">Title:</span> {selectedEvent.title}</p>
            <p><span className="font-semibold">Venue:</span> {selectedEvent.venue}</p>
            <p><span className="font-semibold">Date:</span> {new Date(selectedEvent.date).toLocaleDateString()}</p>
            <p><span className="font-semibold">Time:</span> {selectedEvent.startTime} - {selectedEvent.endTime}</p>
            <p><span className="font-semibold">Price:</span> ₹{selectedEvent.price}</p>
            <p><span className="font-semibold">Available Seats:</span> {selectedEvent.availableSeats}</p>
          </div>

          {/* error */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* book button */}
          <button
            type="button"
            onClick={handleBooking}
            disabled={bookingStatus === "loading" || selectedEvent.availableSeats <= 0}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {bookingStatus === "loading"
              ? "Booking..."
              : selectedEvent.availableSeats <= 0
              ? "Sold Out"
              : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
