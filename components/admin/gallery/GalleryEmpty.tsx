"use client";

import { Button } from "@/components/ui/button";

interface GalleryEmptyProps {
  onCreateClick: () => void;
  isDeleting?: boolean;
}

export default function GalleryEmpty({
  onCreateClick,
  isDeleting = false,
}: GalleryEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
        <span className="text-2xl">📸</span>
      </div>
      <div>
        <h3 className="font-semibold text-lg">No gallery items found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Get started by adding your first tour or destination image
        </p>
      </div>
      <Button
        variant="outline"
        className="mt-2"
        onClick={onCreateClick}
        disabled={isDeleting}
      >
        Add Gallery Item
      </Button>
    </div>
  );
}