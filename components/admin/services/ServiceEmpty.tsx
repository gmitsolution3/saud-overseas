"use client";

import { Button } from "@/components/ui/button";

interface ServiceEmptyProps {
  onCreateClick: () => void;
  isDeleting?: boolean;
}

export default function ServiceEmpty({
  onCreateClick,
  isDeleting = false,
}: ServiceEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
        <span className="text-2xl">🛠️</span>
      </div>
      <div>
        <h3 className="font-semibold text-lg">No services found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Get started by adding your first service
        </p>
      </div>
      <Button
        variant="outline"
        className="mt-2"
        onClick={onCreateClick}
        disabled={isDeleting}
      >
        Add Service
      </Button>
    </div>
  );
}