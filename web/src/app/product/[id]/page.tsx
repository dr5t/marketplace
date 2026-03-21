'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import ArtisanSpotlight from '@/components/product/ArtisanSpotlight';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/product/ProductCard';

const ProductDetail = () => {
  const params = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  // Mock data for "Exact Design" matching
  const product = {
    id: params.id,
    title: "Willow Moss Cardigan",
    category: "Spring Heirloom Collection",
    price: 4450.00,
    rating: 4.8,
    reviews: 124,
    description: "The Willow Moss Cardigan isn't just a garment; it's a 42-hour journey of hand-binding. We use a traditional 'honeycomb lace' stitch that requires constant focus and rhythmic precision.",
    details: "Woven from 100% GOTS-certified organic cotton from a small mill in Coimbatore, the yarn is naturally dyed using pomegranate skins and indigo to achieve this specific sage hue.",
    stats: [
      { label: 'Hrs Handwork', value: '42 Hrs' },
      { label: 'Organic', value: '100%' },
      { label: 'Plastic', value: 'Zero' }
    ],
    images: [
      'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1972&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590739225287-bd31519780c3?q=80&w=1974&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Sage', code: '#596859' },
      { name: 'Rose', code: '#875858' },
      { name: 'Olive', code: '#6c6450' },
      { name: 'Cream', code: '#f3f3e9' }
    ],
    artisan: {
      name: 'Vrindaa',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      bio: "Preserving the art of crochet while empowering women artisans across India."
    }
  };

  const relatedProducts = [
    {
      id: "2",
      title: "Hand-Knitted Plushie",
      price: 32,
      category: "Toys",
      images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2072&auto=format&fit=crop"],
    },
    {
      id: "3",
      title: "Boho Wall Hanging",
      price: 58,
      category: "Decor",
      images: ["https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1974&auto=format&fit=crop"],
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-32">
          
          {/* Left: Images */}
          <div className="lg:col-span-1 flex lg:flex-col gap-4 order-2 lg:order-1">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-28 rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImage === idx ? 'border-primary' : 'border-transparent opacity-60'
                }`}
              >
                <Image src={img} alt={`${product.title} ${idx}`} width={80} height={112} className="object-cover h-full" />
              </button>
            ))}
            <button className="w-20 h-28 rounded-xl border-2 border-dashed border-stone-200 flex items-center justify-center text-stone-300">
               <span className="material-symbols-outlined">add</span>
            </button>
          </div>

          <div className="lg:col-span-6 relative aspect-[3/4] rounded-3xl overflow-hidden shadow-soft mb-8 lg:mb-0 order-1 lg:order-2">
            <Image
              src={product.images[selectedImage]}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-5 flex flex-col order-3 lg:order-3">
            <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">
              {product.category}
            </p>
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4 leading-tight">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex text-[#f59e0b]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`material-symbols-outlined text-[18px] ${i < Math.floor(product.rating) ? 'FILL' : ''}`}>
                    star
                  </span>
                ))}
              </div>
              <span className="text-sm text-stone-400 font-medium">({product.reviews} reviews)</span>
            </div>

            <div className="text-3xl font-headline text-primary mb-12">
               ₹ {product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>

            <div className="mb-12">
               <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-6">Choose your yarn</p>
               <div className="flex items-center gap-4">
                  {product.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(idx)}
                      className={`w-10 h-10 rounded-full border-4 transition-all ${
                        selectedColor === idx ? 'border-primary shadow-md' : 'border-white'
                      }`}
                      style={{ backgroundColor: color.code }}
                      title={color.name}
                    />
                  ))}
               </div>
            </div>

            <div className="flex flex-col gap-4 mb-16">
               <button 
                 onClick={() => addToCart({ id: product.id as string, title: product.title, price: product.price, images: [product.images[0]] })}
                 className="w-full bg-primary text-white rounded-full py-5 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all"
               >
                 <span className="material-symbols-outlined">shopping_bag</span>
                 Add to Yarn Basket
               </button>
               <button className="w-full bg-[var(--color-surface-card)] text-primary border border-stone-100 rounded-full py-5 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-sm hover:bg-stone-50 transition-all">
                 <span className="material-symbols-outlined">favorite</span>
                 Add to Wishlist
               </button>
            </div>

            <ArtisanSpotlight 
              name={product.artisan.name}
              image={product.artisan.image}
              bio={product.artisan.bio}
            />

            <div className="mt-12 p-8 bg-[var(--color-surface-card)] rounded-3xl border border-stone-100/50 flex items-center justify-between">
               <div>
                  <h4 className="font-bold text-primary mb-1">Secure Checkout</h4>
                  <p className="text-xs text-stone-400">Insured payment & zero hassle returns door-to-door.</p>
               </div>
               <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-stone-100">
                  <span className="material-symbols-outlined text-stone-300">qr_code_2</span>
               </div>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-8 leading-tight italic">
              Every stitch tells a story <br /> of patience and intent.
            </h2>
            <div className="space-y-6 mb-12">
               <p className="text-stone-600 leading-relaxed italic text-lg">{product.description}</p>
               <p className="text-stone-500 leading-relaxed text-sm">{product.details}</p>
            </div>
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-stone-100">
               {product.stats.map((stat) => (
                 <div key={stat.label}>
                    <p className="text-2xl font-headline text-primary mb-1">{stat.value}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{stat.label}</p>
                 </div>
               ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-soft order-1 lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop"
              alt="Artisan at work"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Recommendations */}
        <div className="border-t border-stone-100 pt-24">
          <div className="flex justify-between items-end mb-16">
             <div>
                <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">Complete the look</p>
                <h2 className="text-3xl font-headline text-primary">You Might Also Like</h2>
             </div>
             <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:border-primary hover:text-primary transition-all">
                   <span className="material-symbols-outlined text-sm">west</span>
                </button>
                <button className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:border-primary hover:text-primary transition-all">
                   <span className="material-symbols-outlined text-sm">east</span>
                </button>
             </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
             {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
