import React, { useState } from 'react';
import { doctors, specialityData } from '../assets/assets_frontend/assets';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaUserMd, FaHeartbeat } from 'react-icons/fa';

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
    <section className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-4 relative">
      <motion.h1 
        className="text-4xl font-bold text-blue-800 mb-6 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <FaHeartbeat className="text-red-500" /> GenoHospital - Patient Check-in
      </motion.h1>

      <motion.form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {['name', 'age', 'gender', 'contact', 'disease'].map((field, idx) => (
          <div className="mb-4" key={idx}>
            <label className="block font-semibold mb-1 capitalize">{field === 'contact' ? 'Contact Number' : field}</label>
            {field === 'gender' || field === 'disease' ? (
              <select
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="">Select</option>
                {field === 'gender'
                  ? ['Male', 'Female', 'Other'].map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))
                  : specialityData.flatMap((spec) => spec.diseases).map((disease, idx) => (
                      <option key={idx} value={disease}>{disease}</option>
                    ))}
              </select>
            ) : (
              <input
                type={field === 'age' ? 'number' : field === 'contact' ? 'tel' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            )}
          </div>
        ))}

        <motion.button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </motion.form>

      <AnimatePresence>
        {appointmentRequested && assignedDoctor && (
          <motion.div
            className="mt-8 bg-white p-6 rounded-xl shadow-xl w-full max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2 text-green-700">
              <FaCheckCircle className="text-2xl" />
              <h2 className="text-xl font-bold">Appointment Request Sent!</h2>
            </div>
            <p className="mb-1">Your appointment request has been sent to:</p>
            <p><strong>Name:</strong> {assignedDoctor.name}</p>
            <p><strong>Specialization:</strong> {assignedDoctor.speciality}</p>
            <p><strong>Address:</strong> {assignedDoctor.address.line1}, {assignedDoctor.address.line2}</p>
            <p className="mt-2 text-blue-700">You will be contacted soon for confirmation.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HospitalPage;
