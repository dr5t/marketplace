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
      className="bg-white/40 backdrop-blur-md rounded-[2.5rem] p-5 border border-white/60 shadow-xl shadow-blue-500/5 group hover:shadow-2xl hover:shadow-[#7FD8FF]/10 transition-all duration-500 flex flex-col h-full overflow-hidden"
    >
      <div className="relative mb-6">
        {/* Dynamic Badge */}
        {product.rating && product.rating >= 4.9 && (
          <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-white/50 flex items-center gap-1">
            <Zap className="w-2.5 h-2.5 text-[#7FD8FF] fill-[#7FD8FF]" />
            <span className="text-[9px] font-black text-gray-700 uppercase tracking-tighter">Bestseller</span>
          </div>
        )}

        {/* Wishlist */}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#fff" }} 
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 z-10 p-2.5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 text-gray-400 hover:text-pink-400 group/heart"
        >
          <Heart className="w-4 h-4 group-hover/heart:fill-pink-400 transition-colors" />
        </motion.button>

        {/* Image Container */}
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden bg-gradient-to-br from-blue-50/50 to-purple-50/50 transition-shadow">
            {product.images?.[0] ? (
              <Image 
                src={product.images[0]} 
                alt={product.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl grayscale opacity-20 transition-all duration-500 group-hover:scale-110">
                🧶
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </Link>
      </div>

      {/* Info Section */}
      <div className="flex flex-col flex-1 px-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-black text-[#7FD8FF] uppercase tracking-[0.2em] opacity-80">
            {categoryName}
          </span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/40 border border-white/60">
            <Star className="w-2.5 h-2.5 fill-[#FFC8A2] text-[#FFC8A2]" />
            <span className="text-[9px] font-black text-gray-400">{product.rating?.toFixed(1) ?? "New"}</span>
          </div>
        </div>

        <Link href={`/products/${product.id}`}>
          <h3 className="text-gray-800 text-xl font-bold leading-tight mb-2 group-hover:text-[#7FD8FF] transition-colors line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            {product.title}
          </h3>
        </Link>
        
        <p className="text-[11px] font-medium text-gray-400 mb-6 flex items-center gap-1">
          by <span className="text-gray-600 font-bold uppercase tracking-widest text-[9px]">{product.seller?.storeName || "Vrindaa Artisan"}</span>
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-[#CDB4FF] uppercase tracking-widest mb-0.5">Price</span>
            <span className="text-2xl font-black text-gray-800 tracking-tight">
               <span className="text-sm font-medium text-gray-400 mr-0.5">₹</span>{product.price}
            </span>
          </div>
          
          <LiquidButton
            className="!p-4 !rounded-2xl shadow-lg shadow-blue-500/10"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="w-5 h-5 text-white" strokeWidth={2.5} />
          </LiquidButton>
        </div>
      </div>
    </motion.div>
  );
}
