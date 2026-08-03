"use client"

import React from "react"

interface Seat {
  id: number
  seatNumber: number
  type: string
}

interface Coach {
  id: number
  coachNumber: number
  type: string
  seatCount: number
  seats: Seat[]
}

const seatKey = (coachId: number, seatId: number) => `${coachId}-${seatId}`

interface CoachListProps {
  coaches: Coach[]
  reservations: Record<string, unknown>
  onSeatClick: (coachId: number, seat: Seat) => void
}

export default function CoachList({ coaches, reservations, onSeatClick }: CoachListProps) {
  if (coaches.length === 0) {
    return <p className="text-black">No coaches available for this train.</p>
  }

  return (
    <div className="flex flex-col gap-8 w-2/3">
      {coaches.map((coach) => (
        <div
          key={coach.id}
          className="border-2 border-gray-400 rounded-xl p-6 bg-gray-50 max-w-4xl"
        >
          <div className="text-center text-sm font-medium text-gray-600 mb-4 font-mono">
            Coach {coach.coachNumber}  ({coach.type}) — Click a green seat to reserve
          </div>
          {coach.seats.length === 0 ? (
            <p className="font-mono text-center text-sm text-gray-500">
              Seat map not available for this coach.
            </p>
          ) : (
            <div className="grid grid-cols-[1fr_40px_1fr] gap-x-4 gap-y-3">
              {Array.from({
                length: Math.ceil(coach.seats.length / 4),
              }).map((_, rowIndex) => {
                const left1 = coach.seats[rowIndex * 4]
                const left2 = coach.seats[rowIndex * 4 + 1]
                const right1 = coach.seats[rowIndex * 4 + 2]
                const right2 = coach.seats[rowIndex * 4 + 3]
                return (
                  <React.Fragment key={rowIndex}>
                    <div className="flex gap-2 justify-end">
                      <SeatBox
                        coachId={coach.id}
                        seat={left1}
                        isReserved={
                          left1 ? !!reservations[seatKey(coach.id, left1.id)] : false
                        }
                        onClick={onSeatClick}
                      />
                      <SeatBox
                        coachId={coach.id}
                        seat={left2}
                        isReserved={
                          left2 ? !!reservations[seatKey(coach.id, left2.id)] : false
                        }
                        onClick={onSeatClick}
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-px h-full bg-gray-300" />
                    </div>
                    <div className="flex gap-2 justify-start">
                      <SeatBox
                        coachId={coach.id}
                        seat={right1}
                        isReserved={
                          right1 ? !!reservations[seatKey(coach.id, right1.id)] : false
                        }
                        onClick={onSeatClick}
                      />
                      <SeatBox
                        coachId={coach.id}
                        seat={right2}
                        isReserved={
                          right2 ? !!reservations[seatKey(coach.id, right2.id)] : false
                        }
                        onClick={onSeatClick}
                      />
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const SeatBox = ({
  coachId,
  seat,
  isReserved,
  onClick,
}: {
  coachId: number
  seat?: Seat
  isReserved: boolean
  onClick: (coachId: number, seat: Seat) => void
}) => {
  if (!seat) return null

  return (
    <button
      type="button"
      onClick={() => onClick(coachId, seat)}
      disabled={isReserved}
      className={`
        w-10 h-10 rounded-md flex items-center justify-center
        text-xs font-medium transition-all duration-150
        hover:scale-105 active:scale-95
        ${
          isReserved
            ? "bg-black text-white cursor-default"
            : "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
        }
      `}
      title={`Seat ${seat.seatNumber} · ${seat.type} · ${isReserved ? "reserved" : "unreserved"}`}
    >
      {seat.seatNumber}
    </button>
  )
}