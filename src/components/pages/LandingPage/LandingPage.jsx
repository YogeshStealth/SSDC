import HeroSection from "@/components/Sections/hero-section";
import LogoSlider from "@/components/Sections/LogoSlider";
import Section from "@/components/layout/SectionWrapper";
import Placements from "@/components/Sections/PlacementStats";
import ProgramSection from "@/components/Sections/ProgramSection";
import Timeline from "@/components/Sections/Timeline";
import CircleView from "@/components/Sections/CircleView";
import TrainingCertifications from "@/components/Sections/training-section";
const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <Section>
        <LogoSlider />
      </Section>
      <Section>
        <Placements />
      </Section>
      <Section>
        <ProgramSection />
      </Section>
      <Section>
        <Timeline />
      </Section>
      <Section>
        <CircleView />
      </Section>
      <Section>
        <TrainingCertifications />
      </Section>
    </div>
  );
};

export default LandingPage;
