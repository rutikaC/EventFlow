import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/auth/authApi.js';

const Login = ({setShowLogin}) => {
  const [formData, setFormData] = useState({
    email:"",
    password:""
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();

    const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }


  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      await dispatch(loginUser(formData)).unwrap();

      setShowLogin(false);
      navigate("/events");

    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center  
   ">
        <div>
           <h1 className="text-3xl font-bold m-2">
            Welcome Back
            </h1>
           <p className="text-sm text-gray-500 m-2 text-center">
            Please log in to continue
            </p>
        </div>

        <form onSubmit={handleSubmit}
        className="flex flex-col gap-4">

          <div className="flex flex-col ">
            <label className="font-semibold ">
              Email
            </label>
            <input className="border p-1 rounded "
            type="email" 
            placeholder='abc@gamil.com'
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete='current-email'
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold " >
              Password
              </label>
            <input  className="border p-1 rounded w-xs"
            type="password"
            name='password'
            value={formData.password}
            onChange={handleChange}
            autoComplete='current-password'
            />
          </div>

          <button type='submit'
          className="bg-red-500 p-2 rounded text-white w-xs">
            Login
          </button>

          <p className="text-center">Don't have an account? Sign up</p>
        </form>
    </div>
  )
}

export default Login
