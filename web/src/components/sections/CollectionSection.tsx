"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import LiquidButton from "../liquid/LiquidButton";

const COLLECTIONS = [
  {
    title: "Clothes",
    image: "https://images.unsplash.com/photo-1599407331580-f6556133bd44?auto=format&fit=crop&q=80&w=800",
    link: "/search?category=Apparel",
    color: "#7FD8FF",
  },
  {
    title: "Mini Airpods Bags",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
    link: "/search?category=Accessories",
    color: "#CDB4FF",
  },
  {
    title: "Flowers",
    image: "https://images.unsplash.com/photo-1591123720164-de1348028a30?auto=format&fit=crop&q=80&w=800",
    link: "/search?category=Home Decor",
    color: "#FFC8A2",
  },
];

export default function CollectionSection() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-800 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
          Featured Collections
        </h2>
        <div className="h-1.5 w-32 bg-gradient-to-r from-[#7FD8FF] via-[#CDB4FF] to-[#FFC8A2] rounded-full mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {COLLECTIONS.map((col, idx) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
            className="group relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-500/5 cursor-pointer border border-white/40"
          >
            <Image 
              src={col.image} 
              alt={col.title} 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            
            {/* Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/40 group-hover:via-black/20 transition-all duration-500" />
            
            <div className="absolute bottom-10 left-10 right-10">
              <motion.div 
                className="bg-white/20 backdrop-blur-xl rounded-[2rem] p-8 border border-white/30 shadow-xl"
              >
                <h3 className="text-white text-3xl font-black mb-4 tracking-tighter" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {col.title}
                </h3>
                <Link href={col.link}>
                  <LiquidButton variant="peach" className="!px-10 !py-4 !rounded-2xl !text-xs !font-black !uppercase !tracking-[0.2em] shadow-lg shadow-black/10">
                    Explore
                  </LiquidButton>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
