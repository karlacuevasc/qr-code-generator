'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Eye, EyeOff, Download } from 'lucide-react';
import QRCode from 'react-qr-code';

// Placeholder icons for Google/Microsoft
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M21.35 11.1h-9.2v2.8h5.3c-.2 1.1-.7 2-1.6 2.7-.9.7-2.1 1.1-3.7 1.1-2.8 0-5.1-1.9-6-4.5H3.05c.9 3.1 3.7 5.4 7 5.4 2.4 0 4.4-.8 5.9-2.2l2.1 2.1c-1.8 1.7-4.3 2.8-7 2.8-4.6 0-8.4-3.1-9.7-7.4H.05v-2.9h2.1C2.2 7.8 3.3 5.7 5.2 4.2 6.7 3 8.8 2.4 11.1 2.4c3.3 0 6.1 1.7 7.9 4.3l-2.2 2.2c-.7-.6-1.6-1-2.7-1-1.7 0-3.2.7-4.3 1.9-.9.9-1.5 2.1-1.5 3.5s.6 2.6 1.5 3.5c1.1 1.2 2.6 1.9 4.3 1.9 1.1 0 2.1-.3 3-.8.8-.5 1.4-1.3 1.6-2.2h-4.6v-2.8h9.2c.1.5.2 1 .2 1.6 0 1.9-.6 3.6-1.7 5z"/></svg>
);
const MicrosoftIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 21 21"><path fill="#F25022" d="M1 1h9v9H1z"/><path fill="#00A4EF" d="M1 11h9v9H1z"/><path fill="#7FBA00" d="M11 1h9v9h-9z"/><path fill="#FFB900" d="M11 11h9v9h-9z"/></svg>
);

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrValue?: string;
}

export default function SignUpModal({ isOpen, onClose, qrValue }: SignUpModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const qrCodeContainerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const downloadQRCode = () => {
    if (!qrValue || !qrCodeContainerRef.current) return;
    
    try {
      setIsDownloading(true);
      
      // Get the container div
      const qrContainer = qrCodeContainerRef.current;
      
      // Find the SVG element inside the container
      const svgElement = qrContainer.querySelector('svg');
      
      if (!svgElement) {
        throw new Error('QR code SVG element not found');
      }
      
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('Could not get canvas context');
      }
      
      // Set canvas dimensions - making it larger for better quality
      canvas.width = 1000;
      canvas.height = 1000;
      
      // Draw white background
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Convert SVG to string
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      // Create image from SVG
      const img = new Image();
      img.onload = () => {
        // Draw the image centered on the canvas with padding
        const padding = 100;
        context.drawImage(
          img, 
          padding, 
          padding, 
          canvas.width - (padding * 2), 
          canvas.height - (padding * 2)
        );
        
        // Convert canvas to data URL and create download link
        const dataUrl = canvas.toDataURL('image/png');
        
        // Create download link
        const downloadLink = document.createElement('a');
        
        // Generate filename from URL or use default
        let filename = 'qrcode.png';
        try {
          const hostname = new URL(qrValue).hostname.replace('www.', '');
          filename = `qrcode_${hostname}.png`;
        } catch (e) {
          // If URL parsing fails, use default filename
          console.warn('Could not parse URL for filename, using default');
        }
        
        downloadLink.href = dataUrl;
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Clean up
        URL.revokeObjectURL(svgUrl);
        setIsDownloading(false);
        onClose(); // Close the modal after downloading
      };
      
      img.onerror = (error) => {
        console.error('Error loading SVG for conversion:', error);
        setIsDownloading(false);
        alert('Failed to download QR code. Please try again.');
      };
      
      img.src = svgUrl;
      
    } catch (error) {
      console.error('Error downloading QR code:', error);
      setIsDownloading(false);
      alert('Failed to download QR code. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* QR Code Display (Hidden visually but used for download) */}
          <div 
            className="sr-only" 
            ref={qrCodeContainerRef}
            aria-hidden="true"
          >
            {qrValue && (
              <QRCode
                value={qrValue}
                size={1000}
                level={"H"}
                bgColor="#FFFFFF"
                fgColor="#000000"
              />
            )}
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">QR Code Ready!</h2>
            <p className="text-gray-600">Your QR code has been generated for:</p>
            <p className="text-teal-600 font-medium truncate mt-1">{qrValue}</p>
          </div>

          {/* Direct Download Option */}
          <button 
            onClick={downloadQRCode}
            disabled={isDownloading}
            className="w-full flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-md transition-colors mb-6"
          >
            <Download className="w-5 h-5 mr-2" />
            {isDownloading ? 'Downloading...' : 'Download QR Code (PNG)'}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">or Sign Up to Access More Features</span>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input 
                type="email"
                id="email"
                placeholder="example@mail.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-black"
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Choose a password</label>
              <input 
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="min. 8 character"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-black pr-10"
                minLength={8}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-md transition-colors"
            >
              Create Account
            </button>
          </form>

          {/* Social Logins */}
          <div className="space-y-3 mt-4">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <GoogleIcon />
              Sign up with Google
            </button>
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <MicrosoftIcon />
              Sign up with Microsoft
            </button>
          </div>

          {/* Terms and Privacy */}
          <p className="mt-6 text-center text-xs text-gray-500">
            By clicking the buttons above, you agree to <a href="#" className="underline hover:text-gray-700">Terms</a> and <a href="#" className="underline hover:text-gray-700">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
} 