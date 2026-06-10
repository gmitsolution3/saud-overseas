"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { usePatch } from "@/hooks/swr/usePatch";
import Swal from "sweetalert2";
import { IService } from "@/types";

// Form validation schema
const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  image: z
    .string()
    .url("Please enter a valid image URL")
    .min(1, "Image URL is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
});

type FormValues = z.infer<typeof formSchema>;

interface EditServiceModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  serviceData: IService;
  onSuccess?: () => void;
}

export default function EditServiceModal({
  isModalOpen,
  setIsModalOpen,
  serviceData,
  onSuccess,
}: EditServiceModalProps) {
  const { mutate: updateData, isLoading } = usePatch(`/services`, {
    revalidateKey: "/services",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      image: "",
      description: "",
    },
  });

  // Reset form when serviceData changes or modal opens
  useEffect(() => {
    if (serviceData && isModalOpen) {
      form.reset({
        title: serviceData.title || "",
        image: serviceData.image || "",
        description: serviceData.description || "",
      });
    }
  }, [serviceData, isModalOpen, form]);

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await updateData({
        id: serviceData._id,
        data: data,
      });

      if (response.success) {
        setIsModalOpen(false);
        form.reset();
        onSuccess?.();

        await Swal.fire({
          title: "Success!",
          text: "Service updated successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await Swal.fire({
          title: "Error",
          text: response.message || "Failed to update service",
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

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="!max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Edit Service
          </DialogTitle>
          <DialogDescription>
            Update the details of your service offering.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <FieldSet>
            <Field>
              <FieldLabel>
                Title <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <Input
                  placeholder="e.g., Web Development"
                  {...form.register("title")}
                />
              </FieldContent>
              <FieldDescription>
                Give your service a clear and descriptive title
              </FieldDescription>
              <FieldError>{form.formState.errors.title?.message}</FieldError>
            </Field>
          </FieldSet>

          {/* Image URL */}
          <FieldSet>
            <Field>
              <FieldLabel>
                Image URL <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <Input
                  placeholder="https://example.com/image.jpg"
                  {...form.register("image")}
                />
              </FieldContent>
              <FieldDescription>
                Provide a URL for the service image
              </FieldDescription>
              <FieldError>{form.formState.errors.image?.message}</FieldError>
            </Field>
          </FieldSet>

          {/* Description */}
          <FieldSet>
            <Field>
              <FieldLabel>
                Description <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <Textarea
                  placeholder="Describe your service offering..."
                  className="min-h-[100px] resize-none"
                  {...form.register("description")}
                />
              </FieldContent>
              <FieldDescription>
                Provide a compelling description of the service
              </FieldDescription>
              <FieldError>{form.formState.errors.description?.message}</FieldError>
            </Field>
          </FieldSet>

          {/* Metadata - Show when editing */}
          {serviceData && (
            <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                Metadata
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">
                    Created:
                  </span>{" "}
                  <span className="font-mono">
                    {new Date(
                      serviceData.createdAt,
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    Last updated:
                  </span>{" "}
                  <span className="font-mono">
                    {new Date(
                      serviceData.updatedAt,
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">ID:</span>{" "}
                  <span className="font-mono text-xs">
                    {serviceData._id}
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
              Update Service
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}