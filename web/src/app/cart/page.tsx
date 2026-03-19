"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import LiquidButton from "@/components/liquid/LiquidButton";
import Blob from "@/components/liquid/Blob";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalPrice, totalItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (totalItems === 0) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to proceed to checkout");
        window.location.href = "/login";
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/create`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ amount: totalPrice }),
      });
      
      if (!res.ok) throw new Error("Failed to create order");
      
      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Vrindaa Crochet",
        description: "Handcrafted with love",
        order_id: order.id,
        handler: async (response: Record<string, string>) => {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/verify`, {
            method: "POST",
            headers: { 
              "Content-Type": "application/json", 
              Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify({ 
              ...response, 
              cartItems: cart.map((i) => ({ productId: i.product.id, quantity: i.quantity })), 
              totalAmount: totalPrice 
            }),
          });
          alert("🎉 Payment successful! Order placed.");
          clearCart();
        },
        theme: { color: "#7FD8FF" },
      };

      const Razorpay = (window as any).Razorpay;
      if (Razorpay) {
        const rzp = new Razorpay(options);
        rzp.open();
      } else {
        alert("Razorpay SDK not loaded. Please refresh the page.");
      }
    } catch (err) {
      console.error(err);
      alert("Checkout failed. Please check your connection or login status.");
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFF]">
      <Blob className="w-[600px] h-[600px] -top-20 -right-20 opacity-10" />
      <Blob className="w-96 h-96 bottom-20 -left-20 opacity-10" gradient="var(--gradient-ocean)" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center gap-4 mb-12">
           <div className="w-16 h-16 rounded-full bg-white shadow-soft flex items-center justify-center text-3xl">🛒</div>
           <div>
             <h1 className="text-4xl font-bold font-playfair text-gray-800">Your Cart</h1>
             <p className="text-gray-400 font-medium">{totalItems} handcrafted items ready for you</p>
           </div>
        </div>

        {cart.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="liquid-card !p-20 text-center flex flex-col items-center"
          >
            <div className="w-32 h-32 rounded-full bg-blue-50 flex items-center justify-center mb-8">
              <ShoppingBag className="w-16 h-16 text-blue-200" />
            </div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Your cart is feeling a bit light!</h2>
            <p className="text-gray-400 max-w-xs mb-8">Every piece at Vrindaa is unique and handmade. Start your collection today.</p>
            <Link href="/">
              <LiquidButton className="px-8 py-4">
                Explore The Shop <ArrowRight className="ml-2 w-5 h-5" />
              </LiquidButton>
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className="liquid-card !p-6 flex flex-col sm:flex-row items-center gap-6 group"
                  >
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                      🧶
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left">
                      <p className="text-[10px] font-bold text-[#7FD8FF] uppercase tracking-widest mb-1">Authentic Craft</p>
                      <h3 className="font-bold text-gray-800 text-lg mb-1">{item.product.title}</h3>
                      <p className="font-black text-xl text-gray-800">₹{item.product.price}</p>
                    </div>

                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-2xl border border-gray-100/50">
                      <motion.button 
                        whileTap={{ scale: 0.8 }} 
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-[#7FD8FF] transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </motion.button>
                      <span className="font-bold w-8 text-center text-gray-700">{item.quantity}</span>
                      <motion.button 
                        whileTap={{ scale: 0.8 }} 
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#7FD8FF]"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.1, rotate: 5 }} 
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(item.product.id)} 
                      className="p-3 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <div className="flex justify-between items-center p-4">
                <Link href="/" className="text-sm font-bold text-gray-400 hover:text-[#7FD8FF] transition-colors flex items-center gap-2">
                   <Plus className="w-4 h-4" /> Add more items
                </Link>
                <button 
                  onClick={clearCart}
                  className="text-sm font-bold text-red-300 hover:text-red-500 transition-colors"
                >
                  Clear Shopping Cart
                </button>
              </div>
            </div>

            {/* Receipt Summary */}
            <div className="lg:col-span-4 h-fit sticky top-28">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="liquid-card !p-8 border-2 border-[#7FD8FF]/20"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-medium">Subtotal</span>
                    <span className="text-gray-800 font-bold">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-medium">Shipping</span>
                    <span className="text-green-500 font-bold tracking-tighter uppercase">Calculated at next step</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-medium">Tax Estimates</span>
                    <span className="text-gray-800 font-bold">₹0</span>
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-[#7FD8FF]/30 to-transparent my-2" />
                  
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <div className="text-right">
                       <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7FD8FF] to-[#CDB4FF]">
                        ₹{totalPrice}
                       </p>
                    </div>
                  </div>
                </div>

                <LiquidButton 
                  className="w-full !py-6 text-xl shadow-lg shadow-[#7FD8FF]/30" 
                  onClick={handleCheckout} 
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Complete Checkout"}
                </LiquidButton>
                
                <div className="mt-6 flex flex-col items-center gap-3">
                   <img src="https://razorpay.com/assets/razorpay-logo.svg" alt="Razorpay" className="h-4 opacity-40 grayscale" />
                   <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-gray-300">
                      <span className="w-1 h-1 bg-green-400 rounded-full" /> 256-bit Secure Payment
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Razorpay SDK */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
    </div>
  );
}
