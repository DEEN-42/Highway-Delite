import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { BookingProvider } from '@/context/BookingContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Highway Delite',
  description: 'Your one-stop solution for all travel needs',
  icons: {
    icon: '/HD-Logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BookingProvider>
          {children}
        </BookingProvider>
      </body>
    </html>
  );
}
