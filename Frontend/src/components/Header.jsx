import React, { useState } from 'react'
import { GoArrowUpRight } from "react-icons/go";
import { IoIosMenu } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import LoginDropdown from './LoginDropdown';
const Header = () => {
    const[nav,setNav]=useState(false);
  return (
    <header className=' text-blue-900 py-4 md:px-24  px-2 '>

     <div className='container flex justify-between items-center '>
     <div className='flex items-center space-x-2'>
        <div className='md:hidden'><IoIosMenu /></div>
        <div><span>DOC+</span></div>
     </div>
     <nav className='hidden  md:flex  space-x-8 text-sm font-md'>
      <NavLink to='/'><li>Home</li></NavLink>
        <NavLink to='/doctors'> <li >All Doctors</li></NavLink>
       
        <a href="#">Service</a>
        <a href="#">Blog</a>
        <NavLink to='/aboutus'> <li >About Us</li></NavLink>
     </nav>
   <LoginDropdown/>
    
     </div>
    </header>
  )
}

export default Header
