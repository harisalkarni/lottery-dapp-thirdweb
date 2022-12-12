import React from 'react'
import NavButton from './NavButton'
import { Bars3BottomRightIcon } from '@heroicons/react/24/solid'
import { useAddress, useDisconnect} from '@thirdweb-dev/react';

function Header() {

    const address = useAddress();
    const disconnect = useDisconnect();

  return (
    <header className='grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5'>
        <div className='flex items-center space-x-2'>
            <img src='https://i.imgur.com/4h7mAu7.png' className='rounded-full h-20 w-20' alt='' />
       
            <div>
                <h1 className='text-lg text-gray-600 font-bold'>LETSDRAW LOTTERY</h1>
                <p className='text-xs text-gray-500 truncate'>User: {address?.substring(0,5)}...{address?.substring(address.length, address.length - 5)}</p>
            </div>
        </div>

        <div className='md:col-span-3 hidden md:flex items-center justify-center rounded-md'>
            <div className='bg-[#a2d2ff] p-4 space-x-2 shadow-md rounded-md'>
                <NavButton title='Buy Tickets' isActive />
                <NavButton onClick={disconnect} title='Logout' />
            </div>
        </div>

        <div className='flex flex-col ml-auto text-right'>
            <Bars3BottomRightIcon className='h-8 w-8 text-gray-600 cursor-pointer mx-auto' />
            <span className='md:hidden'>
                <NavButton onClick={disconnect} title='Logout' />
            </span>
        </div>
    </header>
  )
}

export default Header