import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown } from 'iconsax-react'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-gradient-to-br from-white to-purple-200">
      <h1 className='text-8xl font-black text-purple-900'>Hello</h1>
      <h1 className='text-xl font-thin mb-12 text-purple-900 flex flex-row gap-2'>Click this button <ArrowDown className='animate-bounce' /> </h1>
      <Link href='/manage-event'>
        <button className=' button-primary'>
          Manage Event
        </button>
      </Link>
    </div>
  )
}

export default Home
