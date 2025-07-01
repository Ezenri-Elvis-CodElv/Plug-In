import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SiAmazon, SiGoogle, SiMeta, SiGithub, SiTwitch } from "react-icons/si";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const DELAY_IN_MS = 2500;
const TRANSITION_DURATION_IN_SECS = 1.5;

const LogoItem = ({ children, className }) => (
  <div className={twMerge("grid h-36 w-52 place-content-center rounded-lg bg-neutral-700 text-6xl text-neutral-50", className)}>
    {children}
  </div>
);

const LogoRolodex = ({ items }) => {
  const intervalRef = useRef(null);
  const [index, setIndex] = useState(0);

  React.useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((pv) => pv + 1);
    }, DELAY_IN_MS);
    return () => clearInterval(intervalRef.current || undefined);
  }, []);

  return (
    <div style={{ transform: "rotateY(-20deg)", transformStyle: "preserve-3d" }} className="relative z-0 h-44 w-60 shrink-0 rounded-xl border border-neutral-700 bg-neutral-800">
      <AnimatePresence mode="sync">
        {/* Animation logic remains same */}
      </AnimatePresence>
    </div>
  );
};

export default function LogoRolodexSection() {
  return (
    <section className="flex h-72 flex-col items-center justify-center gap-12 bg-neutral-950 px-4 py-24 md:flex-row">
      <LogoRolodex
        items={[
          <LogoItem key={1} className="bg-orange-300 text-neutral-900"><SiAmazon /></LogoItem>,
          <LogoItem key={2} className="bg-green-300 text-neutral-900"><SiGoogle /></LogoItem>,
          <LogoItem key={3} className="bg-blue-300 text-neutral-900"><SiMeta /></LogoItem>,
          <LogoItem key={4} className="bg-white text-black"><SiGithub /></LogoItem>,
          <LogoItem key={5} className="bg-purple-300 text-neutral-900"><SiTwitch /></LogoItem>,
        ]}
      />
      <div className="hidden md:block ml-12">
        <p className="text-white text-lg font-semibold mb-2">Follow us on social media</p>
        <div className="flex gap-4 text-3xl">
          <a
            href="https://twitter.com/talk_plugin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-blue-400 transition"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com/talk.plugin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-pink-400 transition"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </section>
  );
}