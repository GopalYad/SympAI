import React, { useRef } from 'react';
import { assets } from '../assets/assets_frontend/assets.js';
import {
  FaStar,
  FaHeartbeat,
  FaHospital,
  FaUserMd,
  FaSyringe,
  FaFileMedical,
  FaStethoscope
} from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
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
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative w-full mt-20 overflow-hidden bg-gradient-to-br from-white via-blue-50 to-cyan-100 min-h-[80vh] md:min-h-screen flex flex-col justify-center items-center"
    >
      {/* Floating Background Circles */}
      <motion.div className="absolute top-[-50px] left-[-50px] w-[200px] h-[200px] bg-cyan-300 rounded-full blur-3xl opacity-30"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />

      <motion.div className="absolute bottom-[-60px] right-[-40px] w-[250px] h-[250px] bg-blue-300 rounded-full blur-2xl opacity-25"
        animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} />

      {/* Floating Icons */}
      <div className="absolute w-full h-full z-20 pointer-events-none">
        <motion.div className="absolute left-10 top-28 text-3xl text-blue-900 drop-shadow-lg opacity-90"
          animate={{ y: [0, -20, 0], rotate: [0, 360, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
          <FaHeartbeat />
        </motion.div>
        <motion.div className="absolute right-12 top-40 text-3xl text-blue-900 drop-shadow-lg opacity-90"
          animate={{ y: [0, -20, 0], rotate: [0, 360, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
          <FaHospital />
        </motion.div>
        <motion.div className="absolute left-20 bottom-20 text-3xl text-blue-900 drop-shadow-lg opacity-90"
          animate={{ y: [0, -20, 0], rotate: [0, 360, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
          <FaSyringe />
        </motion.div>
        <motion.div className="absolute right-16 bottom-16 text-3xl text-blue-900 drop-shadow-lg opacity-90"
          animate={{ y: [0, -20, 0], rotate: [0, 360, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}>
          <FaFileMedical />
        </motion.div>
        <motion.div className="absolute left-[45%] top-10 text-3xl text-blue-900 drop-shadow-lg opacity-90"
          animate={{ y: [0, -20, 0], rotate: [0, 360, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}>
          <FaStethoscope />
        </motion.div>
      </div>

      {/* Hero Banner with 3D Scroll Motion */}
      <motion.div
        style={{ y, opacity }}
        initial={{ opacity: 0, scale: 0.9, rotateY: -180 }}
        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1.5, type: 'spring', bounce: 0.5 }}
        viewport={{ once: true }}
        className="relative z-10 w-full h-[80vh] md:h-screen flex justify-center items-center overflow-hidden"
      >
        <img
          src={assets.banner1}
          alt="Healthcare Hero"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-black/40 z-[1]" />

        <div className="relative z-10 text-center px-4">
          <motion.h2
            className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg"
            animate={{ rotateX: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            Comprehensive Care for Every Patient
          </motion.h2>

          <motion.a
            href="#book"
            className="mt-6 inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition shadow-lg"
            whileHover={{ scale: 1.1, rotateY: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Appointment
          </motion.a>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="md:w-1/2 flex flex-col items-center text-center px-4 mt-10"
      >
        <div className="flex flex-wrap justify-center gap-8 mt-6">
          {[
            { label: 'Patient satisfaction rate', value: '90%' },
            { label: 'Board-certified doctors', value: '500+' },
            {
              label: 'Over 20,000 Patients',
              value: (
                <>
                  <span>4.8</span> <FaStar className="text-yellow-400" />
                </>
              ),
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{
                scale: 1.1,
                rotateY: 10,
                rotateX: 5,
                boxShadow:
                  '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
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
