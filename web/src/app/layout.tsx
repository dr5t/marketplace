import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Inter, Playfair_Display, Outfit } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Vrindaa Crochet Marketplace",
  description: "Premium handcrafted crochet products — shop unique designs from talented artisans",
  openGraph: { title: "Vrindaa Crochet", description: "Premium crochet marketplace", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${outfit.variable}`}>
      <body style={{ background: "#F8FAFF" }}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
