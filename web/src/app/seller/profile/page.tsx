"use client";

import { motion } from "framer-motion";
import { Star, MapPin, Calendar, Share2, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SellerProfilePage() {
  const products = [
    { id: 1, title: "Pink Crochet Bralette", price: "₹1,200", category: "Apparel" },
    { id: 2, title: "Blue Flower Top", price: "₹950", category: "Apparel" },
    { id: 3, title: "Boho Beach Skirt", price: "₹1,800", category: "Apparel" },
    { id: 4, title: "Handmade Bucket Hat", price: "₹650", category: "Accessories" },
    { id: 5, title: "Crochet Coasters (Set of 4)", price: "₹450", category: "Home" },
    { id: 6, title: "Artisan Tote Bag", price: "₹1,500", category: "Accessories" },
  ];

  return (
    <div className="bg-surface text-on-background font-body min-h-screen">
      {/* Profile Header Section */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Banner */}
          <div className="h-64 md:h-80 w-full rounded-[3rem] bg-surface-container-high relative overflow-hidden shadow-inner border border-surface-container-highest">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay" />
             <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
          </div>

          {/* Profile Info Card */}
          <div className="relative -mt-24 px-8 flex flex-col md:flex-row items-end gap-8">
            <div className="w-40 h-40 rounded-[2.5rem] bg-white p-2 shadow-2xl border-2 border-primary/20">
               <div className="w-full h-full rounded-[2rem] bg-surface-container-high overflow-hidden relative">
                  <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80" alt="Vrindaa" fill className="object-cover" />
               </div>
            </div>
            
            <div className="flex-grow pb-4 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h1 className="text-5xl font-headline italic text-on-surface">Vrindaa's Workshop</h1>
                <div className="flex items-center justify-center md:justify-start gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/10">
                   <Star size={14} fill="currentColor" />
                   <span className="text-xs font-bold tracking-widest">4.9 (124)</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-on-surface-variant font-medium">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Jaipur, Rajasthan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Joined Jan 2024</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pb-4">
               <button className="p-4 rounded-full bg-white border border-surface-container-highest text-on-surface-variant hover:text-primary transition-all shadow-lg shadow-surface-container-highest/20 active:scale-95">
                  <Share2 size={20} />
               </button>
               <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold tracking-[0.2em] uppercase text-xs shadow-xl shadow-primary/20 hover:bg-primary-dim active:scale-95 transition-all">
                  Follow Artist
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats and Description */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-8">
              <h2 className="text-2xl font-headline italic text-on-surface mb-6">About the Artist</h2>
              <p className="text-on-surface-variant leading-relaxed mb-10 font-medium">
                Inspired by the vibrant colors of Rajasthan, I've been practicing the art of crochet for over 8 years. Each piece in my shop is meticulously handcrafted using sustainable cotton threads and traditional patterns passed down through generations. My work aims to bring a touch of bohemian elegance to your everyday life.
              </p>

              <div className="flex gap-12 mb-16">
                 <div>
                    <p className="text-3xl font-headline italic text-primary mb-1">24</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Collections</p>
                 </div>
                 <div className="w-px bg-surface-container-highest" />
                 <div>
                    <p className="text-3xl font-headline italic text-primary mb-1">852</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Followers</p>
                 </div>
                 <div className="w-px bg-surface-container-highest" />
                 <div>
                    <p className="text-3xl font-headline italic text-primary mb-1">45</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Happy Clients</p>
                 </div>
              </div>
           </div>
           
           <div className="lg:col-span-4">
              <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-surface-container-highest shadow-[0_12px_48px_rgba(56,56,51,0.03)]">
                 <h3 className="text-lg font-bold text-on-surface mb-6 uppercase tracking-widest text-center">In Conversation</h3>
                 <button className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-surface-container-high text-on-surface-variant font-bold uppercase tracking-widest text-[10px] hover:bg-surface-container-highest transition-all">
                    <MessageCircle size={16} /> Send a Message
                 </button>
              </div>
           </div>
        </div>
      </section>

      {/* Featured Creations */}
      <section className="py-24 px-6 bg-surface-container-low border-t border-surface-container-highest">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-4xl font-headline italic text-on-surface mb-2">Featured Creations</h2>
              <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Handmade with heart and thread</p>
            </div>
            <div className="flex gap-4">
               {["All", "Apparel", "Accessories", "Home"].map((cat) => (
                 <button key={cat} className={`text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded-full border transition-all ${cat === "All" ? "bg-primary text-on-primary border-primary shadow-lg shadow-primary/20" : "bg-white border-surface-container-highest text-on-surface-variant hover:border-primary/20"}`}>
                   {cat}
                 </button>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((p, i) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] rounded-[2.5rem] bg-white border border-surface-container-highest shadow-[0_8px_32px_rgba(56,56,51,0.02)] overflow-hidden relative mb-6">
                   <div className="absolute inset-0 bg-stone-100 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-700">🧶</div>
                   <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors">
                        <Heart size={18} />
                      </button>
                   </div>
                   <div className="absolute bottom-6 left-6 right-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <button className="w-full bg-white/90 backdrop-blur-md text-on-surface py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px]">Quick Selection</button>
                   </div>
                </div>
                <div className="px-2">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">{p.category}</p>
                   <h4 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors mb-2">{p.title}</h4>
                   <p className="text-2xl font-headline italic text-on-surface-variant">{p.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
             <button className="bg-surface-container-low border border-surface-container-highest text-on-surface-variant px-12 py-5 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-surface-container-high transition-all">
                Load More Creations
             </button>
          </div>
        </div>
      </section>

      <footer className="py-24 px-8 text-center bg-white border-t border-surface-container-highest">
        <div className="text-xl font-headline italic text-on-surface-variant mb-4">Vrindaa Crochet</div>
        <p className="text-[10px] text-on-surface-variant/40 uppercase tracking-[0.3em]">Where every stitch tells a story</p>
      </footer>
    </div>
  );
}
