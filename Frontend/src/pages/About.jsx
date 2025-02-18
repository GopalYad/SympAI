import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
const About = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-10 p-10 max-w-6xl mx-auto">
    {/* Left Side - Image */}
    <div className="w-full md:w-1/2">
      <img
        src={assets.contact_image}
        alt="Doctors"
        className="rounded-lg shadow-lg w-full"
      />
    </div>

    {/* Right Side - Content */}
    <div className="w-full md:w-1/2">
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">
        ABOUT <span className="font-bold">US</span>
      </h2>
      <p className="text-gray-600 mb-4">
        Welcome to Doc+, your trusted partner in managing your healthcare needs
        conveniently and efficiently. At Prescripto, we understand the challenges
        individuals face when it comes to scheduling doctor appointments and managing
        their health records.
      </p>
      <p className="text-gray-600 mb-4">
        Doc+ is committed to excellence in healthcare technology. We continuously
        strive to enhance our platform, integrating the latest advancements to improve
        user experience and deliver superior service. Whether you’re booking your first
        appointment or managing ongoing care, Prescripto is here to support you every
        step of the way.
      </p>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Vision</h3>
      <p className="text-gray-600">
        Our vision at Doc+ is to create a seamless healthcare experience for every
        user. We aim to bridge the gap between patients and healthcare providers,
        making it easier for you to access the care you need, when you need it.
      </p>
    </div>
  </section>
  )
}

export default About
