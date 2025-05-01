import React from 'react';
import Image from 'next/image'; // Import the Next.js Image component

export default function AboutPage() {
  return (
    // Remove py-12 from the main container to allow the banner to be full width potentially
    <div className="container mx-auto px-4 text-gray-800">
      {/* Banner Section Removed */}
      
      {/* Moved Page Title Outside Container */}
      <h1 className="text-4xl font-semibold text-center mt-12 mb-8 text-black">
        About MyQR
      </h1>

      {/* Existing Content Section - Removed top padding */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6 pb-12">
        {/* Title Removed from here */}
        <p className="text-lg leading-relaxed">
          Hey there, welcome to MyQR – the quickest, easiest, and totally free way to make awesome QR codes for all your websites or page links!
        </p>
        <p className="text-lg leading-relaxed">
          Our mission? Simple: make QR code magic available to everyone. Whether you're a small biz owner trying to stand out, a content creator sharing your latest masterpiece, or just someone who loves turning your pages into scannable squares – we're here to help you do it with zero hassle.
        </p>
        <p className="text-lg leading-relaxed">
          We built MyQR to be fast, fun, and freakishly easy to use. No logins, no hidden fees, no tech headaches. Just clean, customizable QR codes that work like a charm. And we're just getting started. Expect more cool features, more ways to customize, and maybe even a few surprises along the way. We're all about keeping things simple, useful, and a little bit fun.
        </p>
        
        {/* The Creators Section - Modified for Image + Text Layout */}
        <div className="pt-4 mt-4 border-t border-gray-200">
          {/* Changed to grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image Column */}
            <div className="flex justify-center md:justify-start">
              <Image 
                src="/Marketing-Ad.jpg" // Added image
                alt="Raydevz Marketing Ad" 
                width={300} // Adjust width as needed
                height={200} // Adjust height as needed
                className="shadow-md object-cover" // Removed rounded-lg
              />
            </div>
            {/* Text Column */}
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">The Creators</h2>
              <p className="text-lg leading-relaxed">
                MyQR was proudly created by Raydevz, a company that specializes in designing and developing beautiful, functional mobile and web applications. At Raydevz, our focus is on helping businesses connect with their customers and achieve their goals through thoughtful, user-friendly digital solutions. 
              </p>
              {/* Added Button */}
              <div className="mt-4">
                <a 
                  href="https://raydevz.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#A530F2] text-white font-medium px-5 py-2.5 rounded-lg shadow hover:bg-[#482973] transition-colors text-sm"
                >
                  Visit Raydevz
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* End The Creators Section */}
      </div>
    </div>
  );
} 