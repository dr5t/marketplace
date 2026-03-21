"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }
      localStorage.setItem("token", data.token);
      router.push("/");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-background font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col">
      {/* TopNavBar (Minimal version for login) */}
      <header className="bg-white/75 backdrop-blur-md fixed top-6 left-1/2 -translate-x-1/2 w-[92%] rounded-full z-50 shadow-[0_8px_32px_rgba(56,56,51,0.06)] flex justify-between items-center px-8 py-3 max-w-7xl mx-auto">
        <div className="text-2xl font-headline tracking-tight text-primary italic font-bold">
          Loom & Loop
        </div>
        <Link 
          href="/" 
          className="text-sm font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
        >
          Back to Shop
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center pt-32 pb-12 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-[0_20px_80px_rgba(56,56,51,0.08)] border border-surface-container-highest"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-headline italic text-on-surface mb-3">Welcome Back</h1>
            <p className="text-sm text-on-surface-variant font-medium">Continue your artisanal journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Email Address</label>
              <input 
                type="email" 
                required 
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-surface-container-high border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-on-surface placeholder:text-on-surface-variant/40" 
                placeholder="evelyn@example.com" 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Password</label>
                <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">Forgot?</a>
              </div>
              <input 
                type="password" 
                required 
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-surface-container-high border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-on-surface placeholder:text-on-surface-variant/40" 
                placeholder="••••••••" 
              />
            </div>

            {error && <p className="text-error text-xs font-bold text-center px-2">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-on-primary py-5 rounded-full font-bold tracking-widest uppercase text-sm shadow-xl shadow-primary/20 hover:bg-primary-dim active:scale-95 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-surface-container-highest">
            <p className="text-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-6">Or continue with</p>
            <div className="flex gap-4">
              <button className="flex-1 py-3 px-6 rounded-full bg-surface-container-low border border-surface-container-highest hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2">
                <span className="w-5 h-5 bg-stone-200 rounded-full" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Google</span>
              </button>
              <button className="flex-1 py-3 px-6 rounded-full bg-surface-container-low border border-surface-container-highest hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2">
                <span className="w-5 h-5 bg-stone-200 rounded-full" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Apple</span>
              </button>
            </div>
          </div>

          <p className="text-center mt-10 text-xs text-on-surface-variant font-medium">
            New to Loom & Loop?{" "}
            <Link href="/register" className="text-primary font-bold hover:underline ml-1">Create an account</Link>
          </p>
        </motion.div>
      </main>

      <footer className="py-12 px-8 text-center">
        <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.2em]">
          Designed with love for the artisanal community
        </p>
      </footer>
    </div>
  );
}
