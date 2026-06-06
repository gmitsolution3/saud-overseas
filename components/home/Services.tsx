import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import {
  ArrowUpRight,
  Briefcase,
  FileText,
  GraduationCap,
  Plane,
  ScrollText,
  Users,
} from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "Student Visa",
    desc: "Pathways into top universities across Canada, the UK, Australia, Germany and more.",
  },
  {
    icon: Briefcase,
    title: "Work Permit Visa",
    desc: "Skilled worker programs, employer-sponsored visas and post-study work routes.",
  },
  {
    icon: Plane,
    title: "Tourist Visa",
    desc: "Short-stay travel visas with fast, accurate documentation and itinerary support.",
  },
  {
    icon: ScrollText,
    title: "Business Visa",
    desc: "Visas for investors, entrepreneurs and corporate travel into key global markets.",
  },
  {
    icon: Users,
    title: "Immigration Consultancy",
    desc: "Permanent residency, family sponsorship and long-term settlement planning.",
  },
  {
    icon: FileText,
    title: "Document Processing",
    desc: "End-to-end paperwork, attestations, translations and embassy submissions.",
  },
];

export function Services() {
  return (
    <Section id="services" bg="muted">
      <SectionHeader
        label="Our Services"
        title="Visa & Immigration Services"
        description="A complete suite of services to support every step of your global journey."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06}>
            <article className="group h-full rounded-2xl border border-border bg-background p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-card-hover)]">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary"
              >
                Learn more{" "}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
