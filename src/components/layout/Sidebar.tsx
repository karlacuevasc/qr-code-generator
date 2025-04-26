'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Globe, 
  FileText, 
  List, 
  User, 
  Briefcase, 
  Video, 
  Image, 
  Facebook, 
  Instagram 
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactElement;
}

const navItems: NavItem[] = [
  {
    title: 'Website',
    href: '/website',
    icon: <Globe className="w-5 h-5" />,
  },
  {
    title: 'PDF',
    href: '/pdf',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: 'List of Links',
    href: '/list-of-links',
    icon: <List className="w-5 h-5" />,
  },
  {
    title: 'vCard',
    href: '/vcard',
    icon: <User className="w-5 h-5" />,
  },
  {
    title: 'Business',
    href: '/business',
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    title: 'Video',
    href: '/video',
    icon: <Video className="w-5 h-5" />,
  },
  {
    title: 'Images',
    href: '/images',
    icon: <Image className="w-5 h-5" />,
  },
  {
    title: 'Facebook',
    href: '/facebook',
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    title: 'Instagram',
    href: '/instagram',
    icon: <Instagram className="w-5 h-5" />,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-[#222] shadow-sm min-h-screen">
      <nav className="py-6 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.title}>
              <Link 
                href={item.href}
                className="flex items-center px-4 py-3 text-[#666666] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <span className="text-[#4CAF50]">{item.icon}</span>
                <span className="ml-3">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 