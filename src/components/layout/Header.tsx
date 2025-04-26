'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
import HelpWidget from '@/components/features/HelpWidget';

interface HeaderProps {
  currentStep?: number;
}

const steps = [
  { id: 1, title: 'Select QR type' },
  { id: 2, title: 'Add content' },
  { id: 3, title: 'Design QR code' },
  { id: 4, title: 'Download QR code' },
];

export default function Header({ currentStep = 1 }: HeaderProps) {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <>
      <header className="bg-white dark:bg-[#222] shadow-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-[#333333] dark:text-white flex items-center">
              <span className="text-[#4CAF50]">Online</span>
              &nbsp;QR Generator
            </Link>
            
            <div className="flex items-center space-x-4">
              <button 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsHelpOpen(true)}
              >
                <HelpCircle className="w-6 h-6 text-[#666666] dark:text-gray-300" />
              </button>
            </div>
          </div>
          
          <div className="mt-6 mb-2">
            <div className="flex justify-between items-center">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center w-full">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    step.id === currentStep 
                      ? 'bg-[#4CAF50] text-white'
                      : step.id < currentStep
                        ? 'bg-green-100 text-[#4CAF50] dark:bg-green-900 dark:text-green-300'
                        : 'bg-gray-200 text-gray-500 dark:bg-gray-700'
                  }`}>
                    {step.id}
                  </div>
                  <span className={`text-sm text-center ${
                    step.id === currentStep
                      ? 'text-[#4CAF50] font-medium' 
                      : 'text-[#666666] dark:text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                  {step.id < steps.length && (
                    <div className="h-[2px] w-full bg-gray-200 dark:bg-gray-700 mt-5 flex-grow">
                      <div className={`h-full bg-[#4CAF50] ${
                        step.id < currentStep ? 'w-full' : 'w-0'
                      }`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
      
      <HelpWidget isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </>
  );
} 