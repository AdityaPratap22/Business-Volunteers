import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../src/index.css';
import '../src/App.css';
import { Providers } from '../src/components/Providers';

export const viewport: Viewport = {
  themeColor: '#0F172A',
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://businessvolunteers.online'),
  title: {
    default: 'Business Volunteers — Founder-Led Digital Marketing Agency',
    template: '%s',
  },
  description: 'Founder-led digital marketing agency in Noida serving 89+ industries — SEO, Google & Meta ads, social media, web design, and graphic design.',
  keywords: [
    'Business Volunteers',
    'BV',
    'Digital Marketing Agency',
    'SEO',
    'Google Ads',
    'Meta Ads',
    'Social Media Marketing',
    'Web Design',
    'Web Development',
    'Graphic Design',
    'Noida',
    'India',
  ],
  authors: [{ name: 'Business Volunteers', url: 'https://businessvolunteers.online' }],
  creator: 'Business Volunteers',
  publisher: 'Business Volunteers',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/businessvolunteers/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/businessvolunteers/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/businessvolunteers/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://businessvolunteers.online',
    siteName: 'Business Volunteers',
    title: 'Business Volunteers — Founder-Led Digital Marketing Agency',
    description: 'Founder-led digital marketing agency in Noida serving 89+ industries — SEO, Google & Meta ads, social media, web design, and graphic design.',
    images: [
      {
        url: 'https://businessvolunteers.online/businessvolunteers/logo.png',
        width: 512,
        height: 512,
        alt: 'Business Volunteers Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Volunteers — Founder-Led Digital Marketing Agency',
    description: 'Founder-led digital marketing agency in Noida serving 89+ industries — SEO, Google & Meta ads, social media, web design, and graphic design.',
    images: ['https://businessvolunteers.online/businessvolunteers/logo.png'],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://businessvolunteers.online/#organization",
      "name": "Business Volunteers",
      "alternateName": "BV",
      "url": "https://businessvolunteers.online",
      "logo": {
        "@type": "ImageObject",
        "url": "https://businessvolunteers.online/businessvolunteers/logo.png",
        "width": 512,
        "height": 512
      },
      "image": "https://businessvolunteers.online/businessvolunteers/logo.png",
      "description": "Founder-led digital marketing agency in Noida serving 89+ industries — SEO, Google & Meta ads, social media, web design, and graphic design.",
      "telephone": "+918586989832",
      "email": "contact.businessvolunteers@gmail.com",
      "priceRange": "₹₹",
      "foundingDate": "2025",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "minValue": 10,
        "maxValue": 50
      },
      "slogan": "Founder-led digital marketing agency in Noida serving 89+ industries.",
      "knowsAbout": [
        "Search Engine Optimization (SEO)",
        "Generative Engine Optimization (GEO)",
        "AI Engine Optimization (AEO)",
        "Search Experience Optimization (SXO)",
        "Performance Marketing",
        "Google Ads Management",
        "Meta Ads (Facebook & Instagram Advertising)",
        "Social Media Marketing",
        "Web Design",
        "Web Development",
        "Graphic Design",
        "Conversion Rate Optimization (CRO)",
        "B2B Lead Generation",
        "E-Commerce Marketing",
        "WhatsApp Business API Marketing",
        "Email Marketing Automation",
        "Influencer Marketing",
        "UGC Reels & Creator Marketing",
        "Brand Identity Design",
        "Local SEO & Google Business Profile Optimization",
        "AI Automation Systems"
      ],
      "sameAs": [
        "https://www.instagram.com/thebusinessvolunteers/",
        "https://www.linkedin.com/company/business-volunteers1",
        "https://www.facebook.com/people/BusinessVolunteers/61579138254807/",
        "https://www.youtube.com/@TheBusinessVolunteers"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sector 62",
        "addressLocality": "Noida",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "201309",
        "addressCountry": "IN"
      },
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "United Arab Emirates" }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://businessvolunteers.online/#website",
      "url": "https://businessvolunteers.online",
      "name": "Business Volunteers",
      "description": "Business Volunteers agency blog, service hub, and industry growth resource center.",
      "publisher": { "@id": "https://businessvolunteers.online/#organization" },
      "inLanguage": "en-US",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://businessvolunteers.online/blogs?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/businessvolunteers/logo.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/businessvolunteers/logo.png" />
        <link rel="icon" type="image/png" href="/businessvolunteers/logo.png" />
        <link rel="shortcut icon" href="/businessvolunteers/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/businessvolunteers/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
