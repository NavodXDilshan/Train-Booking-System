"use client"

import React, { useState } from "react"

interface CoachInput {
  type: string
  seatCount: number
}

interface TrainFormData {
  name: string
  coaches: CoachInput[]
}

const COACH_TYPES = ["RESERVED", "UNRESERVED"]

export default function TrainForm() {
  const [name, setName] = useState("")
  const [coachCount, setCoachCount] = useState<number>(1)
  const [coaches, setCoaches] = useState<CoachInput[]>([
    { type: COACH_TYPES[0], seatCount: 0 },
  ])
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleCoachCountChange = (value: number) => {
    const count = Number.isNaN(value) || value < 0 ? 0 : value
    setCoachCount(count)

    setCoaches((prev) => {
      if (count === prev.length) return prev
      if (count < prev.length) return prev.slice(0, count)
      const additional = Array.from({ length: count - prev.length }, () => ({
        type: COACH_TYPES[0],
        seatCount: 0,
      }))
      return [...prev, ...additional]
    })
  }

  const updateCoach = (index: number, field: keyof CoachInput, value: string | number) => {
    setCoaches((prev) =>
      prev.map((coach, i) => (i === index ? { ...coach, [field]: value } : coach))
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (!name.trim()) {
      alert("Please enter a train name")
      return
    }
    if (coaches.length === 0) {
      alert("Please add at least one coach")
      return
    }
    if (coaches.some((c) => !c.type || c.seatCount <= 0)) {
      alert("Please select a type and a valid seat count for every coach")
      return
    }

    const trainData: TrainFormData = { name, coaches }

    setSubmitting(true)
    try {
      const response = await fetch("http://localhost:8080/train/addAll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trainData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        setMessage(`Failed to create train: ${errorText || response.statusText}`)
        return
      }

      setMessage("Train created successfully!")
      setName("")
      setCoachCount(1)
      setCoaches([{ type: COACH_TYPES[0], seatCount: 0 }])
    } catch (error) {
      console.error("Train creation error:", error)
      setMessage("Something went wrong while creating the train. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-fit w-full mx-auto p-6 bg-white border border-gray-300 rounded-xl shadow-sm space-y-6"
    >
      <h2 className="text-lg font-semibold text-black font-mono">Create Train</h2>

      <div>
        <label className="block text-sm font-medium mb-1 text-black font-mono">Train Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="font-mono w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black text-black"
          placeholder="Udarata Menike"
        />
      </div>

      <div>
        <label className="font-mono block text-sm font-medium mb-1 text-black">Number of Coaches</label>
        <input
          type="number"
          min={0}
          required
          value={coachCount}
          onChange={(e) => handleCoachCountChange(parseInt(e.target.value, 10))}
          className="font-mono w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black text-black"
        />
      </div>

      {coaches.length > 0 && (
        <div className="space-y-4">
          <label className="font-mono block text-sm font-medium text-black">Coach Details</label>
          {coaches.map((coach, index) => (
            <div
              key={index}
              className="flex flex-row gap-4 items-end border border-gray-200 rounded-lg p-3"
            >
              <div className="flex-1">
                <label className="font-mono block text-xs text-gray-500 mb-1">
                  Coach {index + 1} Type
                </label>
                <select
                  required
                  value={coach.type}
                  onChange={(e) => updateCoach(index, "type", e.target.value)}
                  className="font-mono w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black text-black"
                >
                  {COACH_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="font-mono block text-xs text-gray-500 mb-1">Seat Count</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={coach.seatCount}
                  onChange={(e) =>
                    updateCoach(index, "seatCount", parseInt(e.target.value, 10) || 0)
                  }
                  className="font-mono w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black text-black"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {message && (
        <p
          className={`text-sm ${
            message.startsWith("Train created") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="font-mono w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Creating..." : "Create Train"}
      </button>
    </form>
  )
}