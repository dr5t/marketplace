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

const gradients = {
  primary: "linear-gradient(135deg, #7FD8FF, #CDB4FF)",
  peach:   "linear-gradient(135deg, #FFC8A2, #FFDEE9)",
  ocean:   "linear-gradient(120deg, #89f7fe, #66a6ff)",
};

export default function LiquidButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: LiquidButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className={`px-6 py-3 rounded-full text-white font-semibold cursor-pointer 
        disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{
        background: gradients[variant],
        boxShadow: "0px 10px 30px rgba(127, 216, 255, 0.3)",
      }}
    >
      {children}
    </motion.button>
  );
}
