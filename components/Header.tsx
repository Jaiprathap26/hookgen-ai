"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <span className="font-bold text-xl text-white">
            HookGen<span className="text-orange-400">.ai</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/#features"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Pricing
          </Link>
          <Link
            href="/generate"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Try Free →
          </Link>
        </nav>

        <button
          className="md:hidden text-gray-400"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800 px-4 py-4 flex flex-col gap-4">
          <Link href="/#features" className="text-gray-300 text-sm" onClick={() => setMenuOpen(false)}>
            Features
          </Link>
          <Link href="/pricing" className="text-gray-300 text-sm" onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>
          <Link
            href="/generate"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium text-center"
            onClick={() => setMenuOpen(false)}
          >
            Try Free →
          </Link>
        </div>
      )}
    </header>
  );
}
