import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Fake Store | Quality Products Online',
    template: '%s | Fake Store',
  },
  description:
    'Discover our collection of quality products across electronics, clothing, and jewelry. Shop with confidence at Fake Store.',
  keywords: ['online store', 'electronics', 'clothing', 'jewelry', 'shopping'],
  openGraph: {
    title: 'Fake Store | Quality Products Online',
    description:
      'Discover our collection of quality products across electronics, clothing, and jewelry.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
