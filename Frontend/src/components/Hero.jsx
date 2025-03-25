import React from 'react';
import { assets } from '../assets/assets_frontend/assets.js';
import { FaStar, FaStethoscope, FaHeartbeat, FaUserMd, FaHospital, FaNotesMedical, FaSyringe, FaFileMedical } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="flex justify-center items-center flex-col w-full mt-20 relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-cyan-100 min-h-screen">
      {/* 3D Floating Background Elements */}
      <motion.div 
        className="absolute top-[-50px] left-[-50px] w-[200px] h-[200px] bg-cyan-200 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className="absolute bottom-[-60px] right-[-40px] w-[250px] h-[250px] bg-blue-300 rounded-full blur-2xl opacity-25"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* 3D Floating Icons */}
      <motion.div
        className="absolute left-4 top-24"
        animate={{
          y: [0, -20, 0],
          rotateY: [0, 180, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <FaHeartbeat className="text-3xl text-blue-300 opacity-70" />
      </motion.div>

      <motion.div
        className="absolute right-4 top-28"
        animate={{
          y: [0, 20, 0],
          rotateX: [0, 180, 360],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <FaHospital className="text-3xl text-teal-400 opacity-70" />
      </motion.div>

      {/* 3D Hero Image with Parallax */}
      <motion.div 
        style={{ y, opacity }}
        initial={{ opacity: 0, scale: 0.9, rotateY: -180 }}
        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1.5, type: "spring", bounce: 0.5 }}
        viewport={{ once: true }}
        className="relative"
      >
        <motion.div
          animate={{
            rotateY: [0, 10, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img src={assets.banner1} alt="3D Hero" className="rounded-xl shadow-2xl w-600 max-w-3xl transform-gpu" />
        </motion.div>
      </motion.div>

      {/* 3D Stats Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="md:w-1/2 flex flex-col items-center text-center px-4 mt-10"
      >
        <motion.h2
          variants={item}
          className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 drop-shadow-lg"
          animate={{
            rotateX: [0, 10, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Comprehensive Care for Every Patient
        </motion.h2>

        <motion.a
          variants={item}
          href="#book"
          className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition shadow-lg"
          whileHover={{ scale: 1.1, rotateY: 10 }}
          whileTap={{ scale: 0.95 }}
        >
          Book Appointment
        </motion.a>

        {/* 3D Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-6">
          {[ 
            { label: 'Patient satisfaction rate', value: '90%' }, 
            { label: 'Board-certified doctors', value: '500+' },
            { label: 'Over 20,000 Patients', value: <><span>4.8</span> <FaStar className="text-yellow-400" /></> }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              variants={item}
              whileHover={{ 
                scale: 1.1,
                rotateY: 10,
                rotateX: 5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white shadow-xl p-6 rounded-xl w-48 text-center transition-all transform-gpu"
            >
              <p className="text-2xl font-bold text-blue-900 flex justify-center items-center gap-1">
                {stat.value}
              </p>
              <p className="text-gray-600 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
