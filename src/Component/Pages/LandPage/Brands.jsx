"use client";
import React from "react";

const Brands = () => {
  return (
    <section className="bg-white w-full py-12">
      <div className="px-4 md:px-0">
        <h3 className="text-2xl font-semibold text-slate-700 text-center">
          Partnered with globally recognized brands
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10 w-max mx-auto">
          {/* Empty grid placeholders */}
          <div className="brand-cell"></div>
          <div className="brand-cell md:border-r"></div>
          <div className="brand-cell hidden md:flex lg:border-r"></div>
          <div className="brand-cell hidden lg:block"></div>
          <div className="brand-cell hidden xl:block xl:border-r-0"></div>

          {/* Logos */}
          <div className="brand-cell flex-center md:hidden lg:flex lg:border-b">
            {/* SVG unchanged */}
          </div>

          <div className="brand-cell flex-center md:border-r md:border-b">
            {/* SVG unchanged */}
          </div>

          <div className="brand-cell flex-center md:border-t-0">
            {/* SVG unchanged */}
          </div>

          <div className="brand-cell flex-center md:border-t-0">
            {/* SVG unchanged */}
          </div>

          <div className="brand-cell hidden xl:flex flex-center xl:border-r-0">
            {/* SVG unchanged */}
          </div>

          {/* Bottom placeholders */}
          <div className="brand-cell hidden xl:block xl:border-y-0 xl:border-l-0"></div>
          <div className="brand-cell hidden lg:block lg:border-y-0 lg:border-l-0"></div>
          <div className="brand-cell hidden md:block md:border-y-0 md:border-l-0"></div>
          <div className="brand-cell border-x-0 border-y-0 xl:border-r-0"></div>
          <div className="brand-cell border-x-0 border-y-0 xl:border-l"></div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
