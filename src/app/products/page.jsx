"use client";

import { useState, useEffect, useMemo } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Filter } from "lucide-react";
import Product from "./components/Cards/Product";

const ITEMS_PER_PAGE = 9;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("price-low-high");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch("https://next-mart-iota.vercel.app/products", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.status}`);
        }

        const data = await res.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);
//console.log(products)
  // Extract unique categories and brands
  const categories = useMemo(() => 
    [...new Set(products.map((p) => p.category))], 
    [products]
  );
  
  const brands = useMemo(() => 
    [...new Set(products.map((p) => p.brand))], 
    [products]
  );

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesStock = !inStockOnly || product.inStock;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesPrice &&
        matchesStock
      );
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low-high":
          return a.price - b.price;
        case "price-high-low":
          return b.price - a.price;
        case "name-a-z":
          return a.name.localeCompare(b.name);
        case "name-z-a":
          return b.name.localeCompare(a.name);
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    products,
    searchTerm,
    selectedCategories,
    selectedBrands,
    priceRange,
    inStockOnly,
    sortBy,
  ]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / ITEMS_PER_PAGE,
  );
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedCategories,
    selectedBrands,
    priceRange,
    inStockOnly,
    sortBy,
  ]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 2000]);
    setInStockOnly(false);
    setSortBy("price-low-high");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const FilterSidebar = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h3>
        <button
          onClick={resetFilters}
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
        >
          Reset All
        </button>
      </div>
      {/* Price Range */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-900 mb-4">Price Range</h4>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
          <input
            type="range"
            min="0"
            max="2000"
            step="10"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([parseInt(e.target.value), priceRange[1]])
            }
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="range"
            min="0"
            max="2000"
            step="10"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
      {/* Availability */}
      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors
              ${
                inStockOnly
                  ? "bg-blue-600 border-blue-600"
                  : "border-gray-300 group-hover:border-gray-400"
              }`}
            >
              {inStockOnly && <CheckIcon className="w-3 h-3 text-white" />}
            </div>
          </div>
          <span className="text-gray-700 group-hover:text-gray-900">
            In Stock Only
            <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              Available
            </span>
          </span>
        </label>
      </div>
      {/* Categories */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors
                  ${
                    selectedCategories.includes(category)
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-300 group-hover:border-gray-400"
                  }`}
                >
                  {selectedCategories.includes(category) && (
                    <CheckIcon className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
              <span className="text-gray-700 group-hover:text-gray-900">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-900 mb-3">Brands</h4>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors
                  ${
                    selectedBrands.includes(brand)
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-300 group-hover:border-gray-400"
                  }`}
                >
                  {selectedBrands.includes(brand) && (
                    <CheckIcon className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
              <span className="text-gray-700 group-hover:text-gray-900">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XMarkIcon className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Failed to Load Products
          </h2>
          <p className="text-gray-600 mb-6">
            {error}
          </p>
          {/* <p className="text-sm text-gray-500 mb-4">
            Make sure your backend server is running on http://localhost:5000
          </p> */}
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <p className="text-gray-600 mt-2">
            Discover our premium collection of {products.length} products
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <FunnelIcon className="w-5 h-5" />
              <span>Filters</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Mobile Filters Overlay */}
        {showFilters && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowFilters(false)}
            />
            <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                <FilterSidebar />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block lg:w-1/4">
            <FilterSidebar />
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing{" "}
                <span className="font-semibold">
                  {paginatedProducts.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold">
                  {filteredAndSortedProducts.length}
                </span>{" "}
                products
              </p>
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages || 1}
              </div>
            </div>

            {paginatedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 max-w-sm mx-auto">
                  Try adjusting your search or filter criteria to find what
                  you're looking for.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => (
                    <Product key={product._id} product={product}></Product>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeftIcon className="w-5 h-5" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                            currentPage === page
                              ? "bg-blue-600 text-white"
                              : "border border-gray-300 text-black hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border text-black border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}