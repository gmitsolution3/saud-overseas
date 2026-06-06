import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { ArrowUpRight } from "lucide-react";

const countries = [
  {
    name: "Canada",
    img: "/images/country-canada.jpg",
    cats: ["Student", "Work", "PR"],
  },
  {
    name: "Australia",
    img: "/images/country-australia.jpg",
    cats: ["Student", "Skilled Work", "PR"],
  },
  {
    name: "United Kingdom",
    img: "/images/country-uk.jpg",
    cats: ["Student", "Work", "Visitor"],
  },
  {
    name: "Germany",
    img: "/images/country-germany.jpg",
    cats: ["Student", "Job Seeker", "Work"],
  },
  {
    name: "UAE",
    img: "/images/country-uae.jpg",
    cats: ["Work", "Business", "Tourist"],
  },
  {
    name: "Saudi Arabia",
    img: "/images/country-saudi.jpg",
    cats: ["Work", "Business", "Visit"],
  },
  {
    name: "Romania",
    img: "/images/country-romania.jpg",
    cats: ["Work", "Study", "Residence"],
  },
  {
    name: "Serbia",
    img: "/images/country-serbia.jpg",
    cats: ["Work", "Residence", "Business"],
  },
];

export default function Destinations() {
  return (
    <Section id="countries">
      <SectionHeader
        label="Destinations"
        title="Popular Visa Destinations"
        description="We process applications for 50+ countries worldwide — here are the most requested."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {countries.map((c, i) => (
          <Reveal key={c.name} delay={(i % 4) * 0.06}>
            <article className="group overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.name}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-foreground">
                  {c.name}
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {c.cats.map((t) => (
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
