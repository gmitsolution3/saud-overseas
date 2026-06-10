import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import CtaBanner from "@/components/home/CtaBanner";
import Destinations from "@/components/home/Destinations/Destinations";
import FAQ from "@/components/home/FAQ";
import Gallery from "@/components/home/Gallery/Gallery";
import Hero from "@/components/home/Hero";
import OurProcess from "@/components/home/OurProcess";
import Services from "@/components/home/Services/Services";
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
      <Gallery />
      <FAQ />
      <CtaBanner />
      <Contact />
    </>
  );
}
