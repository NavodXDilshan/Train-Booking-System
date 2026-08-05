import React from 'react'
import TrainForm from "@/components/admin/forms/trains";
import DepartureForm from "@/components/admin/forms/departures";
import StationForm from '@/components/admin/forms/stations';
import FareForm from '@/components/admin/forms/fares';
import TrainList from '@/components/admin/lists/trainlist';
import StationList from '@/components/admin/lists/stationlist';
import DepartureList from '@/components/admin/lists/departurelist';
import FareList from '@/components/admin/lists/farelist';
import Bookinglist from '@/components/admin/lists/bookinglist';

interface ContentProps{
    select:string;
}
const content:React.FC<ContentProps> = ({select}) => {
  return (
    <div className='grid grid-cols-2 py-5'>
        <div className='grid col-span-1 w-full px-3'>
            {
                select==="trains"?(
                    <TrainForm />
                ):select==="departures"?(
                    <DepartureForm />
                ):select==="stations"?(
                    <StationForm />
                ):select==="fares"?(
                    <FareForm />
                ):(
                    <Bookinglist /> 
                )
            }
        </div>
        <div className='grid col-span-1 '>
            {
                select==="trains"?(
                    <TrainList />
                ):select==="stations"?(
                    <StationList />
                ):select==="departures"?(
                    <DepartureList />
                ):select==="fares"?(
                    <FareList />
                ):(
                    ''
                )
            }
        </div>
        
        {/* <TrainForm /> */}
    </div>
  )
}

export default content