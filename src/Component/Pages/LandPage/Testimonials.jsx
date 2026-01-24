import React from "react";
import { Star, MapPin } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Arif Hossain",
      rating: 5,
      text: "NextMart never disappoints! Fast delivery and top-notch products.",
      location: "Dhaka, Bangladesh",
    },
    {
      name: "Sofia Rahman",
      rating: 4,
      text: "I love shopping at NextMart. Great prices and excellent customer service.",
      location: "Chittagong, Bangladesh",
    },
    {
      name: "Liam Cooper",
      rating: 5,
      text: "High-quality products with speedy shipping. Highly recommend NextMart!",
      location: "London, UK",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-black text-3xl font-bold text-center mb-10">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-1 mb-4 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-4 italic">{testimonial.text}</p>

              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-black font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
