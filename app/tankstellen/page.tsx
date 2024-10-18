import { Suspense } from "react";
import SkeletonLoader from "@/components/SkeletonLoader";
import GasStationsContent from "@/components/listing/GasStationContent";

export default function GasStationsPage() {
  return (
    <Suspense fallback={<SkeletonLoader type="list" count={4} />}>
      <GasStationsContent />
    </Suspense>
  );
}
