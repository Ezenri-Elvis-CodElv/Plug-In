"use client";
import React, { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(pathname === "/");

  useEffect(() => {
    if (pathname === "/") {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [pathname]);

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="description" content="Africa’s trusted service marketplace—connecting customers with skilled professionals online, offline & on-demand." />
        <link rel="icon" href="/logoblack.png" type="image/png" />
      </head>
      <body className="antialiased">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Header />
            <ScrollToTop />
            {children}
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}