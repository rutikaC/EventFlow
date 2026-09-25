import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'


const EventCard = ({event}) => {

    // if(!event) return null;


  return (
    <Link to={`/event/${event._id}`} >
    <div className='border border-gray-200 shadow  m-3 
    rounded p-3 gap-2
    dark:bg-gray-800 dark:border-gray-800 dark:shadow-xl'>

        <div >
            <img className=""
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

        <div className=" gap-2 font-light grid grid-cols-3 m-2 text-center ">
            <p className="bg-red-50    text-black p-1 rounded-2xl  shadow">
                <p>Date</p>{ new Date(event.date).toDateString()}
            </p>
            <p className="bg-red-50   text-black   rounded-2xl  shadow">
                <p>From</p>{event.startTime}
            </p>
            <p className="bg-red-50   text-black  rounded-2xl  shadow">
                <p>To</p>{event.endTime}
            </p>
            <p className="bg-red-50   text-black  rounded-2xl  shadow">
                <p>Venu</p>{event.venue}
            </p>
            <p className="bg-red-50   text-black  rounded-2xl  shadow">
                <p>Price</p>{event.price} Rs
            </p>
            <p className="bg-red-50   text-black  rounded-2xl  shadow">
                <p>Available Seats</p>{event.availableSeats}
            </p>
        </div>

        <div className="flex items-center justify-center ">
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
