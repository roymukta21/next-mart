"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { Star } from "lucide-react";
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md";
import { FaQuoteLeft } from "react-icons/fa";
import Rating from "react-rating";
import Loading from "@/components/Loading";

// Mock auth hook
const useAuth = () => {
  return {
    user: {
      photoURL: "https://i.ibb.co/vxmbWxr3/Mohyminul-Islam-small.png",
      displayName: "Mohyminul Islam",
      email: "mohyminulislam@gmail.com",
    },
  };
};

const ProductDetails = () => {
  const params = useParams();
  const id = params?.Id;

  // State Management
  const [product, setProduct] = useState(null);
  // const [thumbnail, setThumbnail] = useState("");
  const [quantity, setQuantity] = useState(1);

  const reviewsData = [
    {
      id: "693afc36e0aff7645668c9cc",
      userName: "Md. Mohyminul Islam",
      userEmail: "mohyminulislam2001@gmail.com",
      UserPhoto: "https://i.ibb.co/vxmbWxr3/Mohyminul-Islam-small.png",
      text: "Great product! Highly recommended.",
      rating: 5,
      createdAt: new Date("2025-01-11T17:15:34.360Z"),
    },
  ];

  // Fetch Data on Mount
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://nex-server-one.vercel.app/products/${id}`,
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setProduct(data);
        setThumbnail(data?.images?.[0] || "");
      } catch (error) {
        console.error(error);
        toast.error("Error loading product");
      }
    };
    fetchProduct();
  }, [id]);

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text: "",
      rating: 0,
    },
  });

  const handleCustomerReviews = (data) => {
    console.log("Review submitted:", data);
    toast.success("Review submitted successfully!");
    reset();
  };

  const handleQuantityChange = (action) => {
    if (action === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    toast.success(`${quantity} item(s) added to cart!`);
  };

  const handleBuyNow = () => {
    toast.info("Redirecting to checkout...");
  };

  if (!product)
    return <div className="text-center py-20">Product not found</div>;

  return (
    <section className="bg-white">
      <div className="max-w-6xl w-full px-6 mx-auto py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-indigo-500">
            Home
          </Link>
          {" / "}
          <Link href="/products" className="hover:text-indigo-500">
            Products
          </Link>
          {" / "}
          <span>{product.category}</span>
          {" / "}
          <span className="text-indigo-500">{product.name}</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-16">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-3">
            {/* <div className="flex md:flex-col gap-3">
              {product.images?.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className={`border w-20 h-20 rounded overflow-hidden cursor-pointer transition ${
                    thumbnail === image
                      ? "border-indigo-500 border-2"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div> */}

            <div className="border border-gray-200 max-w-md rounded overflow-hidden bg-gray-50">
              <img
                // src={thumbnail}
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-black text-3xl font-medium">{product.name}</h1>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={
                      i < Math.floor(product.rating) ? "currentColor" : "none"
                    }
                  />
                ))}
              </div>
              <p className="text-black text-base font-semibold">
                ({product.rating})
              </p>
            </div>

            <div className="mt-6">
              {product.originalPrice ? (
                <>
                  <p className="text-3xl font-bold text-black">
                    ${product.price}
                  </p>

                  <p className="text-gray-400 line-through">
                    MRP: ${product.originalPrice}
                  </p>
                </>
              ) : (
                <p className="text-2xl font-bold text-black">
                  ${product.price}
                </p>
              )}

              <span className="text-xs text-gray-500">
                (inclusive of all taxes)
              </span>
            </div>

            <p className="text-black text-base font-bold mt-6">About Product</p>
            <p className="list-disc ml-5 mt-2 space-y-1 text-gray-600">
              {product?.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mt-8">
              <p className="font-medium">Quantity:</p>
              <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  -
                </button>
                <span className="px-4 font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increment")}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center mt-8 gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-green-500 text-white font-bold rounded hover:bg-green-600 cursor-pointer"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 cursor-pointer"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <Tabs>
            <TabList className="flex border-b border-gray-200 mb-6">
              <Tab className="px-6 py-2 text-black cursor-pointer outline-none border-b-2 border-transparent aria-selected:border-indigo-500 aria-selected:text-indigo-600">
                Description
              </Tab>
              <Tab className="px-6 py-2 text-black cursor-pointer outline-none border-b-2 border-transparent aria-selected:border-indigo-500 aria-selected:text-indigo-600">
                Reviews ({reviewsData.length})
              </Tab>
              <Tab className="px-6 py-2 text-black cursor-pointer outline-none border-b-2 border-transparent aria-selected:border-indigo-500 aria-selected:text-indigo-600">
                Write a Review
              </Tab>
            </TabList>

            <TabPanel>
              <div className="prose max-w-none text-gray-600">
                {product.description || "No detailed description available."}
              </div>
            </TabPanel>

            <TabPanel>
              <div className="space-y-6">
                {reviewsData.map((review, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-gray-100 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={review.UserPhoto}
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h4 className="font-bold text-black">
                          {review.userName}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {format(new Date(review.createdAt), "PPP")}
                        </p>
                      </div>
                    </div>
                    <div className="flex text-yellow-500 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 italic">{review.text}</p>
                  </div>
                ))}
              </div>
            </TabPanel>

            <TabPanel>
              <form
                onSubmit={handleSubmit(handleCustomerReviews)}
                className="max-w-xl space-y-4"
              >
                <div>
                  <label className="block font-medium mb-2 text-black">
                    Rating
                  </label>
                  <Controller
                    name="rating"
                    control={control}
                    rules={{ required: "Please select a rating" }}
                    render={({ field }) => (
                      <Rating
                        initialRating={field.value}
                        onChange={field.onChange}
                        emptySymbol={
                          <MdOutlineStarOutline className="text-gray-300 text-3xl" />
                        }
                        fullSymbol={
                          <MdOutlineStarPurple500 className="text-yellow-400 text-3xl" />
                        }
                      />
                    )}
                  />
                  {errors.rating && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.rating.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-medium mb-2 text-black">
                    Your Review
                  </label>
                  <textarea
                    {...register("text", {
                      required: "Review text is required",
                    })}
                    className="w-full border p-3 rounded-md h-32 text-black"
                    placeholder="What did you like or dislike?"
                  />
                  {errors.text && (
                    <p className="text-red-500 text-xs ">
                      {errors.text.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-8 py-2 rounded font-bold hover:bg-indigo-700 cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
