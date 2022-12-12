import React from 'react'
import { ethers } from 'ethers'
import { currency } from '../constant'
import { useContract, useContractRead } from '@thirdweb-dev/react'
import CountdownTimer from '../components/CountdownTimer'

function DrawBox() {

  const {contract} = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);
  const { data: remainingTickets } = useContractRead(contract, "RemainingTickets");
  const { data: currentWinningReward } = useContractRead(contract, "CurrentWinningReward")

  return (
    <div className='stats-container'>
              <h1 className='text-5xl text-gray-600 font-semibold text-center mb-4'>The Next Draw</h1>
              <div className='flex justify-between p-2 space-x-2'>
                <div className='stats'>
                  <h2 className='text-sm'>Total Pool</h2>
                  <p className='text-xl'>{currentWinningReward && ethers.utils.formatEther(currentWinningReward.toString())}{" "} {currency}</p>
                </div>
                <div className="stats">
                  <h2 className='text-sm'>Tickets Remaining</h2>
                  <p className='text-xl'>{remainingTickets?.toNumber()}</p>
                </div>
              </div>

              {/* Countdown timer */}
              <div className='mt-5 mb-3'>
                <CountdownTimer />
              </div>
    </div>
  )
}

export default DrawBox