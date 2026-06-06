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
import { notify } from "@/utils/notify";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

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

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      notify.success(
        "Thanks — we'll be in touch within one business day.",
      );
    }, 700);
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
            onSubmit={onSubmit}
            className="rounded-2xl border border-border bg-background p-6 shadow-[var(--shadow-card)] sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Full Name" required>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Jane Doe"
                />
              </Field>
              <Field id="phone" label="Phone" required>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+1 555 000 0000"
                />
              </Field>
              <Field
                id="email"
                label="Email"
                required
                className="sm:col-span-2"
              >
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                />
              </Field>
              <Field
                id="visa"
                label="Visa Type"
                className="sm:col-span-2"
              >
                <Select name="visa">
                  <SelectTrigger id="visa">
                    <SelectValue placeholder="Select a visa type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">
                      Student Visa
                    </SelectItem>
                    <SelectItem value="work">Work Permit</SelectItem>
                    <SelectItem value="tourist">
                      Tourist Visa
                    </SelectItem>
                    <SelectItem value="business">
                      Business Visa
                    </SelectItem>
                    <SelectItem value="immigration">
                      Immigration
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field
                id="message"
                label="Message"
                className="sm:col-span-2"
              >
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us a bit about your situation…"
                />
              </Field>
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
            >
              {submitting ? "Sending…" : "Send Message"}
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
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
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
    </div>
  );
}
