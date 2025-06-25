import { motion } from "framer-motion";
import Link from "next/link";

const Background = () => (
  <motion.svg
    width="320"
    height="384"
    viewBox="0 0 320 384"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute inset-0 z-0"
    variants={{ hover: { scale: 1.5 } }}
    transition={{ duration: 1, ease: "backInOut" }}
  >
    {/* SVG paths remain same */}
  </motion.svg>
);

export default function PricingCard() {
  return (
    <motion.div
      whileHover="hover"
      transition={{ duration: 1, ease: "backInOut" }}
      variants={{ hover: { scale: 1.05 } }}
      className="relative h-96 w-80 shrink-0 overflow-hidden rounded-xl bg-indigo-500 p-8"
    >
      {/* Card content remains same */}
      <Background />
    </motion.div>
  );
}