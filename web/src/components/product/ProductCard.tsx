"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  rating?: number;
  seller?: { storeName: string };
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(127,216,255,0.22)" }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="liquid-card relative overflow-hidden group"
    >
      {/* Wishlist */}
      <motion.button
        whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow"
      >
        <Heart className="w-4 h-4 text-pink-400" />
      </motion.button>

      {/* Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-3 bg-gray-100">
          {product.images?.[0] ? (
            <Image src={product.images[0]} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">🧶</div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="space-y-1">
        {product.seller && (
          <p className="text-xs text-[#7FD8FF] font-medium">{product.seller.storeName}</p>
        )}
        <h3 className="font-semibold text-gray-800 truncate">{product.title}</h3>
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-gray-500">{product.rating?.toFixed(1) ?? "New"}</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-lg font-bold" style={{ background: "linear-gradient(135deg, #7FD8FF, #CDB4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            ₹{product.price}
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}
            className="p-2 rounded-full text-white"
            style={{ background: "linear-gradient(135deg, #7FD8FF, #CDB4FF)" }}
          >
            <ShoppingCart className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
