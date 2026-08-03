"use client"

import React, { useState } from "react"

interface FareFormData {
  baseFare: number
  farePerSegment: number
  effectiveFrom: string
  coachType: string
}

const COACH_TYPES = ["RESERVED", "UNRESERVED"]

export default function FareForm() {
  const [baseFare, setBaseFare] = useState<string>("")
  const [farePerSegment, setFarePerSegment] = useState<string>("")
  const [effectiveFrom, setEffectiveFrom] = useState("")
  const [coachType, setCoachType] = useState(COACH_TYPES[0])

  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    const baseFareNum = parseFloat(baseFare)
    const farePerSegmentNum = parseFloat(farePerSegment)

    if (!effectiveFrom) {
      alert("Please select an effective-from date and time")
      return
    }
    if (Number.isNaN(baseFareNum) || baseFareNum < 0) {
      alert("Base fare must be a positive value")
      return
    }
    if (Number.isNaN(farePerSegmentNum) || farePerSegmentNum <= 0) {
      alert("Fare per segment must be greater than zero")
      return
    }

    // <input type="datetime-local"> yields "2026-08-03T14:30" (no seconds).
    // Append ":00" so Jackson's LocalDateTime parsing gets a full local
    // date-time string ("2026-08-03T14:30:00").
    const normalizedEffectiveFrom =
      effectiveFrom.length === 16 ? `${effectiveFrom}:00` : effectiveFrom

    const fareData: FareFormData = {
      baseFare: baseFareNum,
      farePerSegment: farePerSegmentNum,
      effectiveFrom: normalizedEffectiveFrom,
      coachType,
    }

    setSubmitting(true)
    try {
      const response = await fetch("http://localhost:8080/fare/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fareData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        setMessage(`Failed to create fare: ${errorText || response.statusText}`)
        return
      }

      setMessage("Fare created successfully!")
      setBaseFare("")
      setFarePerSegment("")
      setEffectiveFrom("")
      setCoachType(COACH_TYPES[0])
    } catch (error) {
      console.error("Fare creation error:", error)
      setMessage("Something went wrong while creating the fare. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-fit w-full mx-auto p-6 bg-white border border-gray-300 rounded-xl shadow-sm space-y-6 font-mono"
    >
      <h2 className="text-lg font-semibold text-black">Create Fare</h2>

      <div>
        <label className="block text-sm font-medium mb-1 text-black">Coach Type</label>
        <select
          required
          value={coachType}
          onChange={(e) => setCoachType(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black text-black"
        >
          {COACH_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-black">Base Fare</label>
          <input
            type="number"
            min={0}
            step="0.01"
            required
            value={baseFare}
            onChange={(e) => setBaseFare(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black text-black"
            placeholder="0.00"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-black">Fare Per Segment</label>
          <input
            type="number"
            min={0.01}
            step="0.01"
            required
            value={farePerSegment}
            onChange={(e) => setFarePerSegment(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black text-black"
            placeholder="0.00"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-black">Effective From</label>
        <input
          type="datetime-local"
          required
          value={effectiveFrom}
          onChange={(e) => setEffectiveFrom(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black text-black"
        />
      </div>

      {message && (
        <p
          className={`text-sm ${
            message.startsWith("Fare created") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Creating..." : "Create Fare"}
      </button>
    </form>
  )
}