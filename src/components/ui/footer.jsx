"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <>
      {/* Fixed WhatsApp Button */}
      <motion.a
        href="https://wa.me/919876543210" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="!fixed !bottom-8 !right-8 !z-50 !bg-green-500 !text-white !p-4 !rounded-full !shadow-lg !hover:bg-green-600 !transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="!w-6 !h-6" />
      </motion.a>

      {/* Footer */}
      <footer className="!w-full !bg-gray-900 !text-white">
        {/* Logo and Address Section */}
        <div className="!py-12">
          <div className="!max-w-7xl !mx-auto !px-4">
            <div className="!flex !flex-col !items-center">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="!mb-8"
              >
                <div className="!flex gap-1 !items-center">
                  <img
                    src="SSDCH-Logo.png"
                    alt="Siva Sivani Degree College Logo"
                    className="!h-8 md:!h-12 !w-auto"
                  />
                  <img
                    src="/ssdcLogo.png"
                    alt="Siva Sivani Degree College Logo"
                    className="!h-8 md:!h-12 !w-auto"
                  />
                </div>
              </motion.div>

              {/* Address */}
              <div className="!flex !flex-wrap !justify-center !gap-x-12 !gap-y-4 !text-gray-300">
                <div className="!text-center">
                  Siva Sivani Degree College Hyderabad
                </div>
                <div className="!text-center">Survey No. 123, Kompally</div>
                <div className="!text-center">
                  Hyderabad, Telangana - 500014
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Strip */}
        <div className="!bg-gray-800 !py-4">
          <div className="!max-w-7xl !mx-auto !px-4">
            <p className="!text-gray-300 !text-center !text-sm">
              © {new Date().getFullYear()} Siva Sivani Degree College Hyderabad.
              All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
