import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import GoogleLoginButton from '../components/GoogleLoginButton'
import {registerUser} from "../features/auth/authApi.js"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


const Register = ({setShowRegister}) => {

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
    role:""
  })
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

const navigate = useNavigate();

const handleSubmit = async(e) => {
  try {
     e.preventDefault();
      await dispatch(registerUser(formData)).unwrap();
      
      setShowRegister(false);

      if(role == "organizer"){
        navigate("/event/register")
      }else{
      navigate("/events");
      }
  } catch (error) {
    console.log(`Registation error ${error}`)
  }
};

  
  return (
    <div className='flex flex-col items-center justify-center 
    bg-gray-50 gap-4 
    dark:bg-gray-900  '>
      <form onSubmit={handleSubmit}
      className="flex flex-col m-4 gap-3">
          <span className="font-semibold text-lg text-center m-2">Get Started</span>
          
          {/* username */}

          <div className='flex flex-col'>
            <label className="text font-medium text-gray-600
            dark:text-white dark:font-normal"  
            >Username
            </label>
            <input className="border p-1 w-xs "
            type="text" 
            placeholder="Enter your username"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="current-name"
            />
          </div>

          {/* email */}

          <div className='flex flex-col'>
            <label className="text font-medium text-gray-600
            dark:text-white dark:font-normal"  
            >Email
            </label>
            <input className="border p-1 w-xs "
            type="email" 
            placeholder="Enter your email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="current-email"
            />
          </div>

          {/* password */}

          <div className="flex flex-col">
            <label className="text font-medium text-gray-600
            dark:text-white dark:font-normal">
              Password
              </label>
            <input className="border p-1 w-xs  "
            type="password" 
            placeholder="Enter you password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            />

          </div>

          <div className="flex flex-col">
            <label className="text font-medium text-gray-600
            dark:text-white dark:font-normal">
              Role 
              </label>
            <input className="border p-1 w-xs  "
            type="text" 
            placeholder="user or organizer"
            name="role"
            value={formData.role}
            onChange={handleChange}
            autoComplete="current-password"
            />

          </div>

          
          <button type="submit"
          className="bg-red-600 p-2 rounded hover:bg-red-500
          text-white"
            >
              Register
            </button>
      </form>

      {/* partation */}
      <div className="border border-gray-400 w-xs m-2"></div>
       <div className="flex flex-col text-center">
         
         
       
       <div>
        <GoogleLoginButton/>
       </div>
       </div>

       <p className='text-sm text-gray-500
       dark:text-gray-400'>
        Have an account? <Link to="login">Log In</Link>
        </p>
    </div>
  )
}

export default Register
