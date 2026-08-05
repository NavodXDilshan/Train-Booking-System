"use client";

import React, { useEffect, useState } from "react";
import { getTrains } from "@/lib/trains";

interface Seat {
  id: number;
  seatNumber: number;
  type: string;
}

interface Coach {
  id: number;
  coachNumber: number;
  type: string;
  seatCount: number;
  seats: Seat[];
}

interface Train {
  id: number;
  name: string;
  coaches: Coach[];
}

const TrainList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trains, setTrains] = useState<Train[]>([]);
  const [message, setMessage] = useState<string>("");
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    getTrains()
      .then((data: Train[]) => {
        if (!cancelled) setTrains(data);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setError("Failed to load train details.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete=async(trainId:number)=>{
    if(!trainId)
      return;

    try{
      const response = await fetch(`${API}/train/${trainId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        setMessage(`Failed to delete train: ${errorText || response.statusText}`)
        return
      }
      alert("Train deleted successfully");
    } catch (error) {
      console.error("Train creation error:", error)
      setMessage("Something went wrong while deleting the train. Please try again.")
    }
  }
  
  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="font-mono text-lg font-bold text-black mb-5">Train List</h2>

      {trains.map((train) => (
        <div key={train.id} className="shadow-md rounded-lg px-5 py-3 gap-3 
        hover:scale-105 transition-transform flex flex-row items-center justify-between">
          <div>
            <h3 className="text-black font-mono font-bold">{train.name}</h3>
            {train.coaches.map((coach) => (
              <div key={coach.id} className="flex flex-row gap-8">
                <p className="text-gray-500 font-mono">
                  Coach {coach.coachNumber} ({coach.type})
                </p>
                <p className="text-gray-500 font-mono">Seats: {coach.seats.length}</p>
              </div>
            ))}
          </div>

          <button 
            type="button" 
            onClick={()=>handleDelete(train.id)}
            className="bg-red-500 px-5 py-3 rounded hover:bg-red-700 cursor-pointer font-bold font-mono">
            Delete
          </button>
        </div>
      ))}
        {message && (
        <p
          className={`text-sm ${
            message.startsWith("Train created") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default TrainList;