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
    <div className="fixed top-6 left-0 right-0 z-50 px-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className="max-w-7xl mx-auto bg-white/40 backdrop-blur-2xl border border-white/60 rounded-full px-8 py-3 flex items-center justify-between shadow-2xl shadow-blue-500/5 pointer-events-auto"
      >
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-9 h-9 rounded-full overflow-hidden shadow-inner border border-white/80"
          >
            <Image 
                src="/logo.png" 
                alt="Vrindaa Logo" 
                fill 
                className="object-cover"
            />
          </motion.div>
          <motion.span
            whileHover={{ scale: 1.02 }}
            className="text-xl font-bold hidden sm:block tracking-tight text-[#4B0082]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Vrindaa
          </motion.span>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
          <Link href="/" className="hover:text-[#7FD8FF] transition-all hover:translate-y-[-1px]">Shop</Link>
          <Link href="/seller" className="hover:text-[#7FD8FF] transition-all hover:translate-y-[-1px]">Sellers</Link>
          <Link href="#about-us" className="hover:text-[#7FD8FF] transition-all hover:translate-y-[-1px]">About</Link>
          <Link href="#" className="hover:text-[#7FD8FF] transition-all hover:translate-y-[-1px] opacity-40">Support</Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 pr-4 border-r border-gray-100">
             <motion.button whileHover={{ y: -2 }} className="p-2 text-gray-400 hover:text-[#7FD8FF] transition-colors"><Bell size={18} /></motion.button>
             <motion.button whileHover={{ y: -2 }} className="p-2 text-gray-400 hover:text-[#FFC8A2] transition-colors"><Heart size={18} /></motion.button>
          </div>

          <Link href="/cart" className="relative p-2 text-gray-400 hover:text-[#7FD8FF] group transition-all">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <motion.span 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                className="absolute -top-1 -right-0.5 w-4 h-4 bg-gradient-to-br from-[#7FD8FF] to-[#CDB4FF] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-lg border-2 border-white"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>
          
          {user ? (
            <div className="flex items-center gap-3">
              {user.role === 'ADMIN' && (
                <Link href="/admin" className="p-2 text-amber-400 hover:scale-110 transition-transform"><Crown size={18} /></Link>
              )}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7FD8FF] to-[#CDB4FF] flex items-center justify-center text-white font-black text-[10px] shadow-soft border-2 border-white">
                {user.displayName?.charAt(0) || user.email?.charAt(0)}
              </div>
              <motion.button onClick={() => logout()} whileHover={{ scale: 1.1 }} className="p-2 text-red-300 hover:text-red-400"><LogOut size={18} /></motion.button>
            </div>
          ) : (
            <Link href="/login">
               <LiquidButton className="!px-6 !py-2.5 !text-[10px] !font-black !uppercase !tracking-widest">
                 Login
               </LiquidButton>
            </Link>
          )}
        </div>
      </motion.nav>
    </div>
  );
}
