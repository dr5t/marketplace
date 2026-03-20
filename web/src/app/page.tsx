"use client";

import { motion } from "framer-motion";
import Blob from "@/components/liquid/Blob";
import LiquidSearch from "@/components/liquid/LiquidSearch";
import LiquidButton from "@/components/liquid/LiquidButton";
import ProductCard from "@/components/product/ProductCard";
import { useEffect, useState } from "react";
import Link from "next/link";
import FeedbackSection from "@/components/feedback/FeedbackSection";

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
      <Blob className="w-[800px] h-[800px] -top-40 -left-40 opacity-10" />
      <Blob className="w-96 h-96 top-1/4 -right-16 opacity-10" gradient="var(--gradient-peach)" />
      <Blob className="w-[600px] h-[600px] bottom-0 left-1/4 opacity-10" gradient="var(--gradient-ocean)" />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/80 shadow-soft text-[10px] font-black text-[#7FD8FF] uppercase tracking-[0.2em] mb-8">
            <span className="w-1.5 h-1.5 bg-[#7FD8FF] rounded-full animate-pulse" />
            Handcrafted with love
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            {config?.heroTitle.split(" ").slice(0, -1).join(" ") || "Discover"}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7FD8FF] to-[#CDB4FF]">
              {config?.heroTitle.split(" ").slice(-1) || "Crochet"}
            </span>{" "}
            Magic
          </h1>
          
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            {config?.heroSub || "Unique, handmade crochet pieces from independent artisans. Join a community where every stitch tells a story."}
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <LiquidButton 
              className="px-10 py-5 text-lg shadow-lg shadow-[#7FD8FF]/20"
              onClick={() => document.getElementById("shop-section")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start Exploring
            </LiquidButton>
            <Link href="/seller">
              <LiquidButton variant="peach" className="px-10 py-5 text-lg shadow-lg shadow-[#FFC8A2]/20">
                Become a Seller
              </LiquidButton>
            </Link>
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

      {/* Decorative Footer Shape */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-white to-transparent pointer-events-none -z-10" />
    </div>
  );
}
