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
  category?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="liquid-card relative group flex flex-col h-full"
    >
      {/* Dynamic Badge */}
      {product.rating && product.rating >= 4.9 && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-blue-50 flex items-center gap-1">
          <Zap className="w-3 h-3 text-[#7FD8FF] fill-[#7FD8FF]" />
          <span className="text-[10px] font-bold text-gray-700 uppercase tracking-tighter">Bestseller</span>
        </div>
      )}

      {/* Wishlist */}
      <motion.button
        whileHover={{ scale: 1.2, color: "#f472b6" }} 
        whileTap={{ scale: 0.9 }}
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-white/50 text-gray-400"
      >
        <Heart className="w-4 h-4" />
      </motion.button>

      {/* Image Container */}
      <Link href={`/products/${product.id}`} className="block mb-4">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 group-hover:shadow-inner transition-shadow">
          {product.images?.[0] ? (
            <Image 
              src={product.images[0]} 
              alt={product.title} 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl filter transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
              🧶
            </div>
          )}
          {/* Subtle liquid overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>

      {/* Info Section */}
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <p className="text-[10px] font-bold text-[#7FD8FF] uppercase tracking-widest">
            {typeof product.category === 'object' ? (product.category as any).name : (product.category || "Handcrafted")}
          </p>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-[10px] font-bold text-gray-500">{product.rating?.toFixed(1) ?? "New"}</span>
          </div>
        </div>

        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1 group-hover:text-[#7FD8FF] transition-colors line-clamp-1 no-neofolia product-name">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-xs text-gray-400 mb-4 line-clamp-1">
          by <span className="text-gray-600 font-medium">{product.seller?.storeName || "Vrindaa Artisan"}</span>
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Price</span>
            <span className="text-xl font-black text-gray-800">
              ₹{product.price}
            </span>
          </div>
          
          <LiquidButton
            className="!p-3 !rounded-2xl"
            onClick={() => addToCart(product)}
            glowColor="rgba(127, 216, 255, 0.4)"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
          </LiquidButton>
        </div>
      </div>
    </motion.div>
  );
}
