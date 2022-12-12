import React, {useState} from 'react'
import { ethers } from 'ethers'
import { currency } from '../constant'
import toast from 'react-hot-toast';
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react'

function BuyTicketBox() {

    const {contract} = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);
    const [quantity, setQuantity] = useState<number>(1)
    const [userTickets, setUserTickets] = useState<number>(0)
    const { data: ticketPrice } = useContractRead(contract, "ticketPrice")
    const { data:ticketCommision } = useContractRead(contract, "ticketCommission")
    const { data: expiration } = useContractRead(contract, "expiration")
    const { data: remainingTickets } = useContractRead(contract, "RemainingTickets");
    const { mutateAsync: BuyTickets } = useContractWrite(contract, "BuyTickets")


    const handleClick = async () => {
        if(!ticketPrice) return;
    
        const notification = toast.loading("Buying your Tickets...");
        
        try {
          const data = await BuyTickets([{
            value: ethers.utils.parseEther((Number(ethers.utils.formatEther(ticketPrice)) * quantity).toString())
          }]);
          
          toast.success("Tickets purchased successfully!", {id: notification,});
    
          console.info("Contract Call Success", data)
        } catch (error) {
          toast.error("Whoops something went wrong!", {
            id: notification,
          });
    
          console.error("contract call failure", error)
        }
      }

  return (
    <div className="stats-container space-y-2">
              <div className='stats-container bg-[#bde0fe]'>
                <div className='flex justify-between items-center text-gray-600 pb-2'>
                  <h2>Price Per Ticket </h2>
                  <p>{ticketPrice && ethers.utils.formatEther(ticketPrice.toString())}{" "} {currency}</p>
                </div>

                <div className='flex text-gray-600 items-center space-x-2 bg-[#a2d2ff] shadow-lg p-4 rounded-sm'>
                  <p>TICKETS</p> 
                  <input className='flex w-full bg-transparent text-right outline-none' 
                  type="number" 
                  max={10} 
                  min={1} 
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>

                <div className='space-y-2 mt-5'>
                  <div className='flex items-center justify-between text-gray-600 text-sm italic font-extrabold'>
                    <p>Total Cost of tickets</p>
                    <p>{ticketPrice && Number(ethers.utils.formatEther(ticketPrice.toString())) * quantity}{" "} {currency}</p>
                  </div>
                  <div className='flex items-center justify-between text-gray-600 text-xs italic'>
                    <p>Service Fees</p>
                    <p>{ticketCommision && ethers.utils.formatEther(ticketCommision.toString())}{" "} {currency}</p>
                  </div>
                  <div className='flex items-center justify-between text-gray-600 text-xs italic'>
                    <p>+ Network Fees</p>
                    <p>TBC</p>
                  </div>

                  <button 
                  disabled={expiration?.toString() < Date.now().toString() || remainingTickets?.toNumber() === 0}
                  onClick={handleClick}
                  className='mt-5 w-full font-semibold bg-[#a2d2ff] hover:bg-emerald-500/50 px-10 py-5 rounded-md text-gray-600 shadow-xl disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed'>
                    Buy {quantity} Tickets for { ticketPrice && Number(ethers.utils.formatEther(ticketPrice.toString())) * quantity} {""} {currency}
                  </button>
                </div>

              </div>
              
              {userTickets > 0 && (
                  <div className='stats'>
                    <p className='mb-2 text-lg'>you have {userTickets} Tickets in this draw</p>
                    <div className='flex max-w-sm flex-wrap gap-x-2 gap-y-2 '>
                      {Array(userTickets).fill("").map((_, index) => (
                        <p className='text-gray-800 h-12 w-12 bg-emerald-500/30 rounded-lg flex flex-shrink-0 items-center justify-center text-xs italic' key={index}>{index + 1}</p>
                      ))}
                    </div>
                  </div>
                )}
            </div>
  )
}

export default BuyTicketBox