"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Bell, LogOut, User, Crown } from "lucide-react";
import LiquidButton from "../liquid/LiquidButton";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 rounded-full bg-white/80 glass-nav shadow-[0_8px_30px_rgb(56,56,51,0.06)] flex justify-between items-center px-8 py-3 pointer-events-auto">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-serif font-bold text-emerald-900 tracking-tighter" style={{ fontFamily: "var(--font-noto-serif)" }}>
          Vrindaa Crochet
        </Link>
        <div className="hidden md:flex items-center gap-6 font-sans text-sm tracking-wide font-medium">
          <Link href="/category/bags" className="text-stone-600 hover:text-emerald-800 transition-colors">Bags</Link>
          <Link href="/category/toys" className="text-stone-600 hover:text-emerald-800 transition-colors">Toys</Link>
          <Link href="/category/clothing" className="text-stone-600 hover:text-emerald-800 transition-colors">Clothing</Link>
          <Link href="/category/decor" className="text-emerald-900 font-bold border-b-2 border-emerald-800 pb-1">Decor</Link>
          <Link href="/story" className="text-stone-600 hover:text-emerald-800 transition-colors">Story</Link>
        </div>
      </div>

      <div className="flex items-center gap-5 text-emerald-800">
        <button className="material-symbols-outlined hover:opacity-80 transition-opacity">favorite</button>
        <Link href="/cart" className="relative flex items-center">
            <span className="material-symbols-outlined hover:opacity-80 transition-opacity">shopping_bag</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-700 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
        </Link>
        
        {user ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-900 font-bold text-xs">
                {user.displayName?.charAt(0) || user.email?.charAt(0)}
              </div>
              <button onClick={() => logout()} className="material-symbols-outlined text-red-400 hover:text-red-500">logout</button>
            </div>
        ) : (
            <Link href="/login" className="material-symbols-outlined hover:opacity-80 transition-opacity">person</Link>
        )}
      </div>
    </nav>
  );
}
