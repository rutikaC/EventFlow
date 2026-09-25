import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getEventById } from '../features/events/eventApi';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
    const dispatch = useDispatch();
    const { eventId} = useParams();
  const {event, status, error} = useSelector((state) => state.events);

  console.log("event", event)
  useEffect(() => {
    dispatch(getEventById(eventId));
  },[dispatch, eventId]);

  if(status === "loading") return <p>Loading events...</p>
  if(status === "failed") return  <p>Error: {error}</p>
  if (!event) return <p>No event found</p>
  return (

     <div className="flex flex-col md:flex-row border   border-gray-200 shadow  
     p-3 gap-2 
    dark:bg-gray-900 dark:border-gray-800 dark:shadow-xl dark:text-white">
        <div className="flex flex-col items-center justify-center 
        md:flex-row m-3 border border-gray-200
        shadow p-2 gap-2
        dark:bg-gray-800 dark:border-gray-800 dark;shadow-xl">
        <div  className="fexl md:w-1/2 ">
        <div className="flex items-center justify-center">
            <img className="w-screen h-50 items-center"
            src={event.image} alt="eventImage" />
        </div>
    
        <div>
            <h1 className=" font-bold text-center m-2 text-xl">
                {event?.title || "Untitled Event"}

            </h1>
            <p className="text-center font-light">
                {event.description}
            </p>
        </div>
        </div>

        <div className="flex w-screen m-4 flex-col md:w-1/2 gap-4">
        
      <div className="grid m-10 md:m-0 grid-cols-2 gap-4 text-center font-light">
        <div className="bg-red-50 text-black p-2 rounded-2xl shadow">
          <p className="font-semibold">Date</p>
          {new Date(event.date).toDateString()}
        </div>
        <div className="bg-red-50 text-black p-2 rounded-2xl shadow">
          <p className="font-semibold">Venue</p>
          {event.venue}
        </div>
        <div className="bg-red-50 text-black p-2 rounded-2xl shadow">
          <p className="font-semibold">From</p>
          {event.startTime}
        </div>
        <div className="bg-red-50 text-black p-2 rounded-2xl shadow">
          <p className="font-semibold">To</p>
          {event.endTime}
        </div>
        
        <div className="bg-red-50 text-black p-2 rounded-2xl shadow">
          <p className="font-semibold">Price</p>
          {event.price} Rs
        </div>
        <div className="bg-red-50 text-black p-2 rounded-2xl shadow">
          <p className="font-semibold">Seats</p>
          {event.capacity}
        </div>
          <div className="bg-red-50 text-black p-2 rounded-2xl shadow">
          <p className="font-semibold">Avalible Seats</p>
          {event.availableSeats}
        </div>
     <div className="bg-red-50 text-black p-2 rounded-2xl shadow">
          <p className="font-semibold">Organizer</p>
          {event.organizer.name}
        </div>
        </div>

        <div className="flex  justify-center">
        <button className="bg-red-600 px-4 py-2 rounded text-white
         hover:bg-red-500 font-bold w-xs lg:w-3xl md:w-2xl">
          Book a seat
        </button>

      </div>
        
      </div>
        </div>
    </div>
 
  )
}

export default EventDetails
