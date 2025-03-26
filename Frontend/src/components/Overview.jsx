import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUserMd, FaFileMedical, FaPrescriptionBottle, FaEnvelope,  FaSearch, FaBell, FaQuestionCircle } from "react-icons/fa";
const Overview = ({ profile, loading, error }) => {
    
      const overviewCards = [
        {
          icon: <FaCalendarAlt size={24} />,
          value: "3",
          label: "Upcoming Appointments",
          color: "bg-blue-500"
        },
        {
          icon: <FaPrescriptionBottle size={24} />,
          value: "2",
          label: "Active Prescriptions",
          color: "bg-green-500"
        },
        {
          icon: <FaFileMedical size={24} />,
          value: "5",
          label: "Recent Reports",
          color: "bg-yellow-500"
        },
        {
          icon: <FaUserMd size={24} />,
          value: "4",
          label: "Consulted Doctors",
          color: "bg-purple-500"
        },
     
      ];
      
  const appointments = [
    { doctor: "Dr. Sarah Lee", time: "9:00 AM", status: "Upcoming", type: "Video Call" },
    { doctor: "Dr. Kevin Hart", time: "2:00 PM", status: "Upcoming", type: "Clinic Visit" },
    { doctor: "Dr. Amy Wang", time: "5:00 PM", status: "Completed", type: "Video Call" }
  ];
  return (
    <div>
      <div className="w-full py-6 px-12 mb-6 bg-red-300 rounded-xl shadow-md transition-all duration-300">
        {loading ? (
          <h1 className="text-xl font-bold">Loading...</h1>
        ) : error ? (
          <h1 className="text-xl font-bold text-red-600">{error}</h1>
        ) : (
          <h1 className="text-4xl font-bold">Welcome, {profile?.name || "User"}</h1>
        )}
      </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {overviewCards.map((card, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`${card.color} text-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="p-3 bg-white/20 rounded-full">
                          {card.icon}
                        </div>
                      </div>
                      <div className="mt-4">
                        <span className="text-3xl font-bold">{card.value}</span>
                        <p className="text-white/80 mt-1">{card.label}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
      
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 bg-white p-6 rounded-xl shadow-md"
                >
                  <h2 className="text-xl font-bold mb-4">Today's Appointments</h2>
                  <div className="space-y-4">
                    {appointments.map((appointment, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            appointment.status === "Upcoming" ? "bg-green-500" : "bg-gray-400"
                          }`} />
                          <div>
                            <p className="font-medium">{appointment.doctor}</p>
                            <p className="text-sm text-gray-500">{appointment.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{appointment.time}</p>
                          <p className={`text-sm ${
                            appointment.status === "Upcoming" ? "text-green-600" : "text-gray-600"
                          }`}>
                            {appointment.status}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
    </div>
  );
};

export default Overview;
