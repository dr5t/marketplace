"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Blob from "@/components/liquid/Blob";
import LiquidButton from "@/components/liquid/LiquidButton";
import { Save, Layout, Type, Info, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState("");
  const [config, setConfig]   = useState({
    heroTitle: "",
    heroSub: "",
    headerTitle: "",
    footerText: ""
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/config`);
        const data = await res.json();
        setConfig(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError("");

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/config`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(config),
      });

      if (!res.ok) throw new Error("Failed to save configuration");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Admin Portal...</div>;

  return (
    <div className="relative min-h-screen px-6 py-24 max-w-5xl mx-auto overflow-hidden">
      <Blob className="w-[600px] h-[600px] -top-20 -right-20 opacity-20" />
      <Blob className="w-96 h-96 bottom-0 -left-20 opacity-20" gradient="var(--gradient-peach)" />

      <div className="relative z-10">
        <header className="mb-12">
          <h1 className="text-4xl font-bold font-playfair mb-2">Super Admin Portal 👑</h1>
          <p className="text-gray-500">Global site content management system</p>
        </header>

        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-3xl bg-green-50 border border-green-100 text-green-600 flex items-center gap-3 text-sm font-bold"
          >
            <CheckCircle size={18} /> Changes saved successfully! Site live with new content.
          </motion.div>
        )}

        {error && (
          <div className="mb-8 p-4 rounded-3xl bg-red-50 border border-red-100 text-red-500 flex items-center gap-3 text-sm font-bold">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hero Section Editing */}
          <div className="liquid-card space-y-6">
            <div className="flex items-center gap-2 mb-4 text-[#7FD8FF]">
              <Layout size={20} />
              <h2 className="text-xl font-bold">Hero Section</h2>
            </div>
            
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-2">Main Headline</label>
              <textarea 
                className="liquid-input min-h-[100px]"
                value={config.heroTitle}
                onChange={e => setConfig({...config, heroTitle: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-2">Secondary text</label>
              <textarea 
                className="liquid-input min-h-[100px]"
                value={config.heroSub}
                onChange={e => setConfig({...config, heroSub: e.target.value})}
              />
            </div>
          </div>

          {/* Header & Footer Editing */}
          <div className="liquid-card space-y-6">
             <div className="flex items-center gap-2 mb-4 text-[#CDB4FF]">
              <Type size={20} />
              <h2 className="text-xl font-bold">Header & Navigation</h2>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-2">Site Title</label>
              <input 
                className="liquid-input"
                value={config.headerTitle}
                onChange={e => setConfig({...config, headerTitle: e.target.value})}
              />
            </div>

            <div className="pt-6 border-t border-gray-50">
              <div className="flex items-center gap-2 mb-4 text-[#FFC8A2]">
                <Info size={20} />
                <h2 className="text-xl font-bold">Footer Content</h2>
              </div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-2">Copyright Line</label>
              <input 
                className="liquid-input"
                value={config.footerText}
                onChange={e => setConfig({...config, footerText: e.target.value})}
              />
            </div>
          </div>

          <div className="md:col-span-2 pt-6">
            <LiquidButton 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 py-5 text-lg"
              disabled={saving}
            >
              {saving ? "Deploying Changes..." : <><Save size={20} /> Publish Global Updates</>}
            </LiquidButton>
          </div>
        </form>
      </div>
    </div>
  );
}
