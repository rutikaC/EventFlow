import React, { useEffect } from 'react'
import EventCard from '../components/EventCard'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from '../features/events/eventApi';

const Events = () => {
  const dispatch = useDispatch();
  const {events = [], status, error} = useSelector((state) => state.events);
 console.log("Events data:", events)
  useEffect(() => {
    dispatch(getEvents());
  },[dispatch]);

  if(status === "loading") return <p>Loading events...</p>
  if(status === "failed") return  <p>Error: {error}</p>
  return (
    <div className="flex flex-col
    dark:bg-gray-900 dark:text-white">
       
       <div>
        <h1 className="text-xl font-bold text-gray-800 text-center m-4
        dark:text-white">
          Explore new Event and  paricipate
          </h1>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (

            <EventCard key={event._id} event={event} />
          ))}
       </div>
    </div>
  )
}

export default Events
