import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
const Feedback = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-5 ">
      <h2 className="text-2xl font-semibold text-center">Our patients feedback about us</h2>
      <p className="text-gray-500 text-sm text-center mb-6">their impression after using this application</p>
      
      <div className="bg-blue-100 p-6 rounded-lg flex flex-col md:flex-row items-center max-w-6xl w-full shadow-md">
        <div className="relative p-2">
          <div className="border-2 border-blue-500 rounded-lg p-1">
            <img
              src={assets.feedbackImg1}
              alt="User"
              className="rounded-lg w-40 h-40 object-cover"
            />
          </div>
        </div>
        
        <div className="text-center md:text-left md:ml-6">
          <p className="text-gray-700 text-lg italic">“DOC+ is a website and mobile app for you to feel better or get medical help. We offer you a 24/7 doctor service with no appointment needed”</p>
          <h3 className="font-semibold mt-4">Naufal Hidayat</h3>
          <p className="text-gray-500 text-sm">Student at Telkom University</p>
        </div>
      </div>
      
      <div className="flex justify-between w-20 mt-4">
        <button className="text-gray-500 hover:text-gray-700">←</button>
        <button className="text-gray-500 hover:text-gray-700">→</button>
      </div>
    </div>
  )
}

export default Feedback
