"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, User, Bell, LogOut } from "lucide-react";
import LiquidButton from "../liquid/LiquidButton";
import { useAuth } from "@/hooks/useAuth";
import { useFirestore } from "@/hooks/useFirestore";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { lastUpdate } = useFirestore("products");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (lastUpdate) {
      setNotifications(prev => [lastUpdate, ...prev]);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }
  }, [lastUpdate]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/50"
      style={{ boxShadow: "0 2px 24px rgba(127,216,255,0.12)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-10 h-10 rounded-full overflow-hidden shadow-sm border border-gray-100"
          >
            <Image 
                src="/logo.png" 
                alt="Vrindaa Crochet Logo" 
                fill 
                className="object-cover"
            />
          </motion.div>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold hidden sm:block"
            style={{
              background: "linear-gradient(135deg, #7FD8FF, #CDB4FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Vrindaa
          </motion.span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-[#7FD8FF] transition-colors">Shop</Link>
          <Link href="/seller" className="hover:text-[#7FD8FF] transition-colors">Sellers</Link>
          <Link href="#" className="hover:text-[#7FD8FF] transition-colors opacity-50 cursor-not-allowed">About</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 relative">
          <AnimatePresence>
            {showNotification && (
              <motion.div
                initial={{ opacity: 0, y: 20, x: -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-14 right-0 w-64 p-3 rounded-2xl bg-white shadow-xl border border-blue-50 z-[60]"
              >
                <p className="text-xs font-bold text-[#7FD8FF] mb-1">✨ New Listing!</p>
                <p className="text-xs text-gray-600 truncate">{notifications[0]?.title} was just added.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button whileHover={{ scale: 1.1 }} className="p-2 rounded-full hover:bg-blue-50 relative">
            <Bell className="w-5 h-5 text-gray-500" />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full border border-white" />
            )}
          </motion.button>
          
          <motion.button whileHover={{ scale: 1.1 }} className="p-2 rounded-full hover:bg-blue-50">
            <Heart className="w-5 h-5 text-gray-500" />
          </motion.button>
          <Link href="/cart">
            <motion.button whileHover={{ scale: 1.1 }} className="p-2 rounded-full hover:bg-blue-50 relative">
              <ShoppingCart className="w-5 h-5 text-gray-500" />
              <span className="absolute -top-1 -right-1 w-4 h-4 text-xs rounded-full text-white flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #7FD8FF, #CDB4FF)" }}>0</span>
            </motion.button>
          </Link>
          
          {user ? (
            <div className="flex items-center gap-2">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 text-blue-600 text-sm font-medium"
              >
                <User className="w-4 h-4" /> {user.displayName || user.email?.split("@")[0]}
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                onClick={() => logout()}
                className="p-2 rounded-full hover:bg-red-50 text-red-400"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </div>
          ) : (
            <Link href="/login">
              <LiquidButton className="text-sm py-2 px-4">
                <User className="w-4 h-4 inline mr-1" /> Login
              </LiquidButton>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
