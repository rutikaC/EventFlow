import React, { useEffect } from 'react'
import EventCard from '../components/EventCard'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from '../features/events/eventApi.js';
import { useSearchParams } from "react-router-dom";

const Events = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const {events = [], status, error} = useSelector((state) => state.events);

  const search = searchParams.get("search")?.toLowerCase() || "";

  const filteredEvents = events.filter((event)=> 
  event.title?.toLowerCase().includes(search))

 console.log("Events data:", events)
  useEffect(() => {
    dispatch(getEvents());
  },[dispatch]);

  if(status === "loading") return <p  className="text-3xl text-center font-bold ">
    Loading events please wait...
    </p>
  if(status === "failed") return  <p className='text-3xl flex items-center justify-center text-red-600 font-bold'
  >
    Error: {error}</p>
  return (
    <div className="flex flex-col justify-center items-center
    dark:bg-gray-900 dark:text-white">
       
       <div>
        <h1 className="text-xl font-bold text-gray-800 text-center m-4
        dark:text-white">
          Explore new Event and  paricipate
          </h1>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
          ))
        ):(
          <p className="col-span-full text-center text-gray-500 py-8">
            No event found.
          </p>
        )}
       </div>
    </div>
  )
}

export default Events
