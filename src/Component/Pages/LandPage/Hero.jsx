"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Spring Collection 2026",
      subtitle: "Up to 60% Off",
      description: "Refresh your wardrobe with the latest styles",
      bg: "bg-gradient-to-r from-pink-400 to-purple-600",
    },
    {
      title: "Trending Now",
      subtitle: "Just Arrived",
      description: "Be ahead in fashion with our new arrivals",
      bg: "bg-gradient-to-r from-blue-400 to-cyan-600",
    },
    {
      title: "Luxury Essentials",
      subtitle: "Premium Quality",
      description: "Style meets comfort in every piece",
      bg: "bg-gradient-to-r from-amber-500 to-orange-600",
    },
  ];

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );

  return (
    <section className="relative h-96 md:h-[80vh] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          } ${slide.bg}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-white max-w-xl">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                {slide.title}
              </h2>
              <p className="text-2xl md:text-3xl mb-2">{slide.subtitle}</p>
              <p className="text-lg md:text-xl mb-6">{slide.description}</p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
