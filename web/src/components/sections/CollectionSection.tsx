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
    <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
      <div className="flex flex-col items-center mb-20 text-center">
        <h2 className="text-4xl md:text-7xl editorial-heading text-var(--color-deep-purple)">
          Featured<br/><span className="lowercase italic tracking-normal" style={{ fontFamily: "serif" }}>collections</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {COLLECTIONS.map((col, idx) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
            className="group relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl shadow-orange-900/5 cursor-pointer border border-white"
          >
            <Image 
              src={col.image} 
              alt={col.title} 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            
            {/* Glass Overlay */}
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all duration-500" />
            
            <div className="absolute bottom-10 left-10 right-10">
              <motion.div 
                className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/40 shadow-xl flex flex-col items-center text-center"
              >
                <h3 className="text-var(--color-deep-purple) text-3xl font-bold mb-6 italic lowercase" style={{ fontFamily: "serif" }}>
                  {col.title}
                </h3>
                <Link href={col.link}>
                  <LiquidButton className="!px-12 !py-4 !rounded-2xl !text-[10px] !font-black !uppercase !tracking-[0.3em] !bg-var(--color-coffee) !text-white !shadow-none">
                    Shop
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
