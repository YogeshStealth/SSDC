import React from "react";
import { motion } from "framer-motion";
import Heading from "@/components/ui/heading";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

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
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className={`w-full py-20 mt-2 bg-gray-200 dark:bg-gray-900 ${className}`}
    >
      <div className="container mx-auto px-4">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <Heading size="lg" className="mb-4">
            Some of Our <span className="text-orange-500">Major</span>{" "}
            Recruiters
          </Heading>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We are proud to partner with leading companies across industries
          </p>
        </motion.div>

        <motion.div
          variants={scaleIn}
          className="relative w-full overflow-hidden"
        >
          <motion.div
            className="flex animate-marquee"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {logos.map((logo, index) => (
              <motion.div
                key={`${logo.alt}-${index}`}
                whileHover={{ scale: 1.1 }}
                className="flex-shrink-0 mx-4 md:mx-8"
              >
                <motion.img
                  src={logo.src}
                  alt={logo.alt}
                  whileHover={{
                    scale: 1.1,
                    filter: "grayscale(0%)",
                    transition: { duration: 0.3 },
                  }}
                  className="h-16 md:h-20 w-auto object-contain grayscale"
                />
              </motion.div>
            ))}
            {/* Duplicate logos for seamless loop */}
            {logos.map((logo, index) => (
              <motion.div
                key={`${logo.alt}-${index}-duplicate`}
                whileHover={{ scale: 1.1 }}
                className="flex-shrink-0 mx-4 md:mx-8"
              >
                <motion.img
                  src={logo.src}
                  alt={logo.alt}
                  whileHover={{
                    scale: 1.1,
                    filter: "grayscale(0%)",
                    transition: { duration: 0.3 },
                  }}
                  className="h-16 md:h-20 w-auto object-contain grayscale"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LogoSlider;
