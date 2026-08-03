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



export async function getTrainById(trainId: string | number): Promise<Train> {
  const res = await fetch(`http://localhost:8080/train/${trainId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch train");
  }

  return res.json();
}