"use client";
import React from "react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

// Color palette
const PRIMARY = "#E4A425";
const BG_DARK = "#080808";
const BG_LIGHT = "#F7F4F3";

// GSAP animation for hero image
const useGsapHero = (imgRef) => {
  useEffect(() => {
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { scale: 0.92, opacity: 0, y: 60 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
    }
  }, [imgRef]);
};

// Hero Section
function HeroSection() {
  const imgRef = useRef(null);
  useGsapHero(imgRef);

  return (
    <section
      className="w-full min-h-[60vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16"
      style={{ background: BG_DARK, color: PRIMARY }}
    >
      <div className="flex-1 flex flex-col gap-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
          style={{ color: PRIMARY }}
        >
          About <span style={{ color: BG_LIGHT }}>Plugin</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-2xl text-[#F7F4F3] max-w-xl"
        >
          Africa’s trusted service marketplace—connecting customers with skilled professionals online, offline & on-demand.
        </motion.p>
        <div className="flex gap-4 mt-4">
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#C79518", color: "#fff" }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-lg font-bold shadow-lg bg-[#E4A425] text-white border-2 border-[#E4A425] transition-colors"
            >
              Explore Products
            </motion.button>
          </Link>
          <Link href="/learnmore">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#E4A425", color: "#fff" }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-lg font-bold border-2 border-[#E4A425] text-[#E4A425] bg-transparent hover:bg-[#E4A425] hover:text-white transition-colors"
            >
              Learn More
            </motion.button>
          </Link>
        </div>
      </div>
      <div className="flex-1 flex justify-center mt-10 md:mt-0">
        <div
          ref={imgRef}
          className="rounded-2xl overflow-hidden shadow-2xl border-4"
          style={{ borderColor: PRIMARY, background: BG_LIGHT }}
        >
          {/* Replace with your actual image */}
          <Image
            src="/aboutus.jpg"
            alt="About Plugin"
            width={400}
            height={400}
            className="object-cover w-[320px] h-[320px] md:w-[400px] md:h-[400px]"
            priority
          />
        </div>
      </div>
    </section>
  );
}

// Mission, Vision, Core Values Section
function MissionVisionValues() {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return (
    <section
      className="w-full py-16 px-6 md:px-20"
      style={{ background: BG_LIGHT, color: BG_DARK }}
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10" ref={ref}>
        <motion.div
          whileHover={{ scale: 1.04, boxShadow: `0 4px 32px 0 ${PRIMARY}33` }}
          className="rounded-xl bg-white  p-8 shadow transition"
        >
          <h3 className="text-2xl font-bold mb-3" style={{ color: PRIMARY }}>
            Our Mission
          </h3>
          <p className="text-base text-gray-700">
            To empower Africa’s digital economy by connecting people to trusted services and professionals, making life easier and businesses more successful.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.04, boxShadow: `0 4px 32px 0 ${PRIMARY}33` }}
          className="rounded-xl bg-white p-8 shadow transition"
        >
          <h3 className="text-2xl font-bold mb-3" style={{ color: PRIMARY }}>
            Our Vision
          </h3>
          <p className="text-base text-gray-700">
            To be Africa’s leading platform for seamless, reliable, and innovative service delivery—online, offline, and on-demand.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.04, boxShadow: `0 4px 32px 0 ${PRIMARY}33` }}
          className="rounded-xl bg-white p-8 shadow transition"
        >
          <h3 className="text-2xl font-bold mb-3" style={{ color: PRIMARY }}>
            Core Values
          </h3>
          <ul className="list-disc pl-4 text-base text-gray-700 space-y-1">
            <li>Trust & Integrity</li>
            <li>Innovation</li>
            <li>Customer Focus</li>
            <li>Collaboration</li>
            <li>Excellence</li>
            <li>Inclusivity</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

// Team Section
function TeamSection() {
  // Example team data
  const team = [
    {
      name: "Kuforiji Olamide",
      role: "CEO / Founder",
      img: "/ceoimage.jpg",
    },
    {
      name: "John Smith",
      role: "CTO",
      img: "/team/john.jpg",
    },
    {
      name: "Aisha Bello",
      role: "COO",
      img: "/team/aisha.jpg",
    },
  ];

  return (
    <section className="w-full py-16 px-6 md:px-20" style={{ background: BG_DARK }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-10" style={{ color: PRIMARY }}>
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="bg-[#181818] rounded-xl p-6 flex flex-col items-center shadow-lg"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 mb-4" style={{ borderColor: PRIMARY }}>
                <Image
                  src={member.img}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <h4 className="text-xl font-bold" style={{ color: PRIMARY }}>
                {member.name}
              </h4>
              <p className="text-gray-300">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing Card Section
function PricingCard() {
  return (
    <section className="w-full py-16 px-6 md:px-20" style={{ background: BG_LIGHT }}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.03, boxShadow: `0 8px 32px 0 ${PRIMARY}33` }}
          className="rounded-2xl bg-white p-10 shadow-xl flex flex-col items-center"
        >
          <span className="mb-3 block w-fit rounded-full bg-[#E4A425]/20 px-3 py-0.5 text-sm font-light text-[#E4A425]">
            Pro
          </span>
          <motion.span
            initial={{ scale: 0.85 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 1, ease: "backInOut" }}
            className="my-2 block origin-top-left font-mono text-5xl font-black leading-[1.2]"
            style={{ color: PRIMARY }}
          >
            $299/
            <span className="text-lg font-normal text-gray-500">Month</span>
          </motion.span>
          <p className="text-gray-700 text-center mb-6">
            Unlock premium features for your business. Get the best value and support.
          </p>
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#C79518", color: "#fff" }}
              whileTap={{ scale: 0.97 }}
              className="w-full rounded bg-[#E4A425] px-9 py-4 text-xl text-black font-bold shadow-lg hover:bg-[#C79518] transition"
            >
              Get it now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Tilt Card Section
function TiltCard() {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    let mouseMoveHandler = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        rotateY: x / 20,
        rotateX: -y / 20,
        scale: 1.04,
        duration: 0.4,
        ease: "power2.out",
      });
    };
    let mouseLeaveHandler = () => {
      gsap.to(el, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.5, ease: "power2.out" });
    };
    el.addEventListener("mousemove", mouseMoveHandler);
    el.addEventListener("mouseleave", mouseLeaveHandler);
    return () => {
      el.removeEventListener("mousemove", mouseMoveHandler);
      el.removeEventListener("mouseleave", mouseLeaveHandler);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative h-80 w-64 rounded-xl bg-[#E4A425] flex flex-col items-center justify-center shadow-2xl"
      style={{ color: BG_DARK }}
    >
      <Image
        src="/about-tilt.jpg"
        alt="Why Choose Us"
        width={180}
        height={180}
        className="rounded-full object-cover mb-4"
      />
      <h3 className="text-2xl font-bold mb-2">Why Choose Us?</h3>
      <ul className="list-disc pl-6 text-base text-[#080808] space-y-1 text-left">
        <li>Cutting-edge AI tools for your business</li>
        <li>Seamless integration and support</li>
        <li>Trusted by thousands of users</li>
        <li>Dedicated team for your success</li>
      </ul>
    </div>
  );
}

// Drag Cards Section (showcase, fun, GSAP/Framer)
function DragCardsSection() {
  // Add stack and name for each card
  const cards = [
    { src: "/emeka.jpeg", name: "Emeka Okwosa", stack: "Frontend Developer", phone: "+234 707 123 7007" },
    { src: "/seth.jpeg", name: "Seth Ezeofformah", stack: "FullStack Developer", phone: "+234 902 736 6000" },
    { src: "/elvis2.jpeg", name: "Elvis Ezenri", stack: "UI/UX Designer / FullStack Developer", phone: "+234 704 726 0206" },
  { src: "/ebuka.jpeg", name: "Dipsix Offormah", stack: "Frontend Developer", phone: "+234 814 038 1501" },
    { src: "/johnpaul2.jpeg", name: "Johnpaul  Edet", stack: "FullStack Developer", phone: "+234 808 614 9495" },
  ];
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <section
      className="w-full py-16 px-6 md:px-20"
      style={{ background: BG_DARK }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10" style={{ color: PRIMARY }}>
          Our Culture & Community
        </h2>
        <div
          ref={containerRef}
          className="flex flex-wrap gap-6 justify-center items-center"
        >
          {cards.map((card, idx) => (
            <HoverRevealCard key={card.src} card={card}  idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Card with hover reveal using GSAP and Framer Motion
function HoverRevealCard({ card, idx }) {
  const [hovered, setHovered] = React.useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!overlayRef.current) return;
    if (hovered) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        pointerEvents: "auto",
      });
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.4,
        ease: "power2.out",
        pointerEvents: "none",
      });
    }
  }, [hovered]);

  return (
    <motion.div
      drag
      dragConstraints={overlayRef}
      whileHover={{ scale: 1.07, boxShadow: `0 8px 32px 0 ${PRIMARY}33` }}
      className="relative w-48 h-64 rounded-2xl overflow-hidden shadow-lg bg-[#F7F4F3] flex items-center justify-center cursor-grab"
      style={{ border: `2px solid ${PRIMARY}` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={card.src}
        alt={`Culture ${idx + 1}`}
        width={192}
        height={256}
        className="object-cover w-full h-full"
        draggable={false}
      />
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0, y: 30 }}
        className="absolute inset-0 bg-[#080808cc] flex flex-col items-center justify-center text-center px-4"
        style={{ pointerEvents: "none" }}
      >
        <motion.h4
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="text-xl font-bold mb-2"
          style={{ color: PRIMARY }}
        >
          {card.name}
        </motion.h4>
        <motion.p
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-[#F7F4F3] text-base"
        >
          {card.stack}
        </motion.p>
        <motion.p
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="text-[#E4A425] text-sm mt-2"
        >
          {card.phone}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// Logo Rolodex Section (socials, animated)
function LogoRolodexSection() {
  const socials = [
    { name: "Twitter", icon: <FaTwitter className="w-8 h-8 text-[#1DA1F2]" />, url: "https://twitter.com/" },
    { name: "Facebook", icon: <FaFacebook className="w-8 h-8 text-[#1877F3]" />, url: "https://facebook.com/" },
    { name: "Instagram", icon: <FaInstagram className="w-8 h-8 text-[#E4405F]" />, url: "https://instagram.com/" },
    { name: "LinkedIn", icon: <FaLinkedin className="w-8 h-8 text-[#0A66C2]" />, url: "https://linkedin.com/" },
    { name: "YouTube", icon: <FaYoutube className="w-8 h-8 text-[#FF0000]" />, url: "https://youtube.com/" },
  ];
  const rolodexRef = useRef(null);

  useEffect(() => {
    if (!rolodexRef.current) return;
    gsap.fromTo(
      rolodexRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <section
      className="w-full py-10 px-6 md:px-20"
      style={{ background: BG_DARK }}
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4" style={{ color: PRIMARY }}>
            Connect with us
          </h3>
          <p className="text-[#F7F4F3] mb-4">
            Follow us on social media for the latest updates and community highlights.
          </p>
        </div>
        <div className="flex-1 flex gap-6 justify-center" ref={rolodexRef}>
          {socials.map((s) => (
            <motion.a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 10 }}
              className="w-16 h-16 rounded-full flex items-center justify-center bg-[#F7F4F3] shadow-lg border-2"
              style={{ borderColor: PRIMARY }}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main About Us Page
export default function Aboutus() {
  return (
    <main style={{ background: BG_DARK , }}>
      <HeroSection />
      <MissionVisionValues />
      <LogoRolodexSection />
      <TeamSection />
      <PricingCard />
      <section className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto py-16 px-4 items-center">
        <div className="flex-1 flex justify-center">
          <TiltCard />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6" style={{ color: PRIMARY }}>
            Why Choose Us?
          </h2>
          <ul className="list-disc pl-6 text-lg text-[#F7F4F3] space-y-2">
            <li>Cutting-edge AI tools for your business</li>
            <li>Seamless integration and support</li>
            <li>Trusted by thousands of users</li>
            <li>Dedicated team for your success</li>
          </ul>
          <div className="mt-8 flex gap-4">
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#C79518", color: "#fff" }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-[#E4A425] text-white font-bold rounded-lg shadow hover:bg-[#C79518] transition"
              >
                See Products
              </motion.button>
            </Link>
            <Link href="/learnmore">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#E4A425", color: "#fff" }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 border-2 border-[#E4A425] text-[#E4A425] font-bold rounded-lg hover:bg-[#E4A425] hover:text-white transition"
              >
                Learn More
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
      <DragCardsSection />
    </main>
  );
}