import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerEvent } from '../features/events/eventApi';


const CreateEvent = () => {

  const { status, error} = useSelector((state) => state.events);
  const  dispatch = useDispatch();

  const [formData , setFormData] = useState({
    title:"",
    // description:"",
    image:null,
    venue:"",
    date:"",
    startTime:"",
    endTime:"",
    price:"",
    capacity:"",
    availableSeats:"",
    category:""

  })

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key , value]) => {
      if(value !== null && value !== ""){
      data.append(key, value);
      }
    });

    dispatch(registerEvent(data));
  }
  return (
    <div className="flex flex-col w-full
    dark:bg-gray-900 dark:text-white">
        

        <div className="flex ">

            {/* sidebar */}
          <div className="border border-gray-200 shadow w-1/4 min-h-screen 
          dark:border-gray-700 dark:shadow">

            <ul className="flex flex-col items-center">
              <li>
                New
              </li>

              <li>
                Edit
              </li>

            </ul>
          </div>


          {/* form  */}
          <div className="border border-gray-200 shadow ml-4 mr-4 w-full 
          dark:border-gray-700 dark:shadow">

              <div>
                <h3 className="text-center text-xl ">
                  Host An Event
                  </h3>
              </div>

              <form onSubmit={handleSubmit}
              className="flex flex-col ml-2 gap-3 mr-2">

                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold p-1
                      dark:text-white">
                    Title
                  </label>
                  <input 
                  className="flex border  p-1  rounded"
                  type="text" 
                  placeholder='Hackathon 2026'
                  name="title"
                  value={formData.title}
                  onChange={(e) => 
                    setFormData({...formData, [e.target.name] :e.target.value})}
                  />
                </div>

                {/* <div className='flex flex-col'>
                  <label className=" text-gray-700 font-semibold p-1
                  dark:text-white" >
                    Description
                  </label>
                   <textarea 
                   className="border  p-1 rounded"
                   placeholder="Describe your event (purpose, highlights, audience)"
                   name="description"
                    value={formData.description}
                  onChange={(e) => 
                    setFormData({...formData, [e.target.name]: e.target.value})}
                   >

                   </textarea>
                </div> */}

                <div className="flex flex-col">
                  <label className=" text-gray-700 font-semibold p-1
                  dark:text-white" >
                    Event Poster
                  </label>
                  <input 
                  className="border p-1"
                  type="file" 
                  name="image"
                  onChange={(e) => 
                    setFormData({...formData, image: e.target.files[0]})}
                  />

                </div>

                  <div className="bg-gray-100 p-1 text-lg font-light text-center 
                   dark:bg-gray-800">
                    Venue Details
                  </div>

                 <div className="grid grid-cols-2 gap-4">
                <div className='flex flex-col'>
                  <label className=" text-gray-700 font-semibold p-1
                  dark:text-white" >
                    Venue
                  </label>
                  <input 
                  className="border p-1 rounded"
                  type="text" 
                  placeholder="Delhi Convention Center, Connaught Place, New Delhi"
                  name="venue"
                  value={formData.venue}
                  onChange={(e) => 
                  setFormData({...formData, [e.target.name]: e.target.value})}/>
                </div>

                <div className='flex flex-col'>
                  <label className=" text-gray-700 font-semibold p-1
                  dark:text-white">
                    Date
                  </label>
                  <input 
                  className="border p-1 rounded"
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={(e) => 
                  setFormData({...formData, [e.target.name]: e.target.value})}/>
                </div>


                <div className='flex flex-col'>
                  <label className=" text-gray-700 font-semibold p-1
                  dark:text-white" >
                    Event Starts
                  </label>
                  <input 
                  type="time" 
                  className='border p-1 rounded'
                  name="startTime"
                  value={formData.startTime}
                  onChange={(e) => 
                  setFormData({...formData, [e.target.name]: e.target.value})}/>
                </div>

                <div className="flex flex-col">
                  <label className=" text-gray-700 font-semibold p-1
                  dark:text-white">
                    Event Ends
                  </label>
                  <input 
                  className="border p-1 rounded"
                  type="time" 
                  name="endTime"
                  value={formData.endTime}
                  onChange={(e) =>
                     setFormData({...formData, [e.target.name]:e.target.value})}
                  />
                </div>
              </div>

                  <div className="bg-gray-100 text-center font-light text-lg p-1
                  dark:bg-gray-800">
                    Pricing & Seats
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                <div className='flex flex-col'>
                  <label className=" text-gray-700 font-semibold p-1
                  dark:text-white">
                    Price
                  </label>
                  <input 
                  className='border p-1 rounded'
                  type="number" 
                  min="0"
                  placeholder='2000 Rs'
                   name="price"
                  value={formData.price}
                  onChange={(e) => 
                  setFormData({...formData, [e.target.name]: e.target.value})}/>
                </div>

                

                <div className='flex flex-col'>
                  <label className=" text-gray-700 font-semibold p-1
                  dark:text-white">
                    Capacity
                  </label>
                  <input 
                  className='border p-1 rounded'
                  type="number" 
                  placeholder='200'
                  min="0"
                   name="capacity"
                  value={formData.capacity}
                  onChange={(e) => 
                  setFormData({...formData,[e.target.name]: e.target.value})}/>
                </div>

                <div className='flex flex-col'>
                  <label className=" text-gray-700 font-semibold p-1
                  dark:text-white">
                   Available Seats
                  </label>
                  <input 
                  className='border p-1 rounded'
                  type="number" 
                  min="0"
                  placeholder='200'
                   name="availableSeats"
                  value={formData.availableSeats}
                  onChange={(e) => 
                    setFormData({...formData,[e.target.name]: e.target.value})}
                  />
                </div>

                <div className='flex flex-col'>
                  <label className=" text-gray-700 font-semibold p-1
                  dark:text-white">
                    category
                  </label>
                  <input 
                  className='border p-1 rounded '
                  type="text"
                  placeholder='Technology'
                  name="category"
                  value={formData.category}
                  onChange={(e) => 
                  setFormData({...formData, [e.target.name]: e.target.value})}/>
                </div>
                </div>

                <div className="flex justify-center ">
                  <button type='submit'
                  className="flex bg-red-600 p-2 rounded font-light mb-4 ">
                    Submit
                    </button>
                </div>
                
              </form>
          </div>
        </div>
    </div>
  )
}

export default CreateEvent
