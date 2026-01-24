"use client";
import { useState } from "react";
import { ShoppingCart, Search, Menu, X, Heart } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span>🚚 Enjoy free delivery on orders above $50</span>
          <div className="hidden md:flex gap-4">
            <span>📞 +1 800 555 0199</span>
            <span>📧 support@nextmart.com</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              NextMart
            </h1>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Find products, brands & more..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Products
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Offers
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Support
            </a>

            {/* Wishlist */}
            <button className="relative">
              <Heart className="h-6 w-6 text-gray-700 hover:text-blue-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </button>

            {/* Cart */}
            <button className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-600" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-3">
            <input
              type="text"
              placeholder="Search on NextMart..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <a href="#" className="block py-2 text-gray-700">
              Home
            </a>
            <a href="#" className="block py-2 text-gray-700">
              Products
            </a>
            <a href="#" className="block py-2 text-gray-700">
              Offers
            </a>
            <a href="#" className="block py-2 text-gray-700">
              Support
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
