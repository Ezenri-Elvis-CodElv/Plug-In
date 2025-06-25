import React, { useMemo, useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import Image from "next/image";

// Site color palette
const PRIMARY = "#E4A425";
const BG_DARK = "#080808";
const BG_LIGHT = "#F7F4F3";

const Loader = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 10 }).map((_, i) => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      width: Math.random() * 100 + 20,
      height: Math.random() * 100 + 20,
      color: i % 3 === 0 ? PRIMARY : i % 3 === 1 ? BG_DARK : BG_LIGHT,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
    }));
  }, [mounted]);

  return (
    <div className="fixed inset-0 w-full h-screen bg-gradient-to-br from-[#080808] to-[#E4A425]/10 z-[9999] flex justify-center items-center">
      <div className="absolute inset-0 overflow-hidden">
        {mounted &&
          particles.map((p, i) => (
            <Motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${p.top}%`,
                left: `${p.left}%`,
                width: `${p.width}px`,
                height: `${p.height}px`,
                background: `radial-gradient(circle, ${p.color} 0%, transparent 70%)`,
                opacity: 0.08,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.08, 0.18, 0.08],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
              }}
            />
          ))}
      </div>
      
      {/* Main loader container */}
      <Motion.div 
        className="relative w-[180px] h-[180px] flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Outer ring with gradient */}
        <div className="absolute w-full h-full">
          <div className="w-full h-full rounded-full border-8 border-transparent border-t-[#E4A425] border-r-[#E4A425] animate-spin"></div>
          <div className="absolute inset-0 rounded-full border-8 border-transparent border-b-[#080808] border-l-[#080808] animate-spin animation-delay-1000"></div>
        </div>
        
        {/* Middle ring with gradient */}
        <div className="absolute w-[70%] h-[70%]">
          <div className="w-full h-full rounded-full border-6 border-transparent border-t-[#F7F4F3] border-r-[#F7F4F3] animate-spin animation-delay-500"></div>
          <div className="absolute inset-0 rounded-full border-6 border-transparent border-b-[#E4A425] border-l-[#E4A425] animate-spin animation-delay-1500"></div>
        </div>
        
        {/* Inner ring with gradient */}
        <div className="absolute w-[40%] h-[40%]">
          <div className="w-full h-full rounded-full border-4 border-transparent border-t-[#E4A425] border-r-[#E4A425] animate-spin animation-delay-2000"></div>
        </div>
        
        {/* Logo with pulse animation */}
        <Motion.div
          className="relative z-10 w-24 h-24 rounded-xl bg-[#080808]/30 backdrop-blur-sm border border-[#E4A425]/30 shadow-lg flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              `0 0 0 0px ${PRIMARY}33`,
              `0 0 0 10px ${PRIMARY}00`,
              `0 0 0 0px ${BG_DARK}33`,
              `0 0 0 10px ${BG_DARK}00`,
              `0 0 0 0px ${BG_LIGHT}33`,
              `0 0 0 10px ${BG_LIGHT}00`,
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Motion.div
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Image
              src="/logo.png"
              alt="Plugin Logo"
              width={64}
              height={64}
              className="w-16 h-auto"
              priority
            />
          </Motion.div>
        </Motion.div>
        
        {/* Floating dots */}
        {[...Array(4)].map((_, i) => (
          <Motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full"
            style={{
              background: i % 2 === 0 ? PRIMARY : BG_LIGHT,
              left: `${Math.cos((i * Math.PI) / 2) * 80}px`,
              top: `${Math.sin((i * Math.PI) / 2) * 80}px`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </Motion.div>
      
      {/* Loading text */}
      <Motion.div 
        className="absolute bottom-1/4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-xl font-semibold" style={{ color: PRIMARY }}>Loading Experience</h3>
        <div className="w-48 h-1 bg-[#E4A425]/30 rounded-full overflow-hidden">
          <Motion.div 
            className="h-full"
            style={{ background: `linear-gradient(90deg, ${PRIMARY}, ${BG_LIGHT})` }}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </div>
      </Motion.div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 2s linear infinite;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Loader;