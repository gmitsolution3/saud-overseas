import { Suspense } from "react";
import { getGalleriesData } from "@/services/getGalleriesData";
import GalleryLoader from "./GalleryLoader";
import GalleryWrapper from "./GalleryWrapper";

export default function Gallery() {
  const dataPromise = getGalleriesData();
  
  return (
    <Suspense fallback={<GalleryLoader />}>
      <GalleryWrapper dataPromise={dataPromise} />
    </Suspense>
  );
}