import React from 'react'

const schedule = () => {
  return (
            <div>
                <h4 className='sm:text-[20px] text-[10px] font-medium text-black'>Time Table</h4>
                <div className='grid grid-cols-5'>
                    <div>
                        <p className='text-black text-md font-bold text-center'>From</p>
                    </div>
                    <div>
                        <p className='text-black text-md font-bold text-center'>To</p>
                    </div>
                    <div>
                        <p className='text-black text-md font-bold text-center'>Departure Time</p>
                    </div>
                    <div>
                        <p className='text-black text-md font-bold text-center'>Train Name</p>
                    </div>
                    <div>
                        <p className='text-black text-md font-bold text-center'>Status</p>
                    </div>
                </div>
                <div className='grid grid-cols-5'>
                    <div>
                        <p>From</p>
                    </div>
                    <div>
                        <p>To</p>
                    </div>
                    <div>
                        <p>Departure Time</p>
                    </div>
                    <div>
                        <p>Train Name</p>
                    </div>
                    <div>
                        <p>Status</p>
                    </div>
                </div>
            </div>
  )
}

export default schedule