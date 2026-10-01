import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'COME PIZZA — Artisanal Wood-Fired Pizza Delivery',
  description: 'Massa biga maturada por 48h assada no forno a lenha a 480°C. Delivery Direct-to-Consumer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className="bg-surface text-on-surface antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
