import React, { useState } from 'react';
import { GoArrowUpRight } from "react-icons/go";
import { IoIosMenu } from "react-icons/io";
import { IoCameraOutline } from "react-icons/io5";
import { NavLink, useNavigate } from 'react-router-dom';
import LoginDropdown from './LoginDropdown';

const Header = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const handleCameraClick = () => {
    navigate('/qr-scanner');
  };

  return (
    <header className="bg-gradient-to-r from-cyan-400 via-sky-600 to-blue-500 text-white px-4 md:px-20 py-4 shadow-lg sticky top-0 z-50 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center">
        {/* Logo + Menu */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Icon */}
          <div className="md:hidden text-3xl cursor-pointer hover:scale-110 transition" onClick={() => setNav(!nav)}>
            <IoIosMenu />
          </div>

          {/* Logo */}
          <NavLink to="/" className="text-3xl font-extrabold text-white drop-shadow-lg">
            <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">DOC</span>
            <span className="text-yellow-300">+</span>
          </NavLink>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-8 text-sm font-semibold">
          <NavLink to="/" className="hover:underline underline-offset-4 transition-all">Home</NavLink>
          <NavLink to="/doctors" className="hover:underline underline-offset-4 transition-all">All Doctors</NavLink>
          <a href="#" className="hover:underline underline-offset-4 transition-all">Service</a>
          <a href="#" className="hover:underline underline-offset-4 transition-all">Blog</a>
          <NavLink to="/aboutus" className="hover:underline underline-offset-4 transition-all">About Us</NavLink>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* QR Camera Icon */}
          <button
            onClick={handleCameraClick}
            className="text-white text-xl hover:text-yellow-300 transition-transform hover:scale-110"
            title="Scan QR"
          >
            <IoCameraOutline />
          </button>

          <LoginDropdown />
          <NavLink to="/signup">
            <button className="bg-white text-blue-600 font-bold px-4 py-2 rounded-full hover:bg-blue-100 transition-all flex items-center gap-1 shadow-sm">
              Sign Up <GoArrowUpRight />
            </button>
          </NavLink>
        </div>
      </div>

      {/* Mobile Nav */}
      {nav && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-sm font-medium bg-white text-blue-800 px-4 py-4 shadow-xl rounded-md animate-slide-down">
          <NavLink to="/" className="hover:text-sky-600 transition-all">Home</NavLink>
          <NavLink to="/doctors" className="hover:text-sky-600 transition-all">All Doctors</NavLink>
          <a href="#" className="hover:text-sky-600 transition-all">Service</a>
          <a href="#" className="hover:text-sky-600 transition-all">Blog</a>
          <NavLink to="/aboutus" className="hover:text-sky-600 transition-all">About Us</NavLink>
          <button
            onClick={handleCameraClick}
            className="flex items-center gap-2 text-blue-600 hover:text-sky-600"
          >
            <IoCameraOutline /> Scan QR
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
