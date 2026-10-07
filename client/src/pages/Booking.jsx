import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById } from "../features/events/eventApi";
import { createBooking } from "../features/bookings/bookingApi";

const Booking = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedEvent, status: eventStatus } = useSelector((state) => state.events);
  const { booking, status: bookingStatus, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    if (eventId) {
      dispatch(getEventById(eventId));
    }
  }, [eventId, dispatch]);

  const handleBooking = async () => {
    try {
      await dispatch(createBooking(eventId)).unwrap();
      navigate("/my-bookings");
    } catch (error) {
      console.log("Booking failed:", error);
    }
  };

  if (eventStatus === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="animate-pulse text-lg">Loading event...</p>
      </div>
    );
  }

  if (!selectedEvent) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Event not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        
        {/* Event Image */}
        {selectedEvent.image && (
          <img
            src={selectedEvent.image}
            alt={selectedEvent.title}
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-6 space-y-4">
          {/* Title */}
          <h1 className="text-3xl font-bold text-center">{selectedEvent.title}</h1>

          {/* Event Info */}
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p><span className="font-semibold">Venue:</span> {selectedEvent.venue}</p>
            <p><span className="font-semibold">Date:</span> {selectedEvent.date ? new Date(selectedEvent.date).toLocaleDateString() : "N/A"}</p>
            <p><span className="font-semibold">Time:</span> {selectedEvent.startTime} - {selectedEvent.endTime}</p>
            <p><span className="font-semibold">Price:</span> ₹{selectedEvent.price}</p>
            <p><span className="font-semibold">Available Seats:</span> {selectedEvent.availableSeats}</p>
          </div>

          {/* Error */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Booking Button */}
          <button
            type="button"
            onClick={handleBooking}
            disabled={bookingStatus === "loading" || selectedEvent.availableSeats <= 0}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
