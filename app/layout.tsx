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
  title: 'Creador Lab — SEO + AEO para creadores',
  description: 'Una guía práctica e interactiva para crear contenido que los buscadores encuentren y las inteligencias artificiales citen.',
  openGraph: {
    title: 'Creador Lab — SEO + AEO para creadores',
    description: 'Contenido que te encuentran. Respuestas que te citan.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Creador Lab' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creador Lab — SEO + AEO para creadores',
    description: 'Contenido que te encuentran. Respuestas que te citan.',
    images: ['/og.png'],
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
