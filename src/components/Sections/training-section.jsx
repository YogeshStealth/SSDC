"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Database,
  BarChart3,
  MessageSquare,
  LineChart,
  Code2,
  BrainCircuit,
  Megaphone,
  Cloud,
} from "lucide-react";
import Heading from "@/components/ui/heading";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
    rotate: -2,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.6,
    },
  },
};

const iconVariants = {
  hidden: {
    scale: 0,
    rotate: -180,
    opacity: 0,
  },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.1,
    rotate: 360,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  hover: {
    x: 10,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

export default function TrainingCertifications() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const certifications = [
    {
      title: "Microsoft Power BI",
      icon: <BarChart3 className="h-10 w-10 text-white" />,
      color: "bg-gradient-to-br from-cyan-500 to-teal-600",
      description: "Data visualization and business intelligence",
    },
    {
      title: "Aptitude & Soft Skills",
      icon: <MessageSquare className="h-10 w-10 text-white" />,
      color: "bg-gradient-to-br from-orange-400 to-amber-600",
      description: "Communication and problem-solving skills",
    },
    {
      title: "AI & ML",
      icon: <BrainCircuit className="h-10 w-10 text-white" />,
      color: "bg-gradient-to-br from-pink-500 to-rose-600",
      description: "Artificial intelligence and machine learning",
    },
    {
      title: "Digital Marketing",
      icon: <Megaphone className="h-10 w-10 text-white" />,
      color: "bg-gradient-to-br from-blue-500 to-indigo-600",
      description: "SEO, social media, and content marketing",
    },
    {
      title: "Business Analytics",
      icon: <LineChart className="h-10 w-10 text-white" />,
      color: "bg-gradient-to-br from-yellow-400 to-amber-500",
      description: "Data-driven business insights and analysis",
    },
    {
      title: "C, C++, Java, Python with GUI",
      icon: <Code2 className="h-10 w-10 text-white" />,
      color: "bg-gradient-to-br from-green-500 to-emerald-600",
      description: "Programming languages and database skills",
    },
    {
      title: "SAP",
      icon: <Database className="h-10 w-10 text-white" />,
      color: "bg-gradient-to-br from-purple-500 to-violet-600",
      description: "Enterprise resource planning solutions",
    },
    {
      title: "Salesforce",
      icon: <Cloud className="h-10 w-10 text-white" />,
      color: "bg-gradient-to-br from-orange-500 to-red-600",
      description: "CRM platform and cloud solutions",
    },
  ];

  return (
    <div className="py-16 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Heading size="lg" className="mb-4 !text-blue-900">
            Training & <span className="text-orange-500">Certifications</span>
          </Heading>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Enhance your skills with our industry-recognized certification
            programs
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer h-64"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                },
              }}
            >
              <div className={`absolute inset-0 ${cert.color}`}></div>
              <div className="absolute inset-0 bg-black/5"></div>

              <div className="relative h-full p-6 flex flex-col">
                <motion.div
                  className="p-3 rounded-full bg-white/20 w-fit mb-4"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  {cert.icon}
                </motion.div>
                <motion.h3
                  className="text-xl font-bold text-white mb-2"
                  variants={textVariants}
                  whileHover="hover"
                >
                  {cert.title}
                </motion.h3>
                <motion.p
                  className="text-white/80 text-sm"
                  variants={textVariants}
                  whileHover="hover"
                >
                  {cert.description}
                </motion.p>

                <motion.div
                  className="mt-auto flex items-center text-white/90 text-sm font-medium"
                  whileHover={{ x: 10 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                ></motion.div>
              </div>

              <AnimatePresence>
                {hoveredCard === index && (
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      transition: { duration: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
