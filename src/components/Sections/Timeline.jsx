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
    <div className="w-full bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Heading size="lg" className="mb-4 !text-blue-900">
            Our Teaching <span className="text-orange-500">Methodology</span>
          </Heading>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our innovative teaching approach combines theoretical knowledge with
            practical application to ensure students develop the skills needed
            for real-world success.
          </p>
        </div>

        {/* Timeline Container with Extra Padding */}
        <div className="pt-30">
          {/* Gradient Line */}

          {/* Desktop Timeline */}
          <div className="hidden lg:block relative py-20">
            {/* Center Line */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>

            {/* Timeline Items */}
            <div className="relative">
              <div className="grid grid-cols-5 gap-8">
                {methodologies.map((method, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Node on the line */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <div
                        className={`w-4 h-4 rounded-full ${method.color} border-2 border-white shadow-md`}
                      ></div>
                    </div>

                    {/* Vertical connector line */}
                    <div
                      className={cn(
                        "absolute left-1/2 w-0.5 bg-gray-300 transform -translate-x-1/2",
                        index % 2 === 0
                          ? "top-0 h-[calc(50%-10px)]"
                          : "bottom-0 h-[calc(50%-10px)]"
                      )}
                    ></div>

                    {/* Content Card */}
                    <div
                      className={cn(
                        "absolute w-full max-w-[220px] rounded-lg shadow-md overflow-hidden transition-all duration-300 left-1/2 transform -translate-x-1/2",
                        index % 2 === 0
                          ? "top-0 -translate-y-[calc(100%+20px)]"
                          : "bottom-0 translate-y-[calc(100%+20px)]",
                        hoveredIndex === index ? "shadow-lg scale-105" : ""
                      )}
                    >
                      <div
                        className={`${method.color} ${method.textColor} p-4`}
                      >
                        <div className="flex justify-center mb-3">
                          {method.icon}
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-center">
                          {method.title}
                        </h3>
                        <p className="text-sm text-center">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden relative py-8">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-1/2"></div>

            {/* Timeline Items */}
            <div className="relative space-y-24">
              {methodologies.map((method, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center"
                >
                  {/* Content Card */}
                  <div className="w-[80%] max-w-[300px] rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300">
                    <div className={`${method.color} ${method.textColor} p-6`}>
                      <div className="flex justify-center mb-4">
                        {method.icon}
                      </div>
                      <h3 className="text-lg font-bold mb-3 text-center">
                        {method.title}
                      </h3>
                      <p className="text-sm text-center">
                        {method.description}
                      </p>
                    </div>
                  </div>

                  {/* Vertical connector line */}
                  <div className="h-12 w-0.5 bg-gray-300 my-2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
