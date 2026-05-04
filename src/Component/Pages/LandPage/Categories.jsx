"use client";

import Image from "next/image";
import React from "react";

const Categories = () => {
  const categoryList = [
    {
      title: "Gadgets",
      icon: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png",
      total: "1,200+",
    },
    {
      title: "Apparel",
      icon: "https://cdn-icons-png.flaticon.com/512/892/892458.png",
      total: "2,400+",
    },
    {
      title: "Home Essentials",
      icon: "https://cdn-icons-png.flaticon.com/512/619/619032.png",
      total: "950+",
    },
    {
      title: "Cosmetics",
      icon: "https://cdn-icons-png.flaticon.com/512/3163/3163203.png",
      total: "1,500+",
    },
    {
      title: "Fitness Gear",
      icon: "https://cdn-icons-png.flaticon.com/512/857/857455.png",
      total: "800+",
    },
    {
      title: "Learning Hub",
      icon: "https://cdn-icons-png.flaticon.com/512/2436/2436874.png",
      total: "3,400+",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-gray-900 text-3xl font-bold text-center mb-10">
          Explore Our Categories
        </h2>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categoryList.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-6 rounded-2xl text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={70}
                  height={70}
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-blue-600 font-semibold mb-1">{item.title}</h3>

              {/* Product Count */}
              <p className="text-sm text-gray-500">{item.total} products</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
