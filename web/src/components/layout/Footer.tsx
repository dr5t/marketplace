"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const FOOTER_LINKS = ["Home", "hot picks", "collection", "about us", "support"];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-white/40 backdrop-blur-md pt-24 pb-12 border-t border-white/60">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="flex flex-wrap justify-center mb-12 gap-8 md:gap-12">
          {FOOTER_LINKS.map((link) => (
            <Link 
              key={link} 
              href={`/${link.toLowerCase().replace(" ", "-")}`}
              className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-[#7FD8FF] transition-colors"
            >
              <motion.span whileHover={{ y: -2 }} className="inline-block">
                {link}
              </motion.span>
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
           <div className="flex items-center gap-2 opacity-30 grayscale saturate-0 mb-2">
             <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 30C30 30 20 40 20 60C20 80 40 85 50 75C60 85 80 80 80 60C80 40 70 30 70 30" stroke="currentColor" strokeWidth="4" />
             </svg>
             <span className="text-xs font-black tracking-widest uppercase">Vrindaa</span>
           </div>
           <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
             © 2026 createdbyaa, Inc. All rights reserved.
           </p>
        </div>
      </div>
    </footer>
  );
}
