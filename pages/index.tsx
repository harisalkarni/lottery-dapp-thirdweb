import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import {
  useContract,
  useMetamask,
  useDisconnect,
  useAddress,
  useContractMetadata,
} from '@thirdweb-dev/react'
import Login from '../components/Login'


const Home: NextPage = () => {

  const address = useAddress();
  const {contract, isLoading} = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);

  if(!address) return (<Login />)

  if(isLoading) return (
    <div>
      <div>
        <img src="https://i.imgur.com/4h7mAu7.png" alt="" />
        <h1>Loading The LETSDRAW</h1>
      </div>
    </div>
  )

  return (
    <div className="bg-[#091b18] min-h-screen flex flex-col">
      <Head>
        <title>Lottery Dapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
    </div>
  )
}

export default Home
