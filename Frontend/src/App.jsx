import React from 'react'
import Home from './pages/Home'
import {Routes,Route} from 'react-router-dom'
import Doctor from './pages/Doctor'
import Header from './components/Header'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import SignupForm from './pages/SignUp'
import Login from './pages/Login'
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

    </Routes>
    </div>
  )
}

export default App
