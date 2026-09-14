import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const githubPages = process.env.GITHUB_PAGES === 'true';
const publicOrigin = githubPages
  ? 'https://restart-1.github.io'
  : 'https://creador-lab-seo-aeo.dekids-7175.chatgpt.site';
const coverImage = githubPages ? '/SEO/restart-cover.png' : '/restart-cover.png';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(publicOrigin),
  title: 'RE:START — SEO + AEO para creadores',
  description: 'Una clase guiada sobre SEO, palabras clave, buscadores, redes sociales y motores de respuestas.',
  openGraph: {
    title: 'RE:START — SEO + AEO para creadores',
    description: 'Ocho conceptos, una idea por página y una práctica de palabras clave.',
    images: [{ url: coverImage, width: 1966, height: 1092, alt: 'RESTART · Empieza diferente' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RE:START — SEO + AEO para creadores',
    description: 'Ocho conceptos, una idea por página y una práctica de palabras clave.',
    images: [coverImage],
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
