"use client";

import { motion } from "framer-motion";
import Blob from "@/components/liquid/Blob";
import LiquidButton from "@/components/liquid/LiquidButton";
import Link from "next/link";
import { ShoppingBag, Zap, Globe, Heart } from "lucide-react";

const FEATURES = [
  { icon: ShoppingBag, title: "Low Commission", desc: "Keep more of what you earn with our transparent fee structure." },
  { icon: Zap, title: "Instant Payouts", desc: "Get paid automatically as soon as your customer receives their order." },
  { icon: Globe, title: "Global Reach", desc: "Ship your handmade magic to crochet lovers all around the world." },
  { icon: Heart, title: "Artisan First", desc: "Features designed by makers, for makers. We value your craft." },
];

export default function SellerPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F8FAFF]">
      {/* Dynamic Background */}
      <Blob className="w-[500px] h-[500px] -top-20 -right-20 opacity-40" gradient="linear-gradient(135deg, #FFC8A2, #FFDEE9)" />
      <Blob className="w-[400px] h-[400px] bottom-0 -left-20 opacity-30" gradient="linear-gradient(135deg, #CDB4FF, #7FD8FF)" />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-white text-xs font-bold text-[#7FD8FF] uppercase tracking-wider mb-6">
            For Artisans & Makers
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Turn Your Stitches <br />
            Into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7FD8FF] to-[#CDB4FF]">Thriving Store</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
            Vrindaa is the premier destination for handcrafted crochet. Join 500+ independent artists 
            sharing their passion with the world.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register">
              <LiquidButton className="px-8 py-4 text-lg">Start Selling Today</LiquidButton>
            </Link>
            <LiquidButton variant="peach" className="px-8 py-4 text-lg">View Seller Guide</LiquidButton>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="liquid-card p-8 group hover:scale-[1.02] transition-transform"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7FD8FF]/10 to-[#CDB4FF]/10 flex items-center justify-center mb-6 group-hover:from-[#7FD8FF]/20 group-hover:to-[#CDB4FF]/20 transition-colors">
                <feature.icon className="w-6 h-6 text-[#7FD8FF]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] p-12 md:p-20 text-center"
          style={{ background: "linear-gradient(135deg, #7FD8FF, #CDB4FF)" }}
        >
          {/* Subtle decoration inside CTA */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-20 -mb-20" />

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
            Ready to share your craft?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto relative z-10">
            Setup takes less than 5 minutes. No credit card required to get started.
          </p>
          <Link href="/register">
            <LiquidButton className="px-10 py-4 text-lg">
              Create Your Free Shop
            </LiquidButton>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
