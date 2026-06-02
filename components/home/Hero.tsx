"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    title: "Your Gateway To",
    highlightedText: "Global Opportunities",
    description:
      "From study visas and work permits to tourist travel and full immigration support — our licensed consultants guide you through every step of your international journey.",
    badgeText: "Trusted Visa Consultancy",
    image: "/images/hero_one.png",
    stats: [
      { k: "10+", v: "Years Experience" },
      { k: "5000+", v: "Applications" },
      { k: "98%", v: "Satisfaction" },
    ],
  },
  {
    id: 2,
    title: "Your Journey Starts",
    highlightedText: "Right Here",
    description:
      "Expert guidance for student visas, work permits, and permanent residency. Let us help you achieve your international dreams with personalized support.",
    badgeText: "100% Success Rate",
    image: "/images/hero_two.png",
    stats: [
      { k: "20+", v: "Countries" },
      { k: "1500+", v: "Students Placed" },
      { k: "95%", v: "Visa Success" },
    ],
  },
  {
    id: 3,
    title: "Expert Immigration",
    highlightedText: "Solutions",
    description:
      "Navigate complex visa processes with confidence. Our certified consultants provide end-to-end support for all your immigration needs.",
    badgeText: "Licensed Consultants",
    image: "/images/hero_three.png",
    stats: [
      { k: "15+", v: "Experts" },
      { k: "8000+", v: "Happy Clients" },
      { k: "24/7", v: "Support" },
    ],
  },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* subtle gradient bg */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 0%, color-mix(in oklab, var(--primary) 8%, transparent) 0%, transparent 70%), radial-gradient(50% 50% at 100% 30%, color-mix(in oklab, var(--primary) 6%, transparent) 0%, transparent 70%)",
        }}
      />

      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        className="h-full w-full"
        style={{ position: "relative", zIndex: 1 }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative min-h-screen lg:min-h-screen w-full"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Content container */}
              <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex items-center min-h-screen lg:min-h-screen">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="max-w-xl lg:max-w-2xl text-center lg:text-left"
                  >
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur-sm px-3 py-1 text-xs font-medium text-primary">
                      {slide.badgeText}
                    </span>
                    <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                      {slide.title}{" "}
                      <span className="text-primary">
                        {slide.highlightedText}
                      </span>
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-white sm:text-lg">
                      {slide.description}
                    </p>
                    <div className="mt-8 flex justify-center lg:justify-start flex-wrap gap-3">
                      <Button
                        size="lg"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                        asChild
                      >
                        <a href="#contact">
                          Book Consultation{" "}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-0 text-primary backdrop-blur-sm transition-all duration-300"
                        asChild
                      >
                        <a href="#services">Explore Services</a>
                      </Button>
                    </div>

                    <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border/50 pt-8 max-w-lg">
                      {slide.stats.map((stat) => (
                        <div key={stat.v}>
                          <dt className="text-2xl font-bold text-white sm:text-3xl">
                            {stat.k}
                          </dt>
                          <dd className="mt-1 text-xs text-white sm:text-sm">
                            {stat.v}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination styles */}
      <style jsx global>{`
        .swiper-pagination {
          position: absolute;
          bottom: 2rem !important;
          left: 0 !important;
          right: 0 !important;
          width: 100% !important;
          z-index: 99 !important;
          pointer-events: auto !important;
        }

        .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          margin: 0 6px !important;
          transition: all 0.3s ease !important;
          background-color: white !important;
          opacity: 0.6 !important;
          cursor: pointer !important;
          pointer-events: auto !important;
        }

        .swiper-pagination-bullet-active {
          width: 24px !important;
          border-radius: 4px !important;
          background-color: var(--primary) !important;
          opacity: 1 !important;
        }

        /* Ensure bullets are clickable */
        .swiper-pagination-bullet:hover {
          opacity: 1 !important;
        }

        /* Remove the padding-bottom from swiper container */
        .swiper {
          padding-bottom: 0 !important;
        }

        /* Ensure swiper container doesn't block clicks */
        .swiper-wrapper,
        .swiper-slide {
          pointer-events: auto;
        }

        /* Make sure fade effect doesn't create click-blocking layers */
        .swiper-slide {
          pointer-events: none;
        }

        .swiper-slide-active {
          pointer-events: auto;
        }
      `}</style>
    </section>
  );
}
