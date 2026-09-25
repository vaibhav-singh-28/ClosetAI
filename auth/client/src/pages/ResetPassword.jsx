import React, { useState,  useContext } from 'react'
import authlogo from '../assets/authlogo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContent } from '../context/AppContext';

const ResetPassword = () => {

  const {backendUrl}=useContext(AppContent)
  axios.defaults.withCredentials=true
  const navigate = useNavigate();
  const [email,setEmail]=useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)

   const inputRefs = React.useRef([])


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

  const onSubmitEmail = async(e)=>{
    e.preventDefault();
    try{
      const{data}=await axios.post(backendUrl + '/api/auth/send-reset-otp', {email})
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && setIsEmailSent(true)
    }catch(error){
      toast.error(error.message)
    }
  }
  const onSubmitOTP=async(e)=>{
    e.preventDefault();
    const otpArray=inputRefs.current.map(e=>e.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmitted(true)
  }
  const onSubmitNewPassword=async(e)=>{
    e.preventDefault();
    try{
      const{data}=await axios.post(backendUrl + '/api/auth/reset-password', {email,otp,newPassword})
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && navigate('/login')
    }catch(error){
      toast.error(error.message)

    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-[linear-gradient(to_top_right,#151817_0%,#2C322E_38%,#424942_68%,#596258_100%)]'>
      <h1
        onClick={() => navigate('/Home')}
        className="absolute left-8 sm:left-20 top-8 text-white text-[2.4rem] tracking-tight font-medium cursor-pointer"
      >
        CLØSET AI
      </h1>
      {/* enter email-id */}

      {!isEmailSent &&
      <form
        onSubmit={onSubmitEmail}
        className='bg-[#202522]/70 backdrop-blur-sm border border-white/25 p-10 rounded-lg w-108 text-sm flex flex-col justify-center'
      >
       <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
       <p className='text-center mb-6 text-white/60'>Enter your registered e-mail id</p>
       <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-transparent border border-white/25'>
          <input
            type="email"
            placeholder='Email id'
            className='bg-transparent outline-none text-white placeholder:text-white/50 w-full'
            value={email}
            onChange={e=>setEmail(e.target.value)}
            required
          />
        </div>
       <button className='w-full py-2.5 bg-[#f5f3ec] text-black
        rounded-full mt-3'>Submit</button>
      </form>}

     {/*otp input form*/}
     {!isOtpSubmitted && isEmailSent &&
      <form onSubmit={onSubmitOTP} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
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
        <button className='w-full py-2.5 bg-gradient-to-r from-blue-300 to-blue-900 text-white rounded-full'>
          Submit
        </button>
      </form>}

      {/* enter new password*/}
      {isOtpSubmitted && isEmailSent &&
      <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
       <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
       <p className='text-center mb-6 text-blue-300'>Enter the new password</p>
       <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-blue-200'>
       <input type="password" placeholder='Password' className='bg-transparent outline-none text-gray'
       value={newPassword} onChange={e=>setNewPassword(e.target.value)} required/>
       </div>
       <button className='w-full py-2.5 bg-[#f5f3ec] text-black
        rounded-full mt-3'>Submit</button>
      </form>}

    </div>
  )
}

export default ResetPassword