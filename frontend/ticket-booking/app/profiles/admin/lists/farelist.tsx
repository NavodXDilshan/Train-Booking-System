import React, { useEffect, useState } from 'react'
import {getFares} from "@/app/lib/fare";

interface Fare {
  id: number;
  baseFare: number;
  farePerSegment: number;
  effectiveFrom:string;
  coachType:string;
}

const farelist = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [fares, setFares] = useState<Fare[]>([]);
    const [message, setMessage] = useState<string>("");
    const API = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
      let cancelled = false;
  
      setLoading(true);
      setError(null);
  
      getFares()
        .then((data: Fare[]) => {
          if (!cancelled) setFares(data);
        })
        .catch((err) => {
          console.error(err);
          if (!cancelled) setError("Failed to load departure details.");
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
  
      return () => {
        cancelled = true;
      };
    }, []);
  
    const handleDelete=async(fareId:number)=>{
      if(!fareId)
        return;
  
      try{
        const response = await fetch(`${API}/fare/${fareId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
  
        if (!response.ok) {
          const errorText = await response.text()
          setMessage(`Failed to delete fare: ${errorText || response.statusText}`)
          return
        }
        alert("Fare deleted successfully");
      } catch (error) {
        console.error("Train creation error:", error)
        setMessage("Something went wrong while deleting the fare. Please try again.")
      }
    }
    
    if (loading) return <div>Loading...</div>;
  
    if (error) return <div>{error}</div>;
  return (
    <div>
      <h2 className="font-mono text-lg font-bold text-black mb-5">Fare List</h2>

      {fares.map((fare) => (
        <div key={fare.id} className="shadow-md rounded-lg px-5 py-3 gap-3 
        hover:scale-105 transition-transform flex flex-row items-center justify-between">

          <div className='flex flex-col'>
            <h3 className="text-black font-mono font-bold">{fare.coachType}</h3>
            <div className="flex flex-col gap-1">
              <p className="text-gray-500 font-mono">
                Base Fare - {fare.baseFare} 
              </p>
              <p className="text-gray-500 font-mono">
                Fare per Segment - {fare.farePerSegment} 
              </p>
              <p className="text-gray-500 font-mono">
                Effective From - {fare.effectiveFrom} 
              </p>
            </div>
          </div>

          <button 
            type="button" 
            onClick={()=>handleDelete(fare.id)}
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

export default farelist