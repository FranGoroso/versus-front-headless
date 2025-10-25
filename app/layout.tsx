import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp';
import { CookieBanner } from '@/components/common/CookieBanner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Versus Inmobiliaria | Propiedades de Lujo',
  description: 'Encuentra tu próximo hogar con Versus. Propiedades exclusivas, servicio personalizado.',
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
        <FloatingWhatsApp 
          phoneNumber="+376600000000"
          message="Hola, estoy interesado en obtener más información sobre las propiedades en Andorra"
        />
        <CookieBanner />
      </body>
    </html>
  );
}
