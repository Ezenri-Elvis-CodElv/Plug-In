"use client";
import React, { useRef, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Color palette
const PRIMARY = "#E4A425";
const BG_DARK = "#080808";
const BG_LIGHT = "#F7F4F3";

// Feature cards data
const features = [
  {
    title: "Verified Professionals",
    description: "All service providers are thoroughly vetted for quality and trust.",
    icon: "✅"
  },
  {
    title: "Instant Booking",
    description: "Book and pay for services in seconds, online or offline.",
    icon: "⚡"
  },
  {
    title: "Secure Payments",
    description: "Your payments are protected with escrow until the job is done.",
    icon: "🔒"
  },
  {
    title: "Multi-Channel Access",
    description: "Access services via web, mobile app, or USSD in your local currency.",
    icon: "🌍"
  }
];

export default function DemoPage() {
  const heroRef = useRef(null);
  const featureRef = useRef(null);
  const statsRef = useRef(null);
  const cardRefs = useRef([]);
  const testimonialRef = useRef(null);
  const ctaRef = useRef(null);

  // Set up GSAP animations with ScrollTrigger
  useEffect(() => {
    // Hero animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%"
        }
      }
    );

    // Feature cards animation
    cardRefs.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: featureRef.current,
            start: "top 85%"
          }
        }
      );
    });

    // Stats animation
    const counters = statsRef.current.querySelectorAll(".stat-number");
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const count = { value: 0 };
      
      gsap.to(count, {
        value: target,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        onUpdate: () => {
          counter.textContent = Math.ceil(count.value);
        }
      });
    });

    // Testimonial animation
    gsap.fromTo(
      testimonialRef.current,
      { opacity: 0, x: -60 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: testimonialRef.current,
          start: "top 85%"
        }
      }
    );

    // CTA animation
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%"
        }
      }
    );
  }, []);

  return (
    <div 
      className="min-h-screen w-full overflow-x-hidden"
      style={{ background: BG_LIGHT, color: BG_DARK }}
    >
      {/* Hero Section */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden"
        style={{
          backgroundImage: "url('/bghero.png')", // <-- your hero background image path
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for darkening the image and keeping text readable */}
        <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />

        {/* Decorative elements (Framer Motion/GSAP) */}
        <div className="absolute top-20 right-10 w-60 h-60 rounded-full opacity-10 z-10" 
             style={{ background: PRIMARY }}></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full opacity-10 z-10" 
             style={{ background: PRIMARY }}></div>
        
        <Motion.div 
          ref={heroRef}
          className="text-center max-w-4xl z-20 relative"
        >
          <Motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-extrabold mb-6"
            style={{ color: PRIMARY }}
          >
            Africa’s Trusted Service Marketplace
          </Motion.h1>
          
          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white"
            style={{ textShadow: "0 2px 16px #000" }}
          >
            Plugin connects you to verified professionals and essential services across Africa—online, offline, and on-demand. Experience seamless booking, secure payments, and real impact.
          </Motion.p>
          
          <Motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link href="/products">
              <Motion.button
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: BG_DARK,
                  color: PRIMARY
                }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-lg font-bold text-lg shadow-lg border-2"
                style={{ 
                  background: PRIMARY, 
                  color: BG_DARK,
                  borderColor: PRIMARY
                }}
              >
                Explore Services
              </Motion.button>
            </Link>
          </Motion.div>
        </Motion.div>
        
        {/* Animated floating elements */}
        <Motion.div 
          className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full z-10"
          style={{ background: PRIMARY }}
          animate={{ 
            y: [0, -30, 0],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <Motion.div 
          className="absolute bottom-1/3 right-1/3 w-6 h-6 rounded-full z-10"
          style={{ background: PRIMARY }}
          animate={{ 
            y: [0, 30, 0],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </section>
      
      {/* Features Section */}
      <section 
        ref={featureRef}
        className="py-20 px-4 md:px-8"
        style={{ background: BG_DARK }}
      >
        <div className="max-w-6xl mx-auto">
          <Motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-16 text-center"
            style={{ color: PRIMARY }}
          >
            Why Choose Plugin?
          </Motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Motion.div
                key={index}
                ref={el => cardRefs.current[index] = el}
                whileHover={{ 
                  y: -15, 
                  boxShadow: `0 20px 40px -10px ${PRIMARY}33`,
                }}
                className="bg-white rounded-xl p-8 shadow-lg flex flex-col items-center text-center"
              >
                <Motion.div 
                  className="text-4xl mb-6"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {feature.icon}
                </Motion.div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="text-5xl font-bold mb-3" style={{ color: PRIMARY }}>
                <span className="stat-number" data-target="99">0</span>%
              </div>
              <p className="text-xl">Customer Satisfaction</p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-bold mb-3" style={{ color: PRIMARY }}>
                <span className="stat-number" data-target="500">0</span>+
              </div>
              <p className="text-xl">Services Offered</p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-bold mb-3" style={{ color: PRIMARY }}>
                <span className="stat-number" data-target="1000">0</span>+
              </div>
              <p className="text-xl">Happy Clients</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-20 px-4" style={{ background: PRIMARY }}>
        <div className="max-w-4xl mx-auto">
          <Motion.div 
            ref={testimonialRef}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-xl"
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4" style={{ borderColor: BG_DARK }}>
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              </div>
              <div className="ml-4">
                <h4 className="text-xl font-bold" style={{ color: BG_DARK }}>Amina Bello</h4>
                <p className="text-[#E4A425]">Entrepreneur, Lagos</p>
              </div>
            </div>
            
            <Motion.blockquote 
              className="text-xl italic text-[#080808]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Plugin made it so easy to find trusted professionals for my business. The booking process was seamless and the support team is fantastic!
            </Motion.blockquote>
            
            <div className="flex mt-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <Motion.svg
                  key={star}
                  className="w-8 h-8"
                  style={{ fill: BG_DARK }}
                  viewBox="0 0 24 24"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + star * 0.1 }}
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </Motion.svg>
              ))}
            </div>
          </Motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Motion.div 
            ref={ctaRef}
            className="bg-gradient-to-r from-[#E4A425] to-[#d89a1f] rounded-2xl p-10 shadow-2xl"
          >
            <Motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Ready to Experience Plugin?
            </Motion.h2>
            
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of Africans already using Plugin to connect with trusted service providers and grow their businesses.
            </p>
            
            <Motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link href="/demo">
                <button 
                  className="bg-[#080808] text-[#F7F4F3] px-10 py-4 rounded-lg font-bold text-lg shadow-lg border-2 border-[#080808] hover:bg-transparent hover:text-[#080808] transition-colors"
                >
                  Schedule a Demo
                </button>
              </Link>
            </Motion.div>
          </Motion.div>
        </div>
      </section>
      
      {/* Footer */}
    
    </div>
  );
}