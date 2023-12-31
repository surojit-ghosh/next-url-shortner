import AuthProvider from '@/providers/AuthProvider';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster.jsx';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'URL Shortner',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html className={inter.className} lang="en">
      <body>
        <Toaster />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
};