import BgGradient from "@/components/common/BgGradient";
import Header from "@/components/common/Header";
import CTASection from "@/components/home/CTASection";
import DemoSection from "@/components/home/DemoSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import PricingSection from "@/components/home/PricingSection";

export default function Home() {
  return (
    <>
      <Header />
      <div className="relative w-full">
        <BgGradient />

        <div className="flex flex-col">
          <HeroSection />
          <DemoSection />
          <HowItWorksSection />
          <PricingSection />
          <CTASection />
        </div>

      </div>
    </>
  );
}
