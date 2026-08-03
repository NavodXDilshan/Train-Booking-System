"use client"

import React, { useState } from "react"

interface StationFormData {
  name: string
  code: string
  routeOrder: number
}

export default function StationForm() {
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [routeOrder, setRouteOrder] = useState<number>(0)

  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (!name.trim() || !code.trim()) {
      alert("Please enter both a station name and a code")
      return
    }
    if (routeOrder < 0) {
      alert("Route order must be a positive value")
      return
    }

    const stationData: StationFormData = {
      name: name.trim(),
      code: code.trim(),
      routeOrder,
    }

    setSubmitting(true)
    try {
      const response = await fetch("http://localhost:8080/station/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stationData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        setMessage(`Failed to create station: ${errorText || response.statusText}`)
        return
      }

      setMessage("Station created successfully!")
      setName("")
      setCode("")
      setRouteOrder(0)
    } catch (error) {
      console.error("Station creation error:", error)
      setMessage("Something went wrong while creating the station. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-fit w-full mx-auto p-6 bg-white border border-gray-300 rounded-xl shadow-sm space-y-6 font-mono"
    >
      <h2 className="text-lg font-semibold text-black">Create Station</h2>

      <div>
        <label className="block text-sm font-medium mb-1 text-black">Station Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black text-black"
          placeholder="Kandy"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-black">Station Code</label>
        <input
          type="text"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black text-black"
          placeholder="KDY"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-black">Route Order</label>
        <input
          type="number"
          min={0}
          required
          value={routeOrder}
          onChange={(e) => setRouteOrder(parseInt(e.target.value, 10) || 0)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black text-black"
        />
      </div>

      {message && (
        <p
          className={`text-sm ${
            message.startsWith("Station created") ? "text-green-600" : "text-red-600"
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
        {submitting ? "Creating..." : "Create Station"}
      </button>
    </form>
  )
}