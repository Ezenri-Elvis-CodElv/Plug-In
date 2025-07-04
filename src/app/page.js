"use client";
import { useState, useRef, useEffect } from "react";
import { motion as Motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import {
  FaUserShield, FaBolt, FaUsers, FaCheckCircle, FaTshirt,
  FaLaptopCode, FaTools, FaGavel, FaHeartbeat,
  FaArrowRight, FaApple, FaGooglePlay, FaStar, FaTwitter,
  FaInstagram, FaFacebookF, FaWhatsapp
} from "react-icons/fa";
import dynamic from "next/dynamic";
import Link from "next/link";
import Lenis from "@studio-freight/lenis";
import { SiSpacex } from "react-icons/si";
import { FiArrowRight, FiMapPin } from "react-icons/fi";

// Dynamically import ParticleRing so it only renders on the client
const ParticleRing = dynamic(() => import("./components/ParticleRing"), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 pointer-events-none" />
});

const SECTION_HEIGHT = 1500;

// Smooth scroll effect with Lenis
const LandingPage = () => {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.05 });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const bgRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [bubbles, setBubbles] = useState([]);

  // Features data
  const features = [
    {
      title: "Seamless Experience",
      description: "Navigate your business operations with ease using our intuitive interface built for speed and efficiency.",
    },
    {
      title: "Real-Time Analytics",
      description: "Monitor your business performance with live data insights, enabling smarter and faster decision-making.",
    },
    {
      title: "Secure Cloud Storage",
      description: "Keep your data safe and accessible at any time from anywhere with our robust cloud solutions.",
    },
    {
      title: "24/7 Customer Support",
      description: "Our dedicated team is always ready to assist you, ensuring your operations run smoothly without interruptions.",
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, Tech Innovations",
      content: "Plugin has transformed how we manage our operations. The platform is intuitive and powerful.",
      rating: 5
    },
    {
      name: "David Mbeki",
      role: "Finance Director, Growth Corp",
      content: "The analytics tools have given us insights we never had before. Our decision-making process is now data-driven.",
      rating: 4
    },
    {
      name: "Amina Diallo",
      role: "Operations Manager, Logistics Plus",
      content: "Customer support is exceptional. They're always available when we need assistance.",
      rating: 5
    }
  ];

  // Service categories for icons
  const categories = [
    { icon: <FaLaptopCode />, label: "Tech" },
    { icon: <FaTshirt />, label: "Fashion" },
    { icon: <FaTools />, label: "Repairs" },
    { icon: <FaGavel />, label: "Legal" },
    { icon: <FaHeartbeat />, label: "Wellness" },
    { icon: <FaUsers />, label: "Events" },
    { icon: <FaBolt />, label: "Power" },
    { icon: <FaCheckCircle />, label: "More..." },
  ];

  // Generate bubbles on client-side only
  useEffect(() => {
    const newBubbles = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${10 + i * 7}%`,
      width: 40 + Math.random() * 40,
      height: 40 + Math.random() * 40,
    }));
    setBubbles(newBubbles);
  }, []);

  // Run animations after bubbles are generated
  useEffect(() => {
    if (bubbles.length === 0 || typeof window === "undefined") return;
    if (bgRef.current) {
      gsap.to(".bubble", {
        y: -600,
        repeat: -1,
        duration: () => 6 + Math.random() * 4,
        ease: "power1.inOut",
        stagger: 0.2,
        yoyo: true,
      });
      gsap.to(".lightning", {
        opacity: 0.7,
        repeat: -1,
        duration: 0.2,
        yoyo: true,
        delay: 2,
        ease: "power1.inOut",
      });
      gsap.from(".hero-text", {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        delay: 0.3
      });
      gsap.from(".hero-buttons", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.8
      });
    }
  }, [bubbles]);

  // Handle download button click
  const handleDownload = () => {
    setShowModal(true);
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden flex flex-col items-center"
      style={{
        background: "linear-gradient(135deg, #000 60%, #FFD600 100%)",
        color: "#fff",
        position: "relative",
      }}
    >
      {/* Add the SmoothScrollHero at the top */}
      <SmoothScrollHero />
      
      {/* Add an anchor point for the main content */}
      <div id="main-content" className="absolute top-0" />
      
      {/* Rest of your existing content */}
      <div className="min-h-screen w-full flex flex-col items-center">
        {/* Phone Showcase section */}
        <section className="w-full py-20 flex justify-center">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl">
            <div className="md:w-1/2">
              <Motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Designed for <span className="text-yellow-400">Efficiency</span>
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                  Our mobile application combines sleek design with powerful functionality to streamline your business operations. Experience seamless integration across all your devices.
                </p>
                <Link href="/learnmore">
                  <button
                    className="flex items-center gap-2 text-lg font-medium text-yellow-400 hover:text-yellow-300 transition"
                  >
                    Learn more
                    <FaArrowRight className="mt-0.5" />
                  </button>
                </Link>
              </Motion.div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative z-10">
                  <div className="w-64 h-[500px] bg-gray-800/30 backdrop-blur-sm rounded-[40px] border border-yellow-500/30 overflow-hidden shadow-2xl">
                    <div className="h-6 bg-gray-900/80 flex justify-center items-center">
                      <div className="w-24 h-1 bg-gray-700 rounded-full"></div>
                    </div>
                    <div className="h-full bg-gradient-to-b from-gray-800/50 to-black/50 p-4">
                      <div className="h-10 mb-4">
                        <div className="flex justify-between items-center px-2">
                          <span className="text-white text-sm">9:41</span>
                          <div className="flex gap-1">
                            <div className="w-1 h-4 bg-gray-600 rounded-sm"></div>
                            <div className="w-1 h-4 bg-gray-600 rounded-sm"></div>
                            <div className="w-1 h-4 bg-gray-600 rounded-sm"></div>
                            <div className="w-1 h-4 bg-gray-600 rounded-sm"></div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-4 border border-gray-700/50">
                        <div className="flex justify-between mb-6">
                          <h3 className="text-white font-bold">Dashboard</h3>
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 border border-gray-700/50">
                              <div className="h-6 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded mb-2"></div>
                              <div className="h-4 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded w-3/4"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
                        <div className="flex justify-between mb-4">
                          <h3 className="text-white font-bold">Recent Activity</h3>
                          <span className="text-gray-400 text-sm">View all</span>
                        </div>
                        <div className="space-y-3">
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500/30 to-yellow-600/30"></div>
                              <div className="flex-1">
                                <div className="h-4 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded w-3/4 mb-1"></div>
                                <div className="h-3 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded w-1/2"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-full -z-10 filter blur-3xl opacity-50"></div>
              </Motion.div>
            </div>
          </div>
        </section>

        {/* Bouncy Cards Features Section */}
        <BouncyCardsFeatures />

        {/* Features Section */}
        <section id="features" className="w-full py-20 flex justify-center">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <Motion.h2
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Powerful <span className="text-yellow-400">Features</span>
              </Motion.h2>
              <Motion.p
                className="text-lg text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Discover the tools that will transform your business operations and drive growth
              </Motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Motion.div
                  key={index}
                  className="bg-gray-800/30 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-8 hover:border-yellow-400 transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-5xl font-bold mb-4 text-yellow-400">0{index + 1}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-300 mb-6">{feature.description}</p>
                  <Link href="/learnmore">
                    <button
                      className="flex items-center gap-2 text-yellow-400 font-medium hover:text-yellow-300 transition"
                    >
                      Learn more
                      <FaArrowRight className="text-sm" />
                    </button>
                  </Link>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section id="categories" className="w-full max-w-5xl mx-auto py-16 z-10">
          <Motion.h3
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold mb-8 text-yellow-400"
          >
            20+ Service Categories
          </Motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {categories.map((cat, i) => (
              <Motion.div
                key={cat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-black/60 rounded-xl p-6 flex flex-col items-center hover:bg-yellow-500/10 transition-all"
              >
                <span className="mb-2 text-yellow-400 text-3xl">{cat.icon}</span>
                <span className="font-semibold">{cat.label}</span>
              </Motion.div>
            ))}
          </div>
        </section>

        {/* Why Plugin? (Trust Builders) */}
        <section id="how" className="w-full max-w-5xl mx-auto py-16 z-10">
          <Motion.h3
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold mb-8 text-yellow-400"
          >
            Why Plugin?
          </Motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: <FaUserShield size={32} />,
                title: "Verified Vendors",
                desc: "All providers are vetted for trust & safety.",
              },
              {
                icon: <FaBolt size={32} />,
                title: "Instant Booking",
                desc: "Book & pay in seconds, online or offline.",
              },
              {
                icon: <FaCheckCircle size={32} />,
                title: "Escrow & Security",
                desc: "Payments are protected until job is done.",
              },
              {
                icon: <FaUsers size={32} />,
                title: "USSD & Multi-currency",
                desc: "Access via USSD, pay in your local currency.",
              },
            ].map((item, i) => (
              <Motion.div
                key={item.title}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-black/60 rounded-xl p-6 flex flex-col items-center hover:bg-yellow-500/10 transition-all"
              >
                <span className="mb-2 text-yellow-400">{item.icon}</span>
                <span className="font-bold">{item.title}</span>
                <span className="text-gray-300 text-sm">{item.desc}</span>
              </Motion.div>
            ))}
          </div>
        </section>

        {/* Plugin4Good (Social Impact) */}
        <section id="impact" className="w-full max-w-5xl mx-auto py-16 z-10">
          <Motion.h3
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold mb-8 text-yellow-400"
          >
            Plugin4Good: Social Impact
          </Motion.h3>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <Motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="bg-black/60 rounded-xl p-8 flex-1"
            >
              <div className="text-2xl font-bold mb-2 text-yellow-400">Mission</div>
              <div className="mb-4">
                Train and empower underserved Africans for a better future.
              </div>
              <div className="flex gap-8 text-center justify-center">
                <div>
                  <div className="text-2xl font-bold text-yellow-400">300+</div>
                  <div className="text-xs text-gray-300">Trained</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">100+</div>
                  <div className="text-xs text-gray-300">Empowered</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">80+</div>
                  <div className="text-xs text-gray-300">Families Supported</div>
                </div>
              </div>
              <Link href="/learnmore">
                <span className="mt-6 inline-block px-6 py-2 rounded-full border-2 border-yellow-400 text-yellow-400 font-bold hover:bg-yellow-400 hover:text-black transition cursor-pointer">
                  Learn more
                </span>
              </Link>
            </Motion.div>
            <Motion.div
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="flex-1"
            >
              <div className="bg-gray-800 rounded-xl w-full h-64 flex items-center justify-center">
                <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 w-32 h-32 rounded-full flex items-center justify-center">
                  <FaUsers className="text-yellow-400 text-6xl" />
                </div>
              </div>
            </Motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-20 flex justify-center">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <Motion.h2
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                What Our <span className="text-yellow-400">Clients Say</span>
              </Motion.h2>
              <Motion.p
                className="text-lg text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Hear from businesses that have transformed their operations with our solutions
              </Motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Motion.div
                  key={index}
                  className="bg-gray-800/30 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-8 hover:border-yellow-400 transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-yellow-400 text-5xl mb-4"></div>
                  <p className="text-gray-300 mb-6 italic">{testimonial.content}</p>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${i < testimonial.rating ? "text-yellow-400" : "text-gray-700"}`}
                      />
                    ))}
                  </div>
                  <div className="border-t border-gray-700/50 pt-4">
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-yellow-400">{testimonial.role}</p>
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 bg-gradient-to-r from-yellow-900/20 to-yellow-800/20 flex justify-center">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-300 mb-10">
                Join thousands of businesses already using our platform to streamline their operations
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:opacity-90 transition-all duration-300 text-lg shadow-lg shadow-yellow-500/30"
                >
                  See Products
                </Motion.button>
                <Motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-transparent border-2 border-yellow-500 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-500/10 transition-all duration-300 text-lg"
                >
                  Schedule a Demo
                </Motion.button>
              </div>
            </Motion.div>
          </div>
        </section>

        {/* App Store Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 backdrop-blur-lg rounded-xl p-8 flex flex-col items-center gap-6 min-w-[320px] max-w-md w-full relative border border-yellow-500/30"
            >
              <button
                className="absolute top-4 right-4 text-yellow-400 text-2xl hover:text-yellow-300 transition"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-white mb-2">Get Our Mobile App</h2>
              <p className="text-gray-300 text-center mb-4">
                Download our app for the best experience on mobile devices
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <a
                  href="https://apps.apple.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-black/50 backdrop-blur-sm border border-gray-700/50 rounded-lg hover:bg-yellow-500/10 transition w-full"
                >
                  <FaApple className="text-xl" />
                  <div className="text-left">
                    <span className="text-xs text-gray-400">Download on the</span>
                    <div className="font-semibold text-white">App Store</div>
                  </div>
                </a>
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-black/50 backdrop-blur-sm border border-gray-700/50 rounded-lg hover:bg-yellow-500/10 transition w-full"
                >
                  <FaGooglePlay className="text-xl" />
                  <div className="text-left">
                    <span className="text-xs text-gray-400">Get it on</span>
                    <div className="font-semibold text-white">Google Play</div>
                  </div>
                </a>
              </div>
            </Motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

const SmoothScrollHero = () => {
  return (
    <div className="bg-zinc-950 relative z-20">
      <Hero />
    </div>
  );
};



const Hero = () => (
  <div
    style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
    className="relative w-full"
  >
    <CenterImage />
    <ParallaxImages />
    <div className="absolute bottom-0 left-0 right-0 h-96 bg-[#000000]" />
    {/* Overlay your hero content here if you want */}
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
      <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center max-w-4xl relative pointer-events-auto">
        <Motion.div className="mb-8">
          <div className="inline-block px-4 py-2 bg-yellow-900/30 backdrop-blur-sm rounded-full mb-6 border border-yellow-700/50">
            <span className="text-yellow-400 text-sm font-medium tracking-wider">
              TRANSFORMING DIGITAL EXPERIENCES
            </span>
          </div>
        </Motion.div>
        <Motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight hero-text">
          <span className="block mb-3">Find Trusted Services Across Africa.</span>
          <span className="relative">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Plugin – Africa’s Trusted Service Marketplace
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></span>
          </span>
        </Motion.h1>
        <Motion.p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 hero-text">
          Plugin connects users to trusted service providers across Africa—online, offline, and on-demand.<br />
          Join our waitlist for early access before the August 2025 launch and discover <Link href="/learnmore" className="underline text-yellow-400 hover:text-yellow-300">Plugin4Good</Link>, our social impact initiative.
        </Motion.p>
      </div>
    </div>
  </div>
);

const CenterImage = () => {
  const { scrollY } = useScroll();
  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;
  const backgroundSize = useTransform(scrollY, [0, SECTION_HEIGHT + 500], ["170%", "100%"]);
  const opacity = useTransform(scrollY, [SECTION_HEIGHT, SECTION_HEIGHT + 500], [1, 0]);
 return (
  <Motion.div
    className="sticky top-50 h-screen w-full"
    style={{
      clipPath,
      backgroundSize,
      opacity,
      backgroundImage: "url(/aboutus.jpg)",
      backgroundPosition: "center 10%", // <-- Move image down
      backgroundRepeat: "no-repeat",
    }}
  />
);
};

const ParallaxImages = () => (
  <div className="mx-auto max-w-5xl px-4 pt-[200px]">
    <ParallaxImg
      src="/team1.jpg"
      alt="And example of a space launch"
      start={-200}
      end={200}
      className="w-1/3"
    />
    {/* <ParallaxImg
      src="/team2.jpg"
      alt="An example of a space launch"
      start={200}
      end={-250}
      className="mx-auto w-2/3"
    /> */}
    <ParallaxImg
      src="/team4.jpg"
      alt="Orbiting satellite"
      start={-200}
      end={200}
      className="ml-auto w-1/3"
    />
    <ParallaxImg
      src="/team3.jpg"
      alt="Orbiting satellite"
      start={0}
      end={-500}
      className="ml-24 w-5/12"
    />
  </div>
);

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });
  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;
  return (
    <Motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const BouncyCardsFeatures = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 text-slate-800">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:px-8">
        <h2 className="max-w-lg text-4xl font-bold md:text-5xl">
          Grow faster with our
          <span className="text-slate-400"> all in one solution</span>
        </h2>
        <Link href="/learnmore">
          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="whitespace-nowrap rounded-lg bg-slate-900 px-4 py-2 font-medium text-white shadow-xl transition-colors hover:bg-slate-700"
          >
            Learn more
          </Motion.button>
        </Link>
      </div>
      <div className="mb-4 grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>Instant Booking</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-violet-400 to-indigo-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg] flex flex-col items-center justify-center">
            <FaBolt className="text-4xl text-indigo-50 mb-2" />
            <span className="block text-center font-semibold text-indigo-50">
              Book & pay for services in seconds, online or offline.
            </span>
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle>Verified Vendors</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-amber-400 to-orange-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg] flex flex-col items-center justify-center">
            <FaUserShield className="text-4xl text-orange-50 mb-2" />
            <span className="block text-center font-semibold text-orange-50">
              All providers are vetted for trust & safety.
            </span>
          </div>
        </BounceCard>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle>Escrow & Security</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-green-400 to-emerald-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg] flex flex-col items-center justify-center">
            <FaCheckCircle className="text-4xl text-emerald-50 mb-2" />
            <span className="block text-center font-semibold text-emerald-50">
              Payments are protected until job is done.
            </span>
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>USSD & Multi-currency</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-pink-400 to-red-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg] flex flex-col items-center justify-center">
            <FaUsers className="text-4xl text-red-50 mb-2" />
            <span className="block text-center font-semibold text-red-50">
              Access via USSD, pay in your local currency.
            </span>
          </div>
        </BounceCard>
      </div>
    </section>
  );
};

const BounceCard = ({ className, children }) => {
  return (
    <Motion.div
      whileHover={{ scale: 0.95, rotate: "-1deg" }}
      className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-slate-100 p-8 ${className}`}
    >
      {children}
    </Motion.div>
  );
};

const CardTitle = ({ children }) => {
  return (
    <h3 className="mx-auto text-center text-3xl font-semibold">{children}</h3>
  );
};
export default LandingPage;