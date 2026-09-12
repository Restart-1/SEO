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
  metadataBase: new URL('https://creador-lab-seo-aeo.dekids-7175.chatgpt.site'),
  title: 'RE:START — SEO + AEO para creadores',
  description: 'Una clase guiada sobre SEO, palabras clave, buscadores, redes sociales y motores de respuestas.',
  openGraph: {
    title: 'RE:START — SEO + AEO para creadores',
    description: 'Siete conceptos, una idea por página y una práctica de palabras clave.',
    images: [{ url: '/og.svg', width: 1200, height: 630, alt: 'RE:START · SEO + AEO para creadores' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RE:START — SEO + AEO para creadores',
    description: 'Siete conceptos, una idea por página y una práctica de palabras clave.',
    images: ['/og.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
