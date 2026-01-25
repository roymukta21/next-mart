"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  ShoppingCart,
  Menu,
  X,
  Heart,
  Phone,
  Mail,
  LogOut,
} from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkUser = () => {
      const isLoggedIn = Cookies.get("isLoggedIn");
      const userData = Cookies.get("user");

      if (isLoggedIn && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          console.error("Failed to parse user cookie");
        }
      } else {
        setUser(null);
      }
    };

    checkUser();
  }, [pathname]);

  const logout = () => {
    Cookies.remove("isLoggedIn");
    Cookies.remove("user");
    window.location.href = "/login";
  };

  const menus = (
    <>
      <Link href="/" className="text-gray-700 hover:text-blue-600">
        Home
      </Link>
      <Link href="/products" className="text-gray-700 hover:text-blue-600">
        Products
      </Link>
      <Link href="/add-products" className="text-gray-700 hover:text-blue-600">
        Add Products
      </Link>
    </>
  );

  return (
    <header className="bg-white shadow-md ">
      {/* Top Bar */}
      {/* <div className="bg-lime-400 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span>🚚 Enjoy free delivery on orders above $70</span>
          <div className="hidden md:flex gap-4">
            <span>📞 +1 800 555 0199</span>
            <span>📧 support@nextmart.com</span>
          </div>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
             <h1 className="text-2xl font-bold text-blue-600">NextMart</h1>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {menus}
            <button className="relative">
              <Heart className="h-6 w-6 text-gray-700 hover:text-blue-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </button>
            <button className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-600" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            <div>
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={user.imag}
                      alt="user"
                    />
                    
                    <div className="absolute bottom-2 right-0 h-3 w-3 rounded-full bg-green-500"></div>
                  </div>

                  <button onClick={logout}>
                    <LogOut className="text-red-600 cursor-pointer" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-blue-500 text-white py-2.5 px-3 rounded"
                >
                  Login
                </Link>
              )}
            </div>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="text-black h-6 w-6" />
            ) : (
              <Menu className="text-black h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col space-y-4 px-4 py-3">{menus}</nav>
        </div>
      )}
    </header>
  );
};

export default Header;
