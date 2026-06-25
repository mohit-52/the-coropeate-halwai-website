import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Premium PG & Co-living Spaces | The Corporate Halwai',
  description: 'Excellence in Corporate Catering: Authentic Indian flavours delivered with hygiene, professionalism, and corporate-grade service standards.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
