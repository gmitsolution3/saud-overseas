import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";

const steps = [
  {
    n: "01",
    title: "Free Consultation",
    desc: "Discuss your goals with a licensed advisor at no cost.",
  },
  {
    n: "02",
    title: "Eligibility Assessment",
    desc: "We evaluate your profile and shortlist the strongest pathways.",
  },
  {
    n: "03",
    title: "Documentation",
    desc: "We prepare every document with care, accuracy and full transparency.",
  },
  {
    n: "04",
    title: "Application Submission",
    desc: "We file with the embassy and track your file end to end.",
  },
  {
    n: "05",
    title: "Visa Approval",
    desc: "Receive your decision and prepare for your journey abroad.",
  },
];

export default function OurProcess() {
  return (
    <Section id="process" bg="muted">
      <SectionHeader
        label="Our Process"
        title="How We Work"
        description="A clear, structured journey from first conversation to visa approval."
      />

      <div className="relative mt-16">
        <div
          aria-hidden
          className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border lg:block"
        />
        <ol className="space-y-10 lg:space-y-16">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <li className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
                <div
                  className={`${i % 2 ? "lg:order-2 lg:text-left" : "lg:text-right"}`}
                >
                  <span className="text-sm font-semibold text-primary">
                    STEP {s.n}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold text-foreground sm:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {s.desc}
                  </p>
                </div>
                <div
                  className={`relative flex ${i % 2 ? "lg:order-1 lg:justify-end" : "lg:justify-start"}`}
                >
                  <div className="grid h-16 w-16 place-items-center rounded-full border-4 border-section bg-primary text-lg font-bold text-primary-foreground shadow-[var(--shadow-card-hover)]">
                    {s.n}
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
