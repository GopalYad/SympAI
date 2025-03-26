import React from 'react'
import Home from './pages/Home'
import {Routes,Route} from 'react-router-dom'
import Doctor from './pages/Doctor'
import Header from './components/Header'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import SignupForm from './pages/SignUp'
import Login from './pages/Login'
import DoctorProfile from './pages/DoctorProfile'
import PatientDashboard from './pages/PatientDashboared'
import AppointmentForm from './components/AppointmentForm'  
import HospitalPage from './pages/Hospitalpage'
import QrScanner from './components/Qrscanner'; // adjust path if neede

const App = () => {
  return (
    <div>
    {/* <Home/> */}
    <Header />
    <Routes>
      <Route path='/' element ={<Home/>}/>
      <Route path='/Login' element ={<Login/>}/>
      <Route path='/doctors' element ={<Doctor/>}/>
      <Route path='/aboutus' element ={<About/>}/>
      <Route path='/signup' element ={<SignupForm/>}/>
      <Route path='/dashboard' element ={<Dashboard/>}/>
      <Route path="/doctor/:doctorId" element={<DoctorProfile />} />
      <Route path='/patient' element ={<PatientDashboard/>}/>
      <Route path='/appointment' element ={<AppointmentForm/>}/>
      <Route path='/hospital' element ={<HospitalPage/>}/>
      <Route path="/qr-scanner" element={<QrScanner />} />
      

      

    </Routes>
    </div>
  )
}

export default App
