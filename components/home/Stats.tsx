import { Reveal } from "@/components/Reveal";
import { Award, FileCheck2, Globe2, TrendingUp } from "lucide-react";

const items = [
  { icon: Award, value: "10+", label: "Years Experience" },
  {
    icon: FileCheck2,
    value: "5000+",
    label: "Successful Applications",
  },
  { icon: Globe2, value: "50+", label: "Destination Countries" },
  { icon: TrendingUp, value: "98%", label: "Success Rate" },
];

export default function Stats() {
  return (
    <section className="border-y border-border bg-section py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:gap-6 lg:px-8">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i * 0.08}>
            <div className="flex items-center gap-4 rounded-xl border border-border bg-background p-5 shadow-[var(--shadow-card)]">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                <it.icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-2xl font-bold text-foreground sm:text-3xl">
                  {it.value}
                </p>
                <p className="text-sm text-muted-foreground">
                  {it.label}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
