"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckSquare, FiX } from "react-icons/fi";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image"; // Import Next.js Image

// Color palette
const PRIMARY = "#E4A425";
const BG_DARK = "#080808";
const BG_LIGHT = "#F7F4F3";

const NOTIFICATION_TTL = 5000;

const Notification = ({ text, id, removeNotif }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif(id);
    }, NOTIFICATION_TTL);
    return () => clearTimeout(timeoutRef);
  }, [id, removeNotif]);

  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-2 flex items-start rounded gap-2 text-xs font-medium shadow-lg text-white bg-indigo-500 pointer-events-auto"
    >
      <FiCheckSquare className="mt-0.5" />
      <span>{text}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
        <FiX />
      </button>
    </motion.div>
  );
};

const generateRandomNotif = (msg) => ({
  id: Math.random(),
  text: msg || "Message sent successfully!",
});

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setNotifications((prev) => [...prev, generateRandomNotif()]);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  const removeNotif = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const openMap = (address) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, "_blank");
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
            {/* Email */}
            <div className="flex items-center gap-4 group">
              <FiMail className="text-2xl text-[#E4A425]" />
              <button
                type="button"
                onClick={() => {
                  copyToClipboard("talk.plugin@gmail.com");
                  window.open("mailto:talk.plugin@gmail.com");
                }}
                className="text-[#F7F4F3] underline underline-offset-2 hover:text-[#E4A425] transition cursor-pointer"
                title="Copy & Email"
              >
                talk.plugin@gmail.com
              </button>
            </div>
            {/* Phone */}
            <div className="flex items-center gap-4 group">
              <FiPhone className="text-2xl text-[#E4A425]" />
              <button
                type="button"
                onClick={() => {
                  copyToClipboard("+2349035272603");
                  window.open("tel:+2349035272603");
                }}
                className="text-[#F7F4F3] underline underline-offset-2 hover:text-[#E4A425] transition cursor-pointer"
                title="Copy & Call"
              >
                +234 903 527 2603
              </button>
            </div>
            {/* Address */}
            <div className="flex items-center gap-4 group">
              <FiMapPin className="text-2xl text-[#E4A425]" />
              <button
                type="button"
                onClick={() => {
                  copyToClipboard("258 Borno Way, Yaba, Lagos");
                  openMap("258 Borno Way, Yaba, Lagos");
                }}
                className="text-[#F7F4F3] underline underline-offset-2 hover:text-[#E4A425] transition cursor-pointer"
                title="Copy & Locate"
              >
                258 Borno Way, Yaba, Lagos
              </button>
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
          </motion.form>
        </div>
        {/* Notifications */}
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
          <AnimatePresence>
            {notifications.map((notif) => (
              <Notification
                key={notif.id}
                id={notif.id}
                text={notif.text}
                removeNotif={removeNotif}
              />
            ))}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}