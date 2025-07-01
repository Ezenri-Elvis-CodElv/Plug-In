"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion as Motion, useAnimate, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

// --- Color Palette ---
const PRIMARY = "#E4A425";
const BG_DARK = "#080808";
const BG_LIGHT = "#F7F4F3";

// --- Countdown Section ---
const COUNTDOWN_FROM = "2024-10-01";
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const useTimer = (unit) => {
  const [ref, animateFn] = useAnimate();
  const intervalRef = useRef(null);
  const timeRef = useRef(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(handleCountdown, 1000);
    return () => clearInterval(intervalRef.current || undefined);
    // eslint-disable-next-line
  }, []);

  const handleCountdown = async () => {
    const end = new Date(COUNTDOWN_FROM);
    const now = new Date();
    const distance = +end - +now;
    let newTime = 0;

    if (unit === "Day") newTime = Math.max(0, Math.floor(distance / DAY));
    else if (unit === "Hour") newTime = Math.max(0, Math.floor((distance % DAY) / HOUR));
    else if (unit === "Minute") newTime = Math.max(0, Math.floor((distance % HOUR) / MINUTE));
    else newTime = Math.max(0, Math.floor((distance % MINUTE) / SECOND));

    if (newTime !== timeRef.current) {
      await animateFn(
        ref.current,
        { y: ["0%", "-50%"], opacity: [1, 0] },
        { duration: 0.35 }
      );
      timeRef.current = newTime;
      setTime(newTime);
      await animateFn(
        ref.current,
        { y: ["50%", "0%"], opacity: [0, 1] },
        { duration: 0.35 }
      );
    }
  };

  return { ref, time };
};

const CountdownItem = ({ unit, text }) => {
  const { ref, time } = useTimer(unit);
  return (
    <div className="flex h-24 w-1/4 flex-col items-center justify-center gap-1 border-r-[1px] border-[#E4A425] font-mono md:h-36 md:gap-2">
      <div className="relative w-full overflow-hidden text-center">
        <span
          ref={ref}
          className="block text-2xl font-bold text-[#080808] md:text-4xl lg:text-6xl xl:text-7xl"
        >
          {time}
        </span>
      </div>
      <span className="text-xs font-light text-[#E4A425] md:text-sm lg:text-base uppercase tracking-wider">
        {text}
      </span>
    </div>
  );
};

const ShiftingCountdown = () => (
  <div className="bg-gradient-to-br from-[#E4A425] to-[#F7F4F3] p-4">
    <div className="mx-auto flex w-full max-w-5xl items-center bg-white rounded-lg shadow-lg border-2 border-[#E4A425]">
      <CountdownItem unit="Day" text="days" />
      <CountdownItem unit="Hour" text="hours" />
      <CountdownItem unit="Minute" text="minutes" />
      <CountdownItem unit="Second" text="seconds" />
    </div>
    <div className="text-center mt-4 text-[#080808] font-semibold">
      <span>Countdown to our next big launch!</span>
    </div>
  </div>
);

// --- Aurora Hero Section ---
const COLORS_TOP = [PRIMARY, "#C48B1A", "#F7F4F3", "#E4A425"];
const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);
  // Blend BG_LIGHT with animated color
  const backgroundImage = useMotionTemplate`linear-gradient(120deg, ${BG_LIGHT} 60%, ${color})`;
  const border = useMotionTemplate`2px solid ${PRIMARY}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${PRIMARY}`;

  return (
    <Motion.section
      style={{ backgroundImage }}
      className="relative grid min-h-screen place-content-center overflow-hidden px-4 py-24"
    >
      <div className="relative z-10 flex flex-col items-center">
        <span className="mb-1.5 inline-block rounded-full bg-[#E4A425]/20 px-3 py-1.5 text-sm text-[#E4A425] font-semibold">
          Discover Plugin Africa
        </span>
        <h1 className="max-w-3xl bg-gradient-to-br from-[#E4A425] to-[#F7F4F3] bg-clip-text text-center text-3xl font-extrabold leading-tight text-transparent sm:text-5xl md:text-7xl">
          Africa’s Trusted Service Marketplace
        </h1>
        <p className="my-6 max-w-xl text-center text-lg md:text-xl text-[#F7F4F3]">
          Connecting customers with skilled professionals online, offline & on-demand. 
          We empower Africa’s digital economy with seamless, reliable, and innovative service delivery.
        </p>
        <Motion.a
          href="/products"
          style={{ border, boxShadow }}
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.985 }}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-[#E4A425] px-6 py-3 text-[#080808] font-bold text-lg shadow-lg hover:bg-[#c48b1a] transition"
        >
          Explore Products
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </Motion.a>
      </div>
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </Motion.section>
  );
};

// --- Shuffle Hero Section ---
const squareData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1510925758641-869d353cecc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1580238053495-b9720401fd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1569074187119-c87815b476da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 8,
    src: "https://plus.unsplash.com/premium_photo-1671436824833-91c0741e89c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1610768764270-790fbec18178?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=684&q=80",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=882&q=80",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1606244864456-8bee63fce472?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=681&q=80",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1820&q=80",
  },
];

const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex],
    ];
  }
  return array;
};

const generateSquares = () => {
  return shuffle([...squareData]).map((sq) => (
    <Motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "0.5rem",
        border: `2px solid ${PRIMARY}`,
      }}
    ></Motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  const shuffleSquares = useCallback(() => {
    setSquares(generateSquares());
    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  }, []);

  useEffect(() => {
    shuffleSquares();
    return () => clearTimeout(timeoutRef.current);
  }, [shuffleSquares]);

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

const ShuffleHero = () => (
  <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
    <div>
      <span className="block mb-4 text-xs md:text-sm text-[#E4A425] font-medium uppercase">
        Our Mission & Vision
      </span>
      <h3 className="text-4xl md:text-6xl font-bold text-[#080808]">
        Empowering Africa’s Digital Economy
      </h3>
      <p className="text-base md:text-lg text-[#080808] my-4 md:my-6">
        <b>Mission:</b> To connect people to trusted services and professionals, making life easier and businesses more successful.<br />
        <b>Vision:</b> To be Africa’s leading platform for seamless, reliable, and innovative service delivery.<br />
        <b>Core Values:</b> Trust & Integrity, Innovation, Customer Focus, Collaboration, Excellence, Inclusivity.
      </p>
      <a
        href="/about-us"
        className="bg-[#E4A425] text-[#080808] font-bold py-2 px-6 rounded transition-all hover:bg-[#c48b1a] active:scale-95 shadow-lg"
      >
        Learn more about us
      </a>
    </div>
    <ShuffleGrid />
  </section>
);

// --- Learn More Page ---
export default function LearnMorePage() {
  return (
    <main className="flex flex-col gap-0" style={{ background: BG_LIGHT }}>
      <AuroraHero />
      <ShiftingCountdown />
      <ShuffleHero />
    </main>
  );
}