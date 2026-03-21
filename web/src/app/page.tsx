"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "@/firebase-config";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), limit(8));
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2072&auto=format&fit=crop"
            alt="Crochet Texture"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-background)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif italic text-emerald-800 text-xl md:text-2xl mb-6"
            style={{ fontFamily: "var(--font-noto-serif)" }}
          >
            Modern Crochet for the Conscious Soul
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl text-emerald-900 font-bold mb-8 tracking-tighter"
            style={{ fontFamily: "var(--font-noto-serif)" }}
          >
            The Artisanal <br /> Thread
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12"
          >
            <p className="max-w-md text-stone-600 text-sm leading-relaxed text-left border-l border-emerald-800/20 pl-6">
              Vrindaa honors the slow-craft movement, bringing you handcrafted pieces that bridge the gap between traditional heritage and contemporary design.
            </p>
            <Link href="/category/all">
               <button className="liquid-btn">
                 Shop Collection
                 <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
               </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white/40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center">
            <span className="material-symbols-outlined text-4xl text-emerald-800 mb-6">eco</span>
            <h3 className="font-serif text-xl text-emerald-900 mb-4" style={{ fontFamily: "var(--font-noto-serif)" }}>Ethically Sourced</h3>
            <p className="text-sm text-stone-600 leading-relaxed">We use only organic, biodegradable fibers from local farmers who share our values.</p>
          </div>
          <div className="text-center">
            <span className="material-symbols-outlined text-4xl text-emerald-800 mb-6">history_edu</span>
            <h3 className="font-serif text-xl text-emerald-900 mb-4" style={{ fontFamily: "var(--font-noto-serif)" }}>Timeless Design</h3>
            <p className="text-sm text-stone-600 leading-relaxed">Our pieces are created to transcend trends, becoming heirlooms for generations.</p>
          </div>
          <div className="text-center">
            <span className="material-symbols-outlined text-4xl text-emerald-800 mb-6">workspace_premium</span>
            <h3 className="font-serif text-xl text-emerald-900 mb-4" style={{ fontFamily: "var(--font-noto-serif)" }}>Artisan Made</h3>
            <p className="text-sm text-stone-600 leading-relaxed">Each knot is placed with intention by skilled women in our local artisan circles.</p>
          </div>
        </div>
      </section>

      {/* Latest Arrivals */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">Our Selection</p>
            <h2 className="text-4xl md:text-5xl font-serif text-emerald-900" style={{ fontFamily: "var(--font-noto-serif)" }}>
              Latest Arrivals
            </h2>
          </div>
          <Link href="/category/all" className="text-stone-500 hover:text-emerald-800 text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-2 mb-2">
            View All <span className="material-symbols-outlined text-sm">north_east</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-emerald-800/20 border-t-emerald-800 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="editorial-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Narrative Section */}
      <section className="py-32 bg-emerald-900 text-[var(--color-background)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
            <Image
                src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1974&auto=format&fit=crop"
                alt="Woven Heritage"
                fill
                className="object-cover"
            />
          </div>
          <div>
             <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight italic" style={{ fontFamily: "var(--font-noto-serif)" }}>
               Woven with heritage, <br /> worn with pride.
             </h2>
             <p className="text-emerald-100/70 mb-12 text-lg leading-relaxed max-w-lg">
               Every Vrindaa piece tells a story of patience, skill, and the human touch. Our mission is to preserve the art of crochet while empowering women artisans across India.
             </p>
             <button className="bg-[var(--color-background)] text-emerald-900 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors">
               Our Full Story
             </button>
          </div>
        </div>
      </section>
    </div>
  );
}
