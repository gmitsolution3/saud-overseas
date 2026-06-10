"use client";

import { Section, SectionHeader } from "@/components/Section";

export default function DestinationsLoader() {
  return (
    <Section id="countries">
      <SectionHeader
        label="Destinations"
        title="Popular Visa Destinations"
        description="We process applications for 50+ countries worldwide — here are the most requested."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-border bg-background animate-pulse">
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-200" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="flex flex-wrap gap-1.5">
                <div className="h-5 bg-gray-200 rounded-full w-16" />
                <div className="h-5 bg-gray-200 rounded-full w-20" />
                <div className="h-5 bg-gray-200 rounded-full w-14" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-20 mt-4" />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}