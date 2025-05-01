'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function NewHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white py-4 shadow-sm relative">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo and Title */}
        <Link href="/" className="flex items-center space-x-3">
          <Image 
            src="/qr-heart-logo.svg"
            alt="QR Code Creator Logo" 
            width={64}
            height={64}
          />
          <div>
            <span className="text-xl font-bold text-black">MyQR</span>
          </div>
        </Link>

        {/* Desktop Header Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link 
            href="/what-is-qr-code"
            className="px-4 py-2 text-base font-medium text-black hover:text-[#A530F2]"
          >
            What is a QR code?
          </Link>
          <Link 
            href="/about"
            className="px-4 py-2 text-base font-medium text-black hover:text-[#A530F2]"
          >
            About
          </Link>
          <Link 
            href="/faq"
            className="px-4 py-2 text-base font-medium text-black hover:text-[#A530F2]"
          >
            FAQ
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-black hover:text-[#A530F2] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#A530F2]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/what-is-qr-code"
              className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-50 hover:text-[#A530F2]"
              onClick={toggleMobileMenu}
            >
              What is a QR code?
            </Link>
            <Link 
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-50 hover:text-[#A530F2]"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link 
              href="/faq"
              className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-50 hover:text-[#A530F2]"
              onClick={toggleMobileMenu}
            >
              FAQ
            </Link>
          </div>
        </div>
      )}
    </header>
  );
} 