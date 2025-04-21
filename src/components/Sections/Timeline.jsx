"use client";

import { useState } from "react";
import {
  Lightbulb,
  BookOpen,
  Rocket,
  Search,
  PresentationIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Heading from "@/components/ui/heading";
import { motion } from "framer-motion";

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

export default function Timeline() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const methodologies = [
    {
      title: "Case Studies",
      description:
        "Learn from real-world scenarios and industry examples to develop critical thinking and problem-solving skills.",
      icon: <Lightbulb className="h-8 w-8" />,
      color: "bg-orange-500",
      textColor: "text-white",
    },
    {
      title: "Workshops",
      description:
        "Hands-on sessions led by industry experts to master practical skills and techniques relevant to your field.",
      icon: <BookOpen className="h-8 w-8" />,
      color: "bg-red-500",
      textColor: "text-white",
    },
    {
      title: "Realtime Projects",
      description:
        "Work on live projects with actual clients to gain authentic experience and build your professional portfolio.",
      icon: <Rocket className="h-8 w-8" />,
      color: "bg-gray-600",
      textColor: "text-white",
    },
    {
      title: "Research Methodology",
      description:
        "Learn systematic approaches to investigation and inquiry, developing skills in data collection and analysis.",
      icon: <Search className="h-8 w-8" />,
      color: "bg-blue-300",
      textColor: "text-gray-800",
    },
    {
      title: "Presentations",
      description:
        "Develop confidence in public speaking and learn to effectively communicate complex ideas to diverse audiences.",
      icon: <PresentationIcon className="h-8 w-8" />,
      color: "bg-blue-600",
      textColor: "text-white",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className="w-full bg-gray-50 pb-12 md:pb-40 pt-12"
    >
      <div className="container mx-auto px-4">
        <motion.div variants={fadeInUp} className="text-center mb-20">
          <Heading size="lg" className="mb-4 !text-blue-900">
            Our Teaching <span className="text-orange-500">Methodology</span>
          </Heading>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our innovative teaching approach combines theoretical knowledge with
            practical application to ensure students develop the skills needed
            for real-world success.
          </p>
        </motion.div>

        {/* Timeline Container with Extra Padding */}
        <div className="lg:pt-20">
          {/* Desktop Timeline */}
          <motion.div
            variants={scaleIn}
            className="hidden lg:block relative py-32"
          >
            {/* Center Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-300 transform -translate-y-1/2"
            />

            {/* Timeline Items */}
            <div className="relative">
              <div className="grid grid-cols-5 gap-8">
                {methodologies.map((method, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                    className="relative"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Node on the line */}
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                    >
                      <div
                        className={`w-4 h-4 rounded-full ${method.color} border-2 border-white shadow-md`}
                      />
                    </motion.div>

                    {/* Vertical connector line */}
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className={cn(
                        "absolute left-1/2 w-0.5 bg-gray-300 transform -translate-x-1/2",
                        index % 2 === 0
                          ? "top-0 h-[calc(50%-10px)]"
                          : "bottom-0 h-[calc(50%-10px)]"
                      )}
                    />

                    {/* Content Card */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={cn(
                        "absolute w-full max-w-[220px] rounded-lg shadow-md overflow-hidden transition-all duration-300 left-1/2 transform -translate-x-1/2",
                        index % 2 === 0
                          ? "top-0 -translate-y-[calc(100%+30px)]"
                          : "bottom-0 translate-y-[calc(100%+30px)]",
                        hoveredIndex === index ? "shadow-lg scale-105" : ""
                      )}
                    >
                      <div
                        className={`${method.color} ${method.textColor} p-4`}
                      >
                        <div className="flex justify-center mb-3">
                          <motion.div
                            animate={{
                              rotate: hoveredIndex === index ? 360 : 0,
                            }}
                            transition={{ duration: 0.6 }}
                          >
                            {method.icon}
                          </motion.div>
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-center">
                          {method.title}
                        </h3>
                        <p className="text-sm text-center">
                          {method.description}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Mobile Timeline */}
          <motion.div variants={scaleIn} className="lg:hidden relative py-4">
            {/* Center Line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-1/2"
            />

            {/* Timeline Items */}
            <div className="relative space-y-12">
              {methodologies.map((method, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInUp}
                  custom={index}
                  className="relative flex flex-col items-center"
                >
                  {/* Content Card */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-[80%] max-w-[300px] rounded-lg shadow-md overflow-hidden"
                  >
                    <div className={`${method.color} ${method.textColor} p-4`}>
                      <div className="flex justify-center mb-2">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {method.icon}
                        </motion.div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg font-bold mb-1">
                          {method.title}
                        </h3>
                        <p className="text-sm">{method.description}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Vertical connector line */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="h-6 w-0.5 bg-gray-300 my-1"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
