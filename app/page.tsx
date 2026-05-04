import { AnimatedBackground } from "@/components/animated-background";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { CarCards } from "@/components/car-cards";
import { AboutSection } from "@/components/about-section";
import { SocialCards } from "@/components/social-cards";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <Header />
      <HeroSection />
      <div id="fleet">
        <CarCards />
      </div>
      <AboutSection />
      <div id="social">
        <SocialCards />
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
