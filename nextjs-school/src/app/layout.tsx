import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import StoreProvider from '@/redux/StoreProvider';
import ThemeRegistry from '@/components/ThemeRegistry';
import AuthProvider from '@/components/AuthProvider';
import './globals.css';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'School Management System',
  description: 'A comprehensive school management system built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <StoreProvider>
          <ThemeRegistry>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ThemeRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}

