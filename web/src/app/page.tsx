"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockProducts = [
      {
        id: "1",
        title: "Artisanal Tote Bag",
        price: 45,
        category: "Bags",
        images: ["https://images.unsplash.com/photo-1590739225287-bd31519780c3?q=80&w=1974&auto=format&fit=crop"],
      },
      {
        id: "2",
        title: "Hand-Knitted Plushie",
        price: 32,
        category: "Toys",
        images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2072&auto=format&fit=crop"],
      },
      {
        id: "3",
        title: "Boho Wall Hanging",
        price: 58,
        category: "Decor",
        images: ["https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1974&auto=format&fit=crop"],
      },
      {
        id: "4",
        title: "Crochet Summer Top",
        price: 75,
        category: "Clothing",
        images: ["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"],
      },
      {
        id: "5",
        title: "Vintage Bloom Cardigan",
        price: 120,
        category: "Clothing",
        images: ["https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1972&auto=format&fit=crop"],
      },
      {
        id: "6",
        title: "Shell Bucket Hat",
        price: 28,
        category: "Accessories",
        images: ["https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=2070&auto=format&fit=crop"],
      }
    ];
    setProducts(mockProducts);
    setLoading(false);
  }, []);

  const categories = [
    { name: 'Bags', img: 'https://images.unsplash.com/photo-1590739225287-bd31519780c3?q=80&w=200&auto=format&fit=crop' },
    { name: 'Toys', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=200&auto=format&fit=crop' },
    { name: 'Clothing', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=200&auto=format&fit=crop' },
    { name: 'Decor', img: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=200&auto=format&fit=crop' },
    { name: 'New', img: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=200&auto=format&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-20 md:pb-0">
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-0">
        {/* Mobile Banner Card */}
        <div className="md:hidden px-6 mb-8">
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden group shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop"
              alt="Vrindaa Banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-10 left-8 right-8">
              <h1 className="text-4xl font-headline font-bold text-white mb-6 leading-tight">
                Woven with <br /> intention.
              </h1>
              <Link href="/shop">
                <button className="bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full px-6 py-3 text-sm font-bold flex items-center gap-2">
                  Shop Collection <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Categories */}
        <div className="md:hidden flex overflow-x-auto gap-6 px-6 no-scrollbar pb-4 mb-8">
          {categories.map((cat) => (
            <div key={cat.name} className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-stone-100 shadow-sm relative">
                <Image src={cat.img} alt={cat.name} fill className="object-cover" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{cat.name}</span>
            </div>
          ))}
        </div>

        {/* Desktop Hero Section */}
        <div className="hidden md:flex relative h-[90vh] items-center justify-center overflow-hidden">
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
            >
              Modern Crochet for the Conscious Soul
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-9xl text-emerald-900 font-bold mb-8 tracking-tighter font-headline"
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
              <Link href="/shop">
                 <button className="liquid-btn">
                   Shop Collection
                   <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                 </button>
              </Link>
            </motion.div>
          </div>
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
