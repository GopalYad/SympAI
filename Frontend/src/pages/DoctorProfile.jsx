import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DoctorProfile = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/doctors/${doctorId}`)
      .then(response => response.json())
      .then(data => {
        if (data.success && data.data) {
          setDoctor(data.data);
          generateAvailableSlots();
        } else {
          console.error('Doctor not found:', data);
        }
      })
      .catch(error => console.error('Error fetching doctor:', error));
  }, [doctorId]);

  const generateAvailableSlots = () => {
    const today = new Date();
    const dates = [];
    const times = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }));
    }

    for (let hour = 9; hour <= 17; hour++) {
      for (let minute of [0, 30]) {
        const time = new Date();
        time.setHours(hour, minute, 0, 0);
        times.push(time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      }
    }

    setAvailableDates(dates);
    setAvailableTimes(times);
    setSelectedDate(dates[0]);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleAppointmentBooking = () => {
    if (!selectedTime) {
      alert('Please select a time slot before booking.');
      return;
    }
    if (doctor) {
      alert(`Appointment booked with ${doctor.name} on ${selectedDate} at ${selectedTime}.`);
    }
  };

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-2 text-lg font-semibold text-blue-800">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10">
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 md:w-1/3 mb-6 md:mb-0">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-auto object-cover rounded-xl border-2 border-blue-200 shadow-md"
              />
            </div>

            <div className="flex-grow md:ml-6">
              <h1 className="text-3xl font-extrabold text-blue-900 flex items-center">
                {doctor.name}
                <span className="ml-2 text-green-500 text-lg font-bold">✔</span>
              </h1>
              <p className="text-blue-600 text-lg mt-2">
                {doctor.degree} - {doctor.specialization} <span className="text-gray-500">({doctor.experience} years)</span>
              </p>
              <h2 className="text-blue-800 font-bold text-xl mt-4">About</h2>
              <p className="text-gray-700 text-base mt-2">{doctor.bio}</p>
              <p className="text-blue-800 font-bold text-xl mt-4">
                Appointment fee: <span className="text-blue-500">${doctor.fee}</span>
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Booking slots</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {availableDates.map((date) => (
                <button
                  key={date}
                  onClick={() => handleDateClick(date)}
                  className={`px-4 py-2 rounded-full border-2 ${
                    selectedDate === date
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-blue-700 border-blue-300'
                  } hover:bg-blue-500 hover:text-white transition duration-300`}
                >
                  {date}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeClick(time)}
                  className={`px-4 py-2 rounded-full border-2 ${
                    selectedTime === time
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-blue-700 border-blue-300'
                  } hover:bg-blue-500 hover:text-white transition duration-300`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleAppointmentBooking}
              className="bg-blue-500 text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-blue-600 transition duration-300"
            >
              Book an appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;