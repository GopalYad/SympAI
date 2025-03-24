import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctors } from '../assets/assets_frontend/assets'; // Your existing doctors list

const AppointmentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    doctorId: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDoctor = doctors.find((doc) => doc._id === formData.doctorId);
    if (!selectedDoctor) {
      setMessage('Please select a valid doctor.');
      return;
    }

    // Simulated API call or email/notification
    console.log(`Sending appointment request to Dr. ${selectedDoctor.name}`);
    console.log('Appointment Details:', formData);

    setMessage(`Appointment request sent to Dr. ${selectedDoctor.name}. You will be notified upon confirmation.`);
    setFormData({ name: '', email: '', date: '', time: '', doctorId: '' });
  };

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Book an Appointment</h2>

        <label className="block mb-2 font-semibold">Your Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block mb-2 font-semibold">Choose Doctor</label>
        <select
          name="doctorId"
          value={formData.doctorId}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        >
          <option value="">-- Select a Doctor --</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              Dr. {doc.name} - {doc.speciality}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-semibold">Preferred Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block mb-2 font-semibold">Preferred Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Submit Request
        </button>

        {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
      </form>
    </div>
  );
};

export default AppointmentForm;
