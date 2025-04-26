'use client';

import React from 'react';
import QRTypeCard from '@/components/features/QRTypeCard';
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

const qrTypes = [
  {
    title: 'Website',
    description: 'Create a QR code that opens any website or URL when scanned.',
    icon: <Globe size={36} />,
    href: '/website',
  },
  {
    title: 'PDF',
    description: 'Generate a QR code that links to a PDF document or file.',
    icon: <FileText size={36} />,
    href: '/pdf',
  },
  {
    title: 'List of Links',
    description: 'Create a QR code with multiple links in one place.',
    icon: <List size={36} />,
    href: '/list-of-links',
  },
  {
    title: 'vCard',
    description: 'Generate a QR code that adds contact information to phone.',
    icon: <User size={36} />,
    href: '/vcard',
  },
  {
    title: 'Business',
    description: 'Create a QR code for your business with contact details.',
    icon: <Briefcase size={36} />,
    href: '/business',
  },
  {
    title: 'Video',
    description: 'Generate a QR code that links directly to a video.',
    icon: <Video size={36} />,
    href: '/video',
  },
  {
    title: 'Images',
    description: 'Create a QR code that displays images when scanned.',
    icon: <Image size={36} />,
    href: '/images',
  },
  {
    title: 'Facebook',
    description: 'Generate a QR code that links to a Facebook profile or page.',
    icon: <Facebook size={36} />,
    href: '/facebook',
  },
  {
    title: 'Instagram',
    description: 'Create a QR code that links to an Instagram profile.',
    icon: <Instagram size={36} />,
    href: '/instagram',
  },
];

export default function QRTypeGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {qrTypes.map((qrType) => (
        <QRTypeCard
          key={qrType.title}
          title={qrType.title}
          description={qrType.description}
          icon={qrType.icon}
          href={qrType.href}
        />
      ))}
    </div>
  );
} 