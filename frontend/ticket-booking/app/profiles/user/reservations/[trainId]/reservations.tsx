"use client"

import React, { useEffect, useState } from "react"
import Menu from "@/app/components/dropdownmenu"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { useParams } from "next/navigation"
import { getDepartureById } from "@/app/lib/departureById"
import {getStations} from "@/app/lib/stations";
import FareBox from "@/app/components/fareBox";
import ReservationModal from "@/app/components/ReservationModal"
import CoachList from "@/app/components/CoachList"

interface Seat {
  id: number
  seatNumber: number
  type: string
}

interface Coach {
  id: number
  coachNumber: number
  type: string
  seatCount: number
  seats: Seat[]
}

interface Train {
  id: number
  name: string
  coaches: Coach[]
}

interface Departure {
  id: number;
  train: Train;
  departureTime: string;
  originOrder: number;
  destinationOrder: number;
  status: string;
  direction: string;
}

interface Passenger {
  name: string
  contact: string
  nic: string
}

interface ReservationForm {
  name: string
  contact: string
  nic: string
}

interface Station {
  id: number;
  name: string;
  code: string;
  routeOrder: number;
}

interface Booking{
  id:number;
  seatId:number;
  seatNumber:number;
  coachId:number;
  trainId:number;
  departureId:number;
  originOrder:number;
  destinationOrder:number;
  travelDate:string;
}

const seatKey = (coachId: number, seatId: number) => `${coachId}-${seatId}`

export default function Reservations() {
  const params = useParams() as { trainId: string }
  const { trainId } = params
  const [origin, setOrigin] = useState<number | null>(null)
  const [destination, setDestination] = useState<number | null>(null)
  const [departure, setDeparture] = useState<Departure | null>(null);
  const [station, setStation] = useState<Station[] | null>([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fare, setFare] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Record<string, Passenger>>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSeat, setSelectedSeat] = useState<{
    coachId: number
    seatId: number
    seatNumber: number
  } | null>(null)
  const [form, setForm] = useState<ReservationForm>({
    name: "",
    contact: "",
    nic: "",
  })
  const [qrValue, setQrValue] = useState<string>("")
  const [showQr, setShowQr] = useState(false)


  useEffect(() => {
    if (!trainId) return

    let cancelled = false
    setLoading(true)
    setError(null)

    getDepartureById(trainId)
      .then((data: Departure) => {
        if (!cancelled) setDeparture(data)
      })
      .catch((err) => {
        console.error(err)
        if (!cancelled) setError("Failed to load train details.")
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [trainId])

  useEffect(() => {
    
    let cancelled = false
    setLoading(true)
    setError(null)

      getStations()
      .then((data: Station[]) => {
        if (!cancelled) setStation(data)
      })
      .catch((err) => {
        console.error(err)
        if (!cancelled) setError("Failed to load station list")
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [trainId])

  const openModal = (coachId: number, seat: Seat) => {
    setSelectedSeat({ coachId, seatId: seat.id, seatNumber: seat.seatNumber })
    setForm({ name: "", contact: "", nic: "" })
    setQrValue("")
    setShowQr(false)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedSeat(null)
    setShowQr(false)
  }

  const handleSeatClick = (coachId: number, seat: Seat) => {
    const key = seatKey(coachId, seat.id)
    if (!reservations[key]) {
      openModal(coachId, seat)
    }

  }

  const parsingStationOrder=(stationId:number|null)=>{
     const order = station?.find(station=>station.id==stationId);
     return order?.routeOrder;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.contact || !form.nic || !selectedSeat || !origin || !destination) {
      alert("Please choose your journey points, select a seat and fill all fields");
      return;
    }
    
    const { coachId, seatId, seatNumber } = selectedSeat;

    const bookingData = {
      trainId,
      coachId,
      seatId,
      seatNumber,
      passengerName: form.name,
      passengerContact: form.contact,
      passengerNIC: form.nic,
      originOrder:parsingStationOrder(origin),
      destinationOrder:parsingStationOrder(destination),
      travelDate:departure?.departureTime,
      departureId:departure?.id,
      direction:departure?.direction,
    };

    try {
      const response = await fetch("http://localhost:8080/book/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert(`Booking failed: ${errorText || response.statusText}`);
        return;
      }

      const responseData = await response.json();
      const qrData = responseData['qrToken'];

      // // Only generate QR after successful response
      // const qrData = JSON.stringify({
      //   ...bookingData,
      //   timestamp: new Date().toISOString(),
      // });

      setQrValue(qrData);
      setShowQr(true);

      setReservations((prev) => ({
        ...prev,
        [seatKey(coachId, seatId)]: {
          name: "Passenger",
          contact:"xxx xxx xxxx" ,
          nic: "xxxx xxxx  xxxx",
        },
      }));
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong while booking. Please try again.");
    }
  };

  const handleSeatFiltering = async(departureId:number,travelDate:string,originOrder:number|null,destinationOrder:number|null)=>{
    if(!departureId||!travelDate||!originOrder||!destinationOrder){
      alert("Some data missing to initiate filtering");
      return;
    }
    setReservations({});
    const bookingRequest = {
      departureId:departureId,
      travelDate:travelDate,
      originOrder:parsingStationOrder(originOrder),
      destinationOrder:parsingStationOrder(destinationOrder),
      coachType:"RESERVED"
    }

     try {
      const response = await fetch("http://localhost:8080/book/departure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingRequest),
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert(`Seat filtering failed: ${errorText || response.statusText}`);
        return;
      }

      const responseData = await response.json();
      const filteredByIdAndDateAndOrders = responseData.filteredByIdAndDateAndOrders;
      const journeyFare = responseData.journeyFare;
      setFare(journeyFare);
 

      filteredByIdAndDateAndOrders.forEach((booking:Booking)=>{
        setReservations((prev)=>({
          ...prev,
          [seatKey(booking.coachId, booking.seatId)]:{
            name: form.name,
            contact: form.contact,
            nic: form.nic,
            
          }
        }))
      })
      // setReservations((prev) => ({
      //   ...prev,
      //   [seatKey(coachId, seatId)]: {
      //     name: form.name,
      //     contact: form.contact,
      //     nic: form.nic,
      //   },
      // }));
    } catch (error) {
      console.error("Seat filtering error:", error);
      alert("Something went wrong while filtering. Please try again.");
    }   
  }

  if (loading) {
    return <div className="p-4 text-black">Loading train details...</div>
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>
  }

  if (!departure) {
    return <div className="p-4 text-black">Departure not found.</div>
  }

  const train = departure.train;
  const options = station?.map((item,index)=>{
    return item.id;
  });

  const labels = station?.map((item,index)=>{
    return item.name;
  });

  return (
    <div className="p-4 w-3/4 items-center justify-center ">
      <h4 className="sm:text-[20px] text-[10px] font-medium text-black font-mono">
        Reservation — {train.name}
      </h4>

      {/* Endpoint selector */}
      <div className="flex flex-row gap-5 items-center mt-4">
        <Menu
          select={origin}
          setSelect={setOrigin}
          styleMenu="w-[260px] h-[40px] text-black font-mono"
          styleItem="w-[200px] font-mono"
          title="From"
          options={options}
          labels={labels}
          
        />
        <ArrowRightIcon className="w-5 h-5 text-black" />
        <Menu
          select={destination}
          setSelect={setDestination}
          styleMenu="w-[260px] h-[40px] text-black font-mono"
          styleItem="w-[200px] font-mono"
          title="To"
          options={options}
          labels={labels}
        />
        <div>
          <button 
            className="font-mono text-white font-bold bg-blue-400 px-5 py-2 rounded-md hover:bg-blue-300 cursor-pointer"
            type="button"
            onClick={()=>handleSeatFiltering(departure.id,departure.departureTime,origin,destination)}>
            Filter
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-6 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-green-500 rounded-sm" />
          <span className="text-green-500 font-medium font-mono">Unreserved</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-black rounded-sm" />
          <span className="text-black font-medium font-mono">Reserved</span>
        </div>
      </div>

      <div className="flex flex-row items-start justify-between  w-full">

        {/* Coaches */}
        <CoachList
          coaches={train.coaches}
          reservations={reservations}
          onSeatClick={handleSeatClick}
        />

        <div className="sticky">
          <FareBox fare={fare}/>
        </div>
      </div>

      {isModalOpen && selectedSeat && (
        <ReservationModal
          isOpen={isModalOpen}
          selectedSeat={selectedSeat}
          form={form}
          setForm={setForm}
          showQr={showQr}
          qrValue={qrValue}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}
