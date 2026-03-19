"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Blob from "@/components/liquid/Blob";
import LiquidButton from "@/components/liquid/LiquidButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm]     = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]    = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message); return; }
      localStorage.setItem("token", data.token);
      router.push("/");
    } catch { setError("Something went wrong"); }
    finally { setLoading(false); }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      <Blob className="w-80 h-80 -top-10 -left-10" />
      <Blob className="w-64 h-64 bottom-10 right-0" gradient="linear-gradient(135deg, #FFC8A2, #FFDEE9)" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="relative z-10 liquid-card w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif",
            background: "linear-gradient(135deg, #7FD8FF, #CDB4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Welcome Back 🧶
          </h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your Vrindaa account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Email</label>
            <input type="email" required value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="liquid-input" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Password</label>
            <input type="password" required value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="liquid-input" placeholder="••••••••" />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <LiquidButton type="submit" className="w-full justify-center mt-2" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </LiquidButton>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#7FD8FF] font-medium hover:underline">Register</Link>
        </p>
      </motion.div>
    </div>
  );
}
