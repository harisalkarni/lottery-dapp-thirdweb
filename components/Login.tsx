import React from 'react'
import { useMetamask } from "@thirdweb-dev/react";

function Login() {

    const connectWithMetamask = useMetamask();


  return (
    <div className="bg-[#bde0fe] min-h-screen flex flex-col items-center justify-center text-center" >
        <div className='flex flex-col items-center mb-10'>
            <img src='https://rahhaus.id/wp-content/uploads/2022/12/logo-lottery.png' className='rounded-full h-56 w-56 mb-10' alt='' />
            <h1 className='text-6xl text-gray-600 font-bold mb-5'>THE LETSDRAW LOTTERY</h1>
            <h2 className='text-gray-600'>Get Started By Logging in with your Metamask</h2>
            <button onClick={connectWithMetamask} className='bg-white text-gray-600 px-8 py-5 mt-5 rounded-lg shadow-lg font-bold hover:bg-emerald-500/50' >Login with Metamask</button>
        </div>
    </div>
  )
}

export default Login 