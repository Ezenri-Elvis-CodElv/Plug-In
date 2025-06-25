import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const DragCard = ({ containerRef, src, alt, top, left, rotate, className }) => {
  const [zIndex, setZIndex] = useState(0);
  
  // updateZIndex logic remains same
  
  return (
    <motion.img
      onMouseDown={updateZIndex}
      style={{ top, left, rotate, zIndex }}
      className={twMerge("drag-elements absolute w-48 bg-neutral-200 p-1 pb-4", className)}
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      dragElastic={0.65}
    />
  );
};

const Cards = () => {
  const containerRef = useRef(null);
  return (
    <div className="absolute inset-0 z-10" ref={containerRef}>
      {/* DragCard components remain same */}
    </div>
  );
};

export default function DragCardsSection() {
  return (
    <section className="relative grid min-h-screen w-full place-content-center overflow-hidden bg-neutral-950">
      <h2 className="relative z-0 text-[10vw] font-black text-neutral-800 md:text-[120px] text-center">
        ASTRO<span className="text-indigo-500">.</span>
      </h2>
      <Cards />
    </section>
  );
}