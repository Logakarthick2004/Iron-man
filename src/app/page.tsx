import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { CinematicReveal } from "@/components/sections/CinematicReveal";
import { SystemsNominal } from "@/components/sections/SystemsNominal";
import { ArmorGallery } from "@/components/sections/ArmorGallery";
import { JarvisTerminal } from "@/components/sections/JarvisTerminal";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CinematicReveal />
        <SystemsNominal />
        <ArmorGallery />
        <JarvisTerminal />
      </main>
      <Footer />
    </>
  );
}
