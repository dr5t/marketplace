"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Blob from "@/components/liquid/Blob";
import LiquidButton from "@/components/liquid/LiquidButton";
import Link from "next/link";
import { Plus, Package, DollarSign, TrendingUp, Edit, Trash2 } from "lucide-react";

export default function SellerDashboard() {
  const [products, setProducts] = useState<{ id: string; title: string; price: number; stock: number; images: string[] }[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?sellerId=current`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSellerProducts();
  }, []);

  return (
    <div className="relative min-h-screen px-6 py-24 max-w-7xl mx-auto overflow-hidden">
      <Blob className="w-[500px] h-[500px] -top-20 -right-20 opacity-30" gradient="var(--gradient-peach)" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold font-playfair mb-2">Seller Dashboard 🧶</h1>
            <p className="text-gray-500">Manage your crochet collection</p>
          </div>
          <Link href="/seller/add-product">
            <LiquidButton className="flex items-center gap-2">
              <Plus size={18} /> Add New Design
            </LiquidButton>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Total Sales", value: "₹12,450", icon: DollarSign, color: "#7FD8FF" },
            { label: "Active Products", value: products.length.toString(), icon: Package, color: "#CDB4FF" },
            { label: "Store Rating", value: "4.8/5", icon: TrendingUp, color: "#FFC8A2" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="liquid-card flex items-center gap-5"
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white" 
                style={{ background: stat.color }}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Product Table */}
        <div className="liquid-card overflow-hidden">
          <h2 className="text-xl font-bold mb-6 px-2">Your Listings</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase font-bold tracking-widest">
                  <th className="px-4 py-4">Product</th>
                  <th className="px-4 py-4">Price</th>
                  <th className="px-4 py-4">Stock</th>
                  <th className="px-4 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} className="py-20 text-center text-gray-400">Loading products...</td></tr>
                ) : products.length === 0 ? (
                  <tr><td colSpan={4} className="py-20 text-center text-gray-400 italic">No products yet. Let&apos;s create one! ✨</td></tr>
                ) : (
                  products.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-4 flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl bg-gray-100 overflow-hidden">
                          <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                        </div>
                        <span className="font-semibold text-gray-700">{p.title}</span>
                      </td>
                      <td className="px-4 py-4 text-gray-600 font-medium">₹{p.price}</td>
                      <td className="px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.stock > 10 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                          {p.stock} In Stock
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right space-x-2">
                        <button className="p-2 hover:bg-blue-50 text-blue-400 rounded-lg transition-colors"><Edit size={18} /></button>
                        <button className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition-colors"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
