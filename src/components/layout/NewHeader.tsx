'use client';

import React from 'react';
import Link from 'next/link';
import { QrCode } from 'lucide-react';

export default function NewHeader() {
  return (
    <header className="bg-white py-4 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo and Title */}
        <Link href="/" className="flex items-center space-x-3">
          <QrCode className="w-8 h-8 text-teal-600 dark:text-teal-400" />
          <div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">QR CODE CREATOR</span>
            <p className="text-xs text-gray-500 dark:text-gray-400 tracking-wide">GENERATE QR CODES FOR FREE</p>
          </div>
        </Link>

        {/* Header Actions */}
        <div className="flex items-center space-x-4">
          <Link 
            href="https://github.com/your-username/qr-code-generator" 
            target="_blank"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Github
          </Link>
        </div>
      </div>
    </header>
  );
} 