"use client";
import React, { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import Image from "next/image";

const PRIMARY = "#E4A425";      // Gold
const PRIMARY_DARK = "#C79518"; // Darker gold for hover
const ACCENT = "#0F3D3E";       // Teal accent
const BG_DARK = "#080808";      // Deep dark
const BG_LIGHT = "#F7F4F3";     // Off-white
const BORDER = "#D9D9D9";       // Light gray border

const FLOATING_CHARS = ["#", "*", "✦", "✧", "❖", "◈"];

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate all random values ONCE on mount for SSR safety
  const [charParticles] = useState(() =>
    FLOATING_CHARS.map(() => ({
      top: 10 + Math.random() * 80,
      left: 10 + Math.random() * 80,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 0.3,
    }))
  );

  const [particles] = useState(() =>
    Array.from({ length: 18 }).map((_, i) => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      blur: Math.random() * 24 + 12,
      size: Math.random() * 80 + 24,
      color:
        i % 4 === 0
          ? PRIMARY
          : i % 4 === 1
          ? BG_LIGHT
          : i % 4 === 2
          ? "#fff"
          : `${PRIMARY}99`,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.2 + 0.07,
    }))
  );

  const [sparkles] = useState(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      top: Math.random() * 90 + 5,
      left: Math.random() * 90 + 5,
      size: Math.random() * 12 + 6,
      delay: Math.random() * 2,
    }))
  );

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 7;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-screen z-[9999] flex justify-center items-center bg-gradient-to-br from-[#F7F4F3] via-[#E4A42522] to-[#0F3D3E22] overflow-hidden">
      {/* Glowing background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <Motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: `radial-gradient(circle, ${p.color} 0%, transparent 70%)`,
              filter: `blur(${p.blur}px)`,
              opacity: p.opacity,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [p.opacity, p.opacity * 2, p.opacity],
              rotate: [0, 360],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
        {/* Sparkle stars */}
        {sparkles.map((s, i) => (
          <Motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.7, 1.2, 0.7],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeInOut",
            }}
          >
            <div
              style={{
                width: s.size,
                height: s.size,
                background: `linear-gradient(135deg, #fff 60%, ${PRIMARY} 100%)`,
                borderRadius: "50%",
                filter: "blur(0.5px)",
                boxShadow: `0 0 8px 2px #fff8, 0 0 24px 8px ${PRIMARY}44`,
                opacity: 0.8,
              }}
            />
          </Motion.div>
        ))}
      </div>

      {/* Main loader container */}
      <Motion.div
        className="relative w-[240px] h-[240px] flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Animated gradient rings */}
        {[...Array(3)].map((_, i) => (
          <Motion.div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: `${100 - i * 18}%`,
              height: `${100 - i * 18}%`,
              borderWidth: `${7 - i * 2}px`,
              borderImage: `conic-gradient(from 90deg, ${PRIMARY}, #fff, ${BG_LIGHT}, ${PRIMARY}) 1`,
              filter: "blur(1px)",
              zIndex: 1,
            }}
            animate={{
              rotate: [0, i % 2 === 0 ? 360 : -360],
              opacity: [0.18, 0.32, 0.18],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 10 - i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Floating holographic diamonds */}
        <div className="absolute w-full h-full grid grid-cols-3 grid-rows-3 pointer-events-none">
          {[...Array(9)].map((_, i) => (
            <Motion.div
              key={`diamond-${i}`}
              className="flex items-center justify-center"
              animate={{
                rotate: [0, 45, 90, 135, 180],
                scale: [1, 1.2, 1, 0.8, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                delay: i * 0.1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <div
                className="w-4 h-4"
                style={{
                  background: `linear-gradient(135deg, ${PRIMARY} 60%, #fff 100%)`,
                  opacity: 0.7,
                  borderRadius: "20%",
                  transform: "rotate(45deg)",
                  boxShadow: `0 0 8px ${PRIMARY}88, 0 0 16px #fff4`,
                }}
              />
            </Motion.div>
          ))}
        </div>

        {/* Central logo with holographic effect */}
        <Motion.div
          className="relative z-20 w-32 h-32 rounded-2xl bg-[#080808]/50 backdrop-blur-xl border border-[#E4A425]/30 shadow-2xl flex items-center justify-center overflow-hidden"
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              `0 0 10px ${PRIMARY}, inset 0 0 10px ${PRIMARY}`,
              `0 0 20px ${BG_LIGHT}, inset 0 0 20px ${BG_LIGHT}`,
              `0 0 30px ${PRIMARY}, inset 0 0 30px ${PRIMARY}`,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Holographic effect inside logo */}
          <Motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                `conic-gradient(${PRIMARY}, ${BG_LIGHT}, ${BG_DARK}, ${PRIMARY})`,
                `conic-gradient(${BG_DARK}, ${PRIMARY}, ${BG_LIGHT}, ${BG_DARK})`,
                `conic-gradient(${BG_LIGHT}, ${BG_DARK}, ${PRIMARY}, ${BG_LIGHT})`,
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Animated logo */}
          <Motion.div
            className="relative z-10"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: {
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          >
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-xl flex items-center justify-center text-black font-bold text-lg">
                <Image src="/logo.png" alt="Plugin Logo" width={80} height={80} className="object-contain" priority />
              </div>
              <div className="absolute -inset-2 bg-[#E4A425] blur-xl opacity-30 rounded-xl" />
            </div>
          </Motion.div>
        </Motion.div>

        {/* Orbiting particles */}
        {[...Array(8)].map((_, i) => (
          <Motion.div
            key={`orbit-${i}`}
            className="absolute w-6 h-6 rounded-full"
            style={{
              background: i % 2 === 0 ? PRIMARY : BG_LIGHT,
              boxShadow: `0 0 10px ${i % 2 === 0 ? PRIMARY : BG_LIGHT}`,
            }}
            animate={{
              x: [0, Math.cos((i * Math.PI) / 4) * 110, 0],
              y: [0, Math.sin((i * Math.PI) / 4) * 110, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </Motion.div>

      {/* Loading text with advanced effects */}
      <Motion.div
        className="absolute bottom-1/4 text-center w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Motion.h3
          className="text-2xl font-bold mb-6 tracking-wider"
          style={{
            color: PRIMARY,
            textShadow: `0 0 10px ${PRIMARY}`,
          }}
          animate={{
            opacity: [0.8, 1, 0.8],
            textShadow: [
              `0 0 10px ${PRIMARY}`,
              `0 0 20px ${PRIMARY}`,
              `0 0 30px ${BG_LIGHT}`,
              `0 0 20px ${PRIMARY}`,
              `0 0 10px ${PRIMARY}`,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          CRAFTING YOUR EXPERIENCE
        </Motion.h3>

        <div className="relative w-64 h-2 bg-[#D9D9D9] rounded-full overflow-hidden mx-auto backdrop-blur-sm">
          <Motion.div
            className="h-full absolute left-0 top-0"
            style={{
              background: `linear-gradient(90deg, ${BG_DARK}, ${PRIMARY}, ${BG_LIGHT})`,
              width: `${progress}%`,
              boxShadow: `0 0 10px ${PRIMARY}`,
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />

          {/* Glowing progress indicator */}
          <Motion.div
            className="absolute top-0 h-full w-2 bg-white rounded-full"
            style={{
              left: `${progress}%`,
              boxShadow: `0 0 15px ${PRIMARY}`,
            }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <Motion.div
          className="mt-4 text-sm text-[#ffea00]"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {Math.min(100, Math.round(progress))}% COMPLETE
        </Motion.div>
      </Motion.div>

      {/* Floating text particles - render ONLY after mount */}
      {mounted &&
        charParticles.map((char, i) => (
          <Motion.div
            key={`char-${i}`}
            className="absolute text-[#E4A425] text-xl opacity-60"
            style={{
              top: `${char.top}%`,
              left: `${char.left}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: char.duration,
              repeat: Infinity,
              delay: char.delay,
            }}
          >
            {FLOATING_CHARS[i]}
          </Motion.div>
        ))}

      {/* Subtle background grid */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={`grid-${i}`}
            className="border border-[#D9D9D9]/10"
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;