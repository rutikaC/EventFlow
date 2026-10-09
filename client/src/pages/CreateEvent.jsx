import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";

import {
  registerEvent,
  getMyEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../features/events/eventApi.js";

const CreateEvent = () => {
  const dispatch = useDispatch();

  const { status, error, myEvents, event } = useSelector(
    (state) => state.events,
  );

  const [mode, setMode] = useState("new");
  const [selectEvent, setSelectEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    venue: "",
    date: "",
    startTime: "",
    endTime: "",
    price: "",
    capacity: "",
    availableSeats: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewEvent = () => {
    setMode("new");
    setSelectEvent(null);

    setFormData({
      title: "",
      description: "",
      image: null,
      venue: "",
      date: "",
      startTime: "",
      endTime: "",
      price: "",
      capacity: "",
      availableSeats: "",
      category: "",
    });
  };

  const handleEditClick = () => {
    setMode("edit");
    setSelectEvent(null);

    dispatch(getMyEvents());
  };

  const handleGetEvents = () => {
    dispatch(getMyEvents());
  };

  const handleDeleteEvent = (eventId) => {
    dispatch(deleteEvent(eventId));
  };

  const handleSelectEvent = (eventId) => {
    setSelectEvent(eventId);

    dispatch(getEventById(eventId));
  };

  const formatTime = (time) => {
    const cleanedTime = time.trim().replace(/\s+/g, "");

    const [hours, minutes] = cleanedTime.split(":");
    if (!hours || !minutes) return "";
    return `${hours.padStart(2, "0")}: ${minutes.padStart(2, "0")}`;
  };

  useEffect(() => {
    if (mode === "edit" && event && selectEvent) {
      setFormData({
        title: event.title || "",
        description: event.description || "",
        image: null,

        venue: event.venue || "",

        date: event.date
          ? new Date(event.date).toISOString().split("T")[0]
          : "",

        startTime: formatTime(event.startTime),
        endTime: formatTime(event.endTime),

        price: event.price ?? "",
        capacity: event.capacity ?? "",
        availableSeats: event.availableSeats ?? "",

        category: event.category?.name || "",
      });
    }
  }, [event, mode, selectEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        data.append(key, value);
      }
    });

    if (mode === "new") {
      dispatch(registerEvent(data));
    } else if (mode === "edit") {
      dispatch(
        updateEvent({
          eventId: selectEvent,
          formData: data,
        }),
      );
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen dark:bg-gray-900 dark:text-white">
      <div className="flex">
        <div
          className="border border-gray-200 shadow w-1/4 min-h-screen
          dark:border-gray-700 dark:bg-gray-900"
        >
          <h2 className="font-serif text-red-500 text-xl text-center p-5">
            Event Management
          </h2>

          <ul className="flex flex-col gap-3 px-4">
            {/* NEW */}

            <li>
              <button
                type="button"
                onClick={handleNewEvent}
                className={`w-full text-left p-3 rounded
                  ${
                    mode === "new"
                      ? "bg-red-600 font-light text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
              >
                Create New Event
              </button>
            </li>

            {/* EDIT */}

            <li>
              <button
                type="button"
                onClick={handleEditClick}
                className={`w-full text-left p-3 rounded
                  ${
                    mode === "edit"
                      ? "bg-red-600 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
              >
                Edit Event
              </button>
            </li>

            
          </ul>
        </div>

        <div className="w-full ml-4 mr-4 mt-4">
          {mode === "edit" && !selectEvent && (
            <div
              className="border border-gray-200 shadow p-5 rounded
              dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold mb-5">
                Select Event to Edit
              </h2>

              {/* LOADING */}

              {status === "loading" && (
                <p className="text-gray-500">Loading your events...</p>
              )}

              {/* ERROR */}

              {error && <p className="text-red-500 mb-3">{error}</p>}

              {/* EVENTS */}

              {status !== "loading" && myEvents?.length === 0 && (
                <p className="text-gray-500">
                  You haven't created any events yet.
                </p>
              )}

              <div className="flex flex-col gap-3">
                {myEvents?.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center border border-gray-200 rounded-lg
               hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                  >
                    {/* Select Event */}
                    <button
                      type="button"
                      onClick={() => handleSelectEvent(item._id)}
                      className="flex-1 text-left p-4"
                    >
                      <h3 className="font-semibold text-lg">{item.title}</h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.venue}
                      </p>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.date
                          ? new Date(item.date).toLocaleDateString()
                          : ""}
                      </p>
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleDeleteEvent(item._id)}
                      className="p-4 text-red-500 hover:text-red-700"
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(mode === "new" || selectEvent) && (
            <div
              className="border border-gray-200 shadow
              rounded dark:border-gray-700"
            >
              {/* FORM TITLE */}
              <div className="text-center font-light bg-red-50 shadow- border border-red-50
               dark:bg-gray-600 dark:border-gray-500">
                New AI-powered Event Description Generator.
              </div>

              <div className="p-4">
                <h3 className="text-center text-xl font-semibold">
                  {mode === "new" ? "Host An Event" : "Edit Event"}
                </h3>
              </div>

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="flex flex-col ml-2 gap-3 mr-2"
              >
                <div className="flex flex-col">
                  <label
                    className="text-gray-700 font-semibold p-1
                    dark:text-white"
                  >
                    Title
                  </label>

                  <input
                    className="border p-2 rounded
                    dark:bg-gray-800 dark:border-gray-700"
                    type="text"
                    placeholder="Hackathon 2026"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-gray-700 font-semibold p-1
                    dark:text-white"
                  >
                    Description
                  </label>

                  <textarea
                    className="border p-2 rounded
                    dark:bg-gray-800 dark:border-gray-700"
                    placeholder="Leave empty if you want AI generated description."
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-gray-700 font-semibold p-1
                    dark:text-white"
                  >
                    Event Poster
                  </label>

                  <input
                    className="border p-2"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        image: e.target.files[0] || null,
                      }))
                    }
                  />

                  {mode === "edit" && (
                    <p className="text-sm text-gray-500 mt-1">
                      Leave empty to keep the existing poster.
                    </p>
                  )}
                </div>

                <div
                  className="bg-gray-100 p-2 text-lg font-light text-center
                  dark:bg-gray-800"
                >
                  Venue Details
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* VENUE */}

                  <div className="flex flex-col">
                    <label
                      className="text-gray-700 font-semibold p-1
                      dark:text-white"
                    >
                      Venue
                    </label>

                    <input
                      className="border p-2 rounded
                      dark:bg-gray-800 dark:border-gray-700"
                      type="text"
                      placeholder="Delhi Convention Center"
                      name="venue"
                      value={formData.venue}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* DATE */}

                  <div className="flex flex-col">
                    <label
                      className="text-gray-700 font-semibold p-1
                      dark:text-white"
                    >
                      Date
                    </label>

                    <input
                      className="border p-2 rounded
                      dark:bg-gray-800 dark:border-gray-700"
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* START TIME */}

                  <div className="flex flex-col">
                    <label
                      className="text-gray-700 font-semibold p-1
                      dark:text-white"
                    >
                      Event Starts
                    </label>

                    <input
                      type="time"
                      className="border p-2 rounded
                      dark:bg-gray-800 dark:border-gray-700"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                    />
                  </div>

                  {/* END TIME */}

                  <div className="flex flex-col">
                    <label
                      className="text-gray-700 font-semibold p-1
                      dark:text-white"
                    >
                      Event Ends
                    </label>

                    <input
                      className="border p-2 rounded
                      dark:bg-gray-800 dark:border-gray-700"
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div
                  className="bg-gray-100 text-center font-light text-lg p-2
                  dark:bg-gray-800"
                >
                  Pricing & Seats
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* PRICE */}

                  <div className="flex flex-col">
                    <label
                      className="text-gray-700 font-semibold p-1
                      dark:text-white"
                    >
                      Price
                    </label>

                    <input
                      className="border p-2 rounded
                      dark:bg-gray-800 dark:border-gray-700"
                      type="number"
                      min="0"
                      placeholder="2000 Rs"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* CAPACITY */}

                  <div className="flex flex-col">
                    <label
                      className="text-gray-700 font-semibold p-1
                      dark:text-white"
                    >
                      Capacity
                    </label>

                    <input
                      className="border p-2 rounded
                      dark:bg-gray-800 dark:border-gray-700"
                      type="number"
                      min="1"
                      placeholder="200"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* AVAILABLE SEATS */}

                  <div className="flex flex-col">
                    <label
                      className="text-gray-700 font-semibold p-1
                      dark:text-white"
                    >
                      Available Seats
                    </label>

                    <input
                      className="border p-2 rounded
                      dark:bg-gray-800 dark:border-gray-700"
                      type="number"
                      min="0"
                      placeholder="200"
                      name="availableSeats"
                      value={formData.availableSeats}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* CATEGORY */}

                  <div className="flex flex-col">
                    <label
                      className="text-gray-700 font-semibold p-1
                      dark:text-white"
                    >
                      Category
                    </label>

                    <input
                      className="border p-2 rounded
                      dark:bg-gray-800 dark:border-gray-700"
                      type="text"
                      placeholder="Technology"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                {/* submit */}

                <div className="flex justify-center gap-3 mt-3">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-red-600 hover:bg-red-700
                    text-white p-2 px-5 rounded font-medium mb-4
                    disabled:opacity-50"
                  >
                    {status === "loading"
                      ? "Processing..."
                      : mode === "new"
                        ? "Create Event"
                        : "Update Event"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
