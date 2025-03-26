import React, { useState } from 'react';
import { doctors, specialityData } from '../assets/assets_frontend/assets';
import { useNavigate } from 'react-router-dom';

const HospitalPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    disease: ''
  });
  const [assignedDoctor, setAssignedDoctor] = useState(null);
  const [appointmentRequested, setAppointmentRequested] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const matchedSpeciality = specialityData.find((speciality) =>
      speciality.diseases.includes(formData.disease)
    );

    if (!matchedSpeciality) return alert('No matching specialization found.');

    const availableDoctors = doctors.filter(
      (doc) =>
        doc.speciality === matchedSpeciality.speciality &&
        doc.isAvailable
    );

    if (availableDoctors.length === 0) {
      alert('No available doctors for this disease right now. Please try again later.');
      return;
    }

    const assigned = availableDoctors[Math.floor(Math.random() * availableDoctors.length)];
    setAssignedDoctor(assigned);
    setAppointmentRequested(true);
  };

  return (
    <section className="min-h-screen flex flex-col items-center bg-blue-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">GenoHospital - Patient Check-in</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg w-full max-w-xl">
        <div className="mb-4">
          <label className="block font-semibold mb-1">Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Age</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-2 border rounded">
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Contact Number</label>
          <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Disease</label>
          <select name="disease" value={formData.disease} onChange={handleChange} required className="w-full p-2 border rounded">
            <option value="">Select Disease</option>
            {specialityData.flatMap((spec) => spec.diseases).map((disease, idx) => (
              <option key={idx} value={disease}>{disease}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Submit</button>
      </form>

      {appointmentRequested && assignedDoctor && (
        <div className="mt-8 bg-white p-6 rounded shadow-md w-full max-w-xl">
          <h2 className="text-xl font-bold text-green-700 mb-2">Appointment Request Sent!</h2>
          <p>Your appointment request has been sent to:</p>
          <p><strong>Name:</strong> {assignedDoctor.name}</p>
          <p><strong>Specialization:</strong> {assignedDoctor.speciality}</p>
          <p><strong>Address:</strong> {assignedDoctor.address.line1}, {assignedDoctor.address.line2}</p>
          <p className="mt-2 text-blue-700">You will be contacted soon for confirmation.</p>
        </div>
      )}
    </section>
  );
};

export default HospitalPage;
