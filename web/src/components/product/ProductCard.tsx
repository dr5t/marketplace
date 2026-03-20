"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart, Zap } from "lucide-react";
import LiquidButton from "@/components/liquid/LiquidButton";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  rating?: number;
  seller?: { storeName: string };
  category?: any;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const categoryName = typeof product.category === 'object' ? product.category?.name : (product.category || "Handcrafted");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-white rounded-[3.5rem] p-6 border border-white shadow-xl shadow-orange-900/5 group hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden"
    >
      <div className="relative mb-6">
        {/* Wishlist */}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#fff" }} 
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/60 backdrop-blur-md border border-white text-gray-400 hover:text-red-400 group/heart shadow-sm"
        >
          <Heart className="w-4 h-4 group-hover/heart:fill-red-400 transition-colors" />
        </motion.button>

        {/* Image Container */}
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden bg-var(--color-peach)/30 transition-shadow">
            {product.images?.[0] ? (
              <Image 
                src={product.images[0]} 
                alt={product.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl grayscale opacity-20">
                🧶
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Info Section */}
      <div className="flex flex-col flex-1 px-2">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
            {categoryName}
          </span>
        </div>

        <Link href={`/products/${product.id}`}>
          <h3 className="text-var(--color-deep-purple) text-2xl font-bold leading-tight mb-2 transition-colors line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            {product.title}
          </h3>
        </Link>
        
        <p className="text-[11px] font-medium text-gray-400 mb-8 flex items-center gap-1">
          by <span className="text-var(--color-coffee) font-bold uppercase tracking-widest text-[9px]">{product.seller?.storeName || "Vrindaa Artisan"}</span>
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-0.5">Price</span>
            <span className="text-2xl font-black text-var(--color-deep-purple) tracking-tight">
               <span className="text-sm font-medium text-gray-400 mr-0.5">₹</span>{product.price}
            </span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="liquid-glass p-5 text-var(--color-deep-purple) hover:bg-white/60 transition-all shadow-sm"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
