"use client";

import { motion } from "framer-motion";

export default function LiquidLoading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-xl">
      <div className="relative">
        {/* Outer Liquid Ring */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 50% 60% 40% 60%", "40% 60% 70% 30% / 40% 50% 60% 50%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-32 h-32 bg-gradient-to-tr from-[#7FD8FF] to-[#CDB4FF] opacity-40 blur-xl"
        />
        
        {/* Inner Pulsing Core */}
        <motion.div
          animate={{
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 m-auto w-16 h-16 bg-white rounded-full shadow-[0_0_30px_rgba(127,216,255,0.5)] flex items-center justify-center font-bold text-sky-400 text-2xl"
        >
          🧶
        </motion.div>

        {/* Floating Particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              x: [0, (i % 2 === 0 ? 20 : -20), 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute w-2 h-2 rounded-full bg-sky-200"
            style={{
              top: "50%",
              left: "50%",
            }}
          />
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-24 text-sky-400 font-bold uppercase tracking-[0.3em] text-xs"
      >
        Weaving Magic...
      </motion.p>
    </div>
  );
}
