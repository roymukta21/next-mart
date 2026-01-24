"use client";
import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function Deals() {
  // 🔥 Deal end time (example: 1 hour from page load)
  const DEAL_DURATION = 60 * 60 * 1000;
  const [timeLeft, setTimeLeft] = useState(DEAL_DURATION);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const deals = [
    {
      id: 1,
      name: "Next-Gen Gaming Console",
      price: 449.99,
      oldPrice: 649.99,
      discount: "31%",
      image: "🕹️",
    },
    {
      id: 2,
      name: "Ultra HD Smart Television",
      price: 699.99,
      oldPrice: 1099.99,
      discount: "36%",
      image: "🖥️",
    },
    {
      id: 3,
      name: "High-Performance Laptop",
      price: 1149.99,
      oldPrice: 1499.99,
      discount: "23%",
      image: "⌨️",
    },
  ];

  return (
    <div className="bg-gray-50">
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col items-center gap-3 mb-10">
            <div className="flex items-center gap-2">
              <Clock className="h-7 w-7 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Flash Offers</h2>
            </div>

            <span className="text-sm text-gray-600">
              Offer ends in{" "}
              <span className="font-semibold text-red-500">
                {formatTime(timeLeft)}
              </span>
            </span>
          </div>

          {/* Deals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deals.map((deal) => (
              <div
                key={deal.id}
                className="bg-gradient-to-br from-blue-50 to-sky-50 
                           rounded-2xl p-6 relative overflow-hidden
                           hover:shadow-xl transition"
              >
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Save {deal.discount}
                </div>

                <div className="text-7xl mb-4 text-center">{deal.image}</div>

                <h3 className="font-semibold text-xl mb-2 text-gray-900">
                  {deal.name}
                </h3>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    ${deal.price}
                  </span>
                  <span className="text-gray-500 line-through">
                    ${deal.oldPrice}
                  </span>
                </div>

                <button
                  disabled={timeLeft === 0}
                  className={`w-full py-3 rounded-xl font-semibold transition
                    ${
                      timeLeft === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >
                  {timeLeft === 0 ? "Deal Expired" : "Claim Offer"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
