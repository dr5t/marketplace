"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import LiquidButton from "@/components/liquid/LiquidButton";
import Blob from "@/components/liquid/Blob";

interface CartItem {
  id: string;
  product: { title: string; price: number; images: string[] };
  quantity: number;
}

// Mock cart items for demo
const MOCK_CART: CartItem[] = [
  { id: "1", product: { title: "Sunflower Amigurumi", price: 399, images: [] }, quantity: 1 },
  { id: "2", product: { title: "Winter Beanie Hat",   price: 549, images: [] }, quantity: 2 },
];

export default function CartPage() {
  const [items, setItems] = useState(MOCK_CART);
  const [loading, setLoading] = useState(false);

  const updateQty = (id: string, delta: number) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );

  const removeItem = (id: string) => setItems((prev) => prev.filter((item) => item.id !== id));

  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ amount: total }),
      });
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
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ ...response, cartItems: items.map((i) => ({ productId: i.id, quantity: i.quantity })), totalAmount: total }),
          });
          alert("🎉 Payment successful! Order placed.");
          setItems([]);
        },
        theme: { color: "#7FD8FF" },
      };

      const rzp = new (window as unknown as { Razorpay: new (o: unknown) => { open: () => void } }).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen">
      <Blob className="w-72 h-72 -top-10 -right-10 opacity-20" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
          Your Cart 🛒
        </h1>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-400 text-lg">Your cart is empty</p>
            <LiquidButton className="mt-6" onClick={() => window.location.href = "/"}>Continue Shopping</LiquidButton>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="liquid-card flex items-center gap-4"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-2xl flex-shrink-0">
                      🧶
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.product.title}</h3>
                      <p className="font-bold text-[#7FD8FF]">₹{item.product.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button whileTap={{ scale: 0.9 }} onClick={() => updateQty(item.id, -1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <Minus className="w-3 h-3" />
                      </motion.button>
                      <span className="font-semibold w-6 text-center">{item.quantity}</span>
                      <motion.button whileTap={{ scale: 0.9 }} onClick={() => updateQty(item.id, 1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                        style={{ background: "linear-gradient(135deg, #7FD8FF, #CDB4FF)" }}>
                        <Plus className="w-3 h-3" />
                      </motion.button>
                    </div>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      onClick={() => removeItem(item.id)} className="p-2 text-red-400 hover:text-red-600">
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="liquid-card w-full lg:w-80 h-fit sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                {items.map((i) => (
                  <div key={i.id} className="flex justify-between">
                    <span>{i.product.title} × {i.quantity}</span>
                    <span>₹{i.product.price * i.quantity}</span>
                  </div>
                ))}
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg text-gray-800">
                  <span>Total</span>
                  <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #7FD8FF, #CDB4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    ₹{total}
                  </span>
                </div>
              </div>
              <LiquidButton className="w-full justify-center" onClick={handleCheckout} disabled={loading}>
                {loading ? "Processing..." : "Pay with Razorpay"}
              </LiquidButton>
              <p className="text-xs text-gray-400 text-center mt-3">🔒 Secured by Razorpay</p>
            </motion.div>
          </div>
        )}
      </div>

      {/* Razorpay SDK */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
    </div>
  );
}
