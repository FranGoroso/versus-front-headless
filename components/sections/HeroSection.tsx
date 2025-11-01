/**
 * Hero Section Component - VERSIÓN CON VIDEO
 * 
 * Sección principal con video de fondo y efecto parallax.
 * Diseño minimalista y elegante con scroll suave.
 * 
 * VERSIÓN 3.0:
 * - Reemplaza imagen por video de Andorra
 * - Mantiene efecto parallax adaptado para video
 * - Recibe taxonomías reales de WordPress (propertyTypes, propertyCities)
 * - Pasa las taxonomías al PropertySearchForm compacto
 * - Video autoplay, loop, muted para mejor UX
 * 
 * @component
 * @version 3.0.0
 * @updated 2025-11-01 - Integración de video de fondo con parallax
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { PropertySearchForm } from '@/components/sections/PropertySearchForm';
import { WPTaxonomy } from '@/types';

/**
 * Props del componente
 */
interface HeroSectionProps {
  className?: string;
  propertyTypes?: WPTaxonomy[]; // Tipos de propiedades desde WordPress
  propertyCities?: WPTaxonomy[]; // Ciudades desde WordPress
}

/**
 * Componente Hero con video de fondo y efecto parallax
 */
export function HeroSection({ 
  className = '',
  propertyTypes = [],
  propertyCities = []
}: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0);

  /**
   * Efecto para capturar el scroll y aplicar parallax
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Agregar listener de scroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup al desmontar
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /**
   * Calcular el desplazamiento parallax
   * El video se mueve más lento que el scroll (50% de velocidad)
   */
  const parallaxOffset = scrollY * 0.5;

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-20 ${className}`}>
      {/* Video de fondo con efecto parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-[120%]"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            willChange: 'transform',
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{
              minWidth: '100%',
              minHeight: '100%',
            }}
          >
            <source 
              src="https://www.shutterstock.com/shutterstock/videos/3917897889/preview/stock-footage-aerial-view-showcasing-the-stunning-natural-beauty-of-andorra-featuring-a-charming-mountain.webm" 
              type="video/webm" 
            />
            {/* Fallback para navegadores que no soporten el formato */}
            Tu navegador no soporta la reproducción de video.
          </video>
        </div>
        {/* Overlay oscuro para mejorar legibilidad del texto */}
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>
      
      <Container className="relative z-20 w-full">
        <div className="max-w-6xl mx-auto">
          
          {/* Título principal único */}
          <div className="text-center text-white mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight drop-shadow-2xl">
              
            </h1>
          </div>
          
          {/* Buscador compacto en tarjeta blanca */}
          <div className="max-w-5xl mx-auto mb-20">
            <PropertySearchForm 
              variant="hero"
              className="bg-white shadow-xl"
              propertyTypes={propertyTypes}
              propertyCities={propertyCities}
            />
          </div>
          
          {/* Enlaces de navegación rápida */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pb-16">
            <Link href="/nosotros">
              <span className="text-white/80 hover:text-white font-light transition-colors duration-300 flex items-center gap-2 text-sm md:text-base">
                <span>→</span> Conoce nuestro equipo
              </span>
            </Link>
            <span className="hidden sm:block text-white/30">|</span>
            <Link href="/blog">
              <span className="text-white/80 hover:text-white font-light transition-colors duration-300 flex items-center gap-2 text-sm md:text-base">
                <span>→</span> Blog inmobiliario
              </span>
            </Link>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
