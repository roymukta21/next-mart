"use client";

import Image from "next/image";
import { TrendingUp } from "lucide-react";
import React from "react";

const TrendingNow = () => {
  const trendingProducts = [
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 59.99,
      trend: "+42%",
      image:
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Espresso Machine",
      price: 129.99,
      trend: "+37%",
      image:
        "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Smart Fitness Band",
      price: 89.99,
      trend: "+48%",
      image:
        "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Mirrorless Camera",
      price: 549.99,
      trend: "+31%",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Home Air Purifier",
      price: 179.99,
      trend: "+40%",
      image:
        "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 6,
      name: "Smart Robot Vacuum",
      price: 329.99,
      trend: "+34%",
      image:
        "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <TrendingUp className="h-8 w-8 text-blue-600" />

          <h2 className="text-black text-3xl font-bold">
            Trending Now at NextMart
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 group"
            >
              {/* Product Image */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 text-center">
                <h3 className="font-semibold text-sm mb-2">
                  {product.name}
                </h3>

                <p className="text-blue-600 font-bold mb-2">
                  ${product.price}
                </p>

                <div className="flex items-center justify-center text-green-600 text-xs font-medium">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>{product.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingNow;