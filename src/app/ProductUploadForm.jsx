"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function CreateProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      available: true,
      colorOptions: [],
      sizeOptions: [],
      tagList: "",
    },
  });

  const title = watch("title");

  /* Auto Slug Generator */
  useEffect(() => {
    if (!title) return;

    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    setValue("slug", generatedSlug);
  }, [title, setValue]);

  /* Submit Handler */
  const submitProduct = (formData) => {
    const payload = {
      ...formData,
      price: Number(formData.price),
      rating: Number(formData.rating),
      tags: formData.tagList
        .split(",")
        .map((t) => t.trim().toLowerCase()),
    };

    delete payload.tagList;

    console.log("READY FOR BACKEND 👉", payload);
    alert("Product created successfully!");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-100 p-6">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-indigo-900">
            Create New Product
          </h1>
          <p className="text-gray-500 mt-2">
            Fill in the details to add a product
          </p>
        </header>

        <form onSubmit={handleSubmit(submitProduct)} className="space-y-6">
          <input type="hidden" {...register("slug")} />

          {/* Title */}
          <div>
            <label className="font-semibold text-sm">Product Title *</label>
            <input
              {...register("title", { required: "Title is required" })}
              className={`input ${errors.title && "border-red-400"}`}
              placeholder="Wireless Fitness Watch"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-sm">Description *</label>
            <textarea
              {...register("description", { required: true })}
              rows={3}
              className="input"
              placeholder="Product description..."
            />
          </div>

          {/* Price & Brand */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold text-sm">Price ($)</label>
              <input
                type="number"
                step="0.01"
                {...register("price", { required: true, min: 1 })}
                className="input"
              />
            </div>

            <div>
              <label className="font-semibold text-sm">Brand</label>
              <input
                {...register("brand", { required: true })}
                className="input"
                placeholder="FitPro"
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="font-semibold text-sm">Image URL</label>
            <input
              {...register("image", {
                required: true,
                pattern: /^https?:\/\/.+/,
              })}
              className="input"
              placeholder="https://..."
            />
          </div>

          {/* Category & Stock */}
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <select {...register("category")} className="input">
              <option value="Electronics">Electronics</option>
              <option value="Fitness">Fitness</option>
              <option value="Health">Health</option>
            </select>

            <label className="flex gap-2 items-center text-sm font-semibold">
              <input type="checkbox" {...register("available")} />
              Available in stock
            </label>
          </div>

          {/* Colors */}
          <div>
            <label className="font-semibold text-sm">Colors</label>
            <div className="flex gap-4 mt-2">
              {["black", "white", "red"].map((clr) => (
                <label key={clr} className="flex gap-1 items-center">
                  <input
                    type="checkbox"
                    value={clr}
                    {...register("colorOptions")}
                  />
                  {clr}
                </label>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="font-semibold text-sm">Sizes</label>
            <div className="flex gap-4 mt-2">
              {["S", "M", "L"].map((sz) => (
                <label key={sz} className="flex gap-1 items-center">
                  <input
                    type="checkbox"
                    value={sz}
                    {...register("sizeOptions")}
                  />
                  {sz}
                </label>
              ))}
            </div>
          </div>

          {/* Tags & Rating */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              {...register("tagList", { required: true })}
              placeholder="fitness, smart, wearable"
              className="input"
            />

            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              {...register("rating", { required: true })}
              className="input"
              placeholder="Rating"
            />
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold transition">
            Publish Product
          </button>
        </form>
      </div>

      {/* Tailwind helper */}
      <style jsx>{`
        .input {
          width: 100%;
          margin-top: 0.25rem;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 2px solid #e5e7eb;
          outline: none;
        }
        .input:focus {
          border-color: #6366f1;
        }
      `}</style>
    </section>
  );
}
