import React, { useState } from "react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { FaCalendarAlt, FaUserInjured, FaClinicMedical, FaVideo, FaSearch, FaBell, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  // const navigate = useNavigate();

  const statsCards = [
    {
      icon: <FaCalendarAlt size={24} />,
      value: "24.4k",
      label: "Appointments",
      color: "bg-purple-500",
      trend: "+12.5%",
      trendUp: true
    },
    {
      icon: <FaUserInjured size={24} />,
      value: "166.3k",
      label: "Total Patients",
      color: "bg-red-500",
      trend: "+8.2%",
      trendUp: true
    },
    {
      icon: <FaClinicMedical size={24} />,
      value: "53.5k",
      label: "Clinic Consulting",
      color: "bg-yellow-500",
      trend: "+5.7%",
      trendUp: true
    },
    {
      icon: <FaVideo size={24} />,
      value: "28.0k",
      label: "Video Consulting",
      color: "bg-blue-500",
      trend: "+15.3%",
      trendUp: true
    }
  ];

  const appointments = [
    { name: "Jhon Smith", time: "10:00", status: "Ongoing", type: "Video Call" },
    { name: "Frank Murray", time: "10:25", status: "Scheduled", type: "Clinic Visit" },
    { name: "Ella Lucia", time: "11:30", status: "Scheduled", type: "Video Call" },
    { name: "Alyssa Dehn", time: "12:20", status: "Scheduled", type: "Clinic Visit" }
  ];

  const navItems = [
    "Overview", "Appointment", "My Patients", "Schedule Timings",
    "Payments", "Message", "Blog", "Settings"
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Animated Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-64 bg-white shadow-lg p-4 fixed h-screen z-50"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-blue-600">Doct.</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            ✕
          </button>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <motion.a
              key={item}
              href="#"
              onClick={() => setActiveTab(item)}
              className={`block p-3 rounded-lg transition-all ${
                activeTab === item
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-3 text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-2"
            // onClick={() => navigate("/login")}
          >
            <FaSignOutAlt /> Logout
          </motion.button>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Animated Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-40"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-gray-600"
            >
              ☰
            </button>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Appointment, Patient or etc"
                className="pl-10 p-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-500 hover:text-blue-600"
            >
              <FaQuestionCircle size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-500 hover:text-blue-600 relative"
            >
              <FaBell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-blue-500"
              />
              <div>
                <p className="font-semibold">Stephen Conley</p>
                <p className="text-sm text-gray-500">Cardiologist</p>
              </div>
            </motion.div>
          </div>
        </motion.header>

        {/* Dashboard Content */}
        <main className="p-4 md:p-8">
          {/* Animated Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {statsCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`${card.color} text-white p-6 hover:shadow-xl transition-all duration-300`}>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-white/20 rounded-full">
                        {card.icon}
                      </div>
                      <span className={`text-sm ${card.trendUp ? 'text-green-200' : 'text-red-200'}`}>
                        {card.trend}
                      </span>
                    </div>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">{card.value}</span>
                      <p className="text-white/80 mt-1">{card.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Today's Appointments Section */}
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
                      appointment.status === "Ongoing" ? "bg-green-500" : "bg-blue-500"
                    }`} />
                    <div>
                      <p className="font-medium">{appointment.name}</p>
                      <p className="text-sm text-gray-500">{appointment.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{appointment.time}</p>
                    <p className={`text-sm ${
                      appointment.status === "Ongoing" ? "text-green-600" : "text-blue-600"
                    }`}>
                      {appointment.status}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
