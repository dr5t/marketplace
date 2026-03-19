"use client";

import { motion } from "framer-motion";
import Blob from "@/components/liquid/Blob";
import LiquidSearch from "@/components/liquid/LiquidSearch";
import LiquidButton from "@/components/liquid/LiquidButton";
import ProductCard from "@/components/product/ProductCard";
import { useState } from "react";

const CATEGORIES = ["All", "Toys", "Apparel", "Home Decor", "Accessories", "Commissions"];

const MOCK_PRODUCTS = [
  { id: "1", title: "Sunflower Amigurumi", price: 399, images: [], rating: 4.8, seller: { storeName: "Cottage Threads" } },
  { id: "2", title: "Winter Beanie Hat",   price: 549, images: [], rating: 4.5, seller: { storeName: "Yarn & Soul" } },
  { id: "3", title: "Cottagecore Table Runner", price: 799, images: [], rating: 4.9, seller: { storeName: "Bloom Crafts" } },
  { id: "4", title: "Boho Wall Hanging",   price: 699, images: [], rating: 4.6, seller: { storeName: "Cottage Threads" } },
  { id: "5", title: "Teddy Bear Doll",     price: 449, images: [], rating: 5.0, seller: { storeName: "Yarn & Soul" } },
  { id: "6", title: "Market Tote Bag",     price: 349, images: [], rating: 4.7, seller: { storeName: "Bloom Crafts" } },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm]         = useState("");

  const filtered = MOCK_PRODUCTS.filter((p) =>
    (activeCategory === "All" || true) &&
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="flex gap-3 justify-center">
            <LiquidButton>Shop Now</LiquidButton>
            <LiquidButton variant="peach">Become a Seller</LiquidButton>
          </div>
        </motion.div>
      </section>

      {/* Search & Filter */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 mb-10">
        <LiquidSearch onSearch={setSearchTerm} />
        <div className="flex gap-3 mt-5 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "text-white shadow-md"
                  : "bg-white text-gray-600 shadow-sm hover:shadow"
              }`}
              style={activeCategory === cat ? { background: "linear-gradient(135deg, #7FD8FF, #CDB4FF)" } : {}}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {activeCategory === "All" ? "Featured Products" : activeCategory}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, type: "spring", stiffness: 150 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
