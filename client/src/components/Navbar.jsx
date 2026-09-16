import React from 'react'
import { NavLink, Link} from 'react-router-dom'
import { IoIosSearch } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {

    const[isOpen, setIsOpen] = useState(false);
    const {theme, toggleTheme} = useTheme();


  return (
    <div className="flex items-center md:justify-evenly md:h-20 
    p-2 shadow 
    bg-(--bg) text-(--text) dark:border dark:border-gray-700 dark:shadow-sm ">
        {/* logo */}
        <div className='w-32 md:w-42 m-2'>
            <img 
            src={theme === "light" ? "/logo.png" : "/dark_logo.png"} 
            alt="EventFlow" 
            />

        </div>

        {/* search bar */}
        <div className='m-1 md:block relative w-full max-w-sm'>
            <span className='hidden  absolute inset-y-0 right-3 md:flex items-center text-gray-500'>
                <IoIosSearch />
            </span>
            <input 
            className=' text-sm w-xsm md:w-sm p-2 border border-gray-200 
            bg-gray-50 focus:outline-none rounded shadow
            dark:bg-gray-900 dark:border-gray-700 dark:text-white
            dark:shadow
            '
            placeholder='Search Events Here...'
            type="text" />
        </div>

        {/* list */}

        <div className=' hidden md:flex '>
            <ul className='flex gap-6  text-lg items-center'>
                <li>
                    <NavLink to='/events'
                    className={({isActive}) => 
                    isActive ? "text-red-600 font-semibold" : "text-black hover:text-red-500 "}
                    >
                        Events
                    </NavLink>
                </li>
                <li>
                    <NavLink>
                        Bookings
                    </NavLink>
                </li>
                <li>
                    <NavLink>
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink>
                        Contact
                    </NavLink>
                </li>
                    
                
            </ul>
        </div>

        {/* theme toggle */}
        <button className='border p-1 rounded m-4 border-gray-200 
        shadow
        dark:border-gray-800 dark:shadow'
            onClick={toggleTheme}>
            {theme === "light" ? <MdDarkMode /> :<CiLight />}
        </button>

        {/* buttons */}
        <div className='hidden md:flex md:space-x-2.5'>

            
            <Link>
            <button
            className='text-white text-sm bg-red-600 p-1 rounded shadow hover:bg-red-500'>
                Sing Up
            </button>
            </Link>

            <Link>
            <button
            className='text-white text-sm bg-red-600 p-1 rounded shadow hover:bg-red-500'>
                Log In
            </button>
            </Link>
        </div>

        {/*  for mobile*/}

        <div className='md:hidden'>
            <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen? <IoMdClose size={24} /> : <GiHamburgerMenu size={24} />}
            </button>
        </div>


        {isOpen && (
            <div className='absolute top-16 left-0 w-full bg-white
            shadow-md  md:hidden  
            dark:bg-gray-900 dark:text-white'>
            <ul className='flex flex-col items-center gap-4 py-4 '>
                <li>
                    <NavLink to='/events' onClick={() => setIsOpen(false)}>
                        Events
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/events' onClick={() => setIsOpen(false)}>
                        Bookings
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/events' onClick={() => setIsOpen(false)}>
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/events' onClick={() => setIsOpen(false)}>
                        Contact
                    </NavLink>
                </li>
                <li>
                    <Link>
                    <button
                    className='text-white text-sm bg-red-600 p-1 rounded shadow hover:bg-red-500'
                    >
                        Sign Up
                    </button>
                    </Link>
                </li>
                <li>
                <Link>
                <button
                className='text-white text-sm bg-red-600 p-1 rounded shadow hover:bg-red-500'
                >
                Log In
                </button>
                </Link>
                </li>
                
            </ul>
        </div>
            
        )}
    </div>
  )
}

export default Navbar
