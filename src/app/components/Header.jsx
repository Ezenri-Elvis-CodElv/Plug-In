"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";

const sections = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about-us" },
  { label: "Contact Us", path: "/contactus" },
  { label: "Products", path: "/products" },
  { label: "FAQs", path: "/faqs" },
];

const WEB_APP_URL = "https://your-web-app-url.com";
const TARGET_TEXT = "Go to Web App";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

const Header = () => {
  const pathname = usePathname();
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(pathname);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize component state after mount
  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 768);
    
    // Initialize active tab from localStorage
    const storedTab = localStorage.getItem('activeTab');
    if (storedTab) {
      setActiveTab(storedTab);
    }
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update active tab when path changes
  useEffect(() => {
    if (isMounted) {
      setActiveTab(pathname);
      localStorage.setItem('activeTab', pathname);
    }
  }, [pathname, isMounted]);

  // Scramble effect for desktop button
  const intervalRef = useRef(null);
  const [text, setText] = useState(TARGET_TEXT);

  const scramble = () => {
    let pos = 0;
    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) return char;
          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          return CHARS[randomCharIndex];
        })
        .join("");
      setText(scrambled);
      pos++;
      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) stopScramble();
    }, SHUFFLE_TIME);
  };
  
  const stopScramble = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setText(TARGET_TEXT);
    }
  };

  // Sticky header effect
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        backgroundColor: isMobile
          ? "#0F3D3E" // Teal accent for mobile
          : isSticky
            ? "#080808" // Off-white when sticky
            : "rgba(0, 0, 0, 0.85)", // Off-white transparent
        boxShadow: isSticky ? "0 8px 32px 0 rgba(0,0,0,0.08)" : "none",
        backdropFilter: isSticky ? "blur(8px)" : "none",
      }}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 18,
        duration: 0.55,
      }}
      className="flex items-center justify-between px-6 py-4 text-[#080808] z-50 w-full fixed top-0 left-0 right-0"
      style={{ zIndex: 1000 }}
    >
      {/* Logo */}
      <div className="text-xl font-bold text-[#E4A425] flex items-center gap-2">
        <Link href="/">
          <img src="/logo.png" alt="Plugin Logo" className="h-10 w-auto object-contain cursor-pointer" />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <ul
        onMouseLeave={() => setPosition({ ...position, opacity: 0 })}
        className="relative items-center rounded-full border-2 border-[#eca515] bg-[#000000] p-1 hidden md:flex"
      >
        {sections.map(({ label, path }) => (
          <Tab
            key={path}
            setPosition={setPosition}
            href={path}
            isActive={pathname === path}
          >
            {label}
          </Tab>
        ))}
        <Cursor position={position} />
      </ul>

      {/* Desktop Web App Button */}
      <motion.a
        href={WEB_APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.025, backgroundColor: "#C79518", color: "#fff" }}
        whileTap={{ scale: 0.975 }}
        onMouseEnter={scramble}
        onMouseLeave={stopScramble}
        className="ml-4 hidden md:inline-block relative overflow-hidden rounded-full border-2 border-[#E4A425] bg-[#E4A425] px-5 py-2 text-sm font-mono font-semibold text-white uppercase transition-colors duration-200"
      >
        <div className="relative z-10 flex items-center gap-2">
          <span>{text}</span>
        </div>
        <motion.span
          initial={{ y: "100%" }}
          animate={{ y: "-100%" }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1,
            ease: "linear",
          }}
          className="absolute inset-0 z-0 scale-125 bg-gradient-to-t from-[#E4A425]/0 from-40% via-[#E4A425]/100 to-[#E4A425]/0 to-60% opacity-0 group-hover:opacity-100"
        />
      </motion.a>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-[#E4A425] text-2xl z-50"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <FaBars />
      </button>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-40"
              onClick={() => setMobileOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="fixed top-0 right-0 w-4/5 max-w-xs h-full bg-black text-yellow-400 shadow-2xl z-50 flex flex-col"
            >
              <div className="flex justify-between items-center px-6 py-5 border-b border-yellow-900">
                <span className="text-xl font-bold text-yellow-400">Menu</span>
                <button
                  className="text-3xl text-yellow-400"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  &times;
                </button>
              </div>
              <ul className="flex flex-col gap-2 px-6 py-6 text-lg font-semibold mt-4">
                {sections.map(({ label, path }) => (
                  <li key={path}>
                    <Link
                      href={path}
                      className={`block py-3 px-3 rounded-lg transition ${
                        isMounted && activeTab === path 
                          ? "bg-yellow-400 text-black" 
                          : "hover:bg-yellow-400/10 hover:text-white"
                      }`}
                      onClick={() => {
                        setMobileOpen(false);
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
                <li className="mt-4">
                  <a
                    href={WEB_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-3 px-3 rounded-lg bg-yellow-400 text-black hover:bg-yellow-500 hover:text-white transition font-bold text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Visit Web App
                  </a>
                </li>
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

const Tab = ({ children, setPosition, href, isActive }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      // Improved: non-active is white, on hover stays white; active is gold, on hover white
      className={`relative z-10 px-4 py-2 text-sm uppercase cursor-pointer
        ${isActive
          ? "text-yellow-400 font-bold hover:text-white"
          : "text-white hover:text-white"}
        transition-colors duration-200
      `}
    >
      <Link href={href} className="block w-full h-full">
        {children}
      </Link>
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{ ...position }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="absolute z-0 h-10 rounded-full bg-yellow-400"
    />
  );
};

export default Header;