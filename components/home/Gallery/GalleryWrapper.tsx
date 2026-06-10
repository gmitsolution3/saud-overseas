import { IGallery } from "@/types";
import GalleryClient from "./GalleryClient";

interface WrapperProps {
  dataPromise: Promise<IGallery[]>;
}

export default async function GalleryWrapper({ dataPromise }: WrapperProps) {
  const galleries = await dataPromise;
  return <GalleryClient galleries={galleries} />;
}