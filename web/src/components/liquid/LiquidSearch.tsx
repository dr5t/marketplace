"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useState } from "react";
import { Search } from "lucide-react";

interface LiquidSearchProps {
  onSearch: (term: string) => void;
  placeholder?: string;
}

export default function LiquidSearch({ onSearch, placeholder = "Search crochet..." }: LiquidSearchProps) {
  const [value, setValue] = useState("");
  const controls = useAnimationControls();

  const handleFocus = () => controls.start({ scale: 1.02, transition: { type: "spring", stiffness: 200 } });
  const handleBlur  = () => controls.start({ scale: 1.0, transition: { type: "spring", stiffness: 200 } });

  return (
    <motion.div
      animate={controls}
      className="relative w-full"
    >
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7FD8FF] w-5 h-5" />
      <input
        value={value}
        onChange={(e) => { setValue(e.target.value); onSearch(e.target.value); }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="liquid-input pl-12"
      />
    </motion.div>
  );
}
