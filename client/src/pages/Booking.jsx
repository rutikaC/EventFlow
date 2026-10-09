import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getEventById } from "../features/events/eventApi";

import {
  createBooking,
  verifyPayment,
  getMyBookings,
} from "../features/bookings/bookingApi";

const Booking = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();

  // Number of seats
  const [quantity, setQuantity] = useState(1);

  // Event
  const {
    event: selectedEvent,
    status: eventStatus,
  } = useSelector((state) => state.events);

  // Booking
  const {
    status: bookingStatus,
    error,
  } = useSelector((state) => state.bookings);

  // --------------------------------
  // Get event
  // --------------------------------
  useEffect(() => {
    if (eventId) {
      dispatch(getEventById(eventId));
    }
  }, [eventId, dispatch]);

  // --------------------------------
  // Get user's bookings
  // --------------------------------
  useEffect(() => {
    dispatch(getMyBookings());
  }, [dispatch]);

  // --------------------------------
  // Increase quantity
  // --------------------------------
  const increaseQuantity = () => {
    if (quantity < selectedEvent.availableSeats) {
      setQuantity(quantity + 1);
    }
  };

  // --------------------------------
  // Decrease quantity
  // --------------------------------
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // --------------------------------
  // Booking + Razorpay
  // --------------------------------
  const handleBooking = async () => {
    try {
      // Step 1: Create Razorpay order
      const result = await dispatch(
        createBooking({
          eventId,
          quantity,
        })
      ).unwrap();

      const { order } = result;

      // Step 2: Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "EventFlow",

        description: selectedEvent.title,

        order_id: order.id,

        handler: async function (response) {
          try {
            // Step 3: Verify payment
            await dispatch(
              verifyPayment({
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,

                eventId,

                quantity,
              })
            ).unwrap();

            // Step 4: Refresh bookings
            dispatch(getMyBookings());

            alert("Booking successful!");

          } catch (error) {
            console.error(
              "Payment verification failed:",
              error
            );
          }
        },

        prefill: {
          name: "",
          email: "",
        },

        theme: {
          color: "#3399cc",
        },
      };

      // Step 5: Open Razorpay
      const razorpay = new window.Razorpay(options);

      razorpay.open();

    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  // --------------------------------
  // Loading
  // --------------------------------
  if (eventStatus === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="animate-pulse text-lg text-gray-600">
          Loading event...
        </p>
      </div>
    );
  }

  if (!selectedEvent) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">
          Event not found
        </p>
      </div>
    );
  }

  const totalAmount =
    selectedEvent.price * quantity;

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

        <div className="p-6 space-y-5">

          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
            Confirm Your Booking
          </h1>

          {/* Event Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300">

            <p>
              <span className="font-semibold">
                Title:
              </span>{" "}
              {selectedEvent.title}
            </p>

            <p>
              <span className="font-semibold">
                Venue:
              </span>{" "}
              {selectedEvent.venue}
            </p>

            <p>
              <span className="font-semibold">
                Date:
              </span>{" "}
              {new Date(
                selectedEvent.date
              ).toLocaleDateString()}
            </p>

            <p>
              <span className="font-semibold">
                Time:
              </span>{" "}
              {selectedEvent.startTime} -{" "}
              {selectedEvent.endTime}
            </p>

            <p>
              <span className="font-semibold">
                Price per seat:
              </span>{" "}
              ₹{selectedEvent.price}
            </p>

            <p>
              <span className="font-semibold">
                Available seats:
              </span>{" "}
              {selectedEvent.availableSeats}
            </p>

          </div>

          {/* Quantity */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-5">

            <p className="font-semibold text-gray-800 dark:text-white mb-3">
              Number of seats
            </p>

            <div className="flex items-center gap-4">

              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="w-10 h-10 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                -
              </button>

              <span className="text-xl font-bold text-gray-800 dark:text-white">
                {quantity}
              </span>

              <button
                type="button"
                onClick={increaseQuantity}
                disabled={
                  quantity >= selectedEvent.availableSeats
                }
                className="w-10 h-10 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                +
              </button>

            </div>

          </div>

          {/* Total */}
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">

            <div className="flex justify-between text-gray-700 dark:text-gray-200">
              <span>Price per seat</span>
              <span>₹{selectedEvent.price}</span>
            </div>

            <div className="flex justify-between text-gray-700 dark:text-gray-200 mt-2">
              <span>Seats</span>
              <span>{quantity}</span>
            </div>

            <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white mt-3">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>

          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-center">
              {error}
            </p>
          )}

          {/* Book */}
          <button
            type="button"
            onClick={handleBooking}
            disabled={
              bookingStatus === "loading" ||
              selectedEvent.availableSeats <= 0
            }
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {bookingStatus === "loading"
              ? "Processing..."
              : `Pay ₹${totalAmount}`}
          </button>

        </div>
      </div>
    </div>
  );
};

export default Booking;