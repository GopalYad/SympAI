import React from 'react';
import { assets } from '../assets/assets_frontend/assets.js';
import { GoArrowUpRight } from 'react-icons/go';
import { motion } from 'framer-motion';

const Service = () => {
  return (
    <div className="bg-[#f9f9f9] p-10 rounded-lg font-sans">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-center">
        {/* Left Side Content */}
        <div>
          <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Service</span>
          <h1 className="text-4xl font-bold mt-3 text-gray-900">Empowering Health, Enriching Lives</h1>
          <p className="text-gray-600 mt-2 text-lg">
            We are committed to providing high-quality, compassionate care to every
            patient we serve. Whatever your healthcare needs may be, you can trust
            us to be your partner in health and wellness.
          </p>
          <a href="#book" className="flex items-center w-fit border border-blue-900 px-4 py-2 mt-4 rounded-lg hover:bg-blue-900 hover:text-white transition">
            Appointment <GoArrowUpRight className="ml-2" />
          </a>
        </div>

        {/* Right Side Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            className="relative bg-white backdrop-blur-xl bg-opacity-30 p-4 rounded-xl shadow-xl"
          >
            <img src={assets.serviceImg1} className="w-full h-56 object-cover rounded-xl" alt="Instant Booking" />
            <div className="absolute bottom-4 left-4 text-blue-900 font-bold">
              Instant Booking
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }} 
            className="relative bg-white backdrop-blur-xl bg-opacity-30 p-4 rounded-xl shadow-xl"
          >
            <img src={assets.serviceImg2} className="w-full h-56 object-cover rounded-xl" alt="Online Consultation" />
            <div className="absolute bottom-4 left-4 text-blue-900 font-bold">
              Online Consultation
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }} 
            className="relative bg-white backdrop-blur-xl bg-opacity-30 p-4 rounded-xl shadow-xl"
          >
            <img src={assets.serviceImg3} className="w-full h-56 object-cover rounded-xl" alt="24/7 Healthcare Support" />
            <div className="absolute bottom-4 left-4 text-blue-900 font-bold">
              24/7 Healthcare Support
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Service;