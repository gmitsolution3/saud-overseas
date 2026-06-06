import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Stats from "@/components/home/Stats";
import { Services } from "@/components/home/Services";
import { Destinations } from "@/components/home/Destination";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Services />
      <Destinations />
    </>
  );
}
