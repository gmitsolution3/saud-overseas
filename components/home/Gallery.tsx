import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";

const tours = [
  {
    title: "MALAYSIA TOURS",
    location: "Kuala Lumpur, Malaysia",
    image: "/images/malaysia.png", // Replace with your actual image path
    desc: "Experience the vibrant culture, stunning skyline, and diverse landscapes of Malaysia. From the iconic Petronas Twin Towers to the pristine beaches of Langkawi, discover a perfect blend of modernity and tradition.",
  },
  {
    title: "THAILAND TOURS",
    location: "Bangkok, Thailand",
    image: "/images/thailand.png", // Replace with your actual image path
    desc: "Immerse yourself in the Land of Smiles. Explore ancient temples, vibrant street markets, paradise islands, and enjoy world-famous Thai cuisine. Bangkok, Phuket, and Chiang Mai await you.",
  },
  {
    title: "CHINA TOURS",
    location: "Beijing, China",
    image: "/images/china.png", // Replace with your actual image path
    desc: "Discover the rich history and culture of China. Visit the Great Wall, explore ancient temples, and experience the vibrant city life of Beijing and Shanghai.",
  },
  {
    title: "DUBAI TOURS",
    location: "Dubai, UAE",
    image: "/images/dubai.png", // Replace with your actual image path
    desc: "Experience the luxury and excitement of Dubai. From towering skyscrapers to desert adventures, discover the best of this vibrant city.",
  },
];

export default function Gallery() {
  return (
    <Section id="gallery" bg="muted">
      <SectionHeader
        label="Tour Gallery"
        title="Explore Our Top Destinations"
        description="Discover amazing travel experiences handpicked just for you. Start your journey with our most popular tour packages."
      />
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {tours.map((tour, i) => (
          <Reveal key={tour.title} delay={i * 0.1}>
            <article className="group relative items-start overflow-hidden rounded-2xl bg-background shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
              {/* Full-width Image Container */}
              <div className="relative h-[320px] w-full overflow-hidden md:h-[400px]">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={i === 0}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Title overlay - visible at all times */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="mb-2 flex items-center gap-1 text-sm text-white/80">
                    <MapPin className="h-4 w-4" />
                    <span>{tour.location}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                    {tour.title}
                  </h3>
                </div>
              </div>

              {/* Expandable content section - slides up on hover */}
              <div className="max-h-0 overflow-hidden transition-all duration-500 ease-out group-hover:max-h-48">
                <div className="border-t border-border bg-background p-6 md:p-7">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {tour.desc}
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