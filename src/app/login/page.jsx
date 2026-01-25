"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded credentials
    const MOCK_EMAIL = "maynakh@gmail.com";
    const MOCK_PASSWORD = "Maynakh1234";

    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      const user = {
        name: "Maynakh Roy",
        email: MOCK_EMAIL,
        image:
          "https://media.istockphoto.com/id/628330740/photo/portrait-of-a-beautifull-smiling-man.webp?a=1&b=1&s=612x612&w=0&k=20&c=5imGYJBs6d3CStPVPEbAKFEtioB9t1pRwRULp5f0BEE=",
      };

      Cookies.set("isLoggedIn", "true", { expires: 1 });
      Cookies.set("user", JSON.stringify(user), { expires: 1 });
      router.push("/add-products");
      console.log("router", router);
    }
  };

  return (
    <div className="flex items-center justify-center w-full px-4 my-10">
      <form
        onSubmit={handleLogin}
        className="flex w-full flex-col max-w-96 shadow-2xl p-7"
      >
        <h2 className="text-4xl font-medium text-gray-900">Sign in</h2>

        <p className="mt-4 text-base text-gray-500/90">
          Please enter email and password to access.
        </p>

        <div className="mt-10">
          <label className="font-medium">Email</label>
          <input
            className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
            name="email"
            type="email"
            placeholder="Please enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mt-6">
          <label className="font-medium">Password</label>
          <input
            placeholder="Please enter your password"
            className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-8 py-3 w-full cursor-pointer rounded-md bg-indigo-600 text-white transition hover:bg-indigo-700"
        >
          Login
        </button>
        <p className="text-center text-sm mt-8">
          Don&apos;t have an account?{" "}
          <a
            href="/signInPage"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
