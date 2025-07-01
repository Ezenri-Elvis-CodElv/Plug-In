"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Link from "next/link";

const Footer = () => {
  const footerRef = useRef(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  const socialLinks = [
    { name: "Twitter", url: "https://twitter.com/talk.plugin", icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
    { name: "Instagram", url: "https://instagram.com/talk.plugin", icon: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" },
    { name: "TikTok", url: "https://tiktok.com/@talk.plugin", icon: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" },
    { name: "LinkedIn", url: "https://linkedin.com/company/talkplugin", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
    { name: "Facebook", url: "https://facebook.com/talk.plugin", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  ];

  const footerLinks = [
    {
      title: "Products",
      links: [
        { name: "Marketplace", url: "/marketplace" },
        { name: "Premium Services", url: "/premium" },
        { name: "Business Solutions", url: "/business" },
        { name: "API Access", url: "/api" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", url: "/about" },
        { name: "Careers", url: "/careers" },
        { name: "Blog", url: "/blog" },
        { name: "Press", url: "/press" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", url: "/help" },
        { name: "Contact Us", url: "/contact" },
        { name: "FAQs", url: "/faqs" },
        { name: "Service Status", url: "/status" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", url: "/privacy" },
        { name: "Terms of Service", url: "/terms" },
        { name: "Cookie Policy", url: "/cookies" },
        { name: "GDPR Compliance", url: "/gdpr" },
      ],
    },
  ];

  return (
    <motion.footer
      ref={footerRef}
      className="bg-[#080808] text-white pt-20 pb-12 px-6 md:px-16 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Main Footer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#2B2B2B]">
        {/* Brand Column */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/">
              <img
                src="/logo.png"
                alt="Plugin Logo"
                className="h-12 w-auto mb-4"
              />
            </Link>
            <p className="text-[#D9D9D9] mb-6 max-w-md">
              Africa’s trusted service marketplace—connecting customers with skilled professionals online, offline & on-demand.
            </p>
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E4A425]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-[#D9D9D9]">Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E4A425]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a
                  href="tel:+2349035272603"
                  className="text-[#D9D9D9] hover:text-[#E4A425] transition"
                >
                  +234 903 527 2603
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E4A425]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a
                  href="mailto:talk.plugin@gmail.com"
                  className="text-[#D9D9D9] hover:text-[#E4A425] transition"
                >
                  talk.plugin@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Navigation Columns */}
        {footerLinks.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-[#E4A425]">{section.title}</h4>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.url} 
                    className="text-[#D9D9D9] hover:text-[#E4A425] transition duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      {/* Newsletter & Social Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-16">
        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#181818] rounded-xl p-8"
        >
          <h4 className="text-2xl font-bold text-[#E4A425] mb-3">Stay Updated</h4>
          <p className="text-[#D9D9D9] mb-6">
            Subscribe to our newsletter for exclusive updates, offers, and industry insights.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-grow px-5 py-3 rounded-lg bg-[#232323] text-white placeholder-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-[#E4A425]"
                required
              />
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "#C79518" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-[#E4A425] hover:bg-[#C79518] text-white font-bold px-6 py-3 rounded-lg transition duration-300"
              >
                Subscribe
              </motion.button>
            </div>
            {subscribed && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400 font-medium"
              >
                Thank you for subscribing!
              </motion.p>
            )}
            <p className="text-xs text-[#D9D9D9]">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </form>
        </motion.div>
        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#181818] rounded-xl p-8"
        >
          <h4 className="text-2xl font-bold text-[#E4A425] mb-3">Connect With Us</h4>
          <p className="text-[#D9D9D9] mb-6">
            Follow us on social media for the latest updates and community highlights.
          </p>
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  y: -5,
                  scale: 1.1,
                  color: "#E4A425",
                  transition: { duration: 0.3 }
                }}
                className="bg-[#232323] hover:bg-[#C79518] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-[#D9D9D9] group-hover:text-white"
                >
                  <path fill="currentColor" d={social.icon} />
                </svg>
              </motion.a>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-[#2B2B2B]">
            <h5 className="text-lg font-medium text-[#E4A425] mb-3">Visit Our Web App</h5>
            <div className="flex gap-4">
              <motion.a
                href="/"
                whileHover={{ scale: 1.05, backgroundColor: "#C79518" }}
                className="flex items-center gap-2 bg-[#E4A425] hover:bg-[#C79518] text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Visit Web App & Get Started</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Bottom Section */}
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-center pt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-[#D9D9D9] text-sm">
          © {new Date().getFullYear()} Plugin Technologies. All rights reserved.
        </p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/privacy" className="text-[#D9D9D9] hover:text-[#E4A425] text-sm transition">Privacy Policy</Link>
          <Link href="/terms" className="text-[#D9D9D9] hover:text-[#E4A425] text-sm transition">Terms of Service</Link>
          <Link href="/cookies" className="text-[#D9D9D9] hover:text-[#E4A425] text-sm transition">Cookie Policy</Link>
        </div>
      </motion.div>
      {/* Decorative Elements */}
      <motion.div 
        className="absolute right-10 bottom-20 w-24 h-24 rounded-full bg-[#E4A425] opacity-10 blur-xl"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.footer>
  );
};

export default Footer;