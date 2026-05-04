"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ShoppingCart, Menu, X, Heart, LogOut } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState({
    image: "",
  });

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = Cookies.get("isLoggedIn");
    const userData = Cookies.get("user");

    if (isLoggedIn && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("User parse failed");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [pathname]);

  const logout = () => {
    Cookies.remove("isLoggedIn");
    Cookies.remove("user");

    router.push("/login");
  };

  const navLinkClass = (path) =>
    `transition font-medium ${
      pathname === path ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <h1 className="text-2xl font-bold text-blue-600">NextMart</h1>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className={navLinkClass("/")}>
              Home
            </Link>

            <Link href="/products" className={navLinkClass("/products")}>
              Products
            </Link>

            <Link
              href="/add-products"
              className={navLinkClass("/add-products")}
            >
              Add Products
            </Link>

            {/* Wishlist */}
            <button className="relative">
              <Heart className="h-6 w-6 text-gray-700 hover:text-red-500 transition" />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </button>

            {/* Cart */}
            <button className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-600 transition" />

              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* User */}
            {user?.image ? (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    src={user.image || "/default-user.png"}
                    alt="user"
                    width={45}
                    height={45}
                    className="rounded-full border object-cover"
                  />

                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                </div>

                <button onClick={logout}>
                  <LogOut className="text-red-500 hover:text-red-700 transition cursor-pointer" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-black" />
            ) : (
              <Menu className="h-6 w-6 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <nav className="flex flex-col gap-4 px-4 py-5">
            <Link href="/" className={navLinkClass("/")}>
              Home
            </Link>

            <Link href="/products" className={navLinkClass("/products")}>
              Products
            </Link>

            <Link
              href="/add-products"
              className={navLinkClass("/add-products")}
            >
              Add Products
            </Link>

            {user ? (
              <button
                onClick={logout}
                className="flex items-center gap-2 text-red-500"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white py-2 rounded-lg text-center"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
