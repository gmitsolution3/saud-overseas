import { Reveal } from "@/components/Reveal";
import { Award, FileCheck2, Globe2, TrendingUp } from "lucide-react";
import { SectionHeader } from "../Section";

const items = [
  { icon: Award, value: "1K+", label: "Travel joy" },
  { icon: Globe2, value: "400+", label: "World Tour" },
  {
    icon: FileCheck2,
    value: "5000+",
    label: "City Tour",
  },
  { icon: TrendingUp, value: "98%", label: "Success Rate" },
];

export default function Stats() {
  return (
    <section className="border-y border-border bg-white py-14">
      <div className="mb-5">
        <SectionHeader
          title="Years in this field"
          description="5 Years Of Unforgettable Journeys: Saud Overseas limited- Your Trusted Travel Companion!"
        />
      </div>

      <div className="container mx-auto grid grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:gap-6 lg:px-8">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i * 0.08}>
            <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-background p-5 shadow-[var(--shadow-card)]">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                <it.icon className="h-6 w-6" />
              </span>
              <div className="flex flex-col items-center gap-1">
                <p className="text-2xl font-bold text-foreground sm:text-3xl">
                  {it.value}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
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
