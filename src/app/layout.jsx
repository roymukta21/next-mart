import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
//import Header from "@/Component/Common/Header";
import Footer from "@/Component/Common/Footer";
import Header from "@/Component/Common/Header";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NextMart | Smart & Simple Online Shopping",
  description:
    "NextMart is a modern e-commerce platform designed for fast, easy, and reliable shopping. Discover quality products and enjoy a smooth, stress-free buying experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header section */}
        <header className="sticky top-0 z-50">
          <Header />
        </header>

        {/* Main content */}
        {children}

        {/* Footer section */}
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
