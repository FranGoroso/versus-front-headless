/**
 * Hero Section Component
 * 
 * Sección principal con efecto parallax en la imagen de fondo.
 * Diseño minimalista y elegante con scroll suave.
 * 
 * @component
 * @version 1.0.0
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { PropertySearchForm } from '@/components/sections/PropertySearchForm';

/**
 * Props del componente
 */
interface HeroSectionProps {
  className?: string;
}

/**
 * Componente Hero con efecto parallax
 */
export function HeroSection({ className = '' }: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0);

  /**
   * Efecto para capturar el scroll
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
   * La imagen se mueve más lento que el scroll (50% de velocidad)
   */
  const parallaxOffset = scrollY * 0.5;

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-20 ${className}`}>
      {/* Imagen de fondo con efecto parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-[120%]"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            willChange: 'transform',
          }}
        >
          <Image
            src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
            alt="Montañas de Andorra"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>
      
      <Container className="relative z-20 w-full">
        <div className="max-w-6xl mx-auto">
          
          {/* Título principal único */}
          <div className="text-center text-white mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight drop-shadow-2xl">
              
            </h1>
          </div>
          
          {/* Buscador en tarjeta blanca */}
          <div className="max-w-5xl mx-auto mb-20">
            <PropertySearchForm 
              variant="hero"
              className="bg-white shadow-xl"
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
