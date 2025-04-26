'use client';

import React from 'react';
import Link from 'next/link';

interface QRTypeCardProps {
  title: string;
  description: string;
  icon: React.ReactElement;
  href: string;
}

export default function QRTypeCard({ title, description, icon, href }: QRTypeCardProps) {
  return (
    <Link href={href} className="block">
      <div className="card hover:border-[#4CAF50] hover:border transition-all duration-300 h-full">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 flex items-center justify-center text-[#4CAF50] mb-4">
            {icon}
          </div>
          <h3 className="text-lg font-semibold mb-2 text-[#333333] dark:text-white">{title}</h3>
          <p className="text-sm text-[#666666] dark:text-gray-400 line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  );
} 