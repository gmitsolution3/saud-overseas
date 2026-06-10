// components/admin/destinations/ViewDestinationModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ImageIcon, MapPin, Tag } from "lucide-react";
import { formatDate } from "@/utils";
import { IDestination } from "@/types";
import Image from "next/image";

interface ViewDestinationModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedDestination: IDestination | null;
}

export default function ViewDestinationModal({
  isModalOpen,
  setIsModalOpen,
  selectedDestination,
}: ViewDestinationModalProps) {
  if (!selectedDestination) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="!max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Destination Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Destination Image */}
          {selectedDestination.img && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Destination Image
              </h3>
              <div className="rounded-lg overflow-hidden border bg-muted h-64 relative">
                <Image
                  src={selectedDestination.img}
                  alt={selectedDestination.name}
                  width={600}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Name */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Destination Name
            </h3>
            <div className="text-xl font-bold">
              {selectedDestination.name}
            </div>
          </div>

          {/* Categories */}
          {selectedDestination.cats && selectedDestination.cats.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Categories ({selectedDestination.cats.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedDestination.cats.map((cat, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-1.5">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-xs text-muted-foreground">Created</p>
              <p className="text-sm font-medium flex items-center mt-1">
                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                {formatDate(selectedDestination.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Last Updated</p>
              <p className="text-sm font-medium flex items-center mt-1">
                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                {formatDate(selectedDestination.updatedAt)}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground">ID</p>
              <p className="text-xs font-mono mt-1 break-all">
                {selectedDestination._id}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              className="hover:text-white"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}