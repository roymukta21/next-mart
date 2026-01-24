import { TrendingUp } from "lucide-react";
import React from "react";

const TrendingNow = () => {
  const trendingProducts = [
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 59.99,
      trend: "+42%",
      image: "🎧",
    },
    {
      id: 2,
      name: "Espresso Machine",
      price: 129.99,
      trend: "+37%",
      image: "☕",
    },
    {
      id: 3,
      name: "Smart Fitness Band",
      price: 89.99,
      trend: "+48%",
      image: "⌚",
    },
    {
      id: 4,
      name: "Mirrorless Camera",
      price: 549.99,
      trend: "+31%",
      image: "📷",
    },
    {
      id: 5,
      name: "Home Air Purifier",
      price: 179.99,
      trend: "+40%",
      image: "🌬️",
    },
    {
      id: 6,
      name: "Smart Robot Vacuum",
      price: 329.99,
      trend: "+34%",
      image: "🤖",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 mb-10">
          <TrendingUp className="h-8 w-8 text-blue-600" />
          <h2 className="text-black text-3xl font-bold">Trending Now at NextMart</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition text-center"
            >
              <div className="text-4xl mb-3">{product.image}</div>
              <h3 className="font-semibold text-sm mb-2">{product.name}</h3>
              <p className="text-blue-600 font-bold mb-1">${product.price}</p>
              <div className="flex items-center justify-center text-green-600 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>{product.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingNow;
