import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCalendarAlt, FaUserMd, FaFileMedical, FaPrescriptionBottle, FaEnvelope, FaSignOutAlt, FaSearch, FaBell, FaQuestionCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const token = localStorage.getItem("jwt");
      
      if (!token) {
        console.log("No token found");
        setError("No token found. Please login.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Profile response:", response.data);

        if (response.data && response.data.data) {
          setProfile(response.data.data);
          setError(null);
        } else {
          console.log("Invalid response format:", response.data);
          setError("Failed to load profile data");
        }
      } catch (err) {
        console.log("Profile fetch error:", err);
        
        if (err.response?.status === 401) {
          localStorage.removeItem("jwt");
          navigate("/login");
        } else {
          setError(err.response?.data?.message || "Error fetching profile");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const navItems = [
    { label: "Overview", href: "#" },
    { label: "My Appointments", href: "#" },
    { label: "Doctors", href: "/doctors" },
    { label: "Reports", href: "#" },
    { label: "Prescriptions", href: "#" },
    { label: "Messages", href: "#" },
    { label: "Profile Settings", href: "#" }
  ];

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
    }
  ];

  const appointments = [
    { doctor: "Dr. Sarah Lee", time: "9:00 AM", status: "Upcoming", type: "Video Call" },
    { doctor: "Dr. Kevin Hart", time: "2:00 PM", status: "Upcoming", type: "Clinic Visit" },
    { doctor: "Dr. Amy Wang", time: "5:00 PM", status: "Completed", type: "Video Call" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setProfile(null);
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-64 bg-white shadow-lg p-4 fixed h-screen z-50"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-blue-600">PatientHub</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            ✕
          </button>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={() => setActiveTab(item.label)}
              className={`block p-3 rounded-lg transition-all ${
                activeTab === item.label ? "bg-blue-600 text-white shadow-lg" : "text-gray-700 hover:bg-blue-50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {item.label}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-3 text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-2"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Logout
          </motion.button>
        </nav>
      </motion.aside>

      <div className="flex-1 ml-64">
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-40"
        >
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-gray-600">
              ☰
            </button>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors, appointments..."
                className="pl-10 p-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaQuestionCircle className="text-gray-500 hover:text-blue-600 cursor-pointer" />
            <div className="relative">
              <FaBell className="text-gray-500 hover:text-blue-600 cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </div>
            <img
              src="/patient-profile.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-blue-500"
            />
          </div>
        </motion.header>

        <main className="p-4 md:p-8">
          <div className="w-full py-22 px-12 mb-6 bg-red-300 rounded-xl shadow-md transition-all duration-300">
            {loading ? (
              <h1 className="text-xl font-bold">Loading...</h1>
            ) : error ? (
              <h1 className="text-xl font-bold text-red-600">{error}</h1>
            ) : (
              <h1 className="text-xl font-bold">Welcome, {profile?.name || "User"}</h1>
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
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;