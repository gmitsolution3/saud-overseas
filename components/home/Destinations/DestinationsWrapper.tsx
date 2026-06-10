import { IDestination } from "@/types";
import DestinationsClient from "./DestinationsClient";

interface WrapperProps {
  dataPromise: Promise<IDestination[]>;
}

export default async function DestinationsWrapper({
  dataPromise,
}: WrapperProps) {
  const destinations = await dataPromise;
  return <DestinationsClient destinations={destinations} />;
}
