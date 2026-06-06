import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Image from "next/image";

const strengths = [
  "Licensed Consultants",
  "Transparent Process",
  "Personalized Guidance",
  "End-to-End Support",
];

export default function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
              <Image
                src="/images/about-office.jpg"
                alt="Modern consultancy office"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-xl border border-border bg-background p-5 shadow-[var(--shadow-card-hover)] sm:block">
              <p className="text-3xl font-bold text-primary">10+</p>
              <p className="text-sm text-muted-foreground">
                Years of Trusted Service
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="inline-block rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            About Saud Overseas
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.5rem] lg:leading-[1.1]">
            A decade of guiding journeys across borders
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Welcome to Saud Overses, the best travel service in Dhaka
            City! Our areas of expertise are easy visa processing,
            easy airline ticket purchases, and easy hotel booking.
            Situated in the lively Banani neighborhood at House No: 04
            (2nd Floor), Road No: 15, Block No: D, Banani. We are
            committed to providing you with an outstanding travel
            experience. Since obtaining a visa can be challenging and
            time-consuming, Saud Overseas Limited is aware of this and is here to assist you in making the process as smooth as possible. We are dedicated to providing you with the best service and support, ensuring that your travel plans are hassle-free and enjoyable.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {strengths.map((s) => (
              <li
                key={s}
                className="flex items-center gap-3 text-sm font-medium text-foreground"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {s}
              </li>
            ))}
          </ul>

          <Button
            className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <a href="#services">Learn More</a>
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
