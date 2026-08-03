
import React from 'react'
import Table from '@/app/profiles/user/departures/page';
import Image from "next/image";

const page = () => {
  return (
    <div className='relative flex flex-col min-h-screen pb-[10px] px-[20px]'>
            <Image
              src="/bg.webp"          
              alt="Background"
              fill
              priority
              className="object-cover -z-10 blur-sm opacity-80"
              sizes="100vw"
            />
        <div className='sm:mt-2 mt-2'>
            <h2 className='sm:text-[40px] text-[20px] text-gray-100 font-bold text-center font-mono'>Train Ticket Reservation!</h2>
        </div>
        <div className='flex flex-row w-full items-center justify-center'>
            <Table />
        </div>
    </div>
  )
}

export default page