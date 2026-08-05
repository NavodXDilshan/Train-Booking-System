

export interface Fare {
  id: number;
  baseFare: number;
  farePerSegment: number;
  effectiveFrom:string;
  coachType:string;
}



export async function getFares(): Promise<Fare[]> {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API}/fare/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch train");
  }

  return res.json();
}