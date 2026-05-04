"use client";

import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-blue-500 mb-4">
              NextMart
            </h2>

            <p className="text-gray-400 leading-relaxed mb-6">
              Discover premium products, modern shopping experiences,
              and unbeatable deals — all in one place.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition"
              >
                <Facebook size={18} />
              </a>

              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-sky-500 transition"
              >
                <Twitter size={18} />
              </a>

              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-pink-500 transition"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Explore
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Our Story
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Latest News
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Support
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Track Order
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Returns & Refunds
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Shipping Info
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-4 text-gray-400">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-500" />

                <span>+1 800 555 0199</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500" />

                <span>support@nextmart.com</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-500" />

                <span>New York, United States</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} NextMart. All rights reserved.
          </p>

          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-white transition">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;