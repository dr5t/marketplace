"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Blob from "@/components/liquid/Blob";
import LiquidButton from "@/components/liquid/LiquidButton";
import { ArrowLeft, Upload, Save } from "lucide-react";
import Link from "next/link";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "Home decor", // Default
    images: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // POST to /api/products
      // Placeholder logic
      await new Promise(r => setTimeout(r, 1500));
      router.push("/seller/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen px-6 py-24 max-w-4xl mx-auto overflow-hidden">
      <Blob className="w-[400px] h-[400px] -bottom-20 -left-20 opacity-20" gradient="var(--gradient-ocean)" />
      
      <div className="relative z-10">
        <Link href="/seller/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-gray-600 mb-8 transition-colors">
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>

        <h1 className="text-4xl font-bold font-playfair mb-10">List a New Design ✨</h1>

        <form onSubmit={handleSubmit} className="liquid-card grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-2">Product Title</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Pastel Dream Crochet Tablecloth"
                className="liquid-input"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-500 mb-2">Description</label>
              <textarea 
                required
                rows={4}
                placeholder="Describe the material, size, and care instructions..."
                className="liquid-input rounded-3xl"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-2">Price (₹)</label>
                <input 
                  required
                  type="number" 
                  placeholder="999"
                  className="liquid-input"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-2">Stock</label>
                <input 
                  required
                  type="number" 
                  placeholder="5"
                  className="liquid-input"
                  value={formData.stock}
                  onChange={e => setFormData({...formData, stock: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-2">Category</label>
              <select 
                className="liquid-input appearance-none"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option>Home decor</option>
                <option>Apparel</option>
                <option>Accessories</option>
                <option>Toys</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-500 mb-2">Product Images</label>
              <div className="border-2 border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-sky-300 hover:bg-sky-50/30 transition-all cursor-pointer">
                <Upload size={32} />
                <span className="text-sm">Click to upload or drag & drop</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 px-2 uppercase tracking-widest font-bold">Max 5 images — PNG, JPG (Max 5MB)</p>
            </div>

            <div className="pt-4">
              <LiquidButton 
                type="submit" 
                className="w-full flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? "Publishing..." : <><Save size={18} /> Publish to Marketplace</>}
              </LiquidButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
