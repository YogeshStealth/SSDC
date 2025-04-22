"use client";
import bgImage from "@/assets/modern-campus.jpg";
import Heading from "@/components/ui/heading";
import { motion } from "framer-motion";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronRight, CheckCircle, Phone } from "lucide-react";

const streamCourses = {
  Management: [
    "BBA - HR/Finance/Marketing/Retail Management",
    "BBA Business Analytics",
  ],
  Science: [
    "B.Sc Artificial Intelligence and Machine Learning",
    "Bachelor of Computer Applications (BCA)",
  ],
  Commerce: ["B.Com Computer Applications", "B.Com Business Analytics"],
};

const programs = [
  {
    title: "Management",
    description: "BBA Programs with specializations",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-orange-400"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
      </svg>
    ),
  },
  {
    title: "Science",
    description: "B.Sc & BCA Programs",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-orange-400"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
      </svg>
    ),
  },
  {
    title: "Commerce",
    description: "B.Com Programs",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-orange-400"
      >
        <path d="M3 3v18h18"></path>
        <path d="m19 9-5 5-4-4-3 3"></path>
      </svg>
    ),
  },
];

const features = [
  "Affiliated to Osmania University (OU)",
  "100% Placement Assistance",
];

const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

export default function HeroSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    stream: "",
    course: "",
  });

  const [errors, setErrors] = useState({});
  const [courseOptions, setCourseOptions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update course options when stream changes
  useEffect(() => {
    if (formData.stream) {
      setCourseOptions(streamCourses[formData.stream] || []);
      // Reset course when stream changes
      setFormData((prev) => ({ ...prev, course: "" }));
    } else {
      setCourseOptions([]);
    }
  }, [formData.stream]);

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Name and City validation - only allow letters and spaces
    if (name === "name" || name === "city") {
      const isValid = /^[A-Za-z\s]*$/.test(value);
      if (isValid) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    }
    // Phone validation - only allow numbers and first digit between 6-9
    else if (name === "phone") {
      const isValid = /^[0-9]*$/.test(value);
      const isFirstDigitValid = value.length === 0 || /^[6-9]/.test(value);
      const isLengthValid = value.length <= 10;

      if (isValid && isFirstDigitValid && isLengthValid) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    }
    // For email, allow any input
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle select changes
  const handleSelectChange = (name, value) => {
    if (name === "stream") {
      // When stream changes, reset course
      setFormData((prev) => ({ ...prev, stream: value, course: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits";
    } else if (!/^[6-9]/.test(formData.phone)) {
      newErrors.phone = "Phone number must start with 6-9";
    }

    if (!formData.city) newErrors.city = "City is required";
    if (!formData.stream) newErrors.stream = "Stream is required";
    if (!formData.course) newErrors.course = "Course is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (validateForm()) {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const campaign = urlParams.get("campaign") || "organic";
        const utmSource = urlParams.get("utm_source") || "direct";
        const utmMedium = urlParams.get("utm_medium") || "none";
        const utmTerm = urlParams.get("utm_term") || "";
        const utmContent = urlParams.get("utm_content") || "";

        const formDataWithTracking = {
          ...formData,
          campaign,
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_term: utmTerm,
          utm_content: utmContent,
        };

        const response = await fetch(
          "https://stealthlearn.in/SSDC_api/submit_form.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
            credentials: "omit",
            body: JSON.stringify(formDataWithTracking),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Server error occurred");
        }

        const result = await response.json();

        if (result.success) {
          // Reset form
          setFormData({
            name: "",
            email: "",
            phone: "",
            city: "",
            stream: "",
            course: "",
          });
          setErrors({});
          // Redirect to thank you page
          window.location.href = "/thankyou.html";
        } else {
          setIsSubmitting(false);
          // Handle specific error messages from backend
          if (result.message.includes("Missing required fields")) {
            const missingFields = result.message
              .replace("Missing required fields: ", "")
              .split(", ");
            const newErrors = {};
            missingFields.forEach((field) => {
              newErrors[field] = `${field} is required`;
            });
            setErrors(newErrors);
          } else if (result.message.includes("Invalid email format")) {
            setErrors((prev) => ({
              ...prev,
              email: "Please enter a valid email address",
            }));
          } else if (result.message.includes("Invalid phone number format")) {
            setErrors((prev) => ({
              ...prev,
              phone: "Please enter a valid 10-digit phone number",
            }));
          } else {
            alert(result.message || "Error submitting form");
          }
        }
      } else {
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error:", error);
      alert(error.message || "Error submitting form. Please try again later.");
    }
  };

  return (
    <div className="relative !min-h-screen !overflow-hidden">
      {/* Background image */}
      <div className="!absolute !inset-0">
        <img
          src={bgImage}
          alt="Modern Campus"
          className="!w-full !h-full !object-cover"
        />
        <div className="!absolute !inset-0 !bg-blue-900/80"></div>
      </div>

      <div className="!container !max-w-[1366px] !mx-auto !py-12 !relative !z-10 !overflow-hidden">
        {/* Top bar with logo and tagline */}
        <div className="!flex !justify-between !items-center !mb-16 !px-6 md:!px-0">
          <div className="!flex gap-1 !items-center">
            <img
              src="SSDCH-Logo.png"
              alt="Siva Sivani Degree College Logo"
              className="!h-12 md:!h-16 !w-auto"
            />
            <img
              src="/ssdcLogo.png"
              alt="Siva Sivani Degree College Logo"
              className="!h-12 md:!h-16 !w-auto"
            />
          </div>
          <div className="!block">
            <motion.a
              href="tel:+918977728996"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="!inline-flex !items-center !px-4 !py-2 !bg-orange-500 hover:!bg-orange-600 !text-white !rounded-full !transition-all !duration-300 !group"
            >
              <Phone className="!h-4 !w-4 !mr-2 !animate-bounce !text-white" />
              <span className="!font-medium !text-white">Call Us</span>
            </motion.a>
          </div>
        </div>

        {/* Main content */}
        <div className="!grid lg:!grid-cols-12 !gap-8 !items-center">
          {/* Left content - 7 columns */}
          <div className="lg:!col-span-7 !space-y-8 !text-center lg:!text-left">
            <div className="!relative">
              <div className="!absolute -!left-4 !top-0 !bottom-0 !w-1 !bg-orange-500 !hidden lg:!block"></div>
              <motion.h1
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px" }}
                variants={fadeInLeft}
                className="!text-3xl md:!text-5xl lg:!text-6xl !font-bold !text-white sm:ml-3 !mb-6 px-6"
              >
                Develop <span className="!text-orange-400">In-Demand </span>
                Business skills <br className="md:hidden" /> with{" "}
                <br className="md:hidden" />
                <span className="!text-orange-400">
                  &nbsp;Latest Technologies
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px" }}
              variants={fadeInLeft}
              className="!text-lg md:!text-xl !text-gray-200 !mb-8"
            >
              Pursue our
              <span className="!text-orange-400 font-bold text-xl">
                &nbsp;INDUSTRY-READY&nbsp;
              </span>
              programs with advanced specializations in
              <br />
              <span className="!text-orange-400 font-bold text-xl">
                BBA | B.Sc | BCA | B.Com
              </span>
            </motion.p>

            <div className="!hidden md:!grid md:!grid-cols-3 !gap-6 !pt-4">
              {programs.map((program, index) => (
                <motion.div
                  key={program.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "0px" }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.2 }}
                  className="!bg-white/10 !backdrop-blur-[5px] !rounded-xl !p-6 !border !border-white/20 !transform !transition-all hover:!bg-white/20"
                >
                  <div className="!w-12 !h-12 !bg-orange-500/20 !rounded-lg !flex !items-center !justify-center !mb-4">
                    {program.icon}
                  </div>
                  <Heading size="sm" className="!text-white !mb-1" as="h3">
                    {program.title}
                  </Heading>
                  <p className="!text-sm !text-blue-100 !mb-3">
                    {program.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px" }}
              variants={fadeIn}
              className="!hidden md:!block !pt-6"
            >
              <div className="!flex !flex-col md:!flex-row md:!items-center !space-y-4 md:!space-y-0 md:!space-x-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "0px" }}
                    variants={fadeIn}
                    transition={{ delay: index * 0.2 }}
                    className="!flex !items-center !space-x-2"
                  >
                    <CheckCircle className="!h-5 !w-5 !text-orange-400" />
                    <span className="!text-white">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right content - 5 columns */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px" }}
            variants={fadeInRight}
            className="lg:!col-span-5"
          >
            <div className="!bg-white !rounded-2xl !shadow-xl !overflow-hidden !w-[90%] !max-w-[400px] !mx-auto lg:!scale-90">
              <div className="!bg-blue-900 !py-4 !px-6">
                <Heading size="sm" className="!text-white" as="h2">
                  Admission Enquiry
                </Heading>
                <p className="!text-blue-200 !text-xs">
                  Fill the form below to get started
                </p>
              </div>

              <form onSubmit={handleSubmit} className="!p-6">
                <div className="!grid !gap-4">
                  {/* Name Field */}
                  <div className="!space-y-1">
                    <Label htmlFor="name" className="!text-gray-700 !text-sm">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`!rounded-lg !border-gray-200 !h-9 !text-gray-900 !placeholder:text-gray-400 ${
                        errors.name ? "!border-red-500" : ""
                      }`}
                    />
                    {errors.name && (
                      <p className="!text-red-500 !text-xs">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="!space-y-1">
                    <Label htmlFor="email" className="!text-gray-700 !text-sm">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className={`!rounded-lg !border-gray-200 !h-9 !text-gray-900 !placeholder:text-gray-400 ${
                        errors.email ? "!border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="!text-red-500 !text-xs">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="!space-y-1">
                    <Label htmlFor="phone" className="!text-gray-700 !text-sm">
                      Mobile Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your 10-digit phone number"
                      className={`!rounded-lg !border-gray-200 !h-9 !text-gray-900 !placeholder:text-gray-400 ${
                        errors.phone ? "!border-red-500" : ""
                      }`}
                    />
                    {errors.phone && (
                      <p className="!text-red-500 !text-xs">{errors.phone}</p>
                    )}
                  </div>

                  {/* City Field */}
                  <div className="!space-y-1">
                    <Label htmlFor="city" className="!text-gray-700 !text-sm">
                      Enter City *
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      className={`!rounded-lg !border-gray-200 !h-9 !text-gray-900 !placeholder:text-gray-400 ${
                        errors.city ? "!border-red-500" : ""
                      }`}
                    />
                    {errors.city && (
                      <p className="!text-red-500 !text-xs">{errors.city}</p>
                    )}
                  </div>

                  {/* Stream Field */}
                  <div className="!space-y-1">
                    <Label htmlFor="stream" className="!text-gray-700 !text-sm">
                      Select Stream *
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("stream", value)
                      }
                      value={formData.stream}
                    >
                      <SelectTrigger
                        className={`!w-full !rounded-lg !border-gray-200 !text-gray-900 !placeholder:text-gray-400 !h-9 !bg-white hover:!bg-white focus:!bg-white ${
                          errors.stream ? "!border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select your stream" />
                      </SelectTrigger>
                      <SelectContent className="!bg-white !border !rounded-lg !shadow-lg">
                        {Object.keys(streamCourses).map((stream) => (
                          <SelectItem
                            key={stream}
                            value={stream}
                            className="hover:!bg-gray-100 !text-gray-900 !bg-white focus:!bg-white focus:!text-gray-900"
                          >
                            {stream}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.stream && (
                      <p className="!text-red-500 !text-xs">{errors.stream}</p>
                    )}
                  </div>

                  {/* Course Field */}
                  <div className="!space-y-1">
                    <Label htmlFor="course" className="!text-gray-700 !text-sm">
                      Select Course *
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("course", value)
                      }
                      value={formData.course}
                      disabled={!formData.stream}
                    >
                      <SelectTrigger
                        className={`!w-full !rounded-lg !border-gray-200 !text-gray-900 !placeholder:text-gray-400 !h-9 !bg-white hover:!bg-white focus:!bg-white ${
                          errors.course ? "!border-red-500" : ""
                        }`}
                      >
                        <SelectValue
                          placeholder={
                            formData.stream
                              ? "Select your course"
                              : "First select a stream"
                          }
                        >
                          <span
                            className="!truncate !max-w-[200px] !block"
                            title={formData.course}
                          >
                            {formData.course}
                          </span>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="!bg-white !border !rounded-lg !shadow-lg !w-[200px]">
                        {courseOptions.map((course) => (
                          <SelectItem
                            key={course}
                            value={course}
                            className="hover:!bg-gray-100 !text-gray-900 !bg-white focus:!bg-white focus:!text-gray-900"
                          >
                            <span
                              className="!truncate !max-w-[180px] !block"
                              title={course}
                            >
                              {course}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.course && (
                      <p className="!text-red-500 !text-xs">{errors.course}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`!w-full !bg-orange-500 hover:!bg-orange-600 !text-white !rounded-lg !py-4 !transition-all !duration-200 ${
                      isSubmitting
                        ? "!opacity-50 !cursor-not-allowed !bg-gray-400"
                        : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="!flex !items-center !justify-center">
                        <svg
                          className="!animate-spin -!ml-1 !mr-3 !h-5 !w-5 !text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="!opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="!opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </div>
                    ) : (
                      "Submit Enquiry"
                    )}
                  </Button>

                  <p className="!text-center !text-gray-500 !text-xs !mt-2">
                    By submitting this form, you agree to our Terms of Service
                    and Privacy Policy
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
