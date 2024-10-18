"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Filters from "@/components/listing/Filters";
import ListingList from "@/components/listing/ListingList";
import { gasStationService } from "@/libs/gasStationService";
import { GasStationData } from "@/types/gasStation";
import SkeletonLoader from "@/components/SkeletonLoader";

export default function GasStationsContent() {
  const [allStations, setAllStations] = useState<GasStationData[]>([]);
  const [filteredStations, setFilteredStations] = useState<GasStationData[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [districts, setDistricts] = useState<
    { id: string; name: string; count: number }[]
  >([]);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  // Daten initial laden und auf den Suchbegriff reagieren
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await gasStationService.loadData();
      const data = gasStationService.getData();
      setAllStations(data);
      setDistricts(gasStationService.getDistricts());

      if (searchTerm) {
        const filtered = filterStations(data, searchTerm, "");
        setFilteredStations(filtered);
      } else {
        setFilteredStations(data);
      }

      setLoading(false);
    };

    fetchData();
  }, [searchTerm]);

  const filterStations = (
    stations: GasStationData[],
    name: string,
    district: string
  ) => {
    let filtered = stations;
    if (name) {
      filtered = filtered.filter(
        (station) =>
          station.street.toLowerCase().includes(name.toLowerCase()) ||
          station.zipCode.includes(name) ||
          station.district.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (district && district !== "Alle Stadtteile") {
      filtered = filtered.filter((station) => station.district === district);
    }
    return filtered;
  };

  const handleFilter = (name: string, district: string) => {
    const filtered = filterStations(allStations, name, district);
    setFilteredStations(filtered);
  };

  const handleSort = (type: string, ascending: boolean) => {
    const sorted = [...filteredStations].sort((a, b) => {
      switch (type) {
        case "name":
          return ascending
            ? a.street.localeCompare(b.street)
            : b.street.localeCompare(a.street);
        case "district":
          return ascending
            ? a.district.localeCompare(b.district)
            : b.district.localeCompare(a.district);
        default:
          return 0;
      }
    });
    setFilteredStations(sorted);
  };

  return (
    <div className="flex lg:flex-row flex-col   w-full container mx-auto lg:p-0 p-5 my-16">
      <Filters
        onFilter={handleFilter}
        districts={districts}
        initialSearch={searchTerm}
      />
      {loading ? (
        <SkeletonLoader type="list" count={4} />
      ) : (
        <ListingList gasStations={filteredStations} onSort={handleSort} />
      )}
    </div>
  );
}
