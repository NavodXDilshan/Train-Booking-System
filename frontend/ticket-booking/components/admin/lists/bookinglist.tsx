import React, { useEffect, useState } from 'react'
import {getBookings} from "@/lib/bookings";

type Direction = "FORWARD" | "REVERSE";

interface Booking {
  id: number;
  seatId: number;
  seatNumber: number;
  coachId: number;
  trainId: number;
  departureId: number;
  passengerName: string;
  passengerContact: string;
  passengerNIC: string;
  originOrder: number;
  destinationOrder: number;
  fareAmount: number;
  createdAt: string;
  travelDate: string;
  verified: boolean;
  direction: Direction;
  journeyRange?: unknown;
}

const bookinglist = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        let cancelled = false;

        setLoading(true);
        setError(null);

        getBookings()
        .then((data: Booking[]) => {
            if (!cancelled) setBookings(data);
        })
        .catch((err) => {
            console.error(err);
            if (!cancelled) setError("Failed to load booking details.");
        })
        .finally(() => {
            if (!cancelled) setLoading(false);
        });

        return () => {
        cancelled = true;
        };
    }, []);
  
    const calculateRevenue=()=>{
        let revenue = 0;
        bookings.forEach(element => {
            revenue += element.fareAmount;
        });

        return revenue;
    }
    if (loading) return <div>Loading...</div>;

    if (error) return <div>{error}</div>;

    return (
    <div className="space-y-4 w-full font-mono">
        <div className="w-full mb-6 sticky top-0 z-50">
            <div className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 p-6 shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-blue-100 uppercase tracking-wide">
                            Total Revenue
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-white">
                            Rs. {calculateRevenue().toLocaleString()}
                        </h1>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                        <span className="text-3xl text-white">
                            💰
                        </span>
                    </div>
                </div>

                <div className="mt-4 border-t border-white/20 pt-3">
                    <p className="text-sm text-blue-100">
                        Revenue generated from {bookings.length} bookings
                    </p>
                </div>
            </div>
        </div>
        {bookings.map((item) => (
            <div
            key={item.id}
            className="w-full rounded-xl border border-gray-200 bg-white shadow-md p-5"
            >
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                Booking #{item.id}
                </h2>

                <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                    item.verified
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
                >
                {item.verified ? "Verified" : "Pending"}
                </span>
            </div>

            {/* Passenger */}
            <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Passenger
                </h3>

                <div className="space-y-1 text-gray-700">
                <p>
                    <span className="font-medium">Name:</span> {item.passengerName}
                </p>
                <p>
                    <span className="font-medium">Contact:</span>{" "}
                    {item.passengerContact}
                </p>
                <p>
                    <span className="font-medium">NIC:</span> {item.passengerNIC}
                </p>
                </div>
            </div>

            {/* Journey */}
            <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Journey
                </h3>

                <div className="grid grid-cols-2 gap-y-2 text-gray-700">
                <p>
                    <span className="font-medium">Train:</span> {item.trainId}
                </p>

                <p>
                    <span className="font-medium">Coach:</span> {item.coachId}
                </p>

                <p>
                    <span className="font-medium">Seat:</span> {item.seatNumber}
                </p>

                <p>
                    <span className="font-medium">Departure:</span> {item.departureId}
                </p>

                <p>
                    <span className="font-medium">Origin:</span> {item.originOrder}
                </p>

                <p>
                    <span className="font-medium">Destination:</span>{" "}
                    {item.destinationOrder}
                </p>

                <p>
                    <span className="font-medium">Direction:</span> {item.direction}
                </p>

                <p>
                    <span className="font-medium">Fare:</span> Rs. {item.fareAmount}
                </p>
                </div>
            </div>

            {/* Dates */}
            <div className="border-t pt-3 text-sm text-gray-600 space-y-1">
                <p>
                <span className="font-medium">Travel Date:</span>{" "}
                {new Date(item.travelDate).toLocaleString()}
                </p>

                <p>
                <span className="font-medium">Booked On:</span>{" "}
                {new Date(item.createdAt).toLocaleString()}
                </p>
            </div>
            </div>
        ))}
    </div>
    )
}

export default bookinglist