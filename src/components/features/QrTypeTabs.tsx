'use client';

import React from 'react';
import { Globe, FileText, Mail, Users, Phone, ChevronDown } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactElement;
}

const initialTabs: Tab[] = [
  { id: 'website', label: 'Website', icon: <Globe className="w-4 h-4 mr-2" /> },
  { id: 'pdf', label: 'PDF', icon: <FileText className="w-4 h-4 mr-2" /> },
  { id: 'email', label: 'Email', icon: <Mail className="w-4 h-4 mr-2" /> },
  { id: 'social', label: 'Social media', icon: <Users className="w-4 h-4 mr-2" /> },
  { id: 'vcard', label: 'VCard', icon: <Phone className="w-4 h-4 mr-2" /> },
];

interface QrTypeTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function QrTypeTabs({ activeTab, onTabChange }: QrTypeTabsProps) {
  // TODO: Implement dropdown for more tabs if needed
  const visibleTabs = initialTabs;

  return (
    <div className="mb-6 bg-white p-1 rounded-lg shadow-sm inline-flex space-x-1 border border-gray-200">
      {visibleTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center px-6 py-2 rounded-md transition-colors text-sm font-medium ${
            activeTab === tab.id
              ? 'bg-teal-50 text-teal-700 shadow-inner'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
      {/* Dropdown Button - Placeholder */}
      <button className="flex items-center px-3 py-2 rounded-md text-gray-500 hover:bg-gray-50">
        <ChevronDown className="w-5 h-5" />
      </button>
    </div>
  );
} 