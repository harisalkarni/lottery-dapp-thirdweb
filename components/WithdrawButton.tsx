import React from 'react'
import { ethers } from 'ethers'
import { currency } from '../constant'
import toast from 'react-hot-toast';
import { useContract, useContractRead, useContractWrite, useAddress } from '@thirdweb-dev/react'

function WithdrawButton() {

    const address = useAddress();
    const {contract} = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);
    const { data: winnings } = useContractRead(contract, "getWinningsForAddress", address)
    const { mutateAsync: WithdrawWinnings } = useContractWrite(contract, "WithdrawWinnings")

    const onWithdrawWinnings = async () => {
        const notification = toast.loading("Withdrawing winnings...")
    
        try {
          const data = await WithdrawWinnings([{}])
          
          toast.success("Withdraw is succeed!", {id: notification,});
        } catch (error) {
          toast.error("Whoops something went wrong!", {
            id: notification,
          });
    
          console.error("contract call failure", error)
        }
      }

  return (
    <div className='max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5'>
              <button onClick={onWithdrawWinnings} className='p-5 bg-gradient-to-b from-orange-500 to-emerald-600 animate-pulse text-center rounded-xl w-full'>
                <p className='font-bold'>Winner Winner Chicken Dinner</p>
                <p>Total Winnings : {ethers.utils.formatEther(winnings.toString())} {""} {currency}</p>
                <br />
                <p className='font-bold'>Click here to Withdraw</p>
              </button>
    </div>
  )
}

export default WithdrawButton