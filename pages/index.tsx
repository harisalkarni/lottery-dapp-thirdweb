import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import {
  useContract,
  useContractRead,
  useAddress,
} from '@thirdweb-dev/react'
import Login from '../components/Login'
import Loading from '../components/Loading'
import AdminControls from '../components/AdminControls'
import MarqueeWinner from '../components/MarqueeWinner'
import WithdrawButton from '../components/WithdrawButton'
import DrawBox from '../components/DrawBox'
import BuyTicketBox from '../components/BuyTicketBox'



const Home: NextPage = () => {

  const address = useAddress();
  const {contract, isLoading} = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);
  const { data: winnings } = useContractRead(contract, "getWinningsForAddress", address);
  const { data: isLotteryOperator } = useContractRead(contract, "lotteryOperator");
  
  if(isLoading) return <Loading />;
  if(!address) return <Login />;


  // useEffect(() => {
  //   if(!tickets) return;

  //   const totalTickets: string[] = tickets;

  //   const noOfUserTickets = totalTickets.reduce((total, ticketAddress) => (
  //     ticketAddress === address ? total + 1 : total
  //   ), 0);
  //     setUserTickets(noOfUserTickets);
  // }, [tickets, address]);


  return (
    <div className="bg-[#bde0fe] min-h-screen flex flex-col">
      <Head>
        <title>Lottery Dapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex-1'>
          <Header />
          
          <MarqueeWinner />

          {isLotteryOperator === address && (
            <div className='flex justify-center'>
              <AdminControls />
            </div>
          )}

          {winnings > 0 && (
            <WithdrawButton />
          )}

          {/* The Next Draw Box*/}
          <div className='space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5'>
            <DrawBox />

             {/* The Price per ticket Box*/}
             <BuyTicketBox />

          </div>

          {/* Footer */}

      </div>
      
    </div>
  )
}

export default Home
