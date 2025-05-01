'use client';

import React from 'react';

// Simple Accordion Item Component (Can be moved to a shared components directory)
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left text-gray-800 hover:text-[#A530F2] focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-lg">{title}</span>
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
        <div className="mt-3 text-gray-600 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
};

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-4xl font-semibold text-center mb-8 text-black">
        Frequently Asked Questions
      </h1>
      
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <AccordionItem title="Is MyQR really free to use?">
          Yes! MyQR is 100% free for generating QR codes for website links. We aim to keep this core functionality free forever. We might introduce optional premium features in the future, but the basic URL code generation will remain free.
        </AccordionItem>

        <AccordionItem title="How do I generate a QR code?">
          It's simple! 
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Go to the homepage.</li>
            <li>Enter the full website URL (including https://) into the input field.</li>
            <li>The QR code will automatically generate in the preview area on the right.</li>
            <li>(Optional) Customize the color or add a logo using the design tabs.</li>
            <li>Click the "Download QR Code" button to save the image.</li>
          </ol>
        </AccordionItem>

        <AccordionItem title="Can I add my logo to the QR code?">
          Yes! On the homepage, under the "Design your QR Code" section, click the "Logo" tab. You can upload your logo (PNG, JPG, or SVG recommended), and it will be embedded in the center of the QR code when you download it. There's also a live preview.
        </AccordionItem>

        <AccordionItem title="What format can I download the QR code in?">
          Currently, QR codes are downloaded as high-resolution PNG image files. This format is widely compatible and suitable for both digital use and print.
        </AccordionItem>

        <AccordionItem title="Do the generated QR codes expire?">
          No, the QR codes themselves do not expire. They simply encode the data you provide (like a URL). As long as the destination URL is still active, the QR code will continue to work.
        </AccordionItem>

        <AccordionItem title="Are there limits on how many QR codes I can create?">
           No, there are currently no limits on the number of QR codes you can generate for free using MyQR.
        </AccordionItem>
      </div>
    </div>
  );
} 