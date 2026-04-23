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

const Index = () => {
  return (
    <main className="min-h-screen bg-ink text-bone">
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <Categories />
      <WhyUs />
      <Standards />
      <Equipment />
      <Process />
      <Terms />
      <Trust />
      <Journal />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
