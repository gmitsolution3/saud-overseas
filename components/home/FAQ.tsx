import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How long does visa processing take?",
    a: "Processing varies by country and visa type — anywhere from 2 weeks for tourist visas to 4–6 months for permanent residence. Your consultant will share realistic timelines after the eligibility review.",
  },
  {
    q: "What documents are required?",
    a: "Typical requirements include a valid passport, photographs, financial statements, academic or work records, and purpose-specific supporting documents. We provide a personalized checklist for every applicant.",
  },
  {
    q: "Can you help with work permits?",
    a: "Yes — we handle skilled worker visas, employer-sponsored permits, post-study work routes, and intra-company transfers across 50+ destinations.",
  },
  {
    q: "What are consultancy charges?",
    a: "Our fees depend on the visa category and destination, and they are fully disclosed before you commit. The initial consultation is always free.",
  },
  {
    q: "Which countries do you support?",
    a: "We actively process applications for Canada, Australia, the UK, Germany, the UAE, Saudi Arabia, Romania, Serbia and 40+ other destinations.",
  },
];

export default function FAQ() {
  return (
    <Section id="faq">
      <SectionHeader
        label="FAQ"
        title="Frequently asked questions"
        description="Quick answers to the questions we hear most often."
      />
      <Reveal>
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-background p-2 sm:p-4 shadow-[var(--shadow-card)]">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="border-border"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Reveal>
    </Section>
  );
}
