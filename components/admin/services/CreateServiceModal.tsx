// components/admin-dashboard/modals/CreateServiceModal.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { usePost } from "@/hooks/swr/usePost";
import Swal from "sweetalert2";

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

interface CreateServiceModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function CreateServiceModal({
  isModalOpen,
  setIsModalOpen,
  onSuccess,
}: CreateServiceModalProps) {
  const { mutate: postData, isLoading } = usePost("/services", {
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

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await postData(data);

      if (response.success) {
        setIsModalOpen(false);
        form.reset();
        onSuccess?.();

        await Swal.fire({
          title: "Success!",
          text: "Service created successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await Swal.fire({
          title: "Error",
          text: response.message || "Failed to create service",
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
            Create New Service
          </DialogTitle>
          <DialogDescription>
            Add a new service offering to showcase what you provide.
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

          {/* Live Preview Card */}
          {form.watch("title") && (
            <div className="rounded-lg border bg-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Live Preview</h4>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded bg-primary/10 flex items-center justify-center overflow-hidden">
                  {form.watch("image") ? (
                    <img
                      src={form.watch("image")}
                      alt={form.watch("title")}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-semibold text-primary">
                      {form.watch("title").charAt(0)}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{form.watch("title")}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {form.watch("description") || "Description will appear here"}
                  </p>
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
              Create Service
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}