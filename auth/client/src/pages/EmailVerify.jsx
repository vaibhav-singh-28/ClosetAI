import React, { useContext, useEffect } from 'react'
import authlogo from '../assets/authlogo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContent } from '../context/AppContext';

const EmailVerify = () => {

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContent)

  const inputRefs = React.useRef([])


  useEffect(() => {
    if (isLoggedin && userData && userData.isAccountVerified) {
      navigate('/Home')
    }
  }, [isLoggedin, userData])

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    })
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(input => input.value)
      const otp = otpArray.join('')

      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp })
      if (data.success) {
        toast.success(data.message)
        getUserData()
        navigate('/Home')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300'>
      <img
        onClick={() => navigate('/Home')}
        src={authlogo}
        alt="authlogo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>E-mail Verification OTP</h1>
        <p className='text-center mb-6 text-blue-300'>Enter the 6-digit code sent to your email id</p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input
              type='text'
              maxLength='1'
              key={index}
              required
              ref={e => (inputRefs.current[index] = e)}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
            />
          ))}
        </div>
        <button className='w-full py-3 bg-gradient-to-r from-blue-300 to-blue-900 text-white rounded-full'>
          Verify email
        </button>
      </form>
    </div>
  )
}

export default EmailVerify