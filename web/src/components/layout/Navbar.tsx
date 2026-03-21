"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-autumn-100/20">
        <Link href="/" className="font-headline text-xl font-bold tracking-tight text-primary">
          Vrindaa Crochet
        </Link>
        <div className="flex items-center gap-4">
          <button className="text-primary hover:opacity-70 transition-opacity">
            <span className="material-symbols-outlined text-[24px]">search</span>
          </button>
          <Link href="/cart" className="text-primary relative hover:opacity-70 transition-opacity">
            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Desktop Floating Nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 items-center justify-between min-w-[800px] px-8 py-4 glass-nav rounded-full shadow-soft"
      >
        <div className="flex items-center gap-12">
          <Link href="/" className="font-headline text-xl font-bold tracking-tight text-primary">
            Vrindaa Crochet
          </Link>
          
          <div className="flex items-center gap-8">
            {['Shop', 'Arts', 'Clothing', 'About', 'Story'].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`}
                className="text-sm font-medium text-emerald-900/70 hover:text-primary transition-colors tracking-wide"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6 border-l border-emerald-900/10 pl-8 ml-4">
          <button className="text-emerald-900/70 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>
          <Link href="/wishlist" className="text-emerald-900/70 hover:text-primary transition-colors relative">
            <span className="material-symbols-outlined text-[22px]">favorite</span>
          </Link>
          <Link href="/cart" className="text-emerald-900/70 hover:text-primary transition-colors relative">
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-secondary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                {totalItems}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="flex items-center gap-3 bg-emerald-50/50 py-1 pl-1 pr-3 rounded-full border border-emerald-100/50">
              <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px] shadow-sm">
                {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
              </div>
              <button 
                onClick={() => logout()} 
                className="material-symbols-outlined text-stone-400 hover:text-red-500 text-[18px] transition-colors"
                title="Logout"
              >
                logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-emerald-900/70 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[22px]">person</span>
            </Link>
          )}
        </div>
      </motion.nav>
    </>
  );
}
