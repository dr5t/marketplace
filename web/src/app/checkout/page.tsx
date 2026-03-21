"use client";

import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck, Truck, CreditCard, MapPin } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart, totalPrice, totalItems } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment

  return (
    <div className="bg-surface text-on-background font-body min-h-screen">
      {/* Minimal Checkout Header */}
      <header className="bg-white/75 backdrop-blur-md fixed top-0 left-0 right-0 z-50 px-8 py-4 border-b border-surface-container-highest flex justify-between items-center">
        <div className="text-xl font-headline italic text-primary font-bold">Loom & Loop</div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 ${step >= 1 ? "text-primary" : "text-on-surface-variant font-medium"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 1 ? "bg-primary text-on-primary" : "bg-surface-container-high"}`}>1</span>
            <span className="text-[10px] uppercase tracking-widest font-bold">Shipping</span>
          </div>
          <ChevronRight size={12} className="text-on-surface-variant/30" />
          <div className={`flex items-center gap-2 ${step >= 2 ? "text-primary" : "text-on-surface-variant font-medium"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 2 ? "bg-primary text-on-primary" : "bg-surface-container-high"}`}>2</span>
            <span className="text-[10px] uppercase tracking-widest font-bold">Payment</span>
          </div>
        </div>
        <Link href="/cart" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
          Return to Cart
        </Link>
      </header>

      <main className="pt-24 pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          {/* Left Column: Form Content */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface-container-low rounded-[2.5rem] p-10 border border-surface-container-highest"
            >
              {step === 1 ? (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-secondary-container/30 flex items-center justify-center text-secondary">
                      <MapPin size={24} />
                    </div>
                    <h2 className="text-3xl font-headline italic text-on-surface">Shipping Details</h2>
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">First Name</label>
                        <input type="text" className="w-full bg-surface-container-high border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all" placeholder="Evelyn" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Last Name</label>
                        <input type="text" className="w-full bg-surface-container-high border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all" placeholder="Thorne" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Street Address</label>
                      <input type="text" className="w-full bg-surface-container-high border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all" placeholder="123 Artisan Way" />
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">City</label>
                        <input type="text" className="w-full bg-surface-container-high border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all" placeholder="Jaipur" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">State</label>
                        <input type="text" className="w-full bg-surface-container-high border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all" placeholder="Rajasthan" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">PIN Code</label>
                        <input type="text" className="w-full bg-surface-container-high border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all" placeholder="302001" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Phone Number</label>
                      <input type="tel" className="w-full bg-surface-container-high border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all" placeholder="+91 98765 43210" />
                    </div>

                    <button 
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full bg-primary text-on-primary py-6 rounded-full font-bold tracking-[0.2em] uppercase text-sm shadow-xl shadow-primary/20 hover:bg-primary-dim transition-all mt-4"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-primary-container/30 flex items-center justify-center text-primary">
                      <CreditCard size={24} />
                    </div>
                    <h2 className="text-3xl font-headline italic text-on-surface">Payment Method</h2>
                  </div>

                  <div className="space-y-4 mb-10">
                    <button className="w-full flex items-center justify-between p-6 rounded-3xl bg-white border-2 border-primary shadow-lg shadow-primary/5 text-left transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center">
                          <CreditCard className="text-primary" size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">Razorpay Secure</p>
                          <p className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">Cards, UPI, Netbanking</p>
                        </div>
                      </div>
                      <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      </div>
                    </button>

                    <button className="w-full flex items-center justify-between p-6 rounded-3xl bg-surface-container-high/50 border border-transparent text-left hover:border-outline-variant transition-all">
                      <div className="flex items-center gap-4 opacity-50">
                        <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center">
                          <Truck size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">Cash on Delivery</p>
                          <p className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">Pay when you receive</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  <div className="bg-primary/5 rounded-3xl p-6 mb-8 flex gap-4 border border-primary/10">
                    <ShieldCheck className="text-primary shrink-0" size={20} />
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Your transaction is secured with 256-bit encryption. We do not store your full card details.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => setStep(1)}
                      className="flex-1 bg-surface-container-high text-on-surface-variant py-6 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-surface-container-highest transition-all"
                    >
                      Back
                    </button>
                    <button className="flex-[2] bg-primary text-on-primary py-6 rounded-full font-bold tracking-[0.2em] uppercase text-sm shadow-xl shadow-primary/20 hover:bg-primary-dim transition-all">
                      Complete Order
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Right Column: Order Review */}
          <aside className="lg:col-span-5 sticky top-24">
            <div className="bg-surface-container-low rounded-[2.5rem] p-10 border border-surface-container-highest overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              
              <h3 className="text-2xl font-headline italic text-on-surface mb-8">Order Review</h3>
              
              <div className="space-y-6 mb-10 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 items-center">
                    <div className="w-16 h-20 rounded-xl bg-surface-container-high flex-shrink-0 relative overflow-hidden">
                      {item.product.images?.[0] ? (
                        <Image src={item.product.images[0]} alt={item.product.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">🧶</div>
                      )}
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-on-surface text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-xs text-on-surface uppercase tracking-tight line-clamp-1">{item.product.title}</h4>
                      <p className="text-[10px] text-on-surface-variant font-medium">Handcrafted selection</p>
                    </div>
                    <p className="text-xs font-bold text-on-surface">₹{item.product.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="h-px bg-surface-container-highest mb-8" />
              
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="text-on-surface">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  <span>Shipping</span>
                  <span className="text-primary">FREE</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <span className="text-xl font-headline italic text-on-surface">Total</span>
                  <span className="text-3xl font-headline italic text-primary">₹{totalPrice}</span>
                </div>
              </div>

              {/* Secure Checkout Badge */}
              <div className="mt-12 pt-8 border-t border-surface-container-highest flex items-center justify-center gap-6 grayscale opacity-40">
                <div className="flex flex-col items-center">
                   <div className="w-12 h-6 bg-stone-300 rounded" />
                   <span className="text-[8px] font-bold mt-1 uppercase">VISA</span>
                </div>
                <div className="flex flex-col items-center">
                   <div className="w-12 h-6 bg-stone-300 rounded" />
                   <span className="text-[8px] font-bold mt-1 uppercase">MASTERCARD</span>
                </div>
                <div className="flex flex-col items-center">
                   <div className="w-12 h-6 bg-stone-300 rounded" />
                   <span className="text-[8px] font-bold mt-1 uppercase">UPI</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
