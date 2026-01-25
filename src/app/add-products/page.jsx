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
import Product from "../products/components/Cards/Product";
//import Product from "../products/components/Cards/Product";

const ITEMS_PER_PAGE = 9;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("price-low-high");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://next-mart-iota.vercel.app/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);

        // Extract unique categories and brands
        setCategories([...new Set(data.map((p) => p.category))]);
        setBrands([...new Set(data.map((p) => p.brand))]);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Reset page when filters change
  useEffect(() => setCurrentPage(1), [
    searchTerm,
    selectedCategories,
    selectedBrands,
    priceRange,
    inStockOnly,
    sortBy,
  ]);

  // Filter & sort
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesStock = !inStockOnly || p.inStock;

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesStock;
    });

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
  }, [products, searchTerm, selectedCategories, selectedBrands, priceRange, inStockOnly, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 2000]);
    setInStockOnly(false);
    setSortBy("price-low-high");
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

  if (loading) return <div className="p-20 text-center">Loading products...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <p className="text-gray-600 mt-2">
            Discover our premium collection of {products.length} products
          </p>
        </div>

        {/* Search & sort bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
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
              className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block lg:w-1/4 bg-white rounded-xl p-6 shadow-sm">
            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Categories</h4>
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer mb-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() =>
                      setSelectedCategories((prev) =>
                        prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
                      )
                    }
                    className="accent-blue-600"
                  />
                  {cat}
                </label>
              ))}
            </div>

            {/* Brands */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Brands</h4>
              {brands.map((b) => (
                <label key={b} className="flex items-center gap-2 cursor-pointer mb-2">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b)}
                    onChange={() =>
                      setSelectedBrands((prev) =>
                        prev.includes(b) ? prev.filter((br) => br !== b) : [...prev, b]
                      )
                    }
                    className="accent-blue-600"
                  />
                  {b}
                </label>
              ))}
            </div>

            {/* Price */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Price Range</h4>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                step="10"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="2000"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>

            {/* In Stock */}
            <label className="flex items-center gap-2 cursor-pointer mb-6">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-blue-600"
              />
              In Stock Only
            </label>

            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Reset Filters
            </button>
          </div>

          {/* Products */}
          <div className="lg:w-3/4">
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <p className="text-gray-600">No products found</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedProducts.map((p) => (
                    <Product key={p._id} product={p} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 border rounded disabled:opacity-50"
                    >
                      <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded ${
                          currentPage === page ? "bg-blue-600 text-white" : "border"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 border rounded disabled:opacity-50"
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
