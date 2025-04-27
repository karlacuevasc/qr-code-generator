import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-4xl font-semibold text-center mb-8 text-black">
        About MyQR
      </h1>
      
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
        <p className="text-lg leading-relaxed">
          Hey there, welcome to MyQR – the quickest, easiest, and totally free way to make awesome QR codes for all your websites or page links!
        </p>
        <p className="text-lg leading-relaxed">
          Our mission? Simple: make QR code magic available to everyone. Whether you're a small biz owner trying to stand out, a content creator sharing your latest masterpiece, or just someone who loves turning your pages into scannable squares – we're here to help you do it with zero hassle.
        </p>
        <p className="text-lg leading-relaxed">
          We built MyQR to be fast, fun, and freakishly easy to use. No logins, no hidden fees, no tech headaches. Just clean, customizable QR codes that work like a charm.
        </p>
        <p className="text-lg leading-relaxed">
          And we're just getting started. Expect more cool features, more ways to customize, and maybe even a few surprises along the way. We're all about keeping things simple, useful, and a little bit fun.
        </p>
        <p className="text-lg leading-relaxed font-medium text-center">
          Now go make something awesome!
        </p>
      </div>
    </div>
  );
} 