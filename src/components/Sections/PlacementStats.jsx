import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Heading from "@/components/ui/heading";
import backgroundImage from "@/assets/backgroundTwo.jpg";

const stats = [
  {
    year: "2023-24",
    offers: 839,
    worldCampus: 48,
    lpa: 7.5,
    description: "for 365 Students",
  },
  {
    year: "2024-25 (Upto JAN)",
    offers: 600,
    worldCampus: 30,
    lpa: 6.5,
    description: "for 165 Students",
  },
];

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting];
};

const Counter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true,
  });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.min(Math.floor(end * progress), end));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
        hasAnimated.current = true;
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isInView]);

  return (
    <span ref={ref} className="text-4xl md:text-4xl font-bold text-orange-500">
      {count}
      {suffix}
    </span>
  );
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const StatCard = ({ title, value, suffix = "", description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex flex-col items-center p-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg"
  >
    <Counter end={value} suffix={suffix} />
    <h3 className="mt-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
      {title}
    </h3>
    {description && (
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
    )}
  </motion.div>
);

const YearStats = ({ data, isOld = false }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={isOld ? fadeInLeft : fadeInRight}
    className={`w-full md:w-1/2 px-4 ${isOld ? "hidden md:block" : ""}`}
  >
    <motion.h3
      variants={fadeInUp}
      className="text-xl md:text-2xl font-bold text-center mb-6 text-white drop-shadow-md"
    >
      Placements {data.year}
    </motion.h3>
    <motion.div
      variants={scaleIn}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      <StatCard
        title="Placement Offers"
        value={data.offers}
        description={data.description}
      />
      <StatCard title="World Campus" value={data.worldCampus} suffix="+" />
      <StatCard title="Highest CTC" value={data.lpa} suffix=" LPA" />
    </motion.div>
  </motion.div>
);

const VerticalDivider = () => (
  <motion.div
    initial={{ scaleY: 0 }}
    whileInView={{ scaleY: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1, ease: "easeOut" }}
    className="hidden md:block w-px bg-orange-500 mx-8 self-stretch opacity-100"
  />
);

const PlacementStats = ({ className = "" }) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className={`w-full py-20 relative ${className}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Gradient Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-blue-800/30"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <Heading size="lg" className="mb-4 text-white drop-shadow-md">
            Our Placement <span className="text-orange-500">Statistics</span>
          </Heading>
          <p className="text-lg text-gray-100">
            Track record of successful placements and career opportunities
          </p>
        </motion.div>

        <motion.div
          variants={scaleIn}
          className="flex flex-col md:flex-row items-stretch"
        >
          <YearStats data={stats[0]} isOld={true} />
          <VerticalDivider />
          <YearStats data={stats[1]} />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PlacementStats;
