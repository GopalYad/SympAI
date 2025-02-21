import React from "react";
import { Card,CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { FaCalendarAlt, FaUserInjured, FaClinicMedical, FaVideo } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Doct.</h2>
        <nav className="space-y-4">
          <a href="#" className="block p-2 bg-black text-white rounded-lg">Overview</a>
          <a href="#" className="block p-2 text-gray-700">Appointment</a>
          <a href="#" className="block p-2 text-gray-700">My Patients</a>
          <a href="#" className="block p-2 text-gray-700">Schedule Timings</a>
          <a href="#" className="block p-2 text-gray-700">Payments</a>
          <a href="#" className="block p-2 text-gray-700">Message</a>
          <a href="#" className="block p-2 text-gray-700">Blog</a>
          <a href="#" className="block p-2 text-gray-700">Settings</a>
        </nav>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search Appointment, Patient or etc"
            className="p-2 border border-gray-300 rounded-md w-1/3"
          />
          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-500">❓</button>
            <button className="text-gray-500">🔔</button>
            <div className="flex items-center space-x-2">
              <img src="/profile.jpg" alt="Profile" className="w-8 h-8 rounded-full" />
              <div>
                <p className="font-semibold">Stephen Conley</p>
                <p className="text-sm text-gray-500">Cardiologist</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 md:p-8">
          {/* Grid layout for the top statistics cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Appointments Card */}
            <Card className="bg-purple-500 text-white p-4">
              <CardContent>
                <div className="flex items-center justify-between">
                  <FaCalendarAlt size={24} />
                  <span className="text-2xl font-bold">24.4k</span>
                </div>
                <p>Appointments</p>
              </CardContent>
            </Card>
            
            {/* Total Patients Card */}
            <Card className="bg-red-500 text-white p-4">
              <CardContent>
                <div className="flex items-center justify-between">
                  <FaUserInjured size={24} />
                  <span className="text-2xl font-bold">166.3k</span>
                </div>
                <p>Total Patients</p>
              </CardContent>
            </Card>
            
            {/* Clinic Consulting Card */}
            <Card className="bg-yellow-500 text-white p-4">
              <CardContent>
                <div className="flex items-center justify-between">
                  <FaClinicMedical size={24} />
                  <span className="text-2xl font-bold">53.5k</span>
                </div>
                <p>Clinic Consulting</p>
              </CardContent>
            </Card>
            
            {/* Video Consulting Card */}
            <Card className="bg-blue-500 text-white p-4">
              <CardContent>
                <div className="flex items-center justify-between">
                  <FaVideo size={24} />
                  <span className="text-2xl font-bold">28.0k</span>
                </div>
                <p>Video Consulting</p>
              </CardContent>
            </Card>
          </div>

          {/* Section for today's appointments */}
          <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Today's Appointments</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span>Jhon Smith</span>
                <span className="text-green-600">Ongoing</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span>Frank Murray</span>
                <span>10:25</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span>Ella Lucia</span>
                <span>11:30</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span>Alyssa Dehn</span>
                <span>12:20</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
