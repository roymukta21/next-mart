import React from "react";

const Categories = () => {
  const categoryList = [
    { title: "Gadgets", icon: "📱", total: "1,200+" },
    { title: "Apparel", icon: "👗", total: "2,400+" },
    { title: "Home Essentials", icon: "🏡", total: "950+" },
    { title: "Cosmetics", icon: "💄", total: "1,500+" },
    { title: "Fitness Gear", icon: "⚽", total: "800+" },
    { title: "Learning Hub", icon: "📚", total: "3,400+" },
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
              className="bg-gray-50 p-6 rounded-2xl text-center cursor-pointer 
                         transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            >
              <div className="text-5xl mb-3 transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              <h3 className="text-blue-600 font-semibold mb-1">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500">
                {item.total} products
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
