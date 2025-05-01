'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// Removed Accordion Item Component

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
            {/* Static Content Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">What is a QR Code?</h3>
                <p className="text-gray-600">
                  A QR code (Quick Response code) is a type of two-dimensional barcode that can be read using a smartphone or QR code reader. It stores information like URLs, text, or contact details.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">What are the benefits of using QR Codes?</h3>
                <p className="text-gray-600">
                  QR codes offer a quick and easy way to share information digitally. They bridge the gap between the physical and digital worlds, useful for marketing, payments, information sharing, and more.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">How do I scan QR Codes?</h3>
                <p className="text-gray-600">
                  Most smartphones have a built-in camera app that can scan QR codes. Simply open your camera, point it at the QR code, and follow the on-screen prompt. You might need to download a dedicated QR scanner app if your phone doesn't have this feature built-in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 