"use client";

import { motion } from "framer-motion";
import { Plus, Package, DollarSign, Users, ShoppingCart, ArrowUpRight, ArrowDownRight, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SellerDashboard() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/seller`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchSellerProducts();
  }, []);

  const stats = [
    { label: "Total Revenue", value: "₹42,850", trend: "+12.5%", icon: DollarSign, color: "bg-primary-container/30 text-primary" },
    { label: "Active Orders", value: "18", trend: "+4", icon: ShoppingCart, color: "bg-secondary-container/30 text-secondary" },
    { label: "Total Views", value: "1,240", trend: "-2.1%", icon: Users, color: "bg-tertiary-container/30 text-tertiary" },
    { label: "Crafts Listed", value: products.length.toString(), trend: "0", icon: Package, color: "bg-surface-container-high text-on-surface-variant" },
  ];

  return (
    <div className="bg-surface text-on-background font-body min-h-screen">
      <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-headline italic text-on-surface mb-2">Seller Dashboard</h1>
            <p className="text-sm text-on-surface-variant font-medium uppercase tracking-widest italic">Welcome back to your workshop, Vrindaa</p>
          </div>
          <Link href="/seller/add-product">
            <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold tracking-[0.2em] uppercase text-xs shadow-xl shadow-primary/20 hover:bg-primary-dim active:scale-95 transition-all flex items-center gap-3">
              <Plus size={16} /> List New Creation
            </button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface-container-low p-8 rounded-[2.5rem] border border-surface-container-highest shadow-[0_8px_32px_rgba(56,56,51,0.03)] group hover:shadow-[0_12px_48px_rgba(56,56,51,0.06)] transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                  <stat.icon size={20} />
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${stat.trend.startsWith("+") ? "bg-primary/10 text-primary" : "bg-error/10 text-error"}`}>
                  {stat.trend.startsWith("+") ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  {stat.trend}
                </div>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant mb-1 ml-1">{stat.label}</p>
              <h3 className="text-3xl font-headline italic text-on-surface">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Recent Product List */}
        <div className="bg-surface-container-low rounded-[2.5rem] border border-surface-container-highest shadow-[0_12px_48px_rgba(56,56,51,0.03)] overflow-hidden">
          <div className="p-8 border-b border-surface-container-highest flex justify-between items-center">
             <h3 className="text-2xl font-headline italic text-on-surface">Your Collection</h3>
             <button className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors underline decoration-primary/20 underline-offset-4">View All Items</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-high/30">
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Product</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Status</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Price</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-highest">
                {products.length > 0 ? (
                  products.map((product, i) => (
                    <tr key={i} className="group hover:bg-surface-container-high/20 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-xl overflow-hidden relative">
                            {product.images?.[0] ? (
                              <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                            ) : "🧶"}
                          </div>
                          <span className="font-bold text-sm text-on-surface">{product.title}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-primary/10 text-primary">
                           Active
                         </span>
                      </td>
                      <td className="px-8 py-6 text-sm font-medium text-on-surface-variant">₹{product.price}</td>
                      <td className="px-8 py-6 text-right">
                         <button className="p-2 text-on-surface-variant/40 hover:text-primary transition-colors">
                            <MoreVertical size={18} />
                         </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-8 py-12 text-center text-on-surface-variant italic">
                      No crafts listed yet. Start your journey today!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
