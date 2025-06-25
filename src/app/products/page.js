"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { FaTshirt, FaBolt, FaStar, FaShippingFast } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import Link from "next/link";
import { Modal } from "antd";
import "antd/dist/reset.css"; // Ant Design v5+ uses reset.css

// --- Color Palette ---
const PRIMARY = "#E4A425";
const BG_DARK = "#080808";
const BG_LIGHT = "#F7F4F3";

// Product images and info
const PRODUCT_IMAGES = [
  {
    imgUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subheading: "Collaborate",
    heading: "Built for all of us.",
    icon: <FaTshirt className="text-[#E4A425] text-3xl mb-2" />,
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subheading: "Quality",
    heading: "Never compromise.",
    icon: <FaStar className="text-[#E4A425] text-3xl mb-2" />,
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subheading: "Modern",
    heading: "Dress for the best.",
    icon: <FaBolt className="text-[#E4A425] text-3xl mb-2" />,
  },
];

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, icon, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
      className="mb-24"
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} icon={icon} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl shadow-2xl"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(8,8,8,0.7) 0%, rgba(8,8,8,0.3) 100%)",
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading, icon }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      {icon}
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

// Modal content for each feature
const MODAL_CONTENT = {
  "Fast Delivery": {
    title: "Fast Delivery",
    description:
      "We ensure your products reach you in record time, thanks to our optimized logistics and dedicated delivery partners.",
    icon: <FaShippingFast className="text-[#E4A425] text-4xl mb-2" />,
  },
  "Top Quality": {
    title: "Top Quality",
    description:
      "Our products are sourced from trusted vendors and undergo strict quality checks to guarantee your satisfaction.",
    icon: <FaStar className="text-[#E4A425] text-4xl mb-2" />,
  },
  "Modern Tech": {
    title: "Modern Tech",
    description:
      "Experience the latest in technology and innovation with our modern solutions tailored for your needs.",
    icon: <FaBolt className="text-[#E4A425] text-4xl mb-2" />,
  },
};

const ExampleContent = () => {
  const [modal, setModal] = useState({ open: false, key: "" });

  const handleOpen = (key) => setModal({ open: true, key });
  const handleClose = () => setModal({ open: false, key: "" });

  return (
    <>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
        <h2 className="col-span-1 text-3xl font-bold md:col-span-4 flex items-center gap-2 text-[#E4A425]">
          <ImSpinner2 className="text-[#E4A425] animate-spin mr-2" />
          Fast, Reliable, and Modern
        </h2>
        <div className="col-span-1 md:col-span-8">
          <p className="mb-4 text-xl text-[#F7F4F3] md:text-2xl">
            Discover our curated products and services, designed for efficiency and style. Enjoy seamless shopping, secure payments, and fast delivery across Africa.
          </p>
          <ul className="mb-8 flex flex-wrap gap-4">
            <li
              className="flex items-center gap-2 bg-[#080808]/80 px-4 py-2 rounded-full text-[#E4A425] text-lg cursor-pointer"
              onClick={() => handleOpen("Fast Delivery")}
            >
              <FaShippingFast /> Fast Delivery
            </li>
            <li
              className="flex items-center gap-2 bg-[#080808]/80 px-4 py-2 rounded-full text-[#E4A425] text-lg cursor-pointer"
              onClick={() => handleOpen("Top Quality")}
            >
              <FaStar /> Top Quality
            </li>
            <li
              className="flex items-center gap-2 bg-[#080808]/80 px-4 py-2 rounded-full text-[#E4A425] text-lg cursor-pointer"
              onClick={() => handleOpen("Modern Tech")}
            >
              <FaBolt /> Modern Tech
            </li>
          </ul>
          <Link href="/learnmore">
            <button className="w-full rounded bg-[#E4A425] px-9 py-4 text-xl text-[#080808] font-bold shadow-lg hover:bg-[#c48b1a] transition-colors md:w-fit flex items-center gap-2">
              Learn more <FiArrowUpRight />
            </button>
          </Link>
        </div>
      </div>
      <Modal
        open={modal.open}
        onCancel={handleClose}
        footer={null}
        centered
        title={
          <div className="flex flex-col items-center">
            {MODAL_CONTENT[modal.key]?.icon}
            <span className="text-2xl font-bold">{MODAL_CONTENT[modal.key]?.title}</span>
          </div>
        }
        styles={{ body: { textAlign: "center", padding: "2rem" } }}
      >
        <p className="text-lg text-gray-700">{MODAL_CONTENT[modal.key]?.description}</p>
      </Modal>
    </>
  );
};

const Products = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#080808] pt-23 via-[#E4A425]/10 to-[#F7F4F3]/10 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-6xl font-bold text-center mb-10 text-[#E4A425]"
      >
        Our Products
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-center text-lg text-[#F7F4F3] mb-12 max-w-2xl mx-auto"
      >
        Explore our best-in-class products and services, crafted for your needs. Scroll down to discover more.
      </motion.p>
      <div>
        {PRODUCT_IMAGES.map((item, idx) => (
          <TextParallaxContent
            key={idx}
            imgUrl={item.imgUrl}
            subheading={item.subheading}
            heading={item.heading}
            icon={item.icon}
          >
            <ExampleContent />
          </TextParallaxContent>
        ))}
      </div>
    </main>
  );
};

export default Products;