"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LiquidButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "peach" | "ocean";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const variants = {
  primary: {
    border: "linear-gradient(90deg, #ff00cc, #3333ff)",
    glow: "0 0 15px rgba(255, 0, 204, 0.5), 0 0 30px rgba(51, 51, 255, 0.4)",
    hoverGlow: "0 0 25px rgba(255, 0, 204, 0.8), 0 0 50px rgba(51, 51, 255, 0.6)",
  },
  peach: {
    border: "linear-gradient(90deg, #FF6B6B, #FFB88C)",
    glow: "0 0 15px rgba(255, 107, 107, 0.5), 0 0 30px rgba(255, 184, 140, 0.4)",
    hoverGlow: "0 0 25px rgba(255, 107, 107, 0.8), 0 0 50px rgba(255, 184, 140, 0.6)",
  },
  ocean: {
    border: "linear-gradient(90deg, #00d2ff, #3a7bd5)",
    glow: "0 0 15px rgba(0, 210, 255, 0.5), 0 0 30px rgba(58, 123, 213, 0.4)",
    hoverGlow: "0 0 25px rgba(0, 210, 255, 0.8), 0 0 50px rgba(58, 123, 213, 0.6)",
  },
};

export default function LiquidButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: LiquidButtonProps) {
  const currentVariant = variants[variant];
  const isWFull = className.includes("w-full");

  return (
    <div className={`relative p-[1.5px] rounded-full sm:inline-block ${isWFull ? "w-full block" : "inline-block"} ${className}`}
         style={{ background: currentVariant.border, boxShadow: currentVariant.glow }}>
      <motion.button
        type={type}
        onClick={onClick}
        disabled={disabled}
        whileTap={{ scale: 0.96 }}
        whileHover={{ 
            scale: 1.02,
            boxShadow: currentVariant.hoverGlow
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`w-full h-full rounded-full text-white font-medium 
                   bg-black/80 backdrop-blur-md flex items-center justify-center 
                   transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-none outline-none
                   ${className.includes("px-") ? "" : "px-8"} ${className.includes("py-") ? "" : "py-3"}`}
        style={{
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.025em",
            boxShadow: "inset 0 1.5px 2px rgba(255,255,255,0.2), inset 0 -1.5px 2px rgba(0,0,0,0.4)"
        }}
      >
        <span className="relative z-10 flex items-center gap-2">
            {children}
        </span>
      </motion.button>
    </div>
  );
}
