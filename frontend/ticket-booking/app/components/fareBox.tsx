import React from 'react'
import FareBox from '@/app/components/fareBox';

interface FareProps{
    fare:string|null;
}
const fareBox:React.FC<FareProps> = ({fare}) => {
  return (
    <div className='shadow-md px-5 py-3 rounded-md space-y-5 '>
        <p className='text-black font-medium font-sans'>Fare for the journey</p>
        {
            fare? (
                <p className='text-black font-black font-mono'>LKR <span
                className='text-5xl'>{fare}</span></p>
            ):(
                <p className='text-black font-black '>-</p>
            )
        }
    </div>
  )
}

export default fareBox