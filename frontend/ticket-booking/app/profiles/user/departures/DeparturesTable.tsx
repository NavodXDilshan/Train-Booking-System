import { Departure } from "@/app/lib/departures";
import { Station } from "@/app/lib/stations";
import Link from "next/link";

interface DeparturesTableProps {
  departures: Departure[];
  stations: Station[];
}

export default function DeparturesTable({
  departures,
  stations
}: DeparturesTableProps) {

  const parseStationNames=(order:number)=>{
    const station = stations.find(station=>station.routeOrder==order);
    return `${station?.code}  (${station?.name})`;
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-500 text-white">
            <th className="border border-gray-300 px-4 py-2 text-left">Train</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Departure Time</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Start</th>
            <th className="border border-gray-300 px-4 py-2 text-left">End</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Coaches</th>
          </tr>
        </thead>
        <tbody>
          {departures.map((dep) => (
            <tr key={dep.id} className="bg-gray-100 hover:bg-gray-300 transition-colors">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  href={`/profiles/user/reservations/${dep.id}`}
                  className="text-black hover:underline block"
                >
                  {dep.train.name} (#{dep.train.id})
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  href={`/profiles/user/reservations/${dep.id}`}
                  className="text-black block"
                >
                  {new Date(dep.departureTime).toLocaleString()}
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <Link
                  href={`/profiles/user/reservations/${dep.id}`}
                  className="text-black block"
                >
                  {parseStationNames(dep.originOrder)}
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <Link
                  href={`/profiles/user/reservations/${dep.id}`}
                  className="text-black block"
                >
                  {parseStationNames(dep.destinationOrder)}
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  href={`/profiles/user/reservations/${dep.id}`}
                  className="block"
                >
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      dep.status === "SCHEDULED"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {dep.status}
                  </span>
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <Link
                  href={`/profiles/user/reservations/${dep.id}`}
                  className="text-black block"
                >
                  {dep.train.coaches.length}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}