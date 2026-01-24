import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-blue-400">
              NextMart
            </h3>
            <p className="text-gray-400 mb-4">
              NextMart brings you reliable online shopping with carefully
              selected products and great value—every day.
            </p>
            <div className="flex gap-4 text-sm">
              <a href="#" className="hover:text-blue-400 transition">
                Facebook
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                X (Twitter)
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                Instagram
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Get in Touch
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Insights & Updates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Join Our Team
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Help & Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Order Status
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Refund & Exchange
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Delivery Details
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Common Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact NextMart</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 800 555 0199</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@nextmart.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>New York, United States</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} NextMart. Built for modern shopping.
            &nbsp;|&nbsp; Privacy Policy &nbsp;|&nbsp; Terms & Conditions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
