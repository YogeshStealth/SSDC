"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Code,
  BarChart3,
  GraduationCap,
  Users,
  TrendingUp,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Heading from "@/components/ui/heading";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function ProgramTabs() {
  const [activeTab, setActiveTab] = useState("management");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Add auto-sliding functionality
  useEffect(() => {
    const interval = setInterval(() => {
      const maxSlides = programContent[activeTab].programs.length - 1;
      setCurrentSlide((current) => (current < maxSlides ? current + 1 : 0));
    }, 3000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount or tab change
  }, [activeTab]); // Reset interval when tab changes

  const tabs = [
    {
      id: "management",
      label: "Management",
      icon: <GraduationCap className="h-5 w-5" />,
      color: "!bg-orange-500",
      activeColor: "!bg-blue-900",
    },
    {
      id: "science",
      label: "Science",
      icon: <Code className="h-5 w-5" />,
      color: "!bg-orange-500",
      activeColor: "!bg-blue-900",
    },
    {
      id: "commerce",
      label: "Commerce",
      icon: <BarChart3 className="h-5 w-5" />,
      color: "!bg-orange-500",
      activeColor: "!bg-blue-900",
    },
  ];

  const programContent = {
    management: {
      title: "BBA Programs",
      description:
        "Bachelor of Business Administration with specialized tracks to prepare you for leadership roles in various business domains.",
      programs: [
        {
          title:
            "BBA with Specialization (HR / Finance / Marketing / Retail Management) ",
          icon: <Users className="h-5 w-5 text-orange-500" />,
          description:
            "Choose from HR, Finance, Marketing, or Retail Management specializations to build expertise in your chosen field.",
        },
        {
          title: "BBA - Business Analytics",
          icon: <TrendingUp className="h-5 w-5 text-orange-500" />,
          description:
            "Master data-driven decision making, business intelligence, and analytics tools for modern business environments.",
        },
      ],
    },
    science: {
      title: "Science Programs",
      description:
        "Cutting-edge programs in technology and computing to prepare you for careers in the digital economy.",
      programs: [
        {
          title: "B.Sc in Artificial Intelligence and Machine Learning",
          icon: <Code className="h-5 w-5 text-orange-500" />,
          description:
            "Study neural networks, deep learning, computer vision, natural language processing, and AI ethics.",
        },
        {
          title: "Bachelor of Computer Applications (BCA)",
          icon: <Code className="h-5 w-5 text-orange-500" />,
          description:
            "Comprehensive program covering programming, software development, database management, and web technologies.",
        },
      ],
    },
    commerce: {
      title: "Commerce Programs",
      description:
        "Business-focused programs that combine commercial knowledge with technical skills for the modern workplace.",
      programs: [
        {
          title: "B.Com in Computer Applications",
          icon: <BookOpen className="h-5 w-5 text-orange-500" />,
          description:
            "Blend commerce education with computer applications for modern business environments.",
        },
        {
          title: "B.Com in Business Analytics",
          icon: <BarChart3 className="h-5 w-5 text-orange-500" />,
          description:
            "Combine commerce fundamentals with data analytics for business decision-making.",
        },
      ],
    },
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    const maxSlides = programContent[activeTab].programs.length - 1;
    setCurrentSlide((current) => (current < maxSlides ? current + 1 : 0));
  };

  const prevSlide = () => {
    const maxSlides = programContent[activeTab].programs.length - 1;
    setCurrentSlide((current) => (current > 0 ? current - 1 : maxSlides));
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className={`!w-full !py-20 !bg-white dark:!bg-gray-900`}
    >
      <div className="!container !mx-auto !px-4">
        <motion.div variants={fadeInUp} className="!text-center !mb-16">
          <Heading size="lg" className="!mb-4">
            Our <span className="!text-orange-500">Programs</span>
          </Heading>
          <p className="!text-lg !text-gray-600 dark:!text-gray-300">
            Choose from our diverse range of programs
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all duration-300",
                activeTab === tab.id ? tab.activeColor : tab.color
              )}
            >
              {tab.icon}
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={staggerContainer}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 "
        >
          {Object.keys(programContent).map((key) => (
            <motion.div
              key={key}
              variants={fadeInUp}
              className={cn(
                "transition-opacity duration-300",
                activeTab === key ? "block opacity-100" : "hidden opacity-0"
              )}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">
                  {programContent[key].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
                  {programContent[key].description}
                </p>
              </div>

              {/* Mobile Slider View */}
              <div className="md:hidden">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-100px" }}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="overflow-hidden">
                    <motion.div
                      className="transition-transform duration-300 ease-in-out"
                      style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                      }}
                    >
                      <div className="flex">
                        {programContent[key].programs.map((program, index) => (
                          <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="w-full flex-shrink-0 px-1"
                          >
                            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md h-full">
                              <div className="flex items-center gap-3 mb-3">
                                {program.icon}
                                <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                                  {program.title}
                                </h4>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300">
                                {program.description}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevSlide}
                      className="!bg-orange-500 text-white p-2 rounded-full hover:bg-blue-900 transition-colors duration-300"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </motion.button>
                    <div className="flex items-center gap-1">
                      {programContent[key].programs.map((_, index) => (
                        <motion.span
                          key={index}
                          animate={{
                            scale: currentSlide === index ? 1.2 : 1,
                            backgroundColor:
                              currentSlide === index
                                ? "rgb(249, 115, 22)"
                                : "rgb(209, 213, 219)",
                          }}
                          className="block h-2 w-2 rounded-full"
                        />
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextSlide}
                      className="!bg-orange-500 text-white p-2 rounded-full hover:bg-blue-900 transition-colors duration-300"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Desktop Grid View */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
                variants={staggerContainer}
                className="hidden md:grid md:grid-cols-2 md:max-w-4xl md:mx-auto gap-6"
              >
                {programContent[key].programs.map((program, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow w-full"
                  >
                    <div className="flex flex-col items-center gap-3 mb-3">
                      {program.icon}
                      <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100 text-center">
                        {program.title}
                      </h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-center">
                      {program.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
