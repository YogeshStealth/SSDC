"use client";

import { useState } from "react";
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

export default function ProgramTabs() {
  const [activeTab, setActiveTab] = useState("management");
  const [currentSlide, setCurrentSlide] = useState(0);

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
          title: "Human Resources Management",
          icon: <Users className="h-5 w-5 text-orange-500" />,
          description:
            "Develop expertise in talent acquisition, employee relations, organizational development, and strategic HR planning. Learn to manage workforce dynamics in modern organizations.",
        },
        {
          title: "Finance Management",
          icon: <TrendingUp className="h-5 w-5 text-orange-500" />,
          description:
            "Master financial analysis, investment strategies, corporate finance, and financial planning. Prepare for careers in banking, investment, and financial consulting.",
        },
        {
          title: "Marketing Management",
          icon: <ShoppingBag className="h-5 w-5 text-orange-500" />,
          description:
            "Learn brand management, digital marketing, consumer behavior, and marketing analytics. Develop campaigns that drive business growth in competitive markets.",
        },
        {
          title: "Retail Management",
          icon: <ShoppingBag className="h-5 w-5 text-orange-500" />,
          description:
            "Specialize in retail operations, merchandising, supply chain management, and customer experience design for physical and digital retail environments.",
        },
        {
          title: "Business Analytics",
          icon: <BarChart3 className="h-5 w-5 text-orange-500" />,
          description:
            "Develop skills in data analysis, visualization, predictive modeling, and business intelligence to drive data-informed decision making.",
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
            "Study neural networks, deep learning, computer vision, natural language processing, and AI ethics. Build intelligent systems that can learn and adapt to solve complex problems.",
        },
        {
          title: "Bachelor of Computer Applications (BCA)",
          icon: <Code className="h-5 w-5 text-orange-500" />,
          description:
            "Comprehensive program covering programming, software development, database management, web technologies, and system analysis. Develop practical skills for the IT industry.",
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
            "Blend commerce education with computer applications. Study accounting, taxation, business law, and computer applications for modern business environments.",
        },
        {
          title: "B.Com in Business Analytics",
          icon: <BarChart3 className="h-5 w-5 text-orange-500" />,
          description:
            "Combine commerce fundamentals with data analytics. Learn to analyze business data, create visualizations, and derive insights to support business decision-making.",
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
    <div className="w-full py-20 bg-gray-200 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Heading size="lg" className="mb-4">
            Our Academic <span className="text-orange-500">Programs</span>
          </Heading>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover our comprehensive range of programs designed to prepare you
            for successful careers in Management, Science, and Commerce.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all duration-300",
                activeTab === tab.id ? tab.activeColor : tab.color
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          {Object.keys(programContent).map((key) => (
            <div
              key={key}
              className={cn(
                "transition-opacity duration-300",
                activeTab === key ? "block opacity-100" : "hidden opacity-0"
              )}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {programContent[key].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {programContent[key].description}
                </p>
              </div>

              {/* Mobile Slider View */}
              <div className="md:hidden">
                <div className="relative">
                  <div className="overflow-hidden">
                    <div
                      className="transition-transform duration-300 ease-in-out"
                      style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                      }}
                    >
                      <div className="flex">
                        {programContent[key].programs.map((program, index) => (
                          <div
                            key={index}
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
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={prevSlide}
                      className="!bg-orange-500 text-white p-2 rounded-full hover:bg-blue-900 transition-colors duration-300"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-1">
                      {programContent[key].programs.map((_, index) => (
                        <span
                          key={index}
                          className={`block h-2 w-2 rounded-full ${
                            currentSlide === index
                              ? "bg-orange-500"
                              : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={nextSlide}
                      className="!bg-orange-500 text-white p-2 rounded-full hover:bg-blue-900 transition-colors duration-300"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop Grid View */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programContent[key].programs.map((program, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
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
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
