"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image"; // Import Next.js Image

// Color palette
const PRIMARY = "#E4A425";
const BG_DARK = "#080808";
const BG_LIGHT = "#F7F4F3";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main style={{ background: BG_DARK, minHeight: "100vh" }}>
      <section className="max-w-4xl mx-auto px-6 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-bold text-center mb-6"
          style={{ color: PRIMARY }}
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center text-lg text-[#F7F4F3] mb-10 max-w-2xl mx-auto"
        >
          We’d love to hear from you! Reach out for support, partnership, or general inquiries.
        </motion.p>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-6 justify-center"
          >
            <div className="flex items-center gap-4">
              <FiMail className="text-2xl text-[#E4A425]" />
              <span className="text-[#F7F4F3]">talk.plugin@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <FiPhone className="text-2xl text-[#E4A425]" />
              <span className="text-[#F7F4F3]">+234 903 527 2603</span>
            </div>
            <div className="flex items-center gap-4">
              <FiMapPin className="text-2xl text-[#E4A425]" />
              <span className="text-[#F7F4F3]">258 Borno Way, Yaba, Lagos</span>
            </div>
            <div className="flex gap-4 mt-4">
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition"
                aria-label="Twitter"
              >
                <FaTwitter className="w-8 h-8 text-[#1DA1F2]" />
              </a>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition"
                aria-label="Facebook"
              >
                <FaFacebook className="w-8 h-8 text-[#1877F3]" />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition"
                aria-label="Instagram"
              >
                <FaInstagram className="w-8 h-8 text-[#E4405F]" />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-8 h-8 text-[#0A66C2]" />
              </a>
            </div>
          </motion.div>
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-[#181818] rounded-xl p-8 shadow-lg flex flex-col gap-6"
            style={{ border: `2px solid ${PRIMARY}` }}
          >
            <label className="text-[#F7F4F3] font-semibold">
              Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-2 w-full px-4 py-3 rounded-lg bg-[#222] text-[#F7F4F3] border border-[#E4A425] focus:outline-none focus:ring-2 focus:ring-[#E4A425]"
              />
            </label>
            <label className="text-[#F7F4F3] font-semibold">
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-2 w-full px-4 py-3 rounded-lg bg-[#222] text-[#F7F4F3] border border-[#E4A425] focus:outline-none focus:ring-2 focus:ring-[#E4A425]"
              />
            </label>
            <label className="text-[#F7F4F3] font-semibold">
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="mt-2 w-full px-4 py-3 rounded-lg bg-[#222] text-[#F7F4F3] border border-[#E4A425] focus:outline-none focus:ring-2 focus:ring-[#E4A425]"
              />
            </label>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="flex items-center justify-center gap-2 bg-[#E4A425] text-[#080808] font-bold px-6 py-3 rounded-lg shadow hover:bg-[#c48b1a] transition"
            >
              <FiSend />
              Send Message
            </motion.button>
            {submitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400 font-medium text-center"
              >
                Thank you for reaching out! We’ll get back to you soon.
              </motion.p>
            )}
          </motion.form>
        </div>
      </section>
    </main>
  );
}