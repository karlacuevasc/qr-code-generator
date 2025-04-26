'use client';

import React, { useState, KeyboardEvent } from 'react';
import { Download } from 'lucide-react';
import QRCode from "react-qr-code";
import SignUpModal from '@/components/features/SignUpModal';
import AdSenseAd from '@/components/ads/AdSenseAd';

// Step 1 Content Component
interface Step1ContentProps {
  urlValue: string;
  setUrlValue: (value: string) => void;
  handleEnterPress: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const Step1Content: React.FC<Step1ContentProps> = ({ urlValue, setUrlValue, handleEnterPress }) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const prefix = 'https://';

    if (urlValue === '' && newValue !== '') {
      // User typed the first character into an empty field
      // Automatically prepend the prefix
      setUrlValue(prefix + newValue);
      
      // Attempt to set cursor position after prefix (may have inconsistent browser behavior)
      requestAnimationFrame(() => {
         e.target.selectionStart = e.target.selectionEnd = (prefix + newValue).length;
      });

    } else if (newValue.startsWith(prefix)) {
      // User is typing normally after the prefix
      setUrlValue(newValue);
    } else if (newValue === '') {
      // User deleted everything, allow going back to empty to show placeholder
      setUrlValue('');
    } else {
      // User tried to delete the prefix or pasted invalid content
      // Force the prefix back if they are deleting parts of it
      if (prefix.startsWith(newValue)) {
        setUrlValue(prefix);
      } else {
        // Or prepend if they pasted something without the prefix
        setUrlValue(prefix + newValue);
      }
    }
  };

  return (
    <div>
      <label htmlFor="website-url" className="block text-lg font-semibold text-gray-800 mb-4">
        <span className="inline-block w-6 h-6 bg-[#A530F2] text-white rounded-full text-center leading-6 mr-2 text-sm">1</span>
        Enter your website or page link
      </label>
      <input 
        type="url" 
        id="website-url"
        value={urlValue}
        onChange={handleChange} 
        onKeyDown={handleEnterPress}
        placeholder="https://www.yourwebsite.com"
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-black placeholder:text-gray-400 dark:placeholder:text-gray-500"
      />
    </div>
  );
};

// Step 3 Download Component
interface Step3DownloadProps {
  qrValue: string;
  onDownloadClick: () => void;
}

const Step3Download: React.FC<Step3DownloadProps> = ({ qrValue, onDownloadClick }) => (
  <div className="flex flex-col items-center">
    <div className="w-48 h-48 p-2 border border-gray-300 mb-4 flex items-center justify-center bg-white shadow-sm rounded-md overflow-hidden">
      {qrValue ? (
        <QRCode
          value={qrValue}
          size={170}
          level={"H"}
          bgColor="#FFFFFF"
          fgColor="#000000"
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400 text-center text-sm px-4">
          Enter a URL and press Enter to generate QR code
        </div>
      )}
    </div>
    <button 
      onClick={onDownloadClick}
      className={`bg-[#A530F2] text-white font-medium px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors w-full justify-center ${
        !qrValue ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-700'
      }`}
      disabled={!qrValue}
    >
      <Download className="w-5 h-5" />
      <span>Download QR</span>
    </button>
  </div>
);

// Main Page Component
export default function HomePage() {
  const [inputValue, setInputValue] = useState('');
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      let urlToEncode = inputValue.trim();

      if (!urlToEncode) {
        alert('Please enter a URL.');
        return;
      }

      if (!urlToEncode.startsWith('http://') && !urlToEncode.startsWith('https://')) {
        if (urlToEncode.includes('.') && !urlToEncode.includes(' ')) {
          urlToEncode = 'https://' + urlToEncode;
        } else {
          alert('Please enter a valid URL (e.g., example.com or https://example.com)');
          return;
        }
      }

      if (urlToEncode.startsWith('http://') || urlToEncode.startsWith('https://')) {
        if (urlToEncode.length > 8 || urlToEncode.length > 7) {
          setQrCodeValue(urlToEncode);
        } else {
          alert('Please enter a complete URL.');
        }
      } else {
        alert('Please enter a valid URL starting with http:// or https://');
      }
    }
  };

  const handleDownloadClick = () => {
    if (qrCodeValue) {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold text-white text-center mb-8">
        Generate your free QR Code in 2 easy steps.
      </h1>

      {/* Horizontal ad below the title */}
      <div className="mb-8">
        <AdSenseAd 
          adSlot="1234567890" 
          adFormat="horizontal" 
          style={{ height: '90px' }}
          className="mx-auto max-w-4xl"
        />
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Steps 1 & 2) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Step 1: Content Input */}
          <section>
            <Step1Content 
              urlValue={inputValue}
              setUrlValue={setInputValue}
              handleEnterPress={handleEnterPress}
            />
          </section>

          {/* Ad after content input */}
          <section>
            <AdSenseAd 
              adSlot="2345678901" 
              adFormat="rectangle"
              style={{ height: '250px' }}
            />
          </section>
        </div>

        {/* Right Column (Step 3: Download) */}
        <aside>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            <span className="inline-block w-6 h-6 bg-[#A530F2] text-white rounded-full text-center leading-6 mr-2 text-sm">2</span>
            Download your QR Code
          </h2>
          <Step3Download 
            qrValue={qrCodeValue} 
            onDownloadClick={handleDownloadClick}
          /> 
        </aside>
      </div>

      {/* Bottom ad */}
      <div className="mt-8">
        <AdSenseAd 
          adSlot="3456789012" 
          adFormat="auto" 
          style={{ minHeight: '280px' }}
          className="mx-auto max-w-4xl"
        />
      </div>

      <SignUpModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        qrValue={qrCodeValue}
      />
    </div>
  );
}
