"use client";

import { motion } from "framer-motion";

interface BlobProps {
  className?: string;
  gradient?: string;
}

export default function Blob({ className = "", gradient }: BlobProps) {
  return (
    <motion.div
      animate={{
        borderRadius: [
          "40% 60% 60% 40% / 40% 50% 60% 50%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "40% 60% 60% 40% / 40% 50% 60% 50%",
        ],
        rotate: [0, 5, -5, 0],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute blur-3xl opacity-40 pointer-events-none ${className}`}
      style={{
        background: gradient || "linear-gradient(135deg, #7FD8FF, #CDB4FF)",
      }}
    />
  );
}
