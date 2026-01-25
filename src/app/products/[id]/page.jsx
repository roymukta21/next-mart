"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Filter } from "lucide-react";
import Product from "@/app/products/components/Cards/Product";
import Image from "next/image";

const PER_PAGE = 9;
const PRICE_LIMIT = 3000;

export default function ProductsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [pickedCategories, setPickedCategories] = useState([]);
  const [pickedBrands, setPickedBrands] = useState([]);
  const [price, setPrice] = useState([0, PRICE_LIMIT]);
  const [stockOnly, setStockOnly] = useState(false);
  const [order, setOrder] = useState("price-asc");
  const [page, setPage] = useState(1);
  const [mobileFilter, setMobileFilter] = useState(false);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(
          "https://next-mart-iota.vercel.app/products",
          { cache: "no-store" },
        );
        const data = await res.json();

        // fallback image inject
        const normalized = data.map((p) => ({
          ...p,
          Image: p.image || "/images/screenshot.png",
        }));

        setItems(normalized);
      } catch (err) {
        console.error("Product fetch failed");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  /* ---------------- DYNAMIC OPTIONS ---------------- */
  const categoryList = useMemo(
    () => [...new Set(items.map((i) => i.category))],
    [items],
  );

  const brandList = useMemo(
    () => [...new Set(items.map((i) => i.brand))],
    [items],
  );

  /* ---------------- FILTER + SORT ---------------- */
  const processedProducts = useMemo(() => {
    let data = items.filter((item) => {
      const matchText =
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase());

      const matchCategory =
        pickedCategories.length === 0 ||
        pickedCategories.includes(item.category);

      const matchBrand =
        pickedBrands.length === 0 || pickedBrands.includes(item.brand);

      const matchPrice =
        item.price >= price[0] && item.price <= price[1];

      const matchStock = !stockOnly || item.inStock;

      return (
        matchText &&
        matchCategory &&
        matchBrand &&
        matchPrice &&
        matchStock
      );
    });

    switch (order) {
      case "price-desc":
        data.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        data.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rating":
        data.sort((a, b) => b.rating - a.rating);
        break;
      default:
        data.sort((a, b) => a.price - b.price);
    }

    return data;
  }, [items, query, pickedCategories, pickedBrands, price, stockOnly, order]);

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(processedProducts.length / PER_PAGE);
  const visibleItems = processedProducts.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE,
  );

  useEffect(() => {
    setPage(1);
  }, [query, pickedCategories, pickedBrands, price, stockOnly, order]);

  /* ---------------- HELPERS ---------------- */
  const resetAll = () => {
    setQuery("");
    setPickedCategories([]);
    setPickedBrands([]);
    setPrice([0, PRICE_LIMIT]);
    setStockOnly(false);
    setOrder("price-asc");
  };

  const money = (v) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(v);

  /* ---------------- FILTER UI ---------------- */
  const FilterBox = () => (
    <div className="bg-white rounded-xl p-6 border shadow-sm">
      <div className="flex justify-between mb-6">
        <h3 className="font-semibold flex items-center gap-2">
          <Filter size={18} /> Filters
        </h3>
        <button
          onClick={resetAll}
          className="text-sm text-blue-600 font-medium"
        >
          Reset
        </button>
      </div>

      {/* Price */}
      <div className="mb-6">
        <p className="font-medium mb-2">Price</p>
        <div className="flex justify-between text-sm mb-2">
          <span>{money(price[0])}</span>
          <span>{money(price[1])}</span>
        </div>
        <input
          type="range"
          min="0"
          max={PRICE_LIMIT}
          value={price[0]}
          onChange={(e) =>
            setPrice([+e.target.value, price[1]])
          }
          className="w-full"
        />
        <input
          type="range"
          min="0"
          max={PRICE_LIMIT}
          value={price[1]}
          onChange={(e) =>
            setPrice([price[0], +e.target.value])
          }
          className="w-full"
        />
      </div>

      {/* Stock */}
      <label className="flex items-center gap-3 mb-6 cursor-pointer">
        <input
          type="checkbox"
          checked={stockOnly}
          onChange={(e) => setStockOnly(e.target.checked)}
          className="hidden"
        />
        <div
          className={`w-5 h-5 border rounded flex items-center justify-center ${
            stockOnly ? "bg-blue-600 border-blue-600" : ""
          }`}
        >
          {stockOnly && <CheckIcon className="w-3 h-3 text-white" />}
        </div>
        In stock only
      </label>

      {/* Category */}
      <div className="mb-6">
        <p className="font-medium mb-2">Categories</p>
        {categoryList.map((c) => (
          <label key={c} className="flex gap-2 mb-1 cursor-pointer">
            <input
              type="checkbox"
              checked={pickedCategories.includes(c)}
              onChange={() =>
                setPickedCategories((prev) =>
                  prev.includes(c)
                    ? prev.filter((x) => x !== c)
                    : [...prev, c],
                )
              }
            />
            {c}
          </label>
        ))}
      </div>

      {/* Brand */}
      <div>
        <p className="font-medium mb-2">Brands</p>
        {brandList.map((b) => (
          <label key={b} className="flex gap-2 mb-1 cursor-pointer">
            <input
              type="checkbox"
              checked={pickedBrands.includes(b)}
              onChange={() =>
                setPickedBrands((prev) =>
                  prev.includes(b)
                    ? prev.filter((x) => x !== b)
                    : [...prev, b],
                )
              }
            />
            {b}
          </label>
        ))}
      </div>
    </div>
  );

  /* ---------------- RENDER ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading products...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-600">
            {items.length} items available
          </p>
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}
          </div>

          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="px-4 py-3 rounded-xl border"
          >
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="rating">Top Rated</option>
          </select>

          <button
            onClick={() => setMobileFilter(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-3 border rounded-xl"
          >
            <FunnelIcon className="w-5 h-5" /> Filters
          </button>
        </div>

        {/* Layout */}
        <div className="flex gap-8">
          <aside className="hidden lg:block w-1/4">
            <FilterBox />
          </aside>

          <main className="w-full lg:w-3/4">
            {visibleItems.length === 0 ? (
              <p className="text-center py-20">
                No products found
              </p>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {visibleItems.map((item) => (
                    <Product key={item._id} product={item} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-10">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      <ChevronLeftIcon className="w-5 h-5" />
                    </button>

                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-3 py-2 rounded ${
                          page === i + 1
                            ? "bg-blue-600 text-white"
                            : "border"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      disabled={page === totalPages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}