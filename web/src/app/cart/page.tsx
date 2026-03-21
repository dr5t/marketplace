"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalPrice, totalItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-surface text-on-background font-body min-h-screen">
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-12">
          <h1 className="text-5xl font-headline italic text-on-surface">Your Shopping Cart</h1>
          <p className="text-sm text-on-surface-variant font-medium uppercase tracking-widest">{totalItems} Items</p>
        </div>

        {cart.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-surface-container-low rounded-[2.5rem] p-20 text-center flex flex-col items-center border border-dashed border-outline-variant"
          >
            <div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center mb-8">
              <ShoppingBag className="w-10 h-10 text-on-surface-variant/30" strokeWidth={1} />
            </div>
            <h2 className="text-3xl font-headline italic text-on-surface mb-4">Your cart is empty</h2>
            <p className="text-on-surface-variant max-w-sm mb-10 leading-relaxed font-medium">Every piece at Vrindaa is a labor of love. Find something unique to start your collection.</p>
            <Link href="/">
              <button className="bg-primary text-on-primary px-10 py-5 rounded-full font-bold tracking-widest uppercase text-sm shadow-xl shadow-primary/20 hover:bg-primary-dim transition-all">
                Explore The Shop
              </button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Cart Items */}
            <div className="lg:col-span-7 space-y-8">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-6 rounded-3xl bg-surface-container-low border border-surface-container-highest flex gap-6 group hover:shadow-[0_12px_48px_rgba(56,56,51,0.04)] transition-all duration-500"
                  >
                    <div className="w-32 h-40 rounded-2xl overflow-hidden bg-surface-container-high flex-shrink-0 relative">
                      {/* Check if images exist, otherwise use placeholder */}
                      {item.product.images?.[0] ? (
                        <Image src={item.product.images[0]} alt={item.product.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">🧶</div>
                      )}
                    </div>
                    
                    <div className="flex-grow flex flex-col pt-2">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-on-surface mb-1">{item.product.title}</h3>
                          <p className="text-xs text-on-surface-variant font-medium uppercase tracking-widest">Hand-crafted selection</p>
                        </div>
                        <p className="text-xl font-headline italic text-primary">₹{item.product.price}</p>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-1 rounded-2xl border border-surface-container-highest shadow-sm">
                          <button 
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="flex gap-2">
                          <button className="p-3 text-on-surface-variant/40 hover:text-secondary hover:bg-secondary-container/20 rounded-xl transition-all">
                            <Heart size={20} />
                          </button>
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-3 text-on-surface-variant/40 hover:text-error hover:bg-error-container/20 rounded-xl transition-all"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <div className="pt-8 border-t border-surface-container-highest flex justify-between items-center px-4">
                <Link href="/" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2">
                  <Plus size={14} /> Add More Items
                </Link>
                <button 
                  onClick={clearCart}
                  className="text-xs font-bold uppercase tracking-widest text-error hover:underline transition-all"
                >
                  Clear Shopping Cart
                </button>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <aside className="lg:col-span-5 sticky top-32">
              <div className="bg-surface-container-low rounded-[2.5rem] p-10 shadow-[0_12px_48px_rgba(56,56,51,0.03)] border border-surface-container-highest">
                <h3 className="text-2xl font-headline italic text-on-surface mb-8">Order Summary</h3>
                
                <div className="space-y-4 mb-10">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-on-surface-variant">Subtotal</span>
                    <span className="text-on-surface">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-on-surface-variant">Estimated Shipping</span>
                    <span className="text-primary tracking-widest uppercase text-[10px] font-bold">Calculated at Checkout</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-on-surface-variant">Tax</span>
                    <span className="text-on-surface">₹0</span>
                  </div>
                  
                  <div className="h-px bg-surface-container-highest my-6" />
                  
                  <div className="flex justify-between items-end">
                    <span className="text-xl font-headline italic text-on-surface">Total</span>
                    <span className="text-3xl font-headline italic text-primary">₹{totalPrice}</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <button className="w-full bg-primary text-on-primary py-6 rounded-full font-bold tracking-[0.2em] uppercase text-sm shadow-xl shadow-primary/20 hover:bg-primary-dim active:scale-95 transition-all duration-300">
                    Proceed to Checkout
                  </button>
                </Link>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center p-4 rounded-2xl bg-white/50 border border-surface-container-highest text-center">
                    <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary-dim mb-3">
                      <ShoppingBag size={18} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">Secure Packaging</span>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-2xl bg-white/50 border border-surface-container-highest text-center">
                    <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary-dim mb-3">
                      <Heart size={18} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">Handcrafted Love</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      {/* Recommended Section (Simplified) */}
      {cart.length > 0 && (
        <section className="bg-surface-container-low py-24 px-6 border-t border-surface-container-highest">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-headline italic text-on-surface mb-12">You Might Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Mock items for design fidelity */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-[4/5] rounded-3xl bg-surface-container-high mb-6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-stone-100 flex items-center justify-center text-5xl">🧶</div>
                  </div>
                  <h4 className="font-bold text-on-surface uppercase tracking-widest text-xs mb-1">Recommended Item</h4>
                  <p className="font-headline italic text-primary">₹999</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
