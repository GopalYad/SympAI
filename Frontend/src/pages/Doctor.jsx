import React, { useState, useEffect } from 'react';
import { doctors as initialDoctors } from '../assets/assets_frontend/assets';
import { useNavigate } from 'react-router-dom';

const Doctor = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [doctorsWithAvailability, setDoctorsWithAvailability] = useState([]);
  const navigate = useNavigate();

  // Function to randomly update availability
  const updateAvailability = () => {
    const updatedDoctors = initialDoctors.map(doc => ({
      ...doc,
      available: Math.random() > 0.5
    }));
    setDoctorsWithAvailability(updatedDoctors);
  };

  // Set availability and update it every 15 mins
  useEffect(() => {
    updateAvailability(); // Initial call
    const interval = setInterval(updateAvailability, 15 * 60 * 1000); // 15 mins

    return () => clearInterval(interval);
  }, []);

  // Filter logic based on specialization and search
  useEffect(() => {
    const filtered = doctorsWithAvailability.filter((doc) => {
      const docSpecialization = (doc.speciality || '').toString().toLowerCase().trim();
      const matchesSpecialization = selectedSpecialization
        ? docSpecialization === selectedSpecialization.toLowerCase().trim()
        : true;
      
      const docName = (doc.name || '').toString().toLowerCase();
      const matchesSearch = docName.includes(searchTerm.toLowerCase()) || 
                            docSpecialization.includes(searchTerm.toLowerCase());

      return matchesSpecialization && matchesSearch;
    });
    setFilteredDoctors(filtered);
  }, [selectedSpecialization, searchTerm, doctorsWithAvailability]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleSidebarClick = (specialization) => {
    setSelectedSpecialization(specialization);
    document.querySelector('.doctors-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDoctorClick = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
  };

  return (
    <section className="bg-gradient-to-br from-blue-60 to-blue-100 min-h-screen flex flex-col items-center justify-start py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-blue-900 text-center mb-8">Find Your Best Doctor</h1>

        <form onSubmit={handleSearch} className="flex w-full max-w-xl mx-auto items-center bg-white border border-blue-300 shadow-lg rounded-full px-4 py-2 mb-8">
          <svg className="text-blue-500 w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search doctors or specializations"
            className="w-full outline-none bg-white text-gray-700 placeholder-gray-400"
          />
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-blue-600 transition duration-300 ml-2">
            Search
          </button>
        </form>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/4 p-4 bg-white rounded-lg shadow-lg mb-6 lg:mb-0">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">Browse by Specialization</h2>
            <ul className="space-y-2">
              {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map(
                (specialization) => (
                  <li key={specialization}>
                    <button
                      onClick={() => handleSidebarClick(specialization)}
                      className={`w-full text-left px-4 py-2 rounded-md ${
                        selectedSpecialization.toLowerCase().trim() === specialization.toLowerCase().trim()
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700'
                      } hover:bg-blue-500 hover:text-white transition duration-300`}
                    >
                      {specialization}
                    </button>
                  </li>
                )
              )}
              <li>
                <button
                  onClick={() => handleSidebarClick('')}
                  className="w-full text-left px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white transition duration-300"
                >
                  Show All
                </button>
              </li>
            </ul>
          </div>

          <div className="w-full lg:w-3/4 doctors-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {filteredDoctors.map((doc, index) => (
              <div
                key={index}
                onClick={() => handleDoctorClick(doc._id)}
                className="bg-white border border-blue-200 shadow-lg rounded-lg p-4 flex flex-col items-center transition duration-300 transform hover:scale-105 cursor-pointer"
              >
                <img
                  src={doc.image || ''}
                  alt={doc.name || 'Doctor'}
                  className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-blue-200"
                />
                <h3 className="text-lg font-semibold text-blue-900">{doc.name || 'Unknown Doctor'}</h3>
                <p className="text-sm text-blue-600">{doc.speciality || 'No Specialization Listed'}</p>
                <span
                  className={`text-sm font-medium mt-2 ${
                    doc.available ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {doc.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctor;
