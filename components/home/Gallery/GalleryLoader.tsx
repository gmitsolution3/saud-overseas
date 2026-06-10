"use client";

import { Section, SectionHeader } from "@/components/Section";

export default function GalleryLoader() {
  return (
    <Section id="gallery" bg="muted">
      <SectionHeader
        label="Tour Gallery"
        title="Explore Our Top Destinations"
        description="Discover amazing travel experiences handpicked just for you. Start your journey with our most popular tour packages."
      />
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="overflow-hidden rounded-2xl bg-background animate-pulse">
            <div className="relative h-[320px] w-full bg-gray-200 md:h-[400px]" />
            <div className="p-6 md:p-7 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-32" />
              <div className="h-6 bg-gray-200 rounded w-48" />
              <div className="pt-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/6" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-28 mt-4" />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}