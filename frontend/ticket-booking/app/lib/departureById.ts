
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
  direction:string;
}

export async function getDepartureById(depId: string | number): Promise<Departure> {
  const res = await fetch(`http://localhost:8080/departure/${depId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch departures");
  }

  return res.json();
}