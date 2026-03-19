"use client";

import { motion } from "framer-motion";
import React from "react";

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ocean" | "peach" | "ghost";
  glowColor?: string;
}

const VARIANTS = {
  primary: {
    bg: "#0a0f1e",
    border: ["#7FD8FF", "#CDB4FF", "#7FD8FF"],
    glow: "#7FD8FF",
    text: "#7FD8FF",
  },
  ocean: {
    bg: "#0a1428",
    border: ["#00C6FF", "#0072FF", "#00C6FF"],
    glow: "#00C6FF",
    text: "#00C6FF",
  },
  peach: {
    bg: "#1e0f0a",
    border: ["#FFC8A2", "#FF9E7D", "#FFC8A2"],
    glow: "#FFC8A2",
    text: "#FFC8A2",
  },
  ghost: {
    bg: "transparent",
    border: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.1)"],
    glow: "rgba(255,255,255,0)",
    text: "#6B7280",
  },
};

export default function LiquidButton({
  children,
  variant = "primary",
  glowColor,
  className = "",
  ...props
}: LiquidButtonProps) {
  const v = VARIANTS[variant];
  const activeGlow = glowColor || v.glow;

  // Type safe props for motion.button
  const motionProps: any = { ...props };

  return (
    <motion.button
      whileHover="hover"
      whileTap="tap"
      className={`relative group flex items-center justify-center font-bold tracking-tight transition-all active:scale-95 ${className}`}
      style={{
        background: v.bg,
        backdropFilter: "blur(20px)",
        borderRadius: "9999px",
        padding: "0.875rem 2rem",
        border: "1px solid transparent",
        color: v.text,
      }}
      {...motionProps}
    >
      {/* Animated Liquid Border */}
      <motion.div 
        className="absolute inset-0 rounded-full p-[1.5px] -z-10"
        style={{
          background: `linear-gradient(90deg, ${v.border.join(", ")})`,
          backgroundSize: "200% 100%",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "destination-out",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "200% 50%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Extreme Neon Soft Glow */}
      <motion.div
        variants={{
          hover: { opacity: 0.9, scale: 1.15, filter: "blur(35px)" },
        }}
        initial={{ opacity: 0.4, scale: 1, filter: "blur(20px)" }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 pointer-events-none -z-20"
        style={{
          background: activeGlow,
          borderRadius: "9999px",
        }}
      />

      {/* Internal Shimmer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-full">
        <motion.div 
          animate={{ x: ["-100%", "250%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute inset-0 w-1/3 h-full skew-x-12 opacity-10"
          style={{ background: "linear-gradient(90deg, transparent, white, transparent)" }}
        />
      </div>

      <span className="relative z-10 flex items-center gap-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
        {children}
      </span>
    </motion.button>
  );
}
