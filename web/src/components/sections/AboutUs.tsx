"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export default function AboutUs() {
  return (
    <section id="about-us" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col items-center mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-[#CDB4FF]/20 to-[#7FD8FF]/20 backdrop-blur-md border border-white shadow-soft text-2xl font-bold text-[#4B0082]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          About us
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative bg-[#FFF5EE] rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-xl shadow-[#FFC8A2]/10 overflow-hidden"
      >
        {/* Content Side */}
        <div className="flex-1 space-y-8 z-10">
          <p className="text-gray-800 text-lg md:text-xl font-medium leading-[1.8] opacity-80" style={{ fontFamily: "'Outfit', sans-serif" }}>
            at @createdbyaa, every loop and knot tells a story — a story of
            creativity, patience, and passion. we believe that handcrafted
            crochet isn't just art; it's a feeling woven with care and meaning.
          </p>
          <p className="text-gray-800 text-lg md:text-xl font-medium leading-[1.8] opacity-80" style={{ fontFamily: "'Outfit', sans-serif" }}>
            we are a team of creative professionals dedicated to bringing
            timeless, handcrafted crochet pieces to life.
          </p>
          <p className="text-gray-800 text-lg md:text-xl font-medium leading-[1.8] opacity-80" style={{ fontFamily: "'Outfit', sans-serif" }}>
            what makes us different is our connection — not just with our
            craft, but with our customers.
          </p>

          <div className="flex items-center gap-6 pt-8">
            <motion.a whileHover={{ scale: 1.2, color: '#E1306C' }} href="#" className="text-gray-800/60"><Instagram size={28} /></motion.a>
            <motion.a whileHover={{ scale: 1.2, color: '#1DA1F2' }} href="#" className="text-gray-800/60"><Twitter size={28} /></motion.a>
            <motion.a whileHover={{ scale: 1.2, color: '#4267B2' }} href="#" className="text-gray-800/60"><Facebook size={28} /></motion.a>
            <motion.a whileHover={{ scale: 1.2, color: '#FF0000' }} href="#" className="text-gray-800/60"><Youtube size={28} /></motion.a>
          </div>
        </div>

        {/* Logo Card Side */}
        <motion.div 
          whileHover={{ rotate: -2, scale: 1.02 }}
          className="w-full md:w-80 aspect-square bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/80 p-10 flex flex-col items-center justify-center shadow-soft z-10"
        >
          <div className="relative mb-6">
             <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 30C30 30 20 40 20 60C20 80 40 85 50 75C60 85 80 80 80 60C80 40 70 30 70 30" stroke="#4B2C20" strokeWidth="3" strokeLinecap="round"/>
                <path d="M40 40V60C40 70 60 70 60 60V40" stroke="#4B2C20" strokeWidth="3" strokeLinecap="round"/>
                <path d="M45 50H55" stroke="#4B2C20" strokeWidth="3" strokeLinecap="round"/>
             </svg>
          </div>
          <span className="text-[#4B2C20]/60 text-lg font-bold italic">@createdbyaa</span>
        </motion.div>

        {/* Decorative background shape in card */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#FFC8A2]/20 rounded-full blur-3xl -z-0" />
      </motion.div>
    </section>
  );
}
