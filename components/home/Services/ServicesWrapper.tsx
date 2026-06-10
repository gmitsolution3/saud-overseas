import { IService } from "@/types";
import ServicesClient from "./ServicesClient";

interface WrapperProps {
  dataPromise: Promise<IService[]>;
}

export default async function ServicesWrapper({ dataPromise }: WrapperProps) {
  const services = await dataPromise;
  return <ServicesClient services={services} />;
}