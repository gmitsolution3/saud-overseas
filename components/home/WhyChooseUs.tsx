import {
  Award, Clock, Globe2, HeartHandshake, ShieldCheck, TrendingUp,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

const features = [
  { icon: Award, title: "Experienced Consultants", desc: "Decades of combined experience across visa categories." },
  { icon: TrendingUp, title: "High Success Rate", desc: "98% of our applications result in approved visas." },
  { icon: ShieldCheck, title: "Transparent Fees", desc: "Clear pricing — no hidden charges, ever." },
  { icon: Clock, title: "Fast Processing", desc: "Streamlined workflow that respects your timeline." },
  { icon: HeartHandshake, title: "Dedicated Support", desc: "A personal case manager from start to finish." },
  { icon: Globe2, title: "Global Opportunities", desc: "Access to 50+ countries and dozens of programs." },
];

export default function WhyChooseUs() {
  return (
    <Section id="why">
      <SectionHeader
        label="Why Choose Us"
        title="Built on trust, delivered with care"
        description="Six reasons clients return to Visora and refer their families."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.05}>
            <div className="h-full rounded-2xl border border-border bg-background p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-card-hover)]">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary-soft text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-base font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
