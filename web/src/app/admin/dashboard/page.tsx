"use client";

import { motion } from "framer-motion";
import Blob from "@/components/liquid/Blob";
import { Users, ShoppingBag, ShieldAlert, Zap, ArrowUpRight } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="relative min-h-screen px-6 py-24 max-w-7xl mx-auto overflow-hidden">
      <Blob className="w-[600px] h-[600px] -top-20 -left-20 opacity-20" gradient="var(--gradient-liquid)" />
      
      <div className="relative z-10">
        <div className="mb-12">
          <h1 className="text-5xl font-bold font-playfair mb-2">Admin Command Center 🛡️</h1>
          <p className="text-gray-500 font-medium tracking-wide uppercase text-xs">Platform Governance & Oversight</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Users", value: "1,280", icon: Users, color: "#7FD8FF" },
            { label: "Pending Sellers", value: "24", icon: ShieldAlert, color: "#FFC8A2" },
            { label: "Total Revenue", value: "₹4.2L", icon: ShoppingBag, color: "#CDB4FF" },
            { label: "API Uptime", value: "99.9%", icon: Zap, color: "#86EFAC" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="liquid-card bg-white/70 backdrop-blur-xl border border-white/50"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-2xl" style={{ backgroundColor: `${stat.color}33`, color: stat.color }}>
                  <stat.icon size={20} />
                </div>
                <span className="text-[10px] bg-white px-2 py-1 rounded-full shadow-sm text-gray-400 font-bold">LIVE</span>
              </div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Moderation Queue */}
          <div className="liquid-card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Moderation Queue</h2>
              <button className="text-sky-400 text-xs font-bold hover:underline">VIEW ALL</button>
            </div>
            <div className="space-y-4">
              {[
                { title: "Store: 'Aura Knits' Registration", time: "2m ago", type: "SELLER" },
                { title: "Reported Comment on 'Blue Scarf'", time: "1h ago", type: "REVIEW" },
                { title: "Suspected Duplicate Listing #921", time: "4h ago", type: "FRAUD" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-3xl bg-gray-50/50 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-orange-400 animate-pulse' : 'bg-gray-300'}`} />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">{item.title}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{item.time} • {item.type}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-gray-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Platform Performance Placeholder */}
          <div className="liquid-card bg-gradient-to-br from-white to-sky-50/30">
            <h2 className="text-xl font-bold mb-6">Sales Activity</h2>
            <div className="h-64 flex items-end justify-between gap-2 px-2">
              {[40, 70, 45, 90, 65, 80, 50, 85, 95].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + (i * 0.05), type: "spring" }}
                  className="w-full rounded-t-xl bg-gradient-to-t from-sky-200 to-sky-400 opacity-60 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
            <div className="mt-4 flex justify-between text-[10px] font-bold text-gray-400 px-2">
              <span>MON</span><span>WED</span><span>FRI</span><span>SUN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
