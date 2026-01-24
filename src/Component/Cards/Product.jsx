import { CheckIcon, Star } from "lucide-react";
import React from "react";

const Product = ({ product }) => {
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-300 text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {rating.toFixed(1)} / 5
        </span>
      </div>
    );
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  return (
    <div
      key={product._id}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {!product.inStock && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
            Sold Out
          </div>
        )}

        {product.originalPrice && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
            Save {Math.round(
              (1 - product.price / product.originalPrice) * 100
            )}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {product.category}
          </span>

          {product.inStock && (
            <div className="flex items-center gap-1 text-green-600">
              <CheckIcon className="w-4 h-4" />
              <span className="text-xs font-medium">
                Available on NextMart
              </span>
            </div>
          )}
        </div>

        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="mb-4">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-500">
            Based on {product.reviewCount} customer reviews
          </span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>

            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            disabled={!product.inStock}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              product.inStock
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {product.inStock ? "Add to Bag" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
