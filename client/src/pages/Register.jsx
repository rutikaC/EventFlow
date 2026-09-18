import React, { useState } from 'react'
import GoogleLoginButton from '../components/GoogleLoginButton'

const Register = () => {
  
  
  return (
    <div className='flex flex-col items-center justify-center 
    bg-gray-50 gap-4 
    dark:bg-gray-900  '>
      <div className="flex flex-col m-4 gap-3">
          <span className="font-semibold text-lg text-center m-2">Get Started</span>
          
          {/* username */}

          <div className='flex flex-col'>
            <label className="text font-medium text-gray-600
            dark:text-white dark:font-normal"  
            >Username
            </label>
            <input className="border p-1 w-xs "
            type="email" />
          </div>

          {/* email */}

          <div className='flex flex-col'>
            <label className="text font-medium text-gray-600
            dark:text-white dark:font-normal"  
            >Email
            </label>
            <input className="border p-1 w-xs "
            type="email" />
          </div>

          {/* password */}

          <div className="flex flex-col">
            <label className="text font-medium text-gray-600
            dark:text-white dark:font-normal">
              Password
              </label>
            <input className="border p-1 w-xs  "
            type="password" />

          </div>

          
          <button className="bg-red-600 p-2 rounded hover:bg-red-500
          text-white"
            >
              Register
            </button>
      </div>

      {/* partation */}
      <div className="border border-gray-400 w-xs m-2"></div>
       <div className="flex flex-col text-center">
         
         
       
       <div>
        <GoogleLoginButton/>
       </div>
       </div>
    </div>
  )
}

export default Register
