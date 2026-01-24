import { Heart, Star } from "lucide-react";
import React from "react";

const Featured = () => {
  const featured = [
    {
      id: 1,
      name: "Wireless Gaming Mouse",
      price: 49.99,
      rating: 4.6,
      image: "🖱️",
      reviews: 278,
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      price: 129.99,
      rating: 4.8,
      image: "⌨️",
      reviews: 432,
    },
    {
      id: 3,
      name: "Smartphone Stand",
      price: 19.99,
      rating: 4.4,
      image: "📱",
      reviews: 189,
    },
    {
      id: 4,
      name: "Portable Charger",
      price: 39.99,
      rating: 4.7,
      image: "🔋",
      reviews: 345,
    },
    {
      id: 5,
      name: "Noise-Cancelling Headphones",
      price: 149.99,
      rating: 4.9,
      image: "🎧",
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
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 h-48 flex items-center justify-center text-6xl relative">
                {product.image}
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
                  <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  <span className="ml-1 text-sm text-gray-400">({product.reviews})</span>
                </div>

                {/* Price & Cart Button */}
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
