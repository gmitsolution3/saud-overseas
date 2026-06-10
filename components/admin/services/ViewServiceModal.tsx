"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ImageIcon } from "lucide-react";
import { formatDate } from "@/utils";
import { IService } from "@/types";
import Image from "next/image";

interface ViewServiceModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedService: IService | null;
}

export default function ViewServiceModal({
  isModalOpen,
  setIsModalOpen,
  selectedService,
}: ViewServiceModalProps) {
  if (!selectedService) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="!max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Service Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Service Image */}
          {selectedService.image && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Service Image
              </h3>
              <div className="rounded-lg overflow-hidden border bg-muted h-64 relative">
                <Image
                  src={selectedService.image}
                  alt={selectedService.title}
                  width={600}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Service Title
            </h3>
            <div className="text-xl font-bold">
              {selectedService.title}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Description
            </h3>
            <p className="text-base leading-relaxed">
              {selectedService.description}
            </p>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-xs text-muted-foreground">Created</p>
              <p className="text-sm font-medium flex items-center mt-1">
                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                {formatDate(selectedService.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Last Updated</p>
              <p className="text-sm font-medium flex items-center mt-1">
                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                {formatDate(selectedService.updatedAt)}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground">ID</p>
              <p className="text-xs font-mono mt-1">
                {selectedService._id}
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