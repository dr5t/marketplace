'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', icon: 'home', href: '/' },
    { label: 'Shop', icon: 'storefront', href: '/shop' },
    { label: 'Wishlist', icon: 'favorite', href: '/wishlist' },
    { label: 'Cart', icon: 'shopping_bag', href: '/cart' },
    { label: 'Profile', icon: 'person', href: '/profile' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-autumn-200/30 px-6 py-3 pb-8">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.label} href={item.href} className="relative flex flex-col items-center gap-1 group">
              <span className={`material-symbols-outlined text-[24px] ${isActive ? 'text-primary' : 'text-autumn-400'} transition-colors duration-300`}>
                {item.icon}
              </span>
              <span className={`text-[10px] font-medium tracking-tight uppercase ${isActive ? 'text-primary' : 'text-autumn-400'} transition-colors duration-300`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -top-3 w-1 h-1 bg-primary rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
