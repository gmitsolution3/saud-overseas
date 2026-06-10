"use client";

import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { IService } from "@/types";

interface ServicesClientProps {
  services: IService[];
}

export default function ServicesClient({ services }: ServicesClientProps) {
  return (
    <Section id="services" bg="muted">
      <SectionHeader
        label="Our Services"
        title="Visa & Immigration Services"
        description="A complete suite of services to support every step of your global journey."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service._id} delay={index * 0.06}>
            <article className="group h-full rounded-2xl border border-border bg-background shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-card-hover)]">
              <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-7">
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {service.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                >
                  Learn more{" "}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}