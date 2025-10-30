/**
 * ScrollToTop Component
 * 
 * Botón flotante fijo que aparece cuando el usuario hace scroll hacia abajo
 * y permite volver al inicio de la página con un scroll suave y elegante.
 * 
 * Características:
 * - Aparece solo después de 300px de scroll
 * - Animación fade-in + slide-up al aparecer
 * - Posicionado arriba del botón de WhatsApp
 * - Hover elegante con cambio de colores y escala
 * - Scroll suave al hacer click
 * 
 * @component
 * @version 1.0.0
 * @updated 2025-10-30 - Creación inicial con animaciones elegantes
 */

'use client';

import { useState, useEffect } from 'react';

/**
 * Componente ScrollToTop
 * 
 * Muestra un botón flotante que:
 * 1. Se oculta por defecto
 * 2. Aparece suavemente cuando scroll > 300px
 * 3. Desaparece suavemente cuando scroll < 300px
 * 4. Ejecuta scroll suave al top al hacer click
 */
export function ScrollToTop() {
  // Estado para controlar la visibilidad del botón
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    /**
     * Handler que detecta el scroll y muestra/oculta el botón
     * Se activa cuando el usuario hace scroll más de 300px
     */
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Agregar listener de scroll
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup: remover listener al desmontar el componente
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  /**
   * Handler que ejecuta el scroll suave al inicio de la página
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-24 right-6 z-50 
        w-12 h-12 rounded-full 
        bg-white border-2 border-gray-900 
        hover:bg-gray-900 hover:border-gray-900
        shadow-lg hover:shadow-2xl
        hover:scale-110
        transition-all duration-500 ease-out
        group
        ${isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4 pointer-events-none'
        }
      `}
      aria-label="Volver arriba"
      title="Volver arriba"
    >
      {/* Icono de flecha hacia arriba */}
      <svg 
        className="w-5 h-5 mx-auto text-gray-900 group-hover:text-white transition-colors duration-300"
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2.5} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
    </button>
  );
}
