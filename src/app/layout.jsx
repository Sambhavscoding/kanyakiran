import './globals.css';

export const metadata = {
  title: 'Kanya Kiran | For every woman, but not just for women',
  description:
    'A flagship initiative of KIIT and KISS standing on four pillars: physical safety, education, cyber safety, and psychological & emotional well-being.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Andika:ital,wght@0,400;0,700;1,400;1,700&family=Caveat:wght@600;700&display=swap"
        />
      </head>
      <body className="bg-[#0e0e0e] text-white font-sans antialiased selection:bg-[#ff46a2] selection:text-white overflow-x-hidden max-w-full">
        {children}
      </body>
    </html>
  );
}
