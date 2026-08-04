import React, { useEffect, useState } from 'react'
import { getStations } from "@/app/lib/stations";

interface Station {
  id: number;
  name: string;
  code: string;
  routeOrder: number;
}

const stationlist = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [station, setStation] = useState<Station[]>([]);
  const [message, setMessage] = useState<string>("");
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    getStations()
      .then((data: Station[]) => {
        if (!cancelled) setStation(data);
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

  const handleDelete=async(stationId:number)=>{
    if(!stationId)
      return;

    try{
      const response = await fetch(`${API}/station/${stationId}`, {
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
      alert("Station deleted successfully");
    } catch (error) {
      console.error("Train creation error:", error)
      setMessage("Something went wrong while deleting the train. Please try again.")
    }
  }
  
  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="font-mono text-lg font-bold text-black mb-5">Station List</h2>

      {station.map((station) => (
        <div key={station.id} className="shadow-md rounded-lg px-5 py-3 gap-3 
        hover:scale-105 transition-transform flex flex-row items-center justify-between">

          <div className='flex flex-col'>
            <h3 className="text-black font-mono font-bold">{station.name}</h3>
            <div className="flex flex-col gap-1">
              <p className="text-gray-500 font-mono">
                Station Id. {station.id} 
              </p>
              <p className="text-gray-500 font-mono">
                Station code {station.code} 
              </p>
              <p className="text-gray-500 font-mono">
                Station order no. {station.routeOrder} 
              </p>
            </div>
          </div>

          <button 
            type="button" 
            onClick={()=>handleDelete(station.id)}
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
  )
}

export default stationlist