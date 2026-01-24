import React from "react";
import { Truck, Shield, Headphones, Package } from "lucide-react";
import Image from "next/image";

const Benefit = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
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

          <div className="text-center">
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

          <div className="text-center">
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

          <div className="text-center">
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

        {/* Banner + Feature Details */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <Image
            src="/image/66857687379ba1720022663-removebg-preview.png"
            width={700}
            height={400}
            alt="NextMart services"
            className="object-cover"
          />

          <div className="space-y-10">
            <div className="flex items-center gap-6 max-w-md">
              <div className="p-6 aspect-square bg-violet-100 rounded-full">
                {/* icon unchanged */}
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  Smart Insights
                </h3>
                <p className="text-sm text-slate-600">
                  Monitor spending and performance with live, easy-to-read
                  dashboards.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 max-w-md">
              <div className="p-6 aspect-square bg-green-100 rounded-full">
                {/* icon unchanged */}
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  Advanced Protection
                </h3>
                <p className="text-sm text-slate-600">
                  Encrypted data, multi-layer authentication, and global
                  compliance standards.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 max-w-md">
              <div className="p-6 aspect-square bg-orange-100 rounded-full">
                {/* icon unchanged */}
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  Flexible Reports
                </h3>
                <p className="text-sm text-slate-600">
                  Download detailed reports tailored for business or personal
                  use.
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
