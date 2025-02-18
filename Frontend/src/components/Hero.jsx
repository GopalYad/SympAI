import React from 'react'
import { assets } from '../assets/assets_frontend/assets.js'
import { FaStar } from "react-icons/fa";
const Hero = () => {
  return (
    
    <section className='flex justify-center items-center flex-col w-full mt-17 '>
      <div ><img src={assets.banner} alt="" className='w-full mb-4.5' /></div>
    
     
      <div className="md:w-1/2 flex flex-col items-center">
    <h2 className="text-4xl  font-bold text-blue-900">
      Comprehensive Care for Every Patient
    </h2>
    
    {/* Stats Cards */}
    <div className="flex flex-wrap justify-center md:justify-start gap-12 mt-4">
      <div className="bg-white shadow p-4 rounded-lg">
        <p className="text-xl font-bold text-blue-900">90%</p>
        <p className="text-gray-600">Patient satisfaction rate</p>
      </div>
      
      <div className="bg-white shadow-md p-4 rounded-lg">
        <p className="text-xl font-bold text-blue-900">500+</p>
        <p className="text-gray-600">Board-certified doctors</p>
      </div>
      
      <div className="bg-white shadow-md p-4 rounded-lg">
        <p className="text-xl font-bold text-blue-900">4.8 ⭐</p>
        <p className="text-gray-600">Over 20,000 Patients</p>
      </div>
      
    
    </div>
  </div>
    </section>
  )
}

export default Hero
