"use client";
  
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Blob from "@/components/liquid/Blob";
import LiquidButton from "@/components/liquid/LiquidButton";
import { ShoppingCart, Star, ArrowLeft, Heart, ShieldCheck, Truck, Cuboid as Cube } from "lucide-react";
import Link from "next/link";

const PLACEHOLDER_PRODUCT = {
  id: "1",
  title: "Hand-Knitted Boho Lavender Cardigan",
  description: "Experience the ultimate comfort with our hand-knitted lavender cardigan. Made from 100% organic cotton, this piece features intricate floral patterns and a relaxed 'boho' fit. Perfect for spring evenings or cozy winter layering.\n\nEach piece is made-to-order by our artisan Maria, ensuring a unique touch for every customer.",
  price: 2499,
  stock: 5,
  images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1072&auto=format&fit=crop", "https://images.unsplash.com/photo-1576188973526-0e5d742990af?q=80&w=1080&auto=format&fit=crop"],
  rating: 4.9,
  reviewsCount: 128,
  seller: { name: "Maria's Knits", rating: 4.8, storeUrl: "/seller/marias-knits" },
  category: "Apparel"
};

const Liquid3D = dynamic(() => import('@/components/liquid/Liquid3D'), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-sky-50 animate-pulse rounded-[3rem]" />
});

import { useCart } from "@/context/CartContext";

export default function ProductDetailClient({ id }: { id: string }) {
  const { addToCart } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [adding, setAdding]       = useState(false);
  const [view3D, setView3D]       = useState(false);

  const handleAddToCart = () => {
    addToCart(PLACEHOLDER_PRODUCT as any);
    setAdding(true);
    setTimeout(() => setAdding(false), 2000);
  };

  return (
    <div className="relative min-h-screen px-6 py-24 max-w-7xl mx-auto">
      <Blob className="w-[500px] h-[500px] -top-20 -right-20 opacity-20" gradient="var(--gradient-peach)" />
      
      <div className="relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 mb-8 transition-colors">
          <ArrowLeft size={18} /> Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 item-start">
          {/* Gallery */}
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-2">
               <span className="text-sm font-bold text-gray-400">Visualization</span>
               <LiquidButton 
                 onClick={() => setView3D(!view3D)}
                 className={`px-4 py-2 !text-xs`}
                 variant={view3D ? "primary" : "ocean"}
               >
                 <Cube size={14} /> {view3D ? 'View Photos' : 'View in 3D'}
               </LiquidButton>
            </div>
            
            <motion.div 
              layoutId="product-img"
              className="liquid-card p-4 aspect-square overflow-hidden bg-white/50 backdrop-blur-sm relative"
            >
              {view3D ? (
                <Liquid3D />
              ) : (
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image 
                    src={PLACEHOLDER_PRODUCT.images[activeImg]} 
                    alt={PLACEHOLDER_PRODUCT.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </motion.div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {PLACEHOLDER_PRODUCT.images.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-24 h-24 rounded-2xl overflow-hidden border-4 transition-all ${activeImg === i ? 'border-sky-300' : 'border-transparent'}`}
                >
                  <div className="relative w-full h-full">
                    <Image 
                      src={img} 
                      alt={`${PLACEHOLDER_PRODUCT.title} thumbnail ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-8 py-4">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">{PLACEHOLDER_PRODUCT.category}</span>
                <button className="p-3 bg-white shadow-sm rounded-full text-pink-400 hover:scale-110 active:scale-95 transition-all">
                  <Heart size={20} />
                </button>
              </div>
              <h1 className="text-5xl font-bold font-playfair mb-4 leading-tight">{PLACEHOLDER_PRODUCT.title}</h1>
              <div className="flex items-center gap-4 text-sm font-bold text-gray-400">
                <div className="flex gap-1 text-orange-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} />)}
                </div>
                <span>{PLACEHOLDER_PRODUCT.rating} ({PLACEHOLDER_PRODUCT.reviewsCount} Reviews)</span>
              </div>
            </div>

            <p className="text-gray-500 leading-relaxed text-lg whitespace-pre-line">
              {PLACEHOLDER_PRODUCT.description}
            </p>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-gray-800">₹{PLACEHOLDER_PRODUCT.price}</span>
              <span className="text-sm text-green-500 font-bold tracking-wide uppercase">In Stock ({PLACEHOLDER_PRODUCT.stock})</span>
            </div>

            <div className="flex gap-4">
              <LiquidButton 
                onClick={handleAddToCart}
                disabled={adding}
                className="flex-1 py-5 flex items-center justify-center gap-3 text-lg"
              >
                <AnimatePresence mode="wait">
                  {adding ? (
                    <motion.span 
                      key="added"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Added to Cart! 🎨
                    </motion.span>
                  ) : (
                    <motion.span 
                      key="add"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3"
                    >
                      <ShoppingCart size={22} /> Add to Cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </LiquidButton>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-3xl bg-gray-50 flex items-center gap-3">
                <ShieldCheck className="text-sky-400" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest">Quality Check</p>
                  <p className="text-[10px] text-gray-400">Artisan Verified</p>
                </div>
              </div>
              <div className="p-4 rounded-3xl bg-gray-50 flex items-center gap-3">
                <Truck className="text-pink-400" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest">Free Shipping</p>
                  <p className="text-[10px] text-gray-400">On orders over ₹999</p>
                </div>
              </div>
            </div>

            {/* Seller Info Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-white to-sky-50/50 border border-white shadow-soft flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-200 to-purple-200 flex items-center justify-center font-bold text-white text-xl">
                  {PLACEHOLDER_PRODUCT.seller.name[0]}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Handcrafted by</p>
                  <p className="text-lg font-bold text-gray-800">{PLACEHOLDER_PRODUCT.seller.name}</p>
                </div>
              </div>
              <Link href={PLACEHOLDER_PRODUCT.seller.storeUrl}>
                <LiquidButton className="px-5 py-2 !text-sm">
                  Visit Store
                </LiquidButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
