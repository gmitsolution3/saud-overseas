"use client";

import { Button } from "@/components/ui/button";

interface DestinationEmptyProps {
  onCreateClick: () => void;
  isDeleting?: boolean;
}

export default function DestinationEmpty({
  onCreateClick,
  isDeleting = false,
}: DestinationEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
        <span className="text-2xl">🌍</span>
      </div>
      <div>
        <h3 className="font-semibold text-lg">No destinations found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Get started by adding your first destination country
        </p>
      </div>
      <Button
        variant="outline"
        className="mt-2"
        onClick={onCreateClick}
        disabled={isDeleting}
      >
        Add Destination
      </Button>
    </div>
  );
}