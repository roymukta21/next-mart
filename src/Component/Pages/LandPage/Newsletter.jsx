import React from "react";
import Image from "next/image";

const Newsletter = () => {
  return (
    <section className="bg-blue-50 py-14">
      <div className="bg-white md:grid md:grid-cols-2 max-w-4xl mx-4 md:mx-auto rounded-xl shadow-lg">
        {/* Image */}
        <div className="hidden md:block w-full max-w-lg rounded-xl">
          <Image
            src="/image/young-cute-woman-cap-glasses-posing-outside-showing-thumbs-up-high-quality-photo.jpg"
            alt="Newsletter Image"
            width={300}
            height={300}
            className="rounded-xl object-cover"
          />
        </div>

        {/* Form */}
        <div className="relative flex items-center justify-center">
          <div className="max-md:py-20 px-6 md:px-10 text-center">
            <h1 className="text-gray-900 text-3xl font-bold">
              Join the NextMart Newsletter
            </h1>
            <p className="mt-4 text-gray-600">
              Stay updated with exclusive offers, new arrivals, and latest trends!
            </p>

            <form className="mt-8 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none rounded-l-md border border-r-0 border-gray-300 px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="rounded-r-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
