'use client';

import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Download, ArrowRight, Link as LinkIcon } from 'lucide-react';
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
    const httpPrefix = 'http://';
    
    // First check if the value already has a valid URL prefix
    if (newValue.startsWith(prefix) || newValue.startsWith(httpPrefix)) {
      // URL already has a valid prefix, use it as is
      setUrlValue(newValue);
      return;
    }
    
    // Check if this is a duplicate prefix situation (e.g., https://https://example.com)
    if (newValue.includes(prefix + prefix)) {
      // Remove the duplicate prefix
      setUrlValue(newValue.replace(prefix + prefix, prefix));
      return;
    }
    
    if (newValue.includes(httpPrefix + httpPrefix)) {
      // Remove the duplicate http:// prefix
      setUrlValue(newValue.replace(httpPrefix + httpPrefix, httpPrefix));
      return;
    }
    
    // No prefixes or duplicates found, proceed with original logic
    if (urlValue === '' && newValue !== '') {
      // User typed the first character into an empty field
      // Automatically prepend the prefix
      setUrlValue(prefix + newValue);
      
      // Attempt to set cursor position after prefix (may have inconsistent browser behavior)
      requestAnimationFrame(() => {
         e.target.selectionStart = e.target.selectionEnd = (prefix + newValue).length;
      });
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

  // Add function to handle button click
  const handleGenerateClick = () => {
    // Create an Enter key press event
    const enterEvent = {
      key: 'Enter',
      preventDefault: () => {},
    } as KeyboardEvent<HTMLInputElement>;
    
    handleEnterPress(enterEvent);
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
        placeholder="https://"
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-black placeholder:text-gray-400 dark:placeholder:text-gray-500 mb-4"
      />
      {/* Generate Button - Left aligned */}
      <div className="flex justify-start">
        <button 
          onClick={handleGenerateClick}
          className={`bg-[#A530F2] text-white font-medium px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors justify-center hover:bg-[#482973]`}
        >
          <ArrowRight className="w-5 h-5" />
          <span>Generate</span>
        </button>
      </div>
    </div>
  );
};

// Step 3 Download Component
interface Step3DownloadProps {
  qrValue: string;
  qrColor: string;
}

const Step3Download: React.FC<Step3DownloadProps> = ({ qrValue, qrColor }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const qrCodeContainerRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    if (!qrValue || !qrCodeContainerRef.current) return;
    
    try {
      setIsDownloading(true);
      
      const qrContainer = qrCodeContainerRef.current;
      const svgElement = qrContainer.querySelector('svg');
      
      if (!svgElement) {
        throw new Error('QR code SVG element not found');
      }
      
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('Could not get canvas context');
      }
      
      canvas.width = 1000;
      canvas.height = 1000;
      
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      const imageElement = new window.Image();
      imageElement.onload = () => {
        const padding = 100;
        context.drawImage(
          imageElement,
          padding, 
          padding, 
          canvas.width - (padding * 2), 
          canvas.height - (padding * 2)
        );
        
        const dataUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        
        let filename = 'qrcode.png';
        try {
          const hostname = new URL(qrValue).hostname.replace('www.', '');
          filename = `qrcode_${hostname}.png`;
        } catch (error: any) {
          console.warn('Could not parse URL for filename, using default');
        }
        
        downloadLink.href = dataUrl;
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        URL.revokeObjectURL(svgUrl);
        setIsDownloading(false);
      };
      
      imageElement.onerror = (error: string | Event) => {
        console.error('Error loading SVG for conversion:', error);
        setIsDownloading(false);
        alert('Failed to download QR code. Please try again.');
      };
      
      imageElement.src = svgUrl;
      
    } catch (error: any) {
      console.error('Error downloading QR code:', error);
      setIsDownloading(false);
      alert('Failed to download QR code. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-start lg:items-center w-full">
      <div className="w-48 h-48 p-2 border border-gray-300 mb-4 flex items-center justify-center bg-white shadow-sm rounded-md overflow-hidden">
        {qrValue ? (
          <QRCode
            value={qrValue}
            size={170}
            level={"H"}
            bgColor="#FFFFFF"
            fgColor={qrColor}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400 text-center text-sm px-4">
            Enter a URL and press Enter to generate QR code
          </div>
        )}
      </div>
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
            fgColor={qrColor}
          />
        )}
      </div>
      {/* Download Button - Smaller version */}
      <div className="flex justify-start lg:justify-center w-full">
        <button 
          onClick={downloadQRCode}
          disabled={isDownloading || !qrValue}
          className={`bg-[#A530F2] text-white font-medium px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors justify-center ${
            !qrValue ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#482973]'
          } ${
            isDownloading ? 'opacity-50 cursor-wait' : ''
          }`}
        >
          <Download className="w-5 h-5" />
          <span>{isDownloading ? 'Downloading...' : 'Download QR'}</span>
        </button>
      </div>
    </div>
  );
};

// Simple Accordion Item Component
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
export default function HomePage() {
  const [inputValue, setInputValue] = useState('');
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [qrColor, setQrColor] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState('Color'); // State for active design tab
  const [logoPreview, setLogoPreview] = useState<string | null>(null); // State for logo preview URL
  const step2Ref = useRef<HTMLElement>(null);
  const hiddenQrCodeRef = useRef<HTMLDivElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null); // Ref for the preview canvas
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Effect to automatically generate QR code after input changes (debounced)
  useEffect(() => {
    // Clear any existing timer
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set a new timer
    debounceTimeoutRef.current = setTimeout(() => {
      let urlToEncode = inputValue.trim();
      const httpsPrefix = 'https://';
      const httpPrefix = 'http://';
      
      // Basic check: If input is effectively empty or just the prefix, clear QR
      if (!urlToEncode || urlToEncode === httpsPrefix || urlToEncode === httpPrefix) {
        setQrCodeValue('');
        return;
      }

      // --- Start: Validation and Prefix Logic (Moved from handleEnterPress) --- 
      // Fix any duplicate prefixes - Should ideally be handled by onChange, but double-check here
      if (urlToEncode.startsWith(httpsPrefix + httpsPrefix)) {
        urlToEncode = urlToEncode.replace(httpsPrefix + httpsPrefix, httpsPrefix);
      } else if (urlToEncode.startsWith(httpPrefix + httpPrefix)) {
        urlToEncode = urlToEncode.replace(httpPrefix + httpPrefix, httpPrefix);
      }

      // Add prefix if missing and looks like a potential domain/path
      if (!urlToEncode.startsWith(httpPrefix) && !urlToEncode.startsWith(httpsPrefix)) {
        if (urlToEncode.includes('.') && !urlToEncode.includes(' ')) {
          urlToEncode = httpsPrefix + urlToEncode;
        } else {
          // If it doesn't look like a URL, don't generate
           console.warn("Input doesn't look like a valid URL to auto-prefix.");
           setQrCodeValue(''); // Clear previous QR if input becomes invalid
          return; 
        }
      }
      // --- End: Validation and Prefix Logic --- 

      // Final check for validity and length before setting QR value
      if (urlToEncode.startsWith(httpPrefix) || urlToEncode.startsWith(httpsPrefix)) {
         // Check if it's more than just 'http://' or 'https://'
         if (urlToEncode.length > 7 && urlToEncode.startsWith(httpPrefix)) {
            setQrCodeValue(urlToEncode);
         } else if (urlToEncode.length > 8 && urlToEncode.startsWith(httpsPrefix)) {
            setQrCodeValue(urlToEncode);
         } else {
            console.warn("URL seems incomplete.");
            setQrCodeValue(''); // Clear QR for incomplete prefix-only input
         }
      } else {
        // Should ideally not happen due to prefix logic above, but as a fallback
        console.error("Invalid URL format after processing.");
        setQrCodeValue('');
      }
    }, 500); // 500ms debounce delay

    // Cleanup function to clear timer if component unmounts or inputValue changes again
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [inputValue]); // Rerun effect only when inputValue changes

  // Effect to draw QR code (and logo) onto the preview canvas
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    const hiddenSvgParent = hiddenQrCodeRef.current;

    if (!canvas || !hiddenSvgParent) {
      console.log("Canvas or hidden SVG parent not ready for preview drawing.");
      return; // Canvas or hidden container not ready
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
       console.error("Could not get preview canvas context");
      return; // Context not available
    }

    // Clear canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!qrCodeValue) {
      console.log("No QR value, clearing preview canvas.");
      // Optionally draw a placeholder if needed, but clearing is often enough
      // ctx.fillStyle = '#f0f0f0';
      // ctx.fillRect(0, 0, canvas.width, canvas.height);
      return; // No QR code value, leave canvas clear
    }

    // Find the SVG element within the hidden container
    const svgElement = hiddenSvgParent.querySelector('svg');
    if (!svgElement) {
       console.warn("Hidden SVG element not found for preview drawing. Might be generating.");
      // It might take a moment for the hidden SVG to render after qrCodeValue changes
      // We might need a slight delay or check again, but for now, just return.
      return; 
    }

    console.log("Attempting to draw preview canvas...");

    // Use the same drawing logic as download, but scaled for preview
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgUrl = URL.createObjectURL(new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' }));

    const qrImage = new window.Image();
    qrImage.onload = () => {
      console.log("Preview: QR Image loaded");
      // Fill background (important for transparency)
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw QR code (no padding needed for direct canvas draw)
      ctx.drawImage(qrImage, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(svgUrl);
      console.log("Preview: QR Image drawn");

      // Draw logo if present
      if (logoPreview) {
        console.log("Preview: Logo exists, attempting to draw logo");
        const logoImage = new window.Image();
        logoImage.onload = () => {
          console.log("Preview: Logo Image loaded");
          const logoTargetSize = canvas.width * 0.25; // Scale logo to preview canvas
          const logoX = (canvas.width - logoTargetSize) / 2;
          const logoY = (canvas.height - logoTargetSize) / 2;
          const bgPadding = canvas.width * 0.02; // Smaller padding for preview

          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(
            logoX - bgPadding,
            logoY - bgPadding,
            logoTargetSize + (bgPadding * 2),
            logoTargetSize + (bgPadding * 2)
          );
          ctx.drawImage(logoImage, logoX, logoY, logoTargetSize, logoTargetSize);
           console.log("Preview: Logo Image drawn");
        };
        logoImage.onerror = () => {
          console.error('Preview: Error loading logo image.');
          // Don't draw logo if it fails, QR is already drawn
        };
        logoImage.src = logoPreview;
      }
    };
    qrImage.onerror = () => {
      console.error('Preview: Error loading QR SVG image.');
      URL.revokeObjectURL(svgUrl);
    };
    qrImage.src = svgUrl;

  }, [qrCodeValue, qrColor, logoPreview]); // Rerun when QR value, color, or logo changes

  // Adapted downloadQRCode function
  const downloadQRCode = () => {
    console.log('Download started. Logo Preview:', logoPreview);
    // Ensure we have necessary data and the hidden QR code container
    if (!qrCodeValue || !hiddenQrCodeRef.current) {
      console.log('Download aborted: No QR value or hidden ref.');
      return;
    }
    
    const qrContainer = hiddenQrCodeRef.current;
    // Find the high-resolution SVG element within the hidden container
    const svgElement = qrContainer.querySelector('svg');

    if (!svgElement) {
      console.error('Hidden QR code SVG element not found for download.');
      alert('Could not prepare QR code for download. Please try again.');
      return;
    }
    
    try {
      setIsDownloading(true);
      console.log('Set isDownloading to true');
      
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('Could not get canvas context');
      }
      
      const canvasSize = 1000; // Size of the canvas for high resolution
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      
      // Fill background with white
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 0, canvasSize, canvasSize);
      console.log('Canvas created and background filled');
      
      // Serialize the SVG and create an object URL
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      // Create an image element to load the QR code SVG
      const qrImage = new window.Image();
      qrImage.onload = () => {
        console.log('QR Image loaded (onload triggered)');
        // Draw the QR code SVG onto the canvas
        const padding = 100; // Padding around QR code
        context.drawImage(
          qrImage,
          padding, 
          padding, 
          canvasSize - (padding * 2), 
          canvasSize - (padding * 2)
        );
        URL.revokeObjectURL(svgUrl); // Clean up SVG URL once drawn
        console.log('QR Image drawn onto canvas');

        // --- Start: Logo Drawing Logic --- 
        if (logoPreview) {
          console.log('Logo preview exists, attempting to load logo image.');
          const logoImage = new window.Image();
          logoImage.onload = () => {
            console.log('Logo image loaded (onload triggered)');
            // Calculate logo size and position (e.g., 25% of canvas width, centered)
            const logoTargetSize = canvasSize * 0.25;
            const logoX = (canvasSize - logoTargetSize) / 2;
            const logoY = (canvasSize - logoTargetSize) / 2;

            // Draw a white background behind the logo for better scannability
            const bgPadding = 10; // Padding around logo background
            context.fillStyle = '#FFFFFF';
            context.fillRect(
              logoX - bgPadding,
              logoY - bgPadding,
              logoTargetSize + (bgPadding * 2),
              logoTargetSize + (bgPadding * 2)
            );
            console.log('Logo background drawn');

            // Draw the logo
            context.drawImage(logoImage, logoX, logoY, logoTargetSize, logoTargetSize);
            console.log('Logo image drawn onto canvas');

            // FINISH download process AFTER logo is drawn
            try {
                triggerDownload(canvas, inputValue);
                console.log('Triggered download (with logo)');
            } catch (e) {
                 console.error("Error during triggerDownload (with logo):", e);
            } finally {
                setIsDownloading(false);
                console.log('Set isDownloading to false (after logo success/error in trigger)');
            }
          };
          logoImage.onerror = () => {
             console.error('Error loading logo image for download.');
             alert('Error loading logo. Proceeding with logo-less QR code download.');
             // Finish download without logo if logo fails to load
             try {
                 triggerDownload(canvas, inputValue);
                 console.log('Triggered download (logo load failed)');
             } catch (e) {
                  console.error("Error during triggerDownload (after logo error):", e);
             } finally {
                 setIsDownloading(false);
                 console.log('Set isDownloading to false (after logo load error)');
             }
          };
          logoImage.src = logoPreview; // Load the logo preview data URL
          console.log('Set logo image src:', logoPreview);
        } else {
          console.log('No logo preview, triggering download without logo.');
          // If no logo, FINISH download process immediately
          try {
              triggerDownload(canvas, inputValue);
              console.log('Triggered download (no logo)');
          } catch (e) {
               console.error("Error during triggerDownload (no logo):", e);
          } finally {
              setIsDownloading(false);
              console.log('Set isDownloading to false (no logo)');
          }
        }
        // --- End: Logo Drawing Logic --- 

      };
      qrImage.onerror = () => {
        console.error('Error loading QR code SVG for canvas drawing.');
        setIsDownloading(false); // Set false here on QR load error
        console.log('Set isDownloading to false (QR load error)');
        alert('Failed to prepare QR code image for download. Please try again.');
        URL.revokeObjectURL(svgUrl); // Clean up URL on error
      };
      
      // Load the QR code SVG data into the image element
      qrImage.src = svgUrl;
      console.log('Set QR image src:', svgUrl);
      
    } catch (error: any) {
      console.error('Error generating QR code for download (outer try/catch):', error);
      setIsDownloading(false);
      console.log('Set isDownloading to false (outer catch)');
      alert('Failed to download QR code. Please try again.');
    }
  };

  // Helper function to trigger the download from canvas
  const triggerDownload = (canvas: HTMLCanvasElement, urlValue: string) => {
    const dataUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    
    let filename = 'qrcode.png';
    try {
      const hostname = new URL(urlValue).hostname.replace('www.', ''); 
      filename = `qrcode_${hostname}_with_logo.png`; // Update filename if logo might be present
    } catch (error: any) { 
      console.warn('Could not parse input URL for filename, using default');
    }
    
    downloadLink.href = dataUrl;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold text-black text-center mt-12 mb-2">
        Generate your free QR Code in 2 easy steps.
      </h1>
      <p className="text-lg italic text-black text-center mb-12 font-light">
        it will always be 100% free
      </p>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Left Column (Input Area) */} 
        <div className="lg:col-span-2 p-8 border-r border-gray-200 space-y-8">
          {/* Type Selector Tab */}
          <div className="mb-6">
            <button 
              className="flex items-center space-x-2 px-4 py-2 border border-teal-500 bg-teal-50 text-teal-700 rounded-md font-medium text-sm"
            >
              <LinkIcon className="w-4 h-4" /> 
              <span>Link</span>
            </button>
             {/* Placeholder for other tabs if needed in the future */}
          </div>

          {/* Step 1: Content Input */}
          <section>
             <div>
              <label htmlFor="website-url" className="block text-sm font-semibold text-gray-800 mb-2">
                <span className="inline-block w-5 h-5 bg-gray-700 text-white rounded-full text-center leading-5 mr-2 text-xs">1</span>
                Complete the content
              </label>
              <p className="text-sm text-gray-600 mb-3">Enter your Website</p>
              <input 
                type="url" 
                id="website-url"
                value={inputValue} 
                onChange={(e) => {
                  const newValue = e.target.value;
                  const prefix = 'https://';
                  const httpPrefix = 'http://';

                  // If user starts typing in an empty field, prepend https://
                  if (inputValue === '' && newValue !== '') {
                     // Ensure we don't add prefix if pasted value already has one
                     if (!newValue.startsWith(prefix) && !newValue.startsWith(httpPrefix)) {
                       setInputValue(prefix + newValue);
                     } else {
                       setInputValue(newValue); // Use pasted value as is if it has a prefix
                     }
                  } 
                  // Prevent deleting the prefix if there's content after it
                  else if (newValue.length < prefix.length && inputValue.startsWith(prefix)) {
                    // If user tries to delete the prefix, reset to just prefix
                    setInputValue(prefix); 
                  } 
                   // Allow deleting everything to show placeholder
                  else if (newValue === '') {
                    setInputValue('');
                  } 
                  // Handle normal typing or pasting
                  else {
                     setInputValue(newValue);
                  }
                }} 
                placeholder="https://"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-black placeholder:text-gray-400 mb-1"
              />
              {/* Add error message display here based on validation state */}
              {/* Example: {urlError && <p className="text-red-500 text-xs mt-1">{urlError}</p>} */} 
             </div>
          </section>

          {/* Step 2: Design your QR Code - Modified Section */}
          <section>
            <label className="block text-sm font-semibold text-gray-800 mb-4">
              <span className="inline-block w-5 h-5 bg-gray-700 text-white rounded-full text-center leading-5 mr-2 text-xs">2</span>
              Design your QR Code
            </label>
            
            {/* Tabs for Color, Logo */}
            <div className="flex border-b border-gray-200 mb-4">
              <button 
                onClick={() => setActiveTab('Color')} 
                className={`px-4 py-2 text-sm font-medium focus:outline-none ${activeTab === 'Color' ? 'text-teal-600 border-b-2 border-teal-500' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Color
              </button>
              <button 
                 onClick={() => setActiveTab('Logo')} 
                 className={`px-4 py-2 text-sm font-medium focus:outline-none ${activeTab === 'Logo' ? 'text-teal-600 border-b-2 border-teal-500' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Logo
              </button>
            </div>

            {/* Content for the selected tab */} 
            <div>
              {/* Color Options */} 
              {activeTab === 'Color' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="qr-color" className="block text-xs font-medium text-gray-700 mb-1">Color</label>
                    <div className="flex items-center">
                      {/* Color Text Input */}
                      <input
                        type="text"
                        id="qr-color"
                        value={qrColor}
                        onChange={(e) => setQrColor(e.target.value)}
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-l-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-sm text-black placeholder:text-gray-400"
                        placeholder="#000000"
                        maxLength={7}
                      />
                      {/* Color Picker Input */}
                      <input
                        type="color"
                        aria-label="Select QR code color"
                        value={qrColor || '#000000'}
                        onChange={(e) => setQrColor(e.target.value)}
                        className="h-[34px] w-10 border border-l-0 border-gray-300 rounded-r-md cursor-pointer p-1"
                       />
                    </div>
                  </div>
                </div>
              )}

              {/* Logo Options */} 
              {activeTab === 'Logo' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="logo-upload" className="block text-xs font-medium text-gray-700 mb-1">Upload Logo</label>
                    <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                      <label htmlFor="logo-upload-input" className="flex-grow px-3 py-1.5 text-sm text-gray-500 cursor-pointer">
                        {logoPreview ? 'Change file' : 'Choose file'} 
                      </label>
                      <input 
                        id="logo-upload-input"
                        type="file"
                        accept="image/png, image/jpeg, image/svg+xml" // Accept common image types
                        className="sr-only" // Hide the default file input
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          // Reset input value so the same file can be selected again after removal
                          e.target.value = ''; 
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setLogoPreview(reader.result as string);
                            };
                            // Add basic error handling for FileReader
                            reader.onerror = () => {
                              console.error("Error reading file.");
                              alert("Error reading file. Please try again.");
                              setLogoPreview(null);
                            }
                            reader.readAsDataURL(file);
                          } else {
                            setLogoPreview(null); // Clear preview if no file is selected
                          }
                        }}
                      />
                      <label htmlFor="logo-upload-input" className="px-4 py-1.5 bg-gray-50 border-l border-gray-300 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer rounded-r-md">
                        Browse
                      </label>
                    </div>
                    {logoPreview && (
                      <div className="mt-4 relative border rounded p-2 inline-block">
                         <p className="text-xs text-gray-500 mb-1 text-center">Preview:</p>
                        <Image 
                          src={logoPreview} 
                          alt="Logo Preview" 
                          width={64} 
                          height={64} 
                          className="object-contain"
                        />
                        {/* Remove Logo Button */}
                        <button
                          onClick={() => setLogoPreview(null)}
                          className="absolute top-0 right-0 -mt-2 -mr-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                          aria-label="Remove logo"
                         >
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

           {/* Optional: Ad can be placed here or removed */}
           {/* <section className="mt-8">
             <AdSenseAd adSlot="2345678901" adFormat="rectangle" style={{ height: '250px' }} />
           </section> */} 
        </div>

        {/* Right Column (QR Preview & Download) */}
        <aside className="p-8" ref={step2Ref}>
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            <span className="inline-block w-5 h-5 bg-gray-700 text-white rounded-full text-center leading-5 mr-2 text-xs">3</span>
            Download QR Code
          </h2>
          {/* Re-integrating Step3Download directly */} 
          <div className="flex flex-col items-center w-full">
            {/* Use Canvas for Live Preview */}
            <div className="w-48 h-48 p-4 border border-gray-200 mb-4 flex items-center justify-center bg-white shadow-sm rounded-md overflow-hidden">
               {qrCodeValue ? (
                  <canvas 
                    ref={previewCanvasRef} 
                    width="160" // Match inner size of previous div (w-48 - p-4*2 = 192px - 32px = 160px? Adjust if needed)
                    height="160" 
                    className="block"
                  ></canvas>
               ) : (
                 <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-center text-sm px-4">
                   {/* Placeholder text or icon */}
                    Your QR code will appear here
                 </div>
               )}
            </div>
            {/* Keep hidden high-res QR Code for download */}
            <div
              className="sr-only"
              ref={hiddenQrCodeRef}
              aria-hidden="true"
            >
              {qrCodeValue && (
                <QRCode
                  value={qrCodeValue}
                  size={1000}
                  level={"H"}
                  bgColor="#FFFFFF"
                  fgColor={qrColor || '#000000'} // Use black as fallback if state is empty
                />
              )}
            </div>
            <button 
              onClick={downloadQRCode}
              disabled={!qrCodeValue || isDownloading}
              className={`w-full font-medium px-6 py-3 rounded-lg flex items-center space-x-2 justify-center transition-colors 
                ${!qrCodeValue 
                  ? 'bg-gray-200 text-gray-600 opacity-50 cursor-not-allowed' 
                  : 'bg-[#A530F2] text-white hover:bg-[#482973]'}
                ${isDownloading ? 'opacity-75 cursor-wait' : ''}
              `}
            >
              <Download className="w-5 h-5" />
              <span>{isDownloading ? 'Downloading...' : 'Download QR Code'}</span>
            </button>
          </div>
        </aside>
      </div>

      {/* New Section: QR Code Basics - Moved */}
      <section className="mt-16 mb-8 p-8 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-4">
            Are you new to QR codes? Here's what you need to know
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image Column */}
            <div className="flex justify-center">
              <Image 
                src="/scanning-qr-code.jpg" // Corrected image source
                alt="Illustration of scanning a QR code" // Updated alt text
                width={300} // Adjust size as needed
                height={300} // Adjust size as needed
                className="max-w-full h-auto rounded-lg shadow-md" // Added styling
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

      {/* Bottom ad - Kept */}
      <div> {/* Removed mt-8 from here */}
        <AdSenseAd 
          adSlot="3456789012" 
          adFormat="auto" 
          style={{ minHeight: '280px' }}
          className="mx-auto max-w-4xl"
        />
      </div>
    </div>
  );
}
