import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import NewHeader from "@/components/layout/NewHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QR Code Creator - Free QR Code Generator Online",
  description: "Generate custom QR codes for websites, PDFs, email, social media, vCards and more. Free and easy to use online QR code creator.",
  icons: {
    icon: [
      { url: '/qr-heart-logo.svg' }
    ],
    shortcut: ['/qr-heart-logo.svg'],
    apple: [
      { url: '/qr-heart-logo.svg' }
    ]
  },
  other: {
    "google-adsense-account": "ca-pub-1604555561487844",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/qr-heart-logo.svg" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1604555561487844"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 dark:bg-gray-900`}
      >
        <NewHeader />
        <main className="min-h-screen py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
