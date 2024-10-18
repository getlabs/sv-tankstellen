"use client";
import GridList from "@/components/landing/GridList";
import Hero from "@/components/landing/Hero";
import SkeletonLoader from "@/components/SkeletonLoader";
import { gasStationService } from "@/libs/gasStationService";
import { useEffect, useState } from "react";

const HomePage: React.FC = () => {
  const [districts, setDistricts] = useState<
    {
      id: string;
      name: string;
      count: number;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await gasStationService.loadData();
      setDistricts(gasStationService.getDistricts(4));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col ">
      <Hero />
      {isLoading ? (
        <SkeletonLoader type="grid" count={4} />
      ) : (
        <GridList
          title="Nach Stadtteilen"
          subtitle="Finde Tankstellen rund um Köln"
          exploreLink="/tankstellen"
          listings={districts}
        />
      )}
    </div>
  );
};

export default HomePage;
