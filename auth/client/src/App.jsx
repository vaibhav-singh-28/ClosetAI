import React from 'react'
import {Routes,Route, BrowserRouter}from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import EmailVerify from './pages/EmailVerify'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

const App = () => {
  return (
    <div>
    <ToastContainer/>
      <Routes>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/ResetPassword' element={<ResetPassword/>}/>
        <Route path='/EmailVerify' element={<EmailVerify/>}/>
      </Routes>
     
    </div>
  )
}

export default App