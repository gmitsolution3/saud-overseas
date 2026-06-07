import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const services = [
  {
    title: "Visa Processing",
    image: "/images/service.png",
    desc: "Welcome to Saud Overseas, your reliable partner for services related to obtaining a visa. At Saud Global, we are aware that securing a visa may frequently be a difficult and drawn-out procedure with numerous requirements and documentation. This is where our knowledgeable staff can help; they are dedicated to making the visa application procedure as simple and hassle-free.",
  },
  {
    title: "Work Permit Visa",
    image: "/images/service_two.png",
    desc: "United Saud Global Limited is a brand of United Saud Group and it is the fast and secure Online Travel Agency (OTA) in Bangladesh. Fare | United Saud Global Limited can solve and take care your Hotel Booking, Flight Booking and Car rental services in Bangladesh. We have dedicated 24/7 support team for provide your any accommodations and travel solutions.",
  },
  {
    title: "Tourist Visa",
    image: "/images/service_three.png",
    desc: "Fare.com.bd is a brand of United Saud Group and it is the fast and secure Online Travel Agency (OTA) in Bangladesh. Fare.com.bd can solve and take care your Hotel Booking, Flight Booking and Car rental services in Bangladesh. We have dedicated 24/7 support team for provide your any accommodations and travel solutions. With Fare.com.bd website, you can easily book any domestic.",
  },
];

export default function Services() {
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
            <article className="group h-full rounded-2xl border border-border bg-background shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-card-hover)]">
              {/* Image instead of icon */}
              <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-7">
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
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
