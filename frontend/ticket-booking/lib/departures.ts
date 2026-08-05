
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
}

function getApiBaseUrl() {
  
  if (typeof window === "undefined") {
    return "http://backend:8080";
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
}

export async function getDepartures(): Promise<Departure[]> {
  const API = getApiBaseUrl();
  const res = await fetch(`${API}/departure/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch departures");
  }

  return res.json();
}