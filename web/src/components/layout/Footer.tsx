"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full mt-20 rounded-t-[3rem] bg-stone-50 border-t border-stone-200/30">
      <div className="max-w-7xl mx-auto px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-xl font-serif text-emerald-900 mb-6" style={{ fontFamily: "var(--font-noto-serif)" }}>Vrindaa Crochet</h2>
          <p className="font-body text-sm text-stone-600 leading-relaxed">Honoring the heritage of handmade craft through modern silhouettes and sustainable fibers.</p>
        </div>
        <div>
          <h4 className="font-serif italic text-emerald-800 mb-6" style={{ fontFamily: "var(--font-noto-serif)" }}>Shop</h4>
          <ul className="space-y-4 font-body text-sm text-stone-600">
            <li><Link className="hover:text-emerald-700 hover:translate-x-1 transition-all block" href="/category/bags">Bags</Link></li>
            <li><Link className="hover:text-emerald-700 hover:translate-x-1 transition-all block" href="/category/toys">Toys</Link></li>
            <li><Link className="hover:text-emerald-700 hover:translate-x-1 transition-all block" href="/category/clothing">Clothing</Link></li>
            <li><Link className="hover:text-emerald-700 hover:translate-x-1 transition-all block" href="/category/decor">Decor</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif italic text-emerald-800 mb-6" style={{ fontFamily: "var(--font-noto-serif)" }}>Support</h4>
          <ul className="space-y-4 font-body text-sm text-stone-600">
            <li><Link className="hover:text-emerald-700 hover:translate-x-1 transition-all block" href="/shipping">Shipping</Link></li>
            <li><Link className="hover:text-emerald-700 hover:translate-x-1 transition-all block" href="/returns">Returns</Link></li>
            <li><Link className="hover:text-emerald-700 hover:translate-x-1 transition-all block" href="/contact">Contact</Link></li>
            <li><Link className="hover:text-emerald-700 hover:translate-x-1 transition-all block" href="/care-guide">Care Guide</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif italic text-emerald-800 mb-6" style={{ fontFamily: "var(--font-noto-serif)" }}>Join Us</h4>
          <p className="font-body text-sm text-stone-600 mb-4">Be the first to hear about new limited releases.</p>
          <div className="flex gap-2">
            <input className="bg-white border border-stone-200 rounded-full px-4 py-2 text-sm flex-1 focus:ring-1 focus:ring-emerald-500/20 outline-none" placeholder="Email" type="email"/>
            <button className="bg-emerald-800 text-white rounded-full px-5 py-2 text-sm font-bold hover:bg-emerald-900 transition-colors">Join</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-12 py-8 border-t border-stone-200/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body text-xs text-stone-500">© 2026 Vrindaa Crochet. Woven with love.</p>
        <div className="flex gap-6">
          <button className="text-stone-400 hover:text-emerald-600 transition-colors"><span className="material-symbols-outlined">language</span></button>
          <button className="text-stone-400 hover:text-emerald-600 transition-colors"><span className="material-symbols-outlined">share</span></button>
        </div>
      </div>
    </footer>
  );
}
