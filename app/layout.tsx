import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { CookieBanner } from '@/components/common/CookieBanner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Versus Andorra | Propiedades de Lujo en Andorra',
  description: 'Encuentra tu próximo hogar con Versus Andorra. Propiedades exclusivas, servicio personalizado.',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        {/* Botón flotante de WhatsApp */}
        <FloatingWhatsApp 
          phoneNumber="+376600000000"
          message="Hola, estoy interesado en obtener más información sobre las propiedades en Andorra"
        />
        {/* Botón scroll to top - aparece al hacer scroll */}
        <ScrollToTop />
        {/* Banner de cookies */}
        <CookieBanner />
      </body>
    </html>
  );
}
