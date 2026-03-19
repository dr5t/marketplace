"use client";

import { motion } from "framer-motion";
import Blob from "@/components/liquid/Blob";
import LiquidSearch from "@/components/liquid/LiquidSearch";
import LiquidButton from "@/components/liquid/LiquidButton";
import ProductCard from "@/components/product/ProductCard";
import { useState } from "react";

const CATEGORIES = ["All", "Toys", "Apparel", "Home Decor", "Accessories", "Commissions"];

const MOCK_PRODUCTS = [
  { id: "1", title: "Sunflower Amigurumi", price: 399, images: [], rating: 4.8, category: "Toys", seller: { storeName: "Cottage Threads" } },
  { id: "2", title: "Winter Beanie Hat",   price: 549, images: [], rating: 4.5, category: "Apparel", seller: { storeName: "Yarn & Soul" } },
  { id: "3", title: "Cottagecore Table Runner", price: 799, images: [], rating: 4.9, category: "Home Decor", seller: { storeName: "Bloom Crafts" } },
  { id: "4", title: "Boho Wall Hanging",   price: 699, images: [], rating: 4.6, category: "Home Decor", seller: { storeName: "Cottage Threads" } },
  { id: "5", title: "Teddy Bear Doll",     price: 449, images: [], rating: 5.0, category: "Toys", seller: { storeName: "Yarn & Soul" } },
  { id: "6", title: "Market Tote Bag",     price: 349, images: [], rating: 4.7, category: "Accessories", seller: { storeName: "Bloom Crafts" } },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm]         = useState("");

  const filtered = MOCK_PRODUCTS.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background blobs */}
      <Blob className="w-96 h-96 -top-20 -left-20" />
      <Blob className="w-80 h-80 top-1/3 -right-16" gradient="linear-gradient(135deg, #FFC8A2, #FFDEE9)" />
      <Blob className="w-72 h-72 bottom-20 left-1/4" gradient="linear-gradient(135deg, #CDB4FF, #7FD8FF)" />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="text-sm font-medium text-[#7FD8FF] tracking-widest uppercase mb-3">✨ Handcrafted with love</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Discover{" "}
            <span style={{ background: "linear-gradient(135deg, #7FD8FF, #CDB4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Crochet
            </span>{" "}
            Magic
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
            Unique, handmade crochet pieces from independent artisans. Every stitch tells a story.
          </p>
          <div className="flex gap-4 justify-center">
            <LiquidButton onClick={() => document.getElementById("shop-section")?.scrollIntoView({ behavior: "smooth" })}>
              Shop Now
            </LiquidButton>
            <Link href="/seller">
              <LiquidButton variant="peach">Become a Seller</LiquidButton>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Search & Filter */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 mb-10">
        <div className="liquid-card !p-2 !rounded-full mb-6">
          <LiquidSearch onSearch={setSearchTerm} />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
          {CATEGORIES.map((cat) => (
            <LiquidButton
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-medium whitespace-nowrap px-6 py-2.5 !rounded-full`}
              variant={activeCategory === cat ? "primary" : "ghost"}
            >
              {cat}
            </LiquidButton>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section id="shop-section" className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
            {activeCategory === "All" ? "Featured Collections" : activeCategory}
          </h2>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {filtered.length} items found
          </span>
        </div>
        
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-5xl mb-4 block">🧶</span>
            <p className="text-gray-400">No products found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}

import Link from "next/link";
