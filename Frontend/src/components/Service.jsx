import React from 'react'
import { assets } from '../assets/assets_frontend/assets.js'
import { GoArrowUpRight } from "react-icons/go";

const Service = () => {
  return (
    <div className="bg-[#f9f9f9] p-10 rounded-lg font-sans">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-center">
      <div>
        <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Service</span>
        <h1 className="text-4xl font-bold mt-3 text-gray-900">Empowering Health, Enriching Lives</h1>
        <p className="text-gray-600 mt-2 text-lg">
          We are committed to providing high-quality, compassionate care to every
          patient we serve. Whatever your healthcare needs may be, you can trust
          us to be your partner in health and wellness.
        </p>
       <a href="#" className='flex md:flex  items-center border border-blue-900 px-2 py-2  rounded-lg hover:bg-blue-900 hover:text-white transition'>Appointement <span><GoArrowUpRight/></span> </a>
         
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <img
            src={assets.serviceImg1}
            alt="Advanced Technology"
            className="w-full h-60 object-cover"
          />
          {/* <div className="absolute bottom-0 left-0 right-0 bg-black  text-blue-800  p-4">
            <h2 className="font-semibold text-lg">Advanced Technology</h2>
            <p className="text-sm mt-1">
              Our surgeons are trained in the latest robotic surgical techniques,
              which allow for greater precision
            </p>
          </div> */}
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <img
            src={assets.serviceImg2}
            alt="Online Doctor Meet"
            className="w-full h-60 object-cover"
          />
          {/* <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <h2 className="font-semibold text-lg">Online Doctor Meet</h2>
            <p className="text-sm mt-1">
              Our surgeons are trained in the latest robotic surgical techniques,
              which allow for greater precision
            </p>
          </div> */}
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <img
            src={assets.serviceImg3}
            alt="Consultancy your health"
            className="w-full h-60 object-cover"
          />
          {/* <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <h2 className="font-semibold text-lg">Consultancy your health</h2>
            <p className="text-sm mt-1">
              Our surgeons are trained in the latest robotic surgical techniques,
              which allow for greater precision
            </p>
          </div> */}
        </div>
      </div>
    </div>
  </div>
  )
}

export default Service
