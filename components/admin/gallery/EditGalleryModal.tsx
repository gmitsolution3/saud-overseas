"use client";

import { ImageUploader } from "@/components/image-uploader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePatch } from "@/hooks/swr/usePatch";
import { IGallery } from "@/types";
import { formatDate } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Loader2, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import * as z from "zod";

// Form validation schema
const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must not exceed 200 characters"),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must not exceed 100 characters"),
  image: z
    .string()
    .url("Please enter a valid image URL")
    .min(1, "Image is required"),
  desc: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must not exceed 1000 characters"),
  imagePublicId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EditGalleryModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  galleryData: IGallery;
  onSuccess?: () => void;
}

export default function EditGalleryModal({
  isModalOpen,
  setIsModalOpen,
  galleryData,
  onSuccess,
}: EditGalleryModalProps) {
  const { mutate: updateData, isLoading } = usePatch(`/galleries`, {
    revalidateKey: "/galleries",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      image: "",
      desc: "",
      imagePublicId: "",
    },
  });

  const imageUrl = form.watch("image");
  const title = form.watch("title");
  const location = form.watch("location");
  const desc = form.watch("desc");

  // Reset form when galleryData changes or modal opens
  useEffect(() => {
    if (galleryData && isModalOpen) {
      form.reset({
        title: galleryData.title || "",
        location: galleryData.location || "",
        image: galleryData.image || "",
        desc: galleryData.desc || "",
        imagePublicId: galleryData.imagePublicId || "",
      });
    }
  }, [galleryData, isModalOpen, form]);

  const onSubmit = async (data: FormValues) => {
    try {
      const { imagePublicId, ...submitData } = data;
      const response = await updateData({
        id: galleryData._id,
        data: submitData,
      });

      if (response.success) {
        setIsModalOpen(false);
        form.reset();
        onSuccess?.();

        await Swal.fire({
          title: "Success!",
          text: "Gallery item updated successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await Swal.fire({
          title: "Error",
          text: response.message || "Failed to update gallery item",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
      await Swal.fire({
        title: "Error",
        text: "An unexpected error occurred",
        icon: "error",
      });
    }
  };

  const handleClose = () => {
    form.reset();
    setIsModalOpen(false);
  };

  const handleImageChange = (url: string, publicId: string) => {
    form.setValue("image", url, { shouldValidate: true });
    form.setValue("imagePublicId", publicId);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="!max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Edit Gallery Item
          </DialogTitle>
          <DialogDescription>
            Update the details of your gallery item.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Image Uploader */}
          <FieldSet>
            <Field>
              <div className="flex items-center justify-between mb-2">
                <FieldLabel>
                  Gallery Image{" "}
                  <span className="text-destructive">*</span>
                </FieldLabel>
                {imageUrl && (
                  <Badge variant="outline" className="gap-1">
                    <ImageIcon className="h-3 w-3" />
                    Image Uploaded
                  </Badge>
                )}
              </div>
              <FieldContent>
                <ImageUploader
                  value={form.watch("image")}
                  imagePublicId={form.watch("imagePublicId")}
                  onChange={handleImageChange}
                />
              </FieldContent>
              <FieldDescription>
                Upload a high-quality image for your gallery (max
                5MB). Recommended size: 1200x800px.
              </FieldDescription>
              <FieldError>
                {form.formState.errors.image?.message}
              </FieldError>
            </Field>
          </FieldSet>

          {/* Title */}
          <FieldSet>
            <Field>
              <FieldLabel>
                Title <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <Input
                  placeholder="e.g., MALAYSIA TOURS, BALI ADVENTURE"
                  {...form.register("title")}
                />
              </FieldContent>
              <FieldDescription>
                Give your gallery item a descriptive title
              </FieldDescription>
              <FieldError>
                {form.formState.errors.title?.message}
              </FieldError>
            </Field>
          </FieldSet>

          {/* Location */}
          <FieldSet>
            <Field>
              <FieldLabel>
                Location <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <div className="flex">
                  <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    className="rounded-l-none"
                    placeholder="e.g., Kuala Lumpur, Malaysia"
                    {...form.register("location")}
                  />
                </div>
              </FieldContent>
              <FieldDescription>
                Enter the location of this tour or destination
              </FieldDescription>
              <FieldError>
                {form.formState.errors.location?.message}
              </FieldError>
            </Field>
          </FieldSet>

          {/* Description */}
          <FieldSet>
            <Field>
              <FieldLabel>
                Description{" "}
                <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <Textarea
                  placeholder="Describe the tour experience, highlights, and what makes it special..."
                  className="min-h-[120px] resize-none"
                  {...form.register("desc")}
                />
              </FieldContent>
              <FieldDescription>
                Provide a compelling description of this tour or
                destination (20-1000 characters)
              </FieldDescription>
              <FieldError>
                {form.formState.errors.desc?.message}
              </FieldError>
            </Field>
          </FieldSet>

          {/* Live Preview Card */}
          {(title || location || desc || imageUrl) && (
            <div className="rounded-lg border bg-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Live Preview</h4>
                <Badge variant="secondary">Preview</Badge>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden relative">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={title || "Gallery preview"}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-semibold text-primary">
                      {title ? title.charAt(0) : "?"}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold truncate">
                    {title || "Gallery Title"}
                  </p>
                  {location && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" />
                      {location}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                    {desc || "Description will appear here"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Metadata - Show when editing */}
          {galleryData && (
            <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Metadata
                </Badge>
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">
                    Created:
                  </span>{" "}
                  <span className="font-mono">
                    {formatDate(galleryData.createdAt)}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    Last updated:
                  </span>{" "}
                  <span className="font-mono">
                    {formatDate(galleryData.updatedAt)}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">ID:</span>{" "}
                  <span className="font-mono text-xs break-all">
                    {galleryData._id}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="text-white"
            >
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Gallery Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
