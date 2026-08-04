"use client"

import React from "react"
import QRCode from "react-qr-code"

interface ReservationForm {
  name: string
  contact: string
  nic: string
}

interface SelectedSeat {
  coachId: number
  seatId: number
  seatNumber: number
}

interface ReservationModalProps {
  isOpen: boolean
  selectedSeat: SelectedSeat | null
  form: ReservationForm
  setForm: React.Dispatch<React.SetStateAction<ReservationForm>>
  showQr: boolean
  qrValue: string
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
}

export default function ReservationModal({
  isOpen,
  selectedSeat,
  form,
  setForm,
  showQr,
  qrValue,
  onClose,
  onSubmit,
}: ReservationModalProps) {
  if (!isOpen || !selectedSeat) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>

        <h3 className="text-lg font-semibold mb-1 font-mono text-black">
          Reserve Seat {selectedSeat.seatNumber}
        </h3>
        <p className="text-sm text-gray-500 mb-5 font-mono">Enter passenger details</p>

        {!showQr ? (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 font-mono text-gray-500">Full Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="text-black font-mono w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                placeholder=""
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-mono text-gray-500">Contact Number</label>
              <input
                type="tel"
                required
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                className="text-black font-mono w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                placeholder="07X XXX XXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-gray-500 mb-1">NIC Number</label>
              <input
                type="text"
                required
                value={form.nic}
                onChange={(e) => setForm({ ...form, nic: e.target.value })}
                className="text-black font-mono w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                placeholder="XXXXXXXXXV"
              />
            </div>

            <button
              type="submit"
              className="font-mono w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Confirm & Generate QR
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-green-600 font-medium">
              Seat reserved successfully!
            </p>

            <div className="bg-white p-4 border rounded-lg">
              <QRCode value={qrValue} size={180} />
            </div>

            <p className="text-xs text-gray-500 text-center">
              Scan this QR code for ticket verification
            </p>

            <button
              onClick={onClose}
              className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}