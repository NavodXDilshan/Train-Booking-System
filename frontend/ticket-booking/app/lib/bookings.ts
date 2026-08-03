export type Direction = "FORWARD" | "REVERSE";

export interface Booking {
  id: number;
  seatId: number;
  seatNumber: number;
  coachId: number;
  trainId: number;
  departureId: number;
  passengerName: string;
  passengerContact: string;
  passengerNIC: string;
  originOrder: number;
  destinationOrder: number;
  fareAmount: number;
  createdAt: string;
  travelDate: string;
  verified: boolean;
  direction: Direction;
}


export async function getBookings(): Promise<Booking[]> {
  const res = await fetch(`http://localhost:8080/book/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch train");
  }

  return res.json();
}