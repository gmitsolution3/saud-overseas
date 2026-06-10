import { Suspense } from "react";
import { getServicesData } from "@/services/getServicesData";
import ServicesLoader from "./ServicesLoader";
import ServicesWrapper from "./ServicesWrapper";

export default function Services() {
  const dataPromise = getServicesData();
  
  return (
    <Suspense fallback={<ServicesLoader />}>
      <ServicesWrapper dataPromise={dataPromise} />
    </Suspense>
  );
}