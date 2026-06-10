"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ImageIcon, MapPin } from "lucide-react";
import { formatDate } from "@/utils";
import { IGallery } from "@/types";
import Image from "next/image";

interface ViewGalleryModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedGallery: IGallery | null;
}

export default function ViewGalleryModal({
  isModalOpen,
  setIsModalOpen,
  selectedGallery,
}: ViewGalleryModalProps) {
  if (!selectedGallery) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="!max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Gallery Item Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Gallery Image */}
          {selectedGallery.image && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Gallery Image
              </h3>
              <div className="rounded-lg overflow-hidden border bg-muted h-80 relative">
                <Image
                  src={selectedGallery.image}
                  alt={selectedGallery.title}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Title
            </h3>
            <div className="text-xl font-bold">
              {selectedGallery.title}
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </h3>
            <div className="text-base">
              {selectedGallery.location}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Description
            </h3>
            <p className="text-base leading-relaxed whitespace-pre-wrap">
              {selectedGallery.desc}
            </p>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-xs text-muted-foreground">Created</p>
              <p className="text-sm font-medium flex items-center mt-1">
                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                {formatDate(selectedGallery.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Last Updated</p>
              <p className="text-sm font-medium flex items-center mt-1">
                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                {formatDate(selectedGallery.updatedAt)}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground">ID</p>
              <p className="text-xs font-mono mt-1 break-all">
                {selectedGallery._id}
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