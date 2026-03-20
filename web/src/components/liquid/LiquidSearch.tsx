"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useState } from "react";
import { Search, Mic } from "lucide-react";

interface LiquidSearchProps {
  onSearch: (term: string) => void;
  placeholder?: string;
}

export default function LiquidSearch({ onSearch, placeholder = "Search crochet..." }: LiquidSearchProps) {
  const [value, setValue] = useState("");
  const controls = useAnimationControls();

  const handleFocus = () => controls.start({ scale: 1.01, transition: { type: "spring", stiffness: 200 } });
  const handleBlur  = () => controls.start({ scale: 1.0, transition: { type: "spring", stiffness: 200 } });

  return (
    <motion.div
      animate={controls}
      className="relative w-full group"
    >
      <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-var(--color-primary) w-5 h-5 transition-colors" />
      <input
        value={value}
        onChange={(e) => { setValue(e.target.value); onSearch(e.target.value); }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="w-full pl-16 pr-14 py-5 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 text-sm placeholder-gray-400 outline-none shadow-sm focus:bg-white/60 transition-all"
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 border border-white/50 text-gray-400 hover:text-var(--color-primary) shadow-sm"
      >
        <Mic size={18} />
      </motion.button>
    </motion.div>
  );
}
