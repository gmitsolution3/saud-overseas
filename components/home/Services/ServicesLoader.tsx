"use client";

import { Section, SectionHeader } from "@/components/Section";

export default function ServicesLoader() {
  return (
    <Section id="services" bg="muted">
      <SectionHeader
        label="Our Services"
        title="Visa & Immigration Services"
        description="A complete suite of services to support every step of your global journey."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-full rounded-2xl border border-border bg-background animate-pulse">
            <div className="relative h-48 w-full rounded-t-2xl bg-gray-200" />
            <div className="p-7 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/6" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-24 mt-5" />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}