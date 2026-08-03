// "use client"
// import React, { useState } from 'react'
// import Menu from "@/app/components/dropdownmenu"
// import { ArrowRightIcon } from "@heroicons/react/24/solid"
// import QRCode from "react-qr-code"

// type SeatStatus = "unreserved" | "reserved"

// interface Seat {
//   id: number
//   status: SeatStatus
//   passenger?: {
//     name: string
//     contact: string
//     nic: string
//   }
// }

// interface ReservationForm {
//   name: string
//   contact: string
//   nic: string
// }

// const Reservation = () => {
//   const [origin, setOrigin] = useState<number>(0)
//   const [destination, setDestination] = useState<number>(0)

//   const [seats, setSeats] = useState<Seat[]>(
//     Array.from({ length: 40 }, (_, i) => ({
//       id: i + 1,
//       status: "unreserved",
//     }))
//   )

//   // Modal state
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [selectedSeatId, setSelectedSeatId] = useState<number | null>(null)
//   const [form, setForm] = useState<ReservationForm>({
//     name: "",
//     contact: "",
//     nic: "",
//   })
//   const [qrValue, setQrValue] = useState<string>("")
//   const [showQr, setShowQr] = useState(false)

//   const openModal = (seatId: number) => {
//     setSelectedSeatId(seatId)
//     setForm({ name: "", contact: "", nic: "" })
//     setQrValue("")
//     setShowQr(false)
//     setIsModalOpen(true)
//   }

//   const closeModal = () => {
//     setIsModalOpen(false)
//     setSelectedSeatId(null)
//     setShowQr(false)
//   }

//   const handleSeatClick = (seat: Seat) => {
//     if (seat.status === "unreserved") {
//       openModal(seat.id)
//     }
//     // Optionally: show passenger details if already reserved
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!form.name || !form.contact || !form.nic || selectedSeatId === null) {
//       alert("Please fill all fields")
//       return
//     }

//     // Generate QR data
//     const qrData = JSON.stringify({
//       seat: selectedSeatId,
//       name: form.name,
//       contact: form.contact,
//       nic: form.nic,
//       origin,
//       destination,
//       timestamp: new Date().toISOString(),
//     })

//     setQrValue(qrData)
//     setShowQr(true)

//     // Mark seat as reserved and store passenger info
//     setSeats((prev) =>
//       prev.map((seat) =>
//         seat.id === selectedSeatId
//           ? {
//               ...seat,
//               status: "reserved",
//               passenger: {
//                 name: form.name,
//                 contact: form.contact,
//                 nic: form.nic,
//               },
//             }
//           : seat
//       )
//     )
//   }

//   return (
//     <div className="p-4">
//       <h4 className="sm:text-[20px] text-[10px] font-medium text-black">
//         Reservation
//       </h4>

//       {/* Origin / Destination */}
//       <div className="flex flex-row gap-5 items-center mt-4">
//         <Menu
//           select={origin}
//           setSelect={setOrigin}
//           styleMenu="w-[260px] h-[40px] text-black"
//           styleItem="w-[200px]"
//           title="From"
//           options={[0, 1, 2, 3, 4, 5]}
//         />
//         <ArrowRightIcon className="w-5 h-5 text-black" />
//         <Menu
//           select={destination}
//           setSelect={setDestination}
//           styleMenu="w-[260px] h-[40px] text-black"
//           styleItem="w-[200px]"
//           title="To"
//           options={[0, 1, 2, 3, 4, 5]}
//         />
//       </div>

//       {/* Legend */}
//       <div className="flex items-center gap-4 mt-6 mb-4 text-sm">
//         <div className="flex items-center gap-2">
//           <div className="w-5 h-5 bg-green-500 rounded-sm" />
//           <span>Unreserved</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-5 h-5 bg-black rounded-sm" />
//           <span>Reserved</span>
//         </div>
//       </div>

//       {/* Coach Layout */}
//       <div className="border-2 border-gray-400 rounded-xl p-6 bg-gray-50 max-w-4xl">
//         <div className="text-center text-sm font-medium text-gray-600 mb-4">
//           Coach A1 — Click a green seat to reserve
//         </div>

//         <div className="grid grid-cols-[1fr_40px_1fr] gap-x-4 gap-y-3">
//           {Array.from({ length: 10 }).map((_, rowIndex) => {
//             const left1 = seats[rowIndex * 4]
//             const left2 = seats[rowIndex * 4 + 1]
//             const right1 = seats[rowIndex * 4 + 2]
//             const right2 = seats[rowIndex * 4 + 3]

//             return (
//               <React.Fragment key={rowIndex}>
//                 <div className="flex gap-2 justify-end">
//                   <SeatBox seat={left1} onClick={handleSeatClick} />
//                   <SeatBox seat={left2} onClick={handleSeatClick} />
//                 </div>
//                 <div className="flex items-center justify-center">
//                   <div className="w-px h-full bg-gray-300" />
//                 </div>
//                 <div className="flex gap-2 justify-start">
//                   <SeatBox seat={right1} onClick={handleSeatClick} />
//                   <SeatBox seat={right2} onClick={handleSeatClick} />
//                 </div>
//               </React.Fragment>
//             )
//           })}
//         </div>
//       </div>

//       {/* ===================== MODAL ===================== */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 relative">
//             {/* Close button */}
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
//             >
//               ×
//             </button>

//             <h3 className="text-lg font-semibold mb-1">
//               Reserve Seat {selectedSeatId}
//             </h3>
//             <p className="text-sm text-gray-500 mb-5">
//               Enter passenger details
//             </p>

//             {!showQr ? (
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={form.name}
//                     onChange={(e) =>
//                       setForm({ ...form, name: e.target.value })
//                     }
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
//                     placeholder="John Doe"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Contact Number
//                   </label>
//                   <input
//                     type="tel"
//                     required
//                     value={form.contact}
//                     onChange={(e) =>
//                       setForm({ ...form, contact: e.target.value })
//                     }
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
//                     placeholder="07X XXX XXXX"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     NIC Number
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={form.nic}
//                     onChange={(e) =>
//                       setForm({ ...form, nic: e.target.value })
//                     }
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
//                     placeholder="XXXXXXXXXV"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition"
//                 >
//                   Confirm & Generate QR
//                 </button>
//               </form>
//             ) : (
//               <div className="flex flex-col items-center gap-4">
//                 <p className="text-sm text-green-600 font-medium">
//                   Seat reserved successfully!
//                 </p>

//                 <div className="bg-white p-4 border rounded-lg">
//                   <QRCode value={qrValue} size={180} />
//                 </div>

//                 <p className="text-xs text-gray-500 text-center">
//                   Scan this QR code for ticket verification
//                 </p>

//                 <button
//                   onClick={closeModal}
//                   className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition"
//                 >
//                   Close
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// // Seat box component
// const SeatBox = ({
//   seat,
//   onClick,
// }: {
//   seat: Seat
//   onClick: (seat: Seat) => void
// }) => {
//   if (!seat) return null

//   const isReserved = seat.status === "reserved"

//   return (
//     <button
//       type="button"
//       onClick={() => onClick(seat)}
//       className={`
//         w-10 h-10 rounded-md flex items-center justify-center
//         text-xs font-medium transition-all duration-150
//         hover:scale-105 active:scale-95
//         ${isReserved
//           ? "bg-black text-white cursor-default"
//           : "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
//         }
//       `}
//       title={`Seat ${seat.id} – ${seat.status}`}
//     >
//       {seat.id}
//     </button>
//   )
// }

// export default Reservation