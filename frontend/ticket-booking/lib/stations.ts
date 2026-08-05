

export interface Station {
  id: number;
  name: string;
  code: string;
  routeOrder: number;
}

function getApiBaseUrl() {
  
  if (typeof window === "undefined") {
    return "http://backend:8080";
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
}
export async function getStations(): Promise<Station[]> {
  const API = getApiBaseUrl();
  const res = await fetch(`${API}/station/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch stations");
  }

  return res.json();
}