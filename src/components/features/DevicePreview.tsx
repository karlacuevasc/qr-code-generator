'use client';

import React from 'react';
import Image from 'next/image';

interface DevicePreviewProps {
  qrImage?: string;
}

export default function DevicePreview({ qrImage = '/placeholder-qr.png' }: DevicePreviewProps) {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-4 text-center">Preview</h3>
      <div className="relative w-64 h-[500px] bg-white rounded-3xl shadow-lg border-4 border-gray-200 overflow-hidden">
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-10"></div>
        
        {/* Phone Screen */}
        <div className="w-full h-full pt-8 bg-gray-50 flex flex-col">
          {/* Mock Status Bar */}
          <div className="px-4 py-2 flex justify-between items-center">
            <div className="text-xs">9:41</div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 rounded-full bg-gray-300"></div>
              <div className="w-4 h-4 rounded-full bg-gray-300"></div>
            </div>
          </div>
          
          {/* Mock App Content */}
          <div className="flex-1 p-4 flex flex-col items-center">
            <div className="w-full h-10 bg-[#4CAF50] rounded-md mb-4"></div>
            <div className="w-3/4 h-4 bg-gray-200 rounded-md mb-2"></div>
            <div className="w-2/3 h-4 bg-gray-200 rounded-md mb-8"></div>
            
            {/* QR Code Preview */}
            <div className="w-full aspect-square max-w-[200px] bg-white p-4 rounded-md shadow-sm mx-auto flex items-center justify-center">
              {qrImage ? (
                <Image 
                  src={qrImage} 
                  alt="QR Code Preview"
                  width={160}
                  height={160}
                  className="w-full h-auto"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">QR Code</span>
                </div>
              )}
            </div>
            
            <div className="mt-8 w-full">
              <div className="w-full h-10 bg-gray-200 rounded-md mb-3"></div>
              <div className="w-full h-10 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 