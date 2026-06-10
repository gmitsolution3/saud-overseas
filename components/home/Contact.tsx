"use client";

import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { contact } from "@/config/contact";
import { usePost } from "@/hooks/swr/usePost";
import { notify } from "@/utils/notify";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const info = [
  { icon: Phone, label: "Phone", value: contact.phone },
  { icon: Mail, label: "Email", value: contact.email },
  {
    icon: MapPin,
    label: "Office",
    value: contact.address,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Sat · 9:00 AM – 7:00 PM",
  },
];

// Form validation schema
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(20, "Phone number must not exceed 20 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  visa_type: z.string().optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must not exceed 1000 characters")
    .optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { mutate: postContact, isLoading } = usePost("/contacts", {
    revalidateKey: "/contacts",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      visa_type: "",
      message: "",
    },
  });

  const selectedVisaType = watch("visa_type");

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await postContact(data);

      if (response.success) {
        reset();
        notify.success(
          "Thanks — we'll be in touch within one business day."
        );
      } else {
        notify.error(
          response.message || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      console.error(error);
      notify.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Section id="contact">
      <SectionHeader
        label="Contact"
        title="Let's plan your journey together"
        description="Tell us about your goals — a licensed consultant will reach out shortly."
      />
      <div className="mt-14 grid gap-8 lg:grid-cols-5 lg:gap-12">
        <Reveal className="lg:col-span-3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl border border-border bg-background p-6 shadow-[var(--shadow-card)] sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="name"
                label="Full Name"
                required
                error={errors.name?.message}
              >
                <Input
                  id="name"
                  placeholder="Jane Doe"
                  {...register("name")}
                />
              </Field>
              <Field
                id="phone"
                label="Phone"
                required
                error={errors.phone?.message}
              >
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 555 000 0000"
                  {...register("phone")}
                />
              </Field>
              <Field
                id="email"
                label="Email"
                required
                error={errors.email?.message}
                className="sm:col-span-2"
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="you@email.com"
                  {...register("email")}
                />
              </Field>
              <Field
                id="visa"
                label="Visa Type"
                className="sm:col-span-2"
              >
                <Select
                  onValueChange={(value) => setValue("visa_type", value)}
                  value={selectedVisaType}
                >
                  <SelectTrigger id="visa">
                    <SelectValue placeholder="Select a visa type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student Visa">
                      Student Visa
                    </SelectItem>
                    <SelectItem value="Work Permit">
                      Work Permit
                    </SelectItem>
                    <SelectItem value="Tourist Visa">
                      Tourist Visa
                    </SelectItem>
                    <SelectItem value="Business Visa">
                      Business Visa
                    </SelectItem>
                    <SelectItem value="Immigration">
                      Immigration
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field
                id="message"
                label="Message"
                error={errors.message?.message}
                className="sm:col-span-2"
              >
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us a bit about your situation…"
                  {...register("message")}
                />
              </Field>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
            >
              {isLoading ? "Sending…" : "Send Message"}
            </Button>
          </form>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-section p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-foreground">
              Get in touch
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Prefer to call or visit? Reach us through any of the
              channels below.
            </p>
            <ul className="mt-6 space-y-5">
              {info.map((i) => (
                <li key={i.label} className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                    <i.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {i.label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">
                      {i.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  id,
  label,
  required,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-foreground"
      >
        {label} {required && <span className="text-primary">*</span>}
      </Label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}