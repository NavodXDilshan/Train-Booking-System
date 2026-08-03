

export interface Fare {
  id: number;
  baseFare: number;
  farePerSegment: number;
  effectiveFrom:string;
  coachType:string;
}



export async function getFares(): Promise<Fare[]> {
  const res = await fetch(`http://localhost:8080/fare/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch train");
  }

  return res.json();
}