'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NewHeader() {
  return (
    <header className="bg-[#1A1B26] py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo and Title */}
        <Link href="/" className="flex items-center space-x-3">
          <Image 
            src="/qr-heart-logo.svg"
            alt="QR Code Creator Logo" 
            width={64}
            height={64}
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">MyQR</span>
          </div>
        </Link>

        {/* Header Actions - About Us link removed */}
        <div className="flex items-center space-x-4">
          {/* <Link 
            href="https://github.com/your-username/qr-code-generator" 
            target="_blank"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            About Us
          </Link> */}
        </div>
      </div>
    </header>
  );
} 