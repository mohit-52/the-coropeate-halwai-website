import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Corporate Halwai | Desi Flavours. Corporate Standards. | Corporate Catering Gurugram & Delhi NCR',
  description: 'Premium corporate catering in Gurugram & Delhi NCR. Authentic desi flavours with hygiene, professionalism and corporate standards. Serving Since 2015. The first corporate caterer to prepare food in olive oil. Office meals, events & cafeteria services. Book a tasting session today.',
  keywords: [
    'corporate caterer Gurugram',
    'office meals Gurugram',
    'corporate tiffin service Delhi NCR',
    'desi flavours corporate catering',
    'olive oil catering India',
    'evening snacks office catering',
    'TCH box meal delivery',
    'meal box Gurugram office',
    'birthday party catering Gurugram',
    'family function catering Delhi NCR',
    'cafeteria services corporate',
    'office lunch catering',
    'The Corporate Halwai',
    'corporate thali delivery',
  ],
  openGraph: {
    title: 'The Corporate Halwai | Desi Flavours. Corporate Standards.',
    description: 'Premium corporate catering in Gurugram & Delhi NCR. Authentic desi flavours, served with hygiene, professionalism and corporate-grade standards. Serving Since 2015.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'The Corporate Halwai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Corporate Halwai | Desi Flavours. Corporate Standards.',
    description: 'Premium corporate catering in Gurugram & Delhi NCR. Authentic desi flavours with hygiene and corporate-grade service standards.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FoodEstablishment"],
    "name": "The Corporate Halwai",
    "description": "Premium corporate catering in Gurugram & Delhi NCR. Authentic desi flavours delivered with hygiene, professionalism and corporate-grade service standards. Serving Since 2015.",
    "url": "https://www.thecorporatehalwai.com",
    "telephone": ["+91-9289030016", "+91-9667314900"],
    "email": "thecorporatehalwai@gmail.com",
    "slogan": "Desi Flavours. Corporate Standards.",
    "foundingDate": "2015",
    "servesCuisine": "Indian",
    "areaServed": ["Gurugram", "Delhi NCR"],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Gurugram",
      "addressRegion": "Haryana",
      "addressCountry": "IN"
    },
    "openingHours": "Mo-Su 07:00-22:00",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Corporate Catering Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "TCH Box - Individual Meal Box" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "TCH Box + Live - Meal Box with Live Counters" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corporate Thali (Meal Box)" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Evening Snacks Catering" } }
      ]
    }
  };

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}

