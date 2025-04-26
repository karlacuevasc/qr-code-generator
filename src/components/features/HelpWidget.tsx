'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface HelpWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpWidget({ isOpen, onClose }: HelpWidgetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#333333] dark:text-white">Help & FAQs</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-[#4CAF50] mb-1">What is a QR Code?</h3>
            <p className="text-sm text-[#666666] dark:text-gray-300">
              QR (Quick Response) codes are two-dimensional barcodes that can be scanned by smartphone cameras to quickly access websites, contact information, and more.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-[#4CAF50] mb-1">How do I create a QR code?</h3>
            <p className="text-sm text-[#666666] dark:text-gray-300">
              Simply select a QR code type from the grid, add your content, customize the design if needed, and download your QR code image.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-[#4CAF50] mb-1">What QR code types are available?</h3>
            <p className="text-sm text-[#666666] dark:text-gray-300">
              We offer QR codes for websites, PDFs, lists of links, vCards, business information, videos, images, and social media profiles.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-[#4CAF50] mb-1">Is this service free?</h3>
            <p className="text-sm text-[#666666] dark:text-gray-300">
              Yes, our basic QR code generation service is completely free to use. Premium features may be available as part of a paid subscription.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-[#4CAF50] mb-1">How do I scan a QR code?</h3>
            <p className="text-sm text-[#666666] dark:text-gray-300">
              Most modern smartphones can scan QR codes directly through the camera app. Simply open your camera, point it at the QR code, and tap the notification that appears.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 