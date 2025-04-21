import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "@/components/ui/heading";
import backgroundImage from "@/assets/backgroundTwo.jpg";

const stats = [
  {
    year: "2024-25 (Upto JAN)",
    offers: 600,
    companies: 50,
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.215, 0.61, 0.355, 1.0],
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.5,
    },
  },
};

const StatCard = ({ title, value, suffix = "", description }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    }}
    className="flex flex-col items-center p-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20"
  >
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Counter end={value} suffix={suffix} />
    </motion.div>
    <motion.h3
      className="mt-3 text-xl font-semibold text-gray-700 dark:text-gray-300 text-center"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      {title}
    </motion.h3>
    {description && (
      <motion.p
        className="mt-2 text-base text-gray-500 dark:text-gray-400 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {description}
      </motion.p>
    )}
  </motion.div>
);

const PlacementStats = ({ className = "" }) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className={`!w-full !py-20 !bg-white dark:!bg-gray-900 ${className}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Enhanced Gradient Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-blue-800/30 to-blue-900/40"
      />

      <div className="!container !mx-auto !px-4 relative z-10">
        <motion.div variants={fadeInUp} className="!text-center !mb-16">
          <Heading size="lg" className="!mb-4 text-white drop-shadow-lg">
            Our <span className="!text-orange-500">Placement</span> Statistics
          </Heading>
          <motion.p
            className="!text-xl !text-gray-100 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Impressive numbers that speak for themselves
          </motion.p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
              },
            },
          }}
          className="max-w-5xl mx-auto"
        >
          <motion.h3
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold text-center mb-10 text-white drop-shadow-md"
          >
            Placements {stats[0].year}
          </motion.h3>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <StatCard
              title="Placement Offers"
              value={stats[0].offers}
              suffix="+"
              description={stats[0].description}
            />
            <StatCard title="Companies" value={stats[0].companies} suffix="+" />
            <StatCard title="Highest CTC" value={stats[0].lpa} suffix=" LPA" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PlacementStats;
