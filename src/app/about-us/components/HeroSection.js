import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="grid place-content-center bg-emerald-950 px-4 py-24 text-yellow-50">
      <h1 className="max-w-2xl text-center text-5xl leading-snug font-bold">
        Scale your{" "}
        <span className="relative">
          Marketing
          <svg
            viewBox="0 0 286 73"
            fill="none"
            className="absolute -left-2 -right-2 -top-2 bottom-0 translate-y-1"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.25, ease: "easeInOut" }}
              d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
              stroke="#FACC15"
              strokeWidth="3"
            />
          </svg>
        </span>{" "}
        with Simple AI Tools
      </h1>
      <p className="mt-8 text-xl text-yellow-100 max-w-xl mx-auto text-center">
        Welcome to Plugin! We empower businesses and individuals with modern, AI-driven tools and seamless digital experiences across Africa.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/products">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-300 transition"
          >
            Explore Products
          </motion.button>
        </Link>
        <Link href="/learnmore">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 border-2 border-yellow-400 text-yellow-400 font-bold rounded-lg hover:bg-yellow-400 hover:text-black transition"
          >
            Learn More
          </motion.button>
        </Link>
      </div>
    </div>
  );
}