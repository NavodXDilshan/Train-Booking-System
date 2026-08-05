import { getDepartures } from "@/lib/departures";
import DeparturesTable from "@/components/user/DeparturesTable";
import {getStations} from "@/lib/stations";

export default async function DeparturesPage() {
  const departures = await getDepartures();
  const stations = await getStations();

  return (
    <div className="p-8">

      <h1 className="text-2xl font-bold mb-6 text-white font-mono">Departures</h1>

      {departures.length === 0 ? (
        <p className="text-2xl font-bold mb-6 text-black font-mono">No departures found.</p>
      ) : (
        <DeparturesTable
          departures={departures}
          stations={stations}
        />
      )}
    </div>
  );
}