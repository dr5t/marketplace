import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Noto_Serif, Manrope } from "next/font/google";

const notoSerif = Noto_Serif({ 
  subsets: ["latin"], 
  variable: "--font-noto-serif",
  weight: ["400", "700"],
  style: ["normal", "italic"]
});

const manrope = Manrope({ 
  subsets: ["latin"], 
  variable: "--font-manrope" 
});

export const metadata: Metadata = {
  title: "Vrindaa Crochet Marketplace",
  description: "Premium handcrafted crochet products — shop unique designs from talented artisans",
  openGraph: { title: "Vrindaa Crochet", description: "Premium crochet marketplace", type: "website" },
};

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
