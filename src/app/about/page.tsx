import React from 'react';
import Image from 'next/image'; // Import the Next.js Image component

export default function AboutPage() {
  return (
    // Remove py-12 from the main container to allow the banner to be full width potentially
    <div className="container mx-auto px-4 text-gray-800">
      {/* Banner Section */}
      <div className="relative h-64 md:h-80 w-full mb-12 overflow-hidden rounded-lg">
        <Image
          src="/qr-code-table.jpg"
          alt="QR Code on Table Banner"
          layout="fill"
          objectFit="cover" // Cover ensures the image covers the div, might crop
          quality={85}
          priority // Load this image first
        />
        {/* Re-added dark overlay - Reduced opacity */}
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          {/* Changed text back to white and added drop shadow */}
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center filter drop-shadow-md">
            About MyQR
          </h1>
        </div>
      </div>
      
      {/* Existing Content Section - Added py-12 back here */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6 py-12">
        <p className="text-lg leading-relaxed">
          Hey there, welcome to MyQR – the quickest, easiest, and totally free way to make awesome QR codes for all your websites or page links!
        </p>
        <p className="text-lg leading-relaxed">
          Our mission? Simple: make QR code magic available to everyone. Whether you're a small biz owner trying to stand out, a content creator sharing your latest masterpiece, or just someone who loves turning your pages into scannable squares – we're here to help you do it with zero hassle.
        </p>
        <p className="text-lg leading-relaxed">
          We built MyQR to be fast, fun, and freakishly easy to use. No logins, no hidden fees, no tech headaches. Just clean, customizable QR codes that work like a charm. And we're just getting started. Expect more cool features, more ways to customize, and maybe even a few surprises along the way. We're all about keeping things simple, useful, and a little bit fun.
        </p>
        <p className="text-lg leading-relaxed">
          MyQR was proudly created by Raydevz, a company that specializes in designing and developing beautiful, functional mobile and web applications. At Raydevz, our focus is on helping businesses connect with their customers and achieve their goals through thoughtful, user-friendly digital solutions. Learn more about us at <a href="https://raydevz.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">raydevz.com</a>.
        </p>
        <p className="text-lg leading-relaxed font-medium text-center">
          Now go make something awesome!
        </p>
      </div>
    </div>
  );
} 