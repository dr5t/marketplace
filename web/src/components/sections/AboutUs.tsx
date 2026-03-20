"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export default function AboutUs() {
  return (
    <section id="about-us" className="relative z-10 max-w-7xl mx-auto px-6 py-32">
      <div className="flex flex-col items-center mb-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/40 backdrop-blur-md border border-white/80 text-[10px] font-black text-var(--color-coffee) uppercase tracking-[0.4em] mb-4"
        >
          About us
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative bg-var(--color-peach) rounded-[4rem] p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-16 shadow-2xl shadow-orange-900/5 overflow-hidden group"
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/20 blur-[120px] rounded-full group-hover:scale-110 transition-transform duration-1000" />

        {/* Content Side */}
        <div className="flex-1 space-y-10 z-10 text-center md:text-left">
          <p className="text-var(--color-deep-purple) text-2xl md:text-3xl font-medium leading-[1.6] italic" style={{ fontFamily: "serif" }}>
            at @createdbyaa, every loop and knot tells a story — a story of
            creativity, patience, and passion. 
          </p>
          <p className="text-var(--color-coffee)/70 text-lg md:text-xl font-medium leading-[1.8]" style={{ fontFamily: "'Inter', sans-serif" }}>
            we believe that handcrafted crochet isn't just art; it's a feeling woven with care and meaning.
            we are a team of creative professionals dedicated to bringing
            timeless, handcrafted crochet pieces to life.
          </p>

          <div className="flex items-center justify-center md:justify-start gap-8 pt-8">
            <motion.a whileHover={{ scale: 1.1, y: -2 }} href="#" className="p-4 rounded-full bg-white/40 border border-white text-var(--color-deep-purple) shadow-sm transition-all"><Instagram size={22} /></motion.a>
            <motion.a whileHover={{ scale: 1.1, y: -2 }} href="#" className="p-4 rounded-full bg-white/40 border border-white text-var(--color-deep-purple) shadow-sm transition-all"><Twitter size={22} /></motion.a>
            <motion.a whileHover={{ scale: 1.1, y: -2 }} href="#" className="p-4 rounded-full bg-white/40 border border-white text-var(--color-deep-purple) shadow-sm transition-all"><Facebook size={22} /></motion.a>
          </div>
        </div>

        {/* Logo Card Side */}
        <motion.div 
          whileHover={{ rotate: -2, scale: 1.05 }}
          className="w-full md:w-[400px] aspect-square bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-white/80 p-12 flex flex-col items-center justify-center shadow-xl z-10"
        >
          <div className="relative mb-8 p-8 rounded-full bg-var(--color-peach)/50 border border-white/60">
             <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 30C30 30 20 40 20 60C20 80 40 85 50 75C60 85 80 80 80 60C80 40 70 30 70 30" stroke="var(--color-coffee)" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M40 40V60C40 70 60 70 60 60V40" stroke="var(--color-coffee)" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M45 50H55" stroke="var(--color-coffee)" strokeWidth="2.5" strokeLinecap="round"/>
             </svg>
          </div>
          <span className="text-var(--color-coffee) text-xl font-bold italic tracking-tight" style={{ fontFamily: "serif" }}>@createdbyaa</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
