// components/admin/destinations/EditDestinationModal.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, X, Tag, ImageIcon } from "lucide-react";
import { usePatch } from "@/hooks/swr/usePatch";
import Swal from "sweetalert2";
import { ImageUploader } from "@/components/image-uploader";
import { IDestination } from "@/types";
import { formatDate } from "@/utils";
import Image from "next/image";

// Form validation schema
const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  img: z
    .string()
    .url("Please enter a valid image URL")
    .min(1, "Image is required"),
  cats: z
    .array(z.string())
    .min(1, "At least one category is required"),
  imgPublicId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Predefined categories
const availableCategories = ["Student", "Work", "PR", "Tourist", "Business", "Family"];

interface EditDestinationModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  destinationData: IDestination;
  onSuccess?: () => void;
}

export default function EditDestinationModal({
  isModalOpen,
  setIsModalOpen,
  destinationData,
  onSuccess,
}: EditDestinationModalProps) {
  const { mutate: updateData, isLoading } = usePatch(`/destinations`, {
    revalidateKey: "/destinations",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      img: "",
      cats: [],
      imgPublicId: "",
    },
  });

  const [categoryInput, setCategoryInput] = useState("");

  const imageUrl = form.watch("img");
  const name = form.watch("name");
  const categories = form.watch("cats");

  // Reset form when destinationData changes or modal opens
  useEffect(() => {
    if (destinationData && isModalOpen) {
      form.reset({
        name: destinationData.name || "",
        img: destinationData.img || "",
        cats: destinationData.cats || [],
        imgPublicId: destinationData.imgPublicId || "",
      });
    }

    console.log(imageUrl)
  }, [destinationData, isModalOpen, form]);

  const addCategory = () => {
    if (categoryInput.trim() && !categories.includes(categoryInput.trim())) {
      const currentCats = form.getValues("cats") || [];
      form.setValue("cats", [...currentCats, categoryInput.trim()]);
      setCategoryInput("");
    }
  };

  const removeCategory = (index: number) => {
    const currentCats = form.getValues("cats") || [];
    form.setValue(
      "cats",
      currentCats.filter((_, i) => i !== index),
    );
  };

  const selectCategory = (category: string) => {
    if (!categories.includes(category)) {
      const currentCats = form.getValues("cats") || [];
      form.setValue("cats", [...currentCats, category]);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const { imgPublicId, ...submitData } = data;
      const response = await updateData({
        id: destinationData._id,
        data: submitData,
      });

      if (response.success) {
        setIsModalOpen(false);
        form.reset();
        onSuccess?.();

        await Swal.fire({
          title: "Success!",
          text: "Destination updated successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await Swal.fire({
          title: "Error",
          text: response.message || "Failed to update destination",
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
    setCategoryInput("");
  };

  const handleImageChange = (url: string, publicId: string) => {
    form.setValue("img", url, { shouldValidate: true });
    form.setValue("imgPublicId", publicId);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="!max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Edit Destination
          </DialogTitle>
          <DialogDescription>
            Update the details of your destination.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Uploader */}
          <FieldSet>
            <Field>
              <div className="flex items-center justify-between mb-2">
                <FieldLabel>
                  Destination Image <span className="text-destructive">*</span>
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
                  value={form.watch("img")}
                  imagePublicId={form.watch("imgPublicId")}
                  onChange={handleImageChange}
                />
              </FieldContent>
              <FieldDescription>
                Upload an image for the destination (max 5MB). Recommended size: 800x600px.
              </FieldDescription>
              <FieldError>{form.formState.errors.img?.message}</FieldError>
            </Field>
          </FieldSet>

          {/* Name */}
          <FieldSet>
            <Field>
              <FieldLabel>
                Destination Name <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <Input
                  placeholder="e.g., Canada, Australia, United Kingdom"
                  {...form.register("name")}
                />
              </FieldContent>
              <FieldDescription>
                Enter the name of the country or region
              </FieldDescription>
              <FieldError>{form.formState.errors.name?.message}</FieldError>
            </Field>
          </FieldSet>

          {/* Categories */}
          <FieldSet>
            <Field>
              <FieldLabel>
                Categories <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                {/* Quick Select Buttons */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {availableCategories.map((cat) => (
                    <Button
                      key={cat}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => selectCategory(cat)}
                      disabled={categories.includes(cat)}
                      className="text-xs"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {cat}
                    </Button>
                  ))}
                </div>

                {/* Add Custom Category */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a category..."
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCategory();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={addCategory}
                    variant="secondary"
                    className="shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Display Selected Categories */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {categories.map((cat, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="gap-1 pr-1"
                    >
                      <Tag className="h-3 w-3" />
                      {cat}
                      <button
                        type="button"
                        onClick={() => removeCategory(index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </FieldContent>
              <FieldDescription>
                Add categories like Student, Work, PR, Tourist, etc.
              </FieldDescription>
              <FieldError>{form.formState.errors.cats?.message}</FieldError>
            </Field>
          </FieldSet>

          {/* Live Preview Card */}
          {(name || imageUrl || categories.length > 0) && (
            <div className="rounded-lg border bg-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Live Preview</h4>
                <Badge variant="secondary">Preview</Badge>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden relative">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={name || "Destination preview"}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-semibold text-primary">
                      {name ? name.charAt(0) : "?"}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">
                    {name || "Destination Name"}
                  </p>
                  {categories.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {categories.slice(0, 2).map((cat, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                      {categories.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{categories.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Metadata - Show when editing */}
          {destinationData && (
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
                    {formatDate(destinationData.createdAt)}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    Last updated:
                  </span>{" "}
                  <span className="font-mono">
                    {formatDate(destinationData.updatedAt)}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">ID:</span>{" "}
                  <span className="font-mono text-xs break-all">
                    {destinationData._id}
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
              Update Destination
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}