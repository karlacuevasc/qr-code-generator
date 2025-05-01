import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-4xl font-semibold text-center mb-8 text-black">
        Privacy Policy
      </h1>
      
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-semibold text-black mb-4">Personal Information</h2>
        <p className="text-lg leading-relaxed">
          Your public IP address is logged when you report an issue.
        </p>
        <p className="text-lg leading-relaxed">
          This is used to make sure that we don't have a few people showing up as many unique reports.
        </p>

        <h2 className="text-2xl font-semibold text-black mb-4 pt-4 border-t border-gray-200">Ads</h2>
        <p className="text-lg leading-relaxed">
          Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites.
        </p>
        <p className="text-lg leading-relaxed">
          Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
        </p>
        <p className="text-lg leading-relaxed">
          Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ads Settings</a>.
        </p>
        <p className="text-lg leading-relaxed">
          The cookies of other third-party vendors or ad networks may also be used to serve ads on our site.
        </p>
        <p className="text-lg leading-relaxed">
          Users may also opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.aboutads.info</a>.
        </p>

        <h2 className="text-2xl font-semibold text-black mb-4 pt-4 border-t border-gray-200">Other Cookie Use</h2>
        <p className="text-lg leading-relaxed">
          This site also uses cookies to enhance the user experience by allowing the user interface to determine the last time you submitted a report.
        </p>
        <p className="text-lg leading-relaxed">
          These cookie values are only used to enable the website's operation and do not store any personal information.
        </p>
      </div>
    </div>
  );
} 