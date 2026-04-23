import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Stats } from "@/components/site/Stats";
import { Categories } from "@/components/site/Categories";
import { WhyUs } from "@/components/site/WhyUs";
import { Standards } from "@/components/site/Standards";
import { Equipment } from "@/components/site/Equipment";
import { Process } from "@/components/site/Process";
import { Terms } from "@/components/site/Terms";
import { Trust } from "@/components/site/Trust";
import { Journal } from "@/components/site/Journal";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { GoldStitchDivider } from "@/components/brand/GoldStitchDivider";

const Index = () => {
  return (
    <main className="min-h-screen bg-ink text-bone">
      <Nav />
      <Hero />
      <Marquee />
      <GoldStitchDivider />
      <Stats />
      <GoldStitchDivider />
      <Categories />
      <GoldStitchDivider />
      <WhyUs />
      <GoldStitchDivider />
      <Standards />
      <GoldStitchDivider />
      <Equipment />
      <GoldStitchDivider />
      <Process />
      <GoldStitchDivider />
      <Terms />
      <GoldStitchDivider />
      <Trust />
      <GoldStitchDivider />
      <Journal />
      <GoldStitchDivider />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
