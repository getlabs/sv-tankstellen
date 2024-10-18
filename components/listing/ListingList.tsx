import { GasStationData } from "@/types/gasStation";
import { useState } from "react";

interface ListingListProps {
  gasStations: GasStationData[];
  onSort: (type: string, ascending: boolean) => void;
}

export default function ListingList({ gasStations, onSort }: ListingListProps) {
  const [sortType, setSortType] = useState("name");
  const [sortAscending, setSortAscending] = useState(true);

  const openInGoogleMaps = (address: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(url, "_blank");
  };

  const handleSort = (type: string) => {
    if (type === sortType) {
      setSortAscending(!sortAscending);
    } else {
      setSortType(type);
      setSortAscending(true);
    }
    onSort(type, sortAscending);
  };

  return (
    <div className="flex p-4 flex-col w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Deine Suche</h1>
        <div className="flex justify-between items-center">
          <div className="relative mr-4">
            <select
              name="sort"
              value={sortType}
              onChange={(e) => handleSort(e.target.value)}
              className="bg-white w-full border border-gray-200 relative appearance-none rounded-lg px-8 py-[11px] focus:outline-blue-300 text-gray-400"
            >
              <option value="name">Name</option>
              <option value="district">Stadtteil</option>
            </select>
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="currentColor"
              className="w-3 h-3 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.99982 6.00001C4.79513 6.00001 4.59034 5.92467 4.43435 5.774L0.434558 1.91686C0.122074 1.61552 0.122074 1.12735 0.434558 0.826011C0.747042 0.524671 1.25327 0.524671 1.56575 0.826011L4.99982 4.13893L8.43464 0.826613C8.74713 0.525274 9.25335 0.525274 9.56583 0.826613C9.87832 1.12795 9.87832 1.61612 9.56583 1.91746L5.56604 5.7746C5.4098 5.92527 5.20481 6.00001 4.99982 6.00001Z"></path>
            </svg>
          </div>
          <button onClick={() => handleSort(sortType)}>
            {sortAscending ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-sort-down h-7 w-7"
                viewBox="0 0 16 16"
              >
                <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-sort-up h-7 w-7"
                viewBox="0 0 16 16"
              >
                <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        {gasStations.map((station) => (
          <div
            key={station.objectid}
            className="relative flex lg:flex-row flex-col bg-white shadow-front-2  border mb-7"
          >
            <div className="flex flex-col  p-5">
              <a
                href={`https://www.google.com/search?q=Tankstelle ${station.street} ${station.zipCode} ${station.district}`}
                target="_blank"
                className="flex flex-col flex-1 justify-center"
              >
                <div className="flex items-center mb-2">
                  <h3 className="text-xl text-gray-700   font-semibold mr-2">
                    {station.street}
                  </h3>
                </div>
                <div className="text-base ">
                  {station.zipCode} ({station.district})
                </div>
              </a>
              <div className="absolute right-0 top-0 bottom-0 my-auto flex mr-6">
                <button
                  onClick={() =>
                    openInGoogleMaps(
                      station.street +
                        " " +
                        station.zipCode +
                        " " +
                        station.district
                    )
                  }
                  type="button"
                  className="text-gray-300   hover:text-amber-400   "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-sign-turn-right-fill h-7 w-7"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM9 8.466V7H7.5A1.5 1.5 0 0 0 6 8.5V11H5V8.5A2.5 2.5 0 0 1 7.5 6H9V4.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L9.41 8.658A.25.25 0 0 1 9 8.466" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
