"use client";
import React, { useRef, useState } from "react";
import { motion as Motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { FaTshirt, FaBolt, FaStar, FaShippingFast, FaUsers, FaLock, FaCheckCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import Link from "next/link";
import { Modal } from "antd";
import "antd/dist/reset.css";

// --- Color Palette ---
const PRIMARY = "#E4A425";
const BG_DARK = "#080808";
const BG_LIGHT = "#F7F4F3";
const TEXT_LIGHT = "#F7F4F3";
const TEXT_DARK = "#1A1A1A";

// Product images and info
const PRODUCT_IMAGES = [
  {
    imgUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subheading: "Collaborate",
    heading: "Built for all of us.",
    icon: <FaUsers className="text-[#E4A425] text-3xl mb-2" />,
    description: "Our platform connects diverse communities, enabling seamless collaboration across Africa.",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subheading: "Quality",
    heading: "Never compromise.",
    icon: <FaStar className="text-[#E4A425] text-3xl mb-2" />,
    description: "We maintain the highest standards to ensure excellence in every service provided.",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subheading: "Efficiency",
    heading: "Designed for speed.",
    icon: <FaBolt className="text-[#E4A425] text-3xl mb-2" />,
    description: "Experience streamlined processes that save you time and resources.",
  },
];

const SERVICE_CATEGORIES = [
  { icon: <FaTshirt />, label: "Fashion" },
  { icon: <FaLock />, label: "Security" },
  { icon: <FaCheckCircle />, label: "Quality Control" },
  { icon: <FaShippingFast />, label: "Logistics" },
];

const TESTIMONIALS = [
  {
    name: "Kuforiji Olamide",
    role: "CEO, Tech Innovations",
    content: "This platform has transformed how we manage our operations. The efficiency is unmatched.",
    rating: 5
  },
  {
    name: "David Mbeki",
    role: "Finance Director, Growth Corp",
    content: "The quality assurance processes have given us confidence we never had before.",
    rating: 4
  },
  {
    name: "Amina Diallo",
    role: "Operations Manager, Logistics Plus",
    content: "Customer support is exceptional. Always available when we need assistance.",
    rating: 5
  }
];

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, icon, children }) => {
  return (
    <div
      style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}
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
    <Motion.div
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
      <Motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(8,8,8,0.7) 0%, rgba(8,8,8,0.3) 100%)",
          opacity,
        }}
      />
    </Motion.div>
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
    <Motion.div
      style={{ y, opacity }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      {icon}
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </Motion.div>
  );
};

const FeatureCard = ({ title, description, icon }) => {
  return (
    <Motion.div 
      className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333] hover:border-[#E4A425] transition-all"
      whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(228, 164, 37, 0.2)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-[#E4A425] text-2xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-[#F7F4F3]">{title}</h3>
      <p className="text-[#B3B3B3]">{description}</p>
    </Motion.div>
  );
};

const ExampleContent = () => {
  const [modal, setModal] = useState({ open: false, key: "" });

  const handleOpen = (key) => setModal({ open: true, key });
  const handleClose = () => setModal({ open: false, key: "" });

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 pb-24 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-[#E4A425]">
              Why Choose Our Platform
            </h2>
            <p className="text-lg text-[#F7F4F3] mb-8">
              We provide cutting-edge solutions designed to streamline your operations and enhance productivity. 
              Our platform offers unparalleled security, efficiency, and reliability.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {SERVICE_CATEGORIES.map((cat, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#1A1A1A] px-4 py-3 rounded-lg">
                  <span className="text-[#E4A425] text-xl">{cat.icon}</span>
                  <span className="text-[#F7F4F3]">{cat.label}</span>
                </div>
              ))}
            </div>
            
            <Link href="/contact">
              <button className="rounded bg-[#E4A425] px-8 py-3 text-lg text-[#080808] font-bold hover:bg-[#c48b1a] transition-colors flex items-center gap-2">
                Get Started <FiArrowUpRight />
              </button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <FeatureCard 
              title="Secure Transactions" 
              description="Bank-level security for all your transactions and data." 
              icon={<FaLock />} 
            />
            <FeatureCard 
              title="Fast Delivery" 
              description="Guaranteed timely delivery of services and solutions." 
              icon={<FaShippingFast />} 
            />
            <FeatureCard 
              title="Quality Assurance" 
              description="Rigorous quality checks for all services provided." 
              icon={<FaCheckCircle />} 
            />
            <FeatureCard 
              title="User Community" 
              description="Join a network of verified professionals and clients." 
              icon={<FaUsers />} 
            />
          </div>
        </div>
      </div>
      
      <Modal
        open={modal.open}
        onCancel={handleClose}
        footer={null}
        centered
        className="feature-modal"
      >
        <div className="text-center p-6">
          <div className="text-[#E4A425] text-5xl mb-4">
            {modal.key === "Secure Transactions" && <FaLock />}
            {modal.key === "Fast Delivery" && <FaShippingFast />}
            {modal.key === "Quality Assurance" && <FaCheckCircle />}
            {modal.key === "User Community" && <FaUsers />}
          </div>
          <h3 className="text-2xl font-bold mb-4 text-[#1A1A1A]">{modal.key}</h3>
          <p className="text-lg text-gray-700">
            {modal.key === "Secure Transactions" && "Our platform uses military-grade encryption to protect all transactions and user data."}
            {modal.key === "Fast Delivery" && "We guarantee delivery within agreed timelines with our optimized logistics network."}
            {modal.key === "Quality Assurance" && "Every service undergoes a 5-step quality verification process before delivery."}
            {modal.key === "User Community" && "Join thousands of verified professionals across Africa in our trusted network."}
          </p>
        </div>
      </Modal>
    </>
  );
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <Motion.div 
      className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`text-sm ${i < testimonial.rating ? "text-[#E4A425]" : "text-gray-700"}`}
          />
        ))}
      </div>
      <p className="text-[#B3B3B3] italic mb-6">&quot;{testimonial.content}&quot;</p>
      <div className="border-t border-[#333333] pt-4">
        <h4 className="font-bold text-[#F7F4F3]">{testimonial.name}</h4>
        <p className="text-[#E4A425]">{testimonial.role}</p>
      </div>
    </Motion.div>
  );
};

const Products = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  
  return (
    <div className="min-h-screen bg-[#080808] text-[#F7F4F3] pt-20">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808] to-[#E4A425]/10"></div>
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 10% 20%, rgba(228, 164, 37, 0.1) 0%, rgba(228, 164, 37, 0) 30%)"
            }}
          ></div>
        </div>
        
        <Motion.div 
          className="container mx-auto px-4 text-center relative z-10"
          style={{ y }}
        >
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-6 py-2 bg-[#E4A425]/10 backdrop-blur-sm rounded-full mb-6 border border-[#E4A425]/30"
          >
            <span className="text-[#E4A425] text-sm font-medium tracking-wider">
              INNOVATING FOR AFRICA
            </span>
          </Motion.div>
          
          <Motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="block mb-4">Transform Your Business</span>
            <span className="bg-gradient-to-r from-[#E4A425] to-[#FFD600] bg-clip-text text-transparent">
              With Enterprise Solutions
            </span>
          </Motion.h1>
          
          <Motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-[#B3B3B3] max-w-3xl mx-auto mb-10"
          >
            Our platform provides cutting-edge tools to streamline operations, enhance security, and drive growth across Africa.
          </Motion.p>
          
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/demo">
              <button className="px-8 py-3 bg-gradient-to-r from-[#E4A425] to-[#c48b1a] text-[#080808] font-bold rounded-lg transition-all duration-300 shadow-lg shadow-[#E4A425]/30 flex items-center justify-center text-lg">
                Request Demo
              </button>
            </Link>
            <Link href="/features">
              <button className="px-8 py-3 bg-transparent border-2 border-[#E4A425] text-[#E4A425] font-medium rounded-lg hover:bg-[#E4A425]/10 transition-all duration-300 text-lg">
                Explore Features
              </button>
            </Link>
          </Motion.div>
        </Motion.div>
        
        <Motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs mb-2 text-[#E4A425]">Scroll to discover</span>
          <div className="w-7 h-10 rounded-full border-2 border-[#E4A425] flex justify-center p-1">
            <Motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-[#E4A425] rounded-full"
            />
          </div>
        </Motion.div>
      </section>

      {/* Products/Features Section */}
      <section className="py-20">
        <Motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-[#E4A425]">Solutions</span>
          </h2>
          <p className="text-lg text-[#B3B3B3] max-w-2xl mx-auto">
            Discover our suite of enterprise tools designed to solve critical business challenges.
          </p>
        </Motion.div>
        
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
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-[#080808] to-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by <span className="text-[#E4A425]">Industry Leaders</span>
            </h2>
            <p className="text-lg text-[#B3B3B3] max-w-2xl mx-auto">
              Hear from organizations that have transformed their operations with our platform.
            </p>
          </Motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, i) => (
              <TestimonialCard key={i} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#E4A425]/10 to-[#c48b1a]/10">
        <div className="container mx-auto px-4 text-center">
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-[#B3B3B3] mb-10">
              Join hundreds of enterprises using our platform to drive growth and innovation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <button className="px-8 py-3 bg-gradient-to-r from-[#E4A425] to-[#c48b1a] text-[#080808] font-bold rounded-lg hover:opacity-90 transition-all duration-300 text-lg shadow-lg shadow-[#E4A425]/30">
                  Schedule a Demo
                </button>
              </Link>
              <Link href="/pricing">
                <button className="px-8 py-3 bg-transparent border-2 border-[#E4A425] text-[#E4A425] font-bold rounded-lg hover:bg-[#E4A425]/10 transition-all duration-300 text-lg">
                  View Pricing
                </button>
              </Link>
            </div>
          </Motion.div>
        </div>
      </section>

     
    </div>
  );
};

export default Products;