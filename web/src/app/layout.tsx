import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Noto_Serif, Manrope, Inter } from "next/font/google";
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';

const inter = Inter({ subsets: ['latin'] });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });
const notoSerif = Noto_Serif({ subsets: ['latin'], variable: '--font-noto-serif', weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Vrindaa Crochet | Handmade with Intention',
  description: 'Exquisite artisanal crochet pieces, woven with heritage and sustainable materials.',
};

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=favorite,home,person,search,shopping_bag,storefront" />
      </head>
      <body className={`${manrope.variable} ${notoSerif.variable} font-sans antialiased text-primary`}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <BottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
