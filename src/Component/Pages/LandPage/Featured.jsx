"use client";
import { Heart, Star } from "lucide-react";
import React from "react";
import Image from "next/image";

const Featured = () => {
  const featured = [
    {
      id: 1,
      name: "Wireless Gaming Mouse",
      price: 49.99,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1200&auto=format&fit=crop",
      reviews: 278,
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      price: 129.99,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1200&auto=format&fit=crop",
      reviews: 432,
    },
    {
      id: 3,
      name: "Smartphone Stand",
      price: 19.99,
      rating: 4.4,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
      reviews: 189,
    },
    {
      id: 4,
      name: "Portable Charger",
      price: 39.99,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=1200&auto=format&fit=crop",
      reviews: 345,
    },
    {
      id: 5,
      name: "Noise-Cancelling Headphones",
      price: 149.99,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      reviews: 521,
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-gray-900 text-3xl font-bold">
            Featured Products
          </h2>

          <a href="#" className="text-blue-600 hover:underline">
            View All
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition group"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />

                <button className="absolute top-3 right-3 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold mb-2">{product.name}</h3>

                {/* Rating */}
                <div className="flex items-center mb-2">
                  {[...Array(Math.round(product.rating))].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}

                  <span className="ml-1 text-sm text-gray-600">
                    {product.rating}
                  </span>

                  <span className="ml-1 text-sm text-gray-400">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price & Button */}
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-600">
                    ${product.price}
                  </span>

                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm">
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
