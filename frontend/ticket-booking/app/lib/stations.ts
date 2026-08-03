

export interface Station {
  id: number;
  name: string;
  code: string;
  routeOrder: number;
}

export async function getStations(): Promise<Station[]> {
  const res = await fetch("http://localhost:8080/station/", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch stations");
  }

  return res.json();
}