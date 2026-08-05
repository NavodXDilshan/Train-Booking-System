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
  const API = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API}/book/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch train");
  }

  return res.json();
}