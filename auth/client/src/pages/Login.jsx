import React, { useState, useContext } from 'react'
import authlogo from '../assets/authlogo.png';
import { useNavigate } from 'react-router-dom';
import {AppContent} from '../context/AppContext'
import axios from 'axios'
import {toast} from 'react-toastify'


function Login() {
  const navigate=useNavigate()
  const{backendUrl,setIsLoggedin}=useContext(AppContent)

  const [state,setState] = useState('Sign Up')
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const onSubmitHandler=async (e)=>{
    try{
        e.preventDefault();
        axios.defaults.withCredentials=true

        if(state=='Sign Up'){
          const {data} =await axios.post(backendUrl+'/api/auth/register',{name,email,password})
          if(data.success){
            toast.success(data.message)  
            setIsLoggedin(true)
            navigate('/EmailVerify')
          }else{
            toast.error(data.message)
          }
        }else{
           const {data} =await axios.post(backendUrl+'/api/auth/login',{email,password})
          if(data.success){
            setIsLoggedin(true)
           window.location.href = 'http://localhost:5174'
          }else{
            toast.error(data.message)
          }

        }
    }catch(error){
    console.log(error);   // ← check F12 console for this
    toast.error(error.response?.data?.message || error.message || "Something went wrong");
}
  }
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-[linear-gradient(to_top_right,#151817_0%,#2C322E_38%,#424942_68%,#596258_100%)]'>
      <h1
        onClick={() => navigate('/Home')}
        className="absolute left-8 sm:left-20 top-8 text-white text-[2.4rem] tracking-tight font-medium cursor-pointer"
      >
        CLØSET AI
      </h1>
   <div className='big-slate-900 p-10 rounded-lg w-full sm:w-96 text-black-300 text-sm bg-[#353B36] border border-white/20 text-sm'>
    <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state==='Sign Up' ? 'Create Account': 'Login'}</h2>
    <p className='text-center text-sm text-white/60 mb-6'>{state==='Sign Up' ? 'Create Your Account': 'Login To Your Account'} </p>
    <form onSubmit={onSubmitHandler}>
      {state==='Sign Up' && ( <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-transparent border border-white/20'>
        <input onChange={e=> setName(e.target.value)} value={name}
         className='bg-transparent outline-none text-white placeholder:text-white/50 w-full' type="text" placeholder="Full Name" required/>
      </div>)}

       <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-transparent border border-white/20'>
        <input onChange={e=> setEmail(e.target.value)} value={email}
        className='bg-transparent outline-none text-white placeholder:text-white/50 w-full' type="email" placeholder="E-mail Id" required/>
      </div>
       <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-transparent border border-white/20'>
        <input onChange={e=> setPassword(e.target.value)} value={password} 
        className='bg-transparent outline-none text-white placeholder:text-white/50 w-full' type="password" placeholder="Password" required/>
      </div>
      <p onClick={()=>navigate('/ResetPassword')}className='mb-4 text-white/60 cursor-pointer hover:text-white transition-colors'>Forgot Password?</p>
      <button className='w-full py-2.5 rounded-full bg-[#F2F0EA] text-[#20231F] font-medium flex items-center justify-center gap-3'>
        {state}
        <span>→</span>
      </button>
   </form>
  {state === 'Sign Up' ? (
    <p className='text-white/60 text-center text-xs mt-4'>
      Already Have An Account?{' '}
      <span
        onClick={() => setState('Login')}
        className='text-white/70 cursor-pointer underline hover:text-white transition-colors'
      >
        Login Here!
      </span>
    </p>
  ) : (
    <p className='text-white/60 text-center text-xs mt-4'>
      Don't Have An Account?{' '}
      <span
        onClick={() => setState('Sign Up')}
        className='text-white/70 cursor-pointer underline'
      >
        Sign Up!
      </span>
    </p>
  )}
</div>
</div>

    
  )
}

export default Login