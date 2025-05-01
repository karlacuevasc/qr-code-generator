'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NewHeader() {
  return (
    <header className="bg-white py-4 shadow-sm">
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

        {/* Header Actions */}
        <div className="flex items-center space-x-4">
          <Link 
            href="/what-is-qr-code"
            className="px-4 py-2 text-base font-medium text-black hover:text-gray-700"
          >
            What is a QR code?
          </Link>
          <Link 
            href="/about"
            className="px-4 py-2 text-base font-medium text-black hover:text-gray-700"
          >
            About
          </Link>
          <Link 
            href="/faq"
            className="px-4 py-2 text-base font-medium text-black hover:text-gray-700"
          >
            FAQ
          </Link>
        </div>
      </div>
    </header>
  );
} 