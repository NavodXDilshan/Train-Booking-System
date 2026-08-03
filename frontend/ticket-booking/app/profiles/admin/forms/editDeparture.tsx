import React, { useState } from 'react'

interface DepartureFormData {
  trainId: number
  departureTime: string
  originOrder: number
  destinationOrder: number
  direction: string
  status: string
}

interface Station {
  id: number;
  name: string;
  code: string;
  routeOrder: number;
}

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

const DIRECTIONS = ["NORMAL", "REVERSE"]
const STATUSES = ["SCHEDULED", "DELAYED", "CANCELLED", "COMPLETED"]

const editDeparture = () => {
  const [trainId, setTrainId] = useState<string>('')
  const [departureTime, setDepartureTime] = useState("")
  const [originStationId, setOriginStationId] = useState<string>('')
  const [destinationStationId, setDestinationStationId] = useState<string>('')
  const [direction, setDirection] = useState(DIRECTIONS[0])
  const [status, setStatus] = useState(STATUSES[0])
  const [stationsLoading, setStationsLoading] = useState(true)
  const [trainsLoading, setTrainsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stations, setStations] = useState<Station[]>([])
  const [trains, setTrains] = useState<Train[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const getStationRouteOrder = (id: string): number | null => {
    const found = stations.find((s) => String(s.id) === id)
    return found ? found.routeOrder : null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (!trainId || !departureTime || !originStationId || !destinationStationId) {
      alert("Please select a train, both stations, and a departure date/time")
      return
    }

    if (originStationId === destinationStationId) {
      alert("Origin and destination cannot be the same station")
      return
    }

    const origin = getStationRouteOrder(originStationId)
    const destination = getStationRouteOrder(destinationStationId)

    if (origin === null || destination === null) {
      alert("Station IDs not found")
      return
    }

    const normalizedDepartureTime =
      departureTime.length === 16 ? `${departureTime}:00` : departureTime

    const departureData: DepartureFormData = {
      trainId: parseInt(trainId, 10),
      departureTime: normalizedDepartureTime,
      originOrder: origin,
      destinationOrder: destination,
      direction,
      status,
    }

    setSubmitting(true)
    try {
      const response = await fetch("http://localhost:8080/departure/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(departureData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        setMessage(`Failed to create departure: ${errorText || response.statusText}`)
        return
      }

      setMessage("Departure created successfully!")
      setTrainId('')
      setDepartureTime("")
      setOriginStationId('')
      setDestinationStationId('')
      setDirection(DIRECTIONS[0])
      setStatus(STATUSES[0])
    } catch (error) {
      console.error("Departure creation error:", error)
      setMessage("Something went wrong while creating the departure. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-fit w-full mx-auto p-6 bg-white border border-gray-300 rounded-xl shadow-sm space-y-6"
    >
      <h2 className="text-lg font-semibold text-black font-mono">Create Departure</h2>

      {error && <p className="text-sm text-red-600 font-mono">{error}</p>}

      <div>
        <label className="block text-sm font-medium mb-1 text-black font-mono">Train Name</label>
        <select
          required
          value={trainId}
          onChange={(e) => setTrainId(e.target.value)}
          disabled={loading}
          className="font-mono w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black text-black disabled:bg-gray-100"
        >
          <option value="" disabled>
            {trainsLoading ? "Loading trains..." : "Select a train"}
          </option>
          {trains.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-black font-mono">Departure Date & Time</label>
        <input
          type="datetime-local"
          required
          value={departureTime}
          onChange={(e) => setDepartureTime(e.target.value)}
          className="w-full border font-mono border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black text-black"
        />
      </div>

      <div className="flex flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-black font-mono">Start</label>
          <select
            required
            value={originStationId}
            onChange={(e) => setOriginStationId(e.target.value)}
            disabled={loading}
            className="font-mono w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black text-black disabled:bg-gray-100"
          >
            <option value="" disabled>
              {stationsLoading ? "Loading stations..." : "Select origin"}
            </option>
            {stations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-black font-mono">End</label>
          <select
            required
            value={destinationStationId}
            onChange={(e) => setDestinationStationId(e.target.value)}
            disabled={loading}
            className="font-mono w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black text-black disabled:bg-gray-100"
          >
            <option value="" disabled>
              {stationsLoading ? "Loading stations..." : "Select destination"}
            </option>
            {stations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-black font-mono">Direction</label>
          <select
            required
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="font-mono w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black text-black"
          >
            {DIRECTIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-black font-mono">Status</label>
          <select
            required
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="font-mono w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black text-black"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {message && (
        <p
          className={`text-sm font-mono ${
            message.startsWith("Departure created") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || loading}
        className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Creating..." : "Create Departure"}
      </button>
    </form>
  )
}

export default editDeparture