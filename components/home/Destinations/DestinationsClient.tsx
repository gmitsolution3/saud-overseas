"use client";

import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { ArrowUpRight } from "lucide-react";
import { IDestination } from "@/types";
import Image from "next/image";

interface DestinationsClientProps {
  destinations: IDestination[];
}

export default function DestinationsClient({ destinations }: DestinationsClientProps) {
  return (
    <Section id="countries">
      <SectionHeader
        label="Destinations"
        title="Popular Visa Destinations"
        description="We process applications for 50+ countries worldwide — here are the most requested."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {destinations.map((destination, index) => (
          <Reveal key={destination._id} delay={(index % 4) * 0.06}>
            <article className="group overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={destination.img}
                  alt={destination.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-foreground">
                  {destination.name}
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {destination.cats.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                >
                  Explore <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}