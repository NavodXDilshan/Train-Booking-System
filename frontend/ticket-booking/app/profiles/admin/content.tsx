import React from 'react'
import TrainForm from "@/app/profiles/admin/forms/trains";
import DepartureForm from "@/app/profiles/admin/forms/departures";
import StationForm from '@/app/profiles/admin/forms/stations';
import FareForm from '@/app/profiles/admin/forms/fares';
import TrainList from '@/app/profiles/admin/lists/trainlist';
import StationList from '@/app/profiles/admin/lists/stationlist';
import DepartureList from '@/app/profiles/admin/lists/departurelist';
import FareList from '@/app/profiles/admin/lists/farelist';
import Bookinglist from '@/app/profiles/admin/lists/bookinglist';

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