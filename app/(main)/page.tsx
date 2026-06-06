import About from "@/components/home/About";
import Destinations from "@/components/home/Destination";
import FAQ from "@/components/home/FAQ";
import Hero from "@/components/home/Hero";
import OurProcess from "@/components/home/OurProcess";
import Services from "@/components/home/Services";
import Stats from "@/components/home/Stats";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Services />
      <Destinations />
      <OurProcess />
      <WhyChooseUs />
      <FAQ />
    </>
  );
}
