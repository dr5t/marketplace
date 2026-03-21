"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: any }) {
  const { addItem } = useCart();

  return (
    <div className="group">
      <div className="aspect-[4/5] bg-stone-100 rounded-xl overflow-hidden relative mb-6">
        <Link href={`/product/${product.id}`}>
            <Image
                src={product.images?.[0] || product.image || "/placeholder.png"}
                alt={product.title}
                fill
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
        </Link>
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-stone-400 hover:text-emerald-700">
          <span className="material-symbols-outlined">favorite</span>
        </button>
      </div>
      <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">
        {product.category?.name || product.category || "General"}
      </p>
      <Link href={`/product/${product.id}`}>
        <h4 className="font-serif text-xl mb-1 group-hover:text-emerald-800 transition-colors" style={{ fontFamily: "var(--font-noto-serif)" }}>
          {product.title}
        </h4>
      </Link>
      <div className="flex items-center justify-between">
        <p className="font-sans text-emerald-900 font-bold tracking-tight">${product.price}</p>
        <button 
          onClick={() => addItem(product)}
          className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 hover:text-emerald-600 transition-colors flex items-center gap-1"
        >
          Add <span className="material-symbols-outlined text-sm">add</span>
        </button>
      </div>
    </div>
  );
}
