"use client";

import { motion } from "framer-motion";
import Blob from "@/components/liquid/Blob";
import LiquidSearch from "@/components/liquid/LiquidSearch";
import LiquidButton from "@/components/liquid/LiquidButton";
import ProductCard from "@/components/product/ProductCard";
import { useEffect, useState } from "react";
import Link from "next/link";
import FeedbackSection from "@/components/feedback/FeedbackSection";
import AboutUs from "@/components/sections/AboutUs";
import CollectionSection from "@/components/sections/CollectionSection";
import Footer from "@/components/layout/Footer";

const CATEGORIES = ["All", "Toys", "Apparel", "Home Decor", "Accessories", "Commissions"];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm]         = useState("");
  const [products, setProducts]             = useState<any[]>([]);
  const [loading, setLoading]               = useState(true);
  const [config, setConfig]                 = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, configRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/config`)
        ]);
        const prodData = await prodRes.json();
        const configData = await configRes.json();
        setProducts(prodData);
        setConfig(configData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category?.name === activeCategory || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F8FAFF]">
      {/* Background blobs */}
      <Blob className="w-[1000px] h-[1000px] -top-80 -left-60 opacity-[0.08]" />
      <Blob className="w-[600px] h-[600px] top-1/2 -right-40 opacity-[0.06]" gradient="var(--gradient-peach)" />
      <Blob className="w-[800px] h-[800px] -bottom-40 left-1/2 opacity-[0.05]" gradient="var(--gradient-ocean)" />
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-var(--color-peach) rounded-[3rem] p-12 md:p-20 overflow-hidden shadow-2xl shadow-orange-900/5 group"
        >
          {/* Decorative radial glows */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-200/20 blur-[100px] rounded-full group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-200/20 blur-[100px] rounded-full group-hover:scale-110 transition-transform duration-1000" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-[10px] font-black text-var(--color-coffee) uppercase tracking-[0.3em] mb-12">
              <span className="w-1.5 h-1.5 bg-var(--color-coffee) rounded-full animate-pulse" />
              Early Access Deal
            </div>
            
            <h1 className="text-5xl md:text-8xl editorial-heading text-var(--color-deep-purple) mb-12 leading-tight">
              Discover<br/>
              <span className="font-light italic lowercase tracking-normal" style={{ fontFamily: "serif" }}>the</span> magic<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">of Crochet</span>
            </h1>
            
            <p className="text-var(--color-coffee)/60 text-lg md:text-xl max-w-2xl mx-auto mb-16 font-medium leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              {config?.heroSub || "Unique, handmade crochet pieces from independent artisans. Join a community where every stitch tells a story."}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <LiquidButton 
                className="!px-12 !py-6 !text-lg !bg-var(--color-coffee) !text-white !rounded-full !shadow-xl !shadow-black/5"
                onClick={() => document.getElementById("shop-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                Shop Now
              </LiquidButton>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Search & Filter Bar */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 mb-16">
        <div className="liquid-card !p-3 !rounded-[2.5rem] mb-8 shadow-xl shadow-blue-500/5">
          <LiquidSearch onSearch={setSearchTerm} />
        </div>
        
        <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
           <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest whitespace-nowrap pl-2">Filter By:</span>
           {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap border-2 ${
                activeCategory === cat 
                ? "bg-white border-[#7FD8FF] text-[#7FD8FF] shadow-soft shadow-[#7FD8FF]/10 scale-105" 
                : "bg-transparent border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <CollectionSection />

      {/* Products Grid */}
      <section id="shop-section" className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="flex items-end justify-between mb-12 px-2">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {activeCategory === "All" ? "Featured Collections" : activeCategory}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#7FD8FF] to-transparent rounded-full" />
          </div>
          <p className="text-[11px] font-black text-gray-300 uppercase tracking-[0.3em]">
            {filtered.length} artisans active
          </p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {[1,2,3,4].map(i => (
               <div key={i} className="w-full aspect-[4/5] bg-white/50 animate-pulse rounded-[2.5rem] border border-gray-100" />
             ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-32 liquid-card !bg-white/40 border-dashed border-2 border-gray-200"
          >
            <div className="text-6xl mb-6 grayscale opacity-30">🧶</div>
            <h3 className="text-xl font-bold text-gray-400 mb-2">No matching designs found</h3>
            <p className="text-sm text-gray-300">Try adjusting your filters or search terms.</p>
            <button 
              onClick={() => {setActiveCategory("All"); setSearchTerm("");}}
              className="mt-6 text-[#7FD8FF] font-black text-[10px] uppercase tracking-widest hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </section>

      <FeedbackSection />
      <AboutUs />
      <Footer />

      {/* Decorative Footer Shape */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-white to-transparent pointer-events-none -z-10" />
    </div>
  );
}
