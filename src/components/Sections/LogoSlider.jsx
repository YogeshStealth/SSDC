import React from "react";
import Heading from "@/components/ui/heading";

const logos = [
  { src: "/src/assets/placement-logos/zamoto.png", alt: "Zomato" },
  { src: "/src/assets/placement-logos/zudio.png", alt: "Zudio" },
  {
    src: "/src/assets/placement-logos/profectus-capital.png",
    alt: "Profectus Capital",
  },
  { src: "/src/assets/placement-logos/nestle.png", alt: "Nestle" },
  { src: "/src/assets/placement-logos/oxane.png", alt: "Oxane" },
  { src: "/src/assets/placement-logos/metrics.png", alt: "Metrics" },
  { src: "/src/assets/placement-logos/me-plus.png", alt: "Me Plus" },
  { src: "/src/assets/placement-logos/kpmg.png", alt: "KPMG" },
  {
    src: "/src/assets/placement-logos/godrej-jersey.png",
    alt: "Godrej Jersey",
  },
  { src: "/src/assets/placement-logos/itc.png", alt: "ITC" },
  { src: "/src/assets/placement-logos/fact.png", alt: "FACT" },
  { src: "/src/assets/placement-logos/deloitte.png", alt: "Deloitte" },
  { src: "/src/assets/placement-logos/codeyoung.png", alt: "CodeYoung" },
  { src: "/src/assets/placement-logos/berkadia.png", alt: "Berkadia" },
  { src: "/src/assets/placement-logos/asian-paints.png", alt: "Asian Paints" },
];

const LogoSlider = ({ className = "" }) => {
  return (
    <section
      className={`w-full py-20 mt-2 bg-gray-200 dark:bg-gray-900 ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Heading size="lg" className="mb-4">
            Some of Our <span className="text-orange-500">Major</span>{" "}
            Recruiters
          </Heading>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We are proud to partner with leading companies across industries
          </p>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee">
            {logos.map((logo, index) => (
              <div
                key={`${logo.alt}-${index}`}
                className="flex-shrink-0 mx-4 md:mx-8"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
            {/* Duplicate logos for seamless loop */}
            {logos.map((logo, index) => (
              <div
                key={`${logo.alt}-${index}-duplicate`}
                className="flex-shrink-0 mx-4 md:mx-8"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoSlider;
