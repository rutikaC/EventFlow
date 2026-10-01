import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'


const EventCard = ({event}) => {

    // if(!event) return null;


  return (
    <Link to={`/event/${event._id}`} >
    <div className="flex flex-col border border-gray-200 shadow  m-3 
    rounded p-3 gap-2 w-md h-lg
    dark:bg-gray-800 dark:border-gray-800 dark:shadow-xl">

        <div className="flex items-center justify-center">
            <img className="object-contain max-s-xs  h-86"
            src={event.image} alt="eventImage" />
        </div>
    
        <div className="flex-1 flex flex-col justify-between">
            <h1 className=" font-bold text-center m-2 text-xl">
                {event?.title || "Untitled Event"}

            </h1>
            <p className="text-center font-light light-clamp-3">
                {event.description}
            </p>
        </div>


        <div className="flex items-center justify-center mt-auto">
            <button className="bg-red-600 p-2 rounded text-white hover:bg-red-500
            w-md  font-bold">
                Book a seat
            </button>
        </div>
    </div>
    </Link>
  )
}

export default EventCard
