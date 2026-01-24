"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";

export default function SignInPage() {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  const DEMO_USER = {
    email: "zamini@gmail.com",
    password: "Zamini123",
    name: "Zamini Chowdhury",
    avatar: "/image/Screenshot 2026-01-19 224953.png",
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    if (
      credentials.email === DEMO_USER.email &&
      credentials.password === DEMO_USER.password
    ) {
      Cookies.set("auth", "true", { expires: 1 });
      Cookies.set(
        "profile",
        JSON.stringify({
          name: DEMO_USER.name,
          email: DEMO_USER.email,
          image: DEMO_USER.avatar,
        }),
        { expires: 1 }
      );

      router.replace("/add-products");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl grid md:grid-cols-2 overflow-hidden">
        {/* Left Image */}
        <div className="hidden md:block relative">
          <Image
            src="/images/screenshot.png"
            alt="Login Visual"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Login Form */}
        <form
          onSubmit={submitLogin}
          className="p-8 flex flex-col justify-center"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back 👋
          </h1>
          <p className="text-gray-500 mt-2">
            Login to manage your products
          </p>

          <div className="mt-8">
            <label className="text-sm font-semibold">Email Address</label>
            <input
              name="email"
              type="email"
              required
              value={credentials.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>

          <div className="mt-5">
            <label className="text-sm font-semibold">Password</label>
            <input
              name="password"
              type="password"
              required
              value={credentials.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>

          {loginError && (
            <p className="mt-4 text-sm text-red-600">{loginError}</p>
          )}

          <button
            type="submit"
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Sign In
          </button>

          <p className="text-center mt-6 text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-indigo-600 hover:underline">
              Create one
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
