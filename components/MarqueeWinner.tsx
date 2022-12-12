import React from 'react'
import Marquee from "react-fast-marquee";
import { useContract, useContractRead } from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import { currency } from '../constant'

function MarqueeWinner() {

    const {contract} = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);
    const { data: lastWinner } = useContractRead(contract, "lastWinner")
    const { data: lastWinnerAmount } = useContractRead(contract, "lastWinnerAmount")


  return (
    <Marquee className='bg-[#a2d2ff] p-5 mb-5' gradient={false} speed={100}>
            <div className='flex space-x-2 mx-10'>
              <h4 className='text-gray-600 font-bold mr-12'>Last Winner : {lastWinner?.toString()}</h4>
              <h4 className='text-gray-600 font-bold'>Previous Winnings: {""}{lastWinnerAmount && ethers.utils.formatEther(lastWinnerAmount?.toString())} {""} {currency}</h4>
            </div>
    </Marquee>
  )
}

export default MarqueeWinner