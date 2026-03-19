"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Blob from "@/components/liquid/Blob";
import LiquidButton from "@/components/liquid/LiquidButton";
import { ArrowLeft, Upload, Save, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    categoryName: "Home Decor",
    images: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login as a seller to add products");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create product");
      }

      router.push("/seller/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
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

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-500 flex items-center gap-3 text-sm font-medium animate-shake">
            <AlertCircle size={18} /> {error}
          </div>
        )}

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
                value={formData.categoryName}
                onChange={e => setFormData({...formData, categoryName: e.target.value})}
              >
                <option>Home Decor</option>
                <option>Apparel</option>
                <option>Accessories</option>
                <option>Toys</option>
                <option>Custom Commission</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-500 mb-2">Product Images</label>
              <div 
                onClick={() => {
                   // Mock image upload
                   const mockImg = "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1072&auto=format&fit=crop";
                   setFormData(prev => ({ ...prev, images: [...prev.images, mockImg] }));
                }}
                className="border-2 border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-sky-300 hover:bg-sky-50/30 transition-all cursor-pointer"
              >
                <Upload size={32} />
                <span className="text-sm">Click to simulate upload</span>
                {formData.images.length > 0 && (
                  <span className="text-xs text-[#7FD8FF] font-black uppercase tracking-widest">
                    {formData.images.length} Images Added
                  </span>
                )}
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
