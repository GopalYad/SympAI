import React from 'react'
import { doctors } from '../assets/assets_frontend/assets'
const Doctor = () => {
  return (
    <section className=' flex flex-col items-center justify-center '>
      <div className='mt-12 flex flex-col items-center'>
      <h1 className="text-3xl font-bold text-gray-900">Find Your Best Doctor</h1>
      <div className="flex w-full max-w-xl items-center bg-white border border-gray-300 shadow-md rounded-full px-4 py-2">
        <div className="text-gray-500 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Search doctors"
          className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
        />
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-blue-600 transition duration-300">
          Search
        </button>
      </div>
       <div className='flex flex-wrap gap-4'>
        {doctors.slice(0,10).map((doc,index)=>(
          <div key={index}>
            <img src={doc.image} alt=""   className="w-full h-auto object-cover" />
          </div>
        ))}
       </div>
       
      </div>
    </section>
  )
}

export default Doctor
