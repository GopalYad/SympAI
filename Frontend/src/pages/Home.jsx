import React from 'react'
import Header from '../components/Header';
import Hero from '../components/Hero';
import Service from '../components/Service';
import Feedback from '../components/Feedback';
const Home = () => {
  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.9),rgba(255,255,255,0))]">
    <div >
   {/* <Header/> */}
   <Hero/>
   <Service/>
   <Feedback/>
    </div>
    </div>
  )
}

export default Home;
