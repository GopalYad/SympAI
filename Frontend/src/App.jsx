import React from 'react'
import Home from './pages/Home'
import {Routes,Route} from 'react-router-dom'
import Doctor from './pages/Doctor'
import Header from './components/Header'
import About from './pages/About'
const App = () => {
  return (
    <div>
    {/* <Home/> */}
    <Header />
    <Routes>
      <Route path='/' element ={<Home/>}/>
      <Route path='/doctors' element ={<Doctor/>}/>
      <Route path='/aboutus' element ={<About/>}/>

    </Routes>
    </div>
  )
}

export default App
