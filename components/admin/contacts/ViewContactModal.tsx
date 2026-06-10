"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  Mail,
  Phone,
  User,
  FileText,
  Tag,
  Clock,
  CheckCircle,
} from "lucide-react";
import { formatDate } from "@/utils";
import { IContact } from "@/types";
import { usePatch } from "@/hooks/swr/usePatch";
import { useEffect } from "react";

interface ViewContactModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedContact: IContact | null;
  onReadUpdate?: () => void;
}

export default function ViewContactModal({
  isModalOpen,
  setIsModalOpen,
  selectedContact,
}: ViewContactModalProps) {

  if (!selectedContact) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="!max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              Contact Message Details
            </DialogTitle>
            {!selectedContact.isRead && (
              <Badge variant="default" className="gap-1 bg-blue-500">
                <CheckCircle className="h-3 w-3" />
                New Message
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info Card */}
          <Card className="p-4 bg-muted/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{selectedContact.name}</h2>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    {selectedContact.email}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    {selectedContact.phone}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Visa Type */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Visa Type
            </h3>
            <Badge variant="secondary" className="text-base py-1.5 px-3">
              {selectedContact.visa_type}
            </Badge>
          </div>

          {/* Message */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Message
            </h3>
            <div className="rounded-lg border bg-card p-4">
              <p className="text-base leading-relaxed whitespace-pre-wrap">
                {selectedContact.message}
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Received
              </p>
              <p className="text-sm font-medium mt-1">
                {formatDate(selectedContact.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Last Updated
              </p>
              <p className="text-sm font-medium mt-1">
                {formatDate(selectedContact.updatedAt)}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground">Message ID</p>
              <p className="text-xs font-mono mt-1 break-all">
                {selectedContact._id}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              className="hover:text-white"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </Button>
            <Button
              variant="default"
              className="text-white gap-2"
              onClick={() => {
                window.location.href = `mailto:${selectedContact.email}`;
              }}
            >
              <Mail className="h-4 w-4" />
              Reply via Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}