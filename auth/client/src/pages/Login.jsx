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
            navigate('/Home')
          }else{
            toast.error(data.message)
          }
        }else{
           const {data} =await axios.post(backendUrl+'/api/auth/login',{email,password})
          if(data.success){
            setIsLoggedin(true)
            navigate('/Home')
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
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-100 to-blue-300'>
       <img onClick={()=>navigate('/Home')}src={authlogo} alt="authlogo" className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor pointer"/>
   <div className='big-slate-900 p-10 rounded-lg w-full sm:w-96 text-black-300 text-sm bg-[#B2BCC0] text-sm'>
    <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state==='Sign Up' ? 'Create Account': 'Login'}</h2>
    <p className='text-center text-sm mb-6'>{state==='Sign Up' ? 'Create Your Account': 'Login To Your Account'} </p>
    <form onSubmit={onSubmitHandler}>
      {state==='Sign Up' && ( <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#B2C9FF]'>
        <input onChange={e=> setName(e.target.value)} value={name}
         className='bg-transparent outline-none' type="text" placeholder="Full Name" required/>
      </div>)}

       <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#B2C9FF]'>
        <input onChange={e=> setEmail(e.target.value)} value={email}
        className='bg-transparent outline-none' type="email" placeholder="E-mail Id" required/>
      </div>
       <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#B2C9FF]'>
        <input onChange={e=> setPassword(e.target.value)} value={password} 
        className='bg-transparent outline-none' type="password" placeholder="Password" required/>
      </div>
      <p onClick={()=>navigate('/ResetPassword')}className='mb-4 text-blue-700 cursor-ponter'>Forgot Password?</p>
      <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 text-white font-medium'>{state}</button>
   </form>
  {state === 'Sign Up' ? (
    <p className='text-black text-center text-xs mt-4'>
      Already Have An Account?{' '}
      <span
        onClick={() => setState('Login')}
        className='text-blue-700 cursor-pointer underline'
      >
        Login Here!
      </span>
    </p>
  ) : (
    <p className='text-black text-center text-xs mt-4'>
      Don't Have An Account?{' '}
      <span
        onClick={() => setState('Sign Up')}
        className='text-blue-700 cursor-pointer underline'
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