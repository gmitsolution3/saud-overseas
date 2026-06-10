"use client";

import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import { IGallery } from "@/types";

interface GalleryClientProps {
  galleries: IGallery[];
}

export default function GalleryClient({ galleries }: GalleryClientProps) {
  return (
    <Section id="gallery" bg="muted">
      <SectionHeader
        label="Tour Gallery"
        title="Explore Our Top Destinations"
        description="Discover amazing travel experiences handpicked just for you. Start your journey with our most popular tour packages."
      />
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {galleries.map((gallery, index) => (
          <Reveal key={gallery._id} delay={index * 0.1}>
            <article className="group relative items-start overflow-hidden rounded-2xl bg-background shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
              <div className="relative h-[320px] w-full overflow-hidden md:h-[400px]">
                <Image
                  src={gallery.image}
                  alt={gallery.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="mb-2 flex items-center gap-1 text-sm text-white/80">
                    <MapPin className="h-4 w-4" />
                    <span>{gallery.location}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                    {gallery.title}
                  </h3>
                </div>
              </div>

              <div className="max-h-0 overflow-hidden transition-all duration-500 ease-out group-hover:max-h-48">
                <div className="border-t border-border bg-background p-6 md:p-7">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {gallery.desc}
                  </p>
                  <a
                    href="#contact"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all hover:gap-2"
                  >
                    Explore Package{" "}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}