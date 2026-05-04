"use client";

import React from "react";
import Image from "next/image";

import {
  Truck,
  Shield,
  Headphones,
  Package,
  BarChart3,
  Lock,
  FileText,
} from "lucide-react";

const Benefit = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Benefit 1 */}
          <div className="bg-white rounded-2xl p-6 text-center shadow hover:shadow-xl transition-all duration-300">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-blue-600" />
            </div>

            <h3 className="text-black font-semibold mb-2">
              Free & Fast Delivery
            </h3>

            <p className="text-gray-600 text-sm">
              Complimentary shipping on purchases above $50
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white rounded-2xl p-6 text-center shadow hover:shadow-xl transition-all duration-300">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>

            <h3 className="text-black font-semibold mb-2">
              Secure Checkout
            </h3>

            <p className="text-gray-600 text-sm">
              Protected payments with industry-level security
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white rounded-2xl p-6 text-center shadow hover:shadow-xl transition-all duration-300">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Headphones className="h-8 w-8 text-blue-600" />
            </div>

            <h3 className="text-black font-semibold mb-2">
              24/7 Customer Care
            </h3>

            <p className="text-gray-600 text-sm">
              Always-available support from the NextMart team
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="bg-white rounded-2xl p-6 text-center shadow hover:shadow-xl transition-all duration-300">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-blue-600" />
            </div>

            <h3 className="text-black font-semibold mb-2">
              Easy Returns
            </h3>

            <p className="text-gray-600 text-sm">
              Hassle-free 30-day return window
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row items-center gap-14">
          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src="/image/66857687379ba1720022663-removebg-preview.png"
              width={700}
              height={500}
              alt="NextMart services"
              className="w-full max-w-xl object-contain"
            />
          </div>

          {/* Features */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* Feature 1 */}
            <div className="flex items-start gap-5 bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
              <div className="p-4 bg-violet-100 rounded-full">
                <BarChart3 className="h-7 w-7 text-violet-600" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Smart Insights
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Monitor spending and performance with live,
                  easy-to-read dashboards and analytics.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-5 bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
              <div className="p-4 bg-green-100 rounded-full">
                <Lock className="h-7 w-7 text-green-600" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Advanced Protection
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Encrypted data, multi-layer authentication,
                  and global compliance standards.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-5 bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
              <div className="p-4 bg-orange-100 rounded-full">
                <FileText className="h-7 w-7 text-orange-600" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Flexible Reports
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Download detailed reports tailored for
                  business or personal use anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefit;