import React, { useEffect, useState } from 'react'
import { getDepartures } from "@/app/lib/departures";
import { metadata } from '../../../layout';


export interface Seat {
  id: number;
  seatNumber: number;
  type: string;
}

export interface Coach {
  id: number;
  coachNumber: number;
  type: string;
  seatCount: number;
  seats: Seat[];
}

export interface Train {
  id: number;
  name: string;
  coaches: Coach[];
}

export interface Departure {
  id: number;
  train: Train;
  departureTime: string;
  originOrder: number;
  destinationOrder: number;
  status: string;
}

const stationlist = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [departure, setDeparture] = useState<Departure[]>([]);
  const [message, setMessage] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedDeparture, setSelectedDeparture] = useState<Departure | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    getDepartures()
      .then((data: Departure[]) => {
        if (!cancelled) setDeparture(data);
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

  const handleDelete=async(departureId:number)=>{
    if(!departureId)
      return;

    try{
      const response = await fetch(`http://localhost:8080/departure/${departureId}`, {
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
      alert("Departure deleted successfully");
    } catch (error) {
      console.error("Train creation error:", error)
      setMessage("Something went wrong while deleting the train. Please try again.")
    }
  }

  const handleStatusUpdate = async () => {
    if (!selectedDeparture) return;

    try {
      const response = await fetch(
        `http://localhost:8080/departure/edit`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id:selectedDeparture.id,
            status: selectedStatus,
          }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        setMessage(text || "Failed to update status.");
        return;
      }

      setDeparture((prev) =>
        prev.map((d) =>
          d.id === selectedDeparture.id
            ? { ...d, status: selectedStatus }
            : d
        )
      );

      setOpenModal(false);
      setSelectedDeparture(null);
      setMessage("Status updated successfully.");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update status.");
    }
};
  
  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="font-mono text-lg font-bold text-black mb-5">Departure List</h2>

      {departure.map((dep) => (
        <div key={dep.id} className="shadow-md rounded-lg px-5 py-3 gap-3 
        hover:scale-105 transition-transform flex flex-row items-center justify-between">

          <div className='flex flex-col'>
            <h3 className="text-black font-mono font-bold">{dep.train.name}</h3>
            <div className="flex flex-col gap-1">
              <p className="text-gray-500 font-mono">
                Train {dep.train.id} 
              </p>
               <div className='flex flex-row gap-3'>
                 <p className="text-gray-500 font-mono">
                  Start {dep.originOrder} 
                               </p>
                 <p className="text-gray-500 font-mono">
                  End {dep.destinationOrder} 
                               </p>
               </div>
               <p className="text-gray-500 font-mono">
                Departure time - {dep.departureTime} 
              </p> 
               <div className='flex flex-row items-center justify-between'>
                 <p className="text-gray-500 font-mono">
                  Status - {dep.status} 
                  </p>

               </div> 
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <button
              type="button"
              onClick={()=>handleDelete(dep.id)}
              className="bg-red-500 px-5 py-3 rounded hover:bg-red-700 cursor-pointer font-bold font-mono">
              Delete
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedDeparture(dep);
                setSelectedStatus(dep.status);
                setOpenModal(true);
              }}
              className="bg-green-500 text-sm px-5 py-3 rounded hover:bg-green-600 text-white cursor-pointer font-bold font-mono"
            >
              Edit Status
            </button>
          </div>
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

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-mono text-black">
          <div className="w-96 rounded-xl bg-white shadow-xl p-6">

            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Edit Departure Status
            </h2>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="SCHEDULED">Scheduled</option>
              <option value="BOARDING">Boarding</option>
              <option value="DELAYED">Delayed</option>
              <option value="DEPARTED">Departed</option>
              <option value="ARRIVED">Arrived</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="rounded-lg bg-gray-200 px-5 py-2 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleStatusUpdate}
                className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default stationlist