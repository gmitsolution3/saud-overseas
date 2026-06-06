import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

export default function CtaBanner() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-primary-foreground sm:px-12 sm:py-20"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)",
                backgroundSize: "48px 48px, 64px 64px",
              }}
            />
            <div className="relative mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.5rem]">
                Ready To Start Your International Journey?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base opacity-90 sm:text-lg">
                Speak with our consultants and receive personalized guidance tailored to your goals.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button
                  size="lg"
                  className="bg-background text-foreground hover:bg-background/90"
                  asChild
                >
                  <a href="#contact">Book Consultation</a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                  asChild
                >
                  <a href="tel:+10000000000"><Phone className="mr-2 h-4 w-4" /> Call Now</a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
