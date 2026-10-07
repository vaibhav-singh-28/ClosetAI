
import robo from '../assets/robo.jpg';
import { AppContent } from '../context/AppContext';
import React, { useContext } from 'react';

const Header = () => {
      const { userData } = useContext(AppContent);
  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
        <img src={robo} alt="robo" className="w-38 h-38 rounded-full mb-6"/>
        <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey {userData ? userData.name.split(' ')[0] : 'user'}</h1>
        <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to MERN_Auth</h2>
       <button className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'>Get Started</button>
    </div>
  )
}

export default Header