import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCalendarAlt, FaUserMd, FaFileMedical, FaPrescriptionBottle, FaEnvelope, FaSignOutAlt, FaSearch, FaBell, FaQuestionCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


import Overview from "../components/Overview";
import Appointments from "../components/Appointments";
import Doctor from "../components/Doctor";
import Report from "../components/Report";
import Prescriptions from "../components/Prescriptions";
import Messages from "../components/Messages";
import ProfileSettings from "../components/ProfileSettings";
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
    { label: "Overview", component: <Overview profile={profile} loading={loading} error={error} /> },
    { label: "My Appointments", component: <Appointments /> },
    { label: "Doctors", component: <Doctor/> },
    { label: "Reports", component: <Report/> },
    { label: "Prescriptions", component: <Prescriptions /> },
    { label: "Messages", component: <Messages /> },
    { label: "Profile Settings", component: <ProfileSettings /> }
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
        {navItems.find((item) => item.label === activeTab)?.component}
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;