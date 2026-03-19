"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Blob from "@/components/liquid/Blob";
import LiquidButton from "@/components/liquid/LiquidButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ROLES = ["USER", "SELLER"];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm]     = useState({ name: "", email: "", password: "", role: "USER" });
  const [loading, setLoading] = useState(false);
  const [error, setError]    = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
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
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden no-neofolia page-signup">
      <Blob className="w-80 h-80 -top-10 -right-10" gradient="linear-gradient(135deg, #CDB4FF, #FFC8A2)" />
      <Blob className="w-64 h-64 bottom-10 -left-10" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="relative z-10 liquid-card w-full max-w-md"
      >
        <div className="text-center mb-8 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="relative w-16 h-16 mb-4 rounded-full overflow-hidden shadow-md border-2 border-white"
          >
            <Image src="/logo.png" alt="Logo" fill className="object-cover" />
          </motion.div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif",
            background: "linear-gradient(135deg, #CDB4FF, #FFC8A2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Join Vrindaa ✨
          </h1>
          <p className="text-gray-500 text-sm mt-1">Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "email", "password"].map((field) => (
            <div key={field}>
              <label className="text-xs font-medium text-gray-600 mb-1 block capitalize">{field}</label>
              <input
                type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                required
                value={form[field as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="liquid-input"
                placeholder={field === "name" ? "Priya Sharma" : field === "email" ? "you@example.com" : "••••••••"}
              />
            </div>
          ))}

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">I want to</label>
            <div className="flex gap-3">
              {ROLES.map((r) => (
                <LiquidButton 
                  key={r} 
                  type="button" 
                  onClick={() => setForm({ ...form, role: r })}
                  className="flex-1"
                  variant={form.role === r ? "primary" : "ocean"}
                >
                  {r === "USER" ? "🛒 Buy" : "🧶 Sell"}
                </LiquidButton>
              ))}
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
          <LiquidButton type="submit" className="w-full justify-center mt-2" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </LiquidButton>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#7FD8FF] font-medium hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
