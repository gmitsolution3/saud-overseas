import { Suspense } from "react";
import { getDestinationsData } from "@/services/getDestinationsData";
import DestinationsLoader from "./DestinationsLoader";
import DestinationsWrapper from "./DestinationsWrapper";

export default function Destinations() {
  const dataPromise = getDestinationsData();
  
  return (
    <Suspense fallback={<DestinationsLoader />}>
      <DestinationsWrapper dataPromise={dataPromise} />
    </Suspense>
  );
}