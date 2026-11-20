import './globals.css';
import { Andika } from 'next/font/google';

const andika = Andika({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-andika',
});

export const metadata = {
  title: 'Kanya Kiran | For every woman, but not just for women',
  description:
    'A flagship initiative of KIIT and KISS standing on four pillars: physical safety, education, cyber safety, and psychological & emotional well-being.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth overflow-x-hidden ${andika.variable}`}>
      <body className="bg-[#0e0e0e] text-white font-sans antialiased selection:bg-[#ff46a2] selection:text-white overflow-x-hidden max-w-full">
        {children}
      </body>
    </html>
  );
}
