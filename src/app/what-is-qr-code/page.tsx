'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// Copied Accordion Item Component from homepage
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left text-gray-800 hover:text-[#A530F2] focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-3 text-gray-600">
          {children}
        </div>
      )}
    </div>
  );
};

// Main Page Component
export default function WhatIsQrCodePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Using the structure from the old homepage section */}
      <section className="p-8 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-semibold text-gray-900 text-center mb-8">
            Are you new to QR codes? Here's what you need to know
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image Column */}
            <div className="flex justify-center">
              <Image 
                src="/scanning-qr-code.jpg" 
                alt="Illustration of scanning a QR code"
                width={300} 
                height={300}
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
            {/* Accordion Column */}
            <div>
              <AccordionItem title="What is a QR Code?">
                A QR code (Quick Response code) is a type of two-dimensional barcode that can be read using a smartphone or QR code reader. It stores information like URLs, text, or contact details.
              </AccordionItem>
              <AccordionItem title="What are the benefits of using QR Codes?">
                QR codes offer a quick and easy way to share information digitally. They bridge the gap between the physical and digital worlds, useful for marketing, payments, information sharing, and more.
              </AccordionItem>
              <AccordionItem title="How do I scan QR Codes?">
                Most smartphones have a built-in camera app that can scan QR codes. Simply open your camera, point it at the QR code, and follow the on-screen prompt. You might need to download a dedicated QR scanner app if your phone doesn't have this feature built-in.
              </AccordionItem>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 