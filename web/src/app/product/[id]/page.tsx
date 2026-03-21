import React from 'react';
import ProductDetailClient from '@/components/product/ProductDetailClient';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ];
}

const productData = {
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

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <ProductDetailClient 
      product={{ ...productData, id }} 
      relatedProducts={relatedProducts} 
    />
  );
}
