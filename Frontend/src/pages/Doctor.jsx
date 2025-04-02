import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Doctor = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/doctors')
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setDoctors(data.data);
          setFilteredDoctors(data.data);
        } else {
          console.error('Invalid API response:', data);
          setDoctors([]);
          setFilteredDoctors([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
        setDoctors([]);
        setFilteredDoctors([]);
      });
  }, []);

  useEffect(() => {
    setFilteredDoctors(
      doctors.filter((doc) => {
        const docSpecialization = (doc.specialization || '').toLowerCase().trim();
        const matchesSpecialization = selectedSpecialization
          ? docSpecialization === selectedSpecialization.toLowerCase().trim()
          : true;
        
        const docName = (doc.user?.name || '').toLowerCase();
        const matchesSearch = docName.includes(searchTerm.toLowerCase()) || 
                              docSpecialization.includes(searchTerm.toLowerCase());
        
        return matchesSpecialization && matchesSearch;
      })
    );
  }, [selectedSpecialization, searchTerm, doctors]);

  const handleSidebarClick = (specialization) => {
    setSelectedSpecialization(specialization);
    document.querySelector('.doctors-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDoctorClick = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex flex-col items-center justify-start py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-blue-900 text-center mb-8">Find Your Best Doctor</h1>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search doctors or specializations"
          className="w-full max-w-xl mx-auto outline-none bg-white text-gray-700 placeholder-gray-400 border border-blue-300 shadow-lg rounded-full px-4 py-2 mb-8"
        />

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/4 p-4 bg-white rounded-lg shadow-lg mb-6 lg:mb-0">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">Browse by Specialization</h2>
            <ul className="space-y-2">
              {["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map((specialization) => (
                <li key={specialization}>
                  <button
                    onClick={() => handleSidebarClick(specialization)}
                    className={`w-full text-left px-4 py-2 rounded-md ${selectedSpecialization.toLowerCase().trim() === specialization.toLowerCase().trim() ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"} hover:bg-blue-500 hover:text-white transition duration-300`}
                  >
                    {specialization}
                  </button>
                </li>
              ))}
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
                key={doc._id || index}
                onClick={() => handleDoctorClick(doc._id)}
                className="bg-white border border-blue-200 shadow-lg rounded-lg p-4 flex flex-col items-center transition duration-300 transform hover:scale-105 cursor-pointer"
              >
                <img
                  src={doc.image || ''}
                  alt={doc.user?.name || 'Doctor'}
                  className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-blue-200"
                />
                <h3 className="text-lg font-semibold text-blue-900">{doc.user?.name || 'Unknown Doctor'}</h3>
                <p className="text-sm text-blue-600">{doc.specialization || 'No Specialization Listed'}</p>
                <span className={`text-sm font-medium mt-2 ${doc.availability?.length ? 'text-green-500' : 'text-red-500'}`}>
                  {doc.availability?.length ? 'Available' : 'Unavailable'}
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
