"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Heading from "@/components/ui/heading";

const items = [
  {
    id: "01",
    color: "bg-[#0077b6]",
    title: "In-Demand Certifications Programs",
    description: "",
    angle: 36, //angle: 180, // Left side
  },
  {
    id: "02",
    color: "bg-[#00b4d8]",
    title: "Experiential Learning",
    description: "",
    angle: 108, //angle: 252, // Bottom left
  },
  {
    id: "03",
    color: "bg-[#ff0080]",
    title: "Industry Engagement with Top Professionals",
    description: "",
    boldDescription: true, // Bottom right angle: 324,
    angle: 180,
  },
  {
    id: "04",
    color: "bg-[#e76f51]",
    title: "Guest Lectures by Industry Experts",

    angle: 252, //angle: 36, // Top right
  },
  {
    id: "05",
    color: "bg-[#4a1e9e]",
    title: "Holistic Wellness Program",

    angle: 324, //angle: 108, // Right side
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    x: -50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const numberVariants = {
  hidden: {
    scale: 0,
    rotate: -180,
  },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
};

export default function CircleView() {
  const [isHovering, setIsHovering] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="relative w-full max-w-3xl mx-auto lg:pt-8">
      <div className="text-center mb-12">
        <Heading size="lg" className="mb-4 pt-12 md:pt-4 !text-blue-900">
          What Sets <span className="text-orange-500">SSDCH Apart</span>
        </Heading>
      </div>

      {/* Desktop View - Circle */}
      <div className="hidden lg:block">
        <div
          className="relative aspect-square"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <svg
            viewBox="-300 -300 600 600"
            className={cn(
              "w-full h-full transition-transform duration-700 ease-in-out",
              isHovering ? "rotate-[360deg]" : ""
            )}
          >
            {/* Segments */}
            {items.map((item, index) => {
              const startAngle = (index * 72 * Math.PI) / 180;
              const endAngle = ((index + 1) * 72 * Math.PI) / 180;

              const innerRadius = 100;
              const outerRadius = 250;

              const x1 = innerRadius * Math.cos(startAngle);
              const y1 = innerRadius * Math.sin(startAngle);

              const x2 = outerRadius * Math.cos(startAngle);
              const y2 = outerRadius * Math.sin(startAngle);

              const x3 = outerRadius * Math.cos(endAngle);
              const y3 = outerRadius * Math.sin(endAngle);

              const x4 = innerRadius * Math.cos(endAngle);
              const y4 = innerRadius * Math.sin(endAngle);

              // For the number position
              const numX =
                (innerRadius + (outerRadius - innerRadius) * 0.6) *
                Math.cos((startAngle + endAngle) / 2);
              const numY =
                (innerRadius + (outerRadius - innerRadius) * 0.6) *
                Math.sin((startAngle + endAngle) / 2);

              const path = `
                M ${x1} ${y1}
                L ${x2} ${y2}
                A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3}
                L ${x4} ${y4}
                A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}
              `;

              return (
                <g key={item.id}>
                  <path
                    d={path}
                    fill={item.color.replace("bg-[", "").replace("]", "")}
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x={numX}
                    y={numY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="40"
                    fontWeight="bold"
                  >
                    {item.id}
                  </text>
                </g>
              );
            })}

            {/* Center circle */}
            <circle
              cx="0"
              cy="0"
              r="100"
              fill="white"
              stroke="white"
              strokeWidth="2"
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-center">
              <img
                src="https://ssdc.ac.in/wp-content/uploads/2023/03/Logo-icon.svg"
                alt="logo"
                className="w-32 h-32"
              />
            </div>
          </div>

          {/* Text descriptions */}
          <div className="absolute inset-0 pointer-events-none">
            {items.map((item) => {
              // Convert angle to radians
              const angleRad = (item.angle * Math.PI) / 180;

              // Calculate position based on angle
              const distance = 350;
              const x = Math.cos(angleRad) * distance;
              const y = Math.sin(angleRad) * distance;

              // Determine text alignment based on position
              let textAlign = "left";
              let translateX = 0;

              if (item.angle > 90 && item.angle < 270) {
                textAlign = "right";
                translateX = -100;
              } else {
                textAlign = "left";
                translateX = 0;
              }

              return (
                <div
                  key={`text-${item.id}`}
                  className="absolute max-w-[250px] text-sm"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: `translate(${translateX}%, -50%)`,
                    textAlign: textAlign,
                  }}
                >
                  <div className="font-medium text-lg">
                    {item.boldTitle ? (
                      <strong>{item.title}</strong>
                    ) : (
                      item.title
                    )}
                  </div>
                  <div>
                    {item.boldDescription ? (
                      <strong>{item.description}</strong>
                    ) : (
                      item.description
                    )}
                    {item.additionalText && ` ${item.additionalText}`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile View - Cards */}
      <motion.div
        className="lg:hidden px-4 py-8 space-y-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            whileHover={{
              scale: 1.02,
              transition: { type: "spring", stiffness: 400 },
            }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setActiveCard(index)}
            onHoverEnd={() => setActiveCard(null)}
          >
            <motion.div
              className={`${item.color} p-6 rounded-xl shadow-lg text-white overflow-hidden relative`}
              animate={{
                boxShadow:
                  activeCard === index
                    ? "0 20px 25px -5px rgba(0, 0, 0, 0.2)"
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-white/10 opacity-0"
                animate={{ opacity: activeCard === index ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
              <div className="flex items-start gap-4 relative z-10">
                <motion.div
                  className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold flex-shrink-0"
                  variants={numberVariants}
                >
                  {item.id}
                </motion.div>
                <div className="flex-1">
                  <motion.h3
                    className="text-xl font-bold mb-2"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {item.boldTitle ? (
                      <strong>{item.title}</strong>
                    ) : (
                      item.title
                    )}
                  </motion.h3>
                  <motion.p
                    className="text-base text-white/90"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {item.boldDescription ? (
                      <strong>{item.description}</strong>
                    ) : (
                      item.description
                    )}
                    {item.additionalText && (
                      <motion.span
                        className="block mt-2 text-white/80"
                        whileHover={{ opacity: 1 }}
                      >
                        {item.additionalText}
                      </motion.span>
                    )}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
