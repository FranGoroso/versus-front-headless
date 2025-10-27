/**
 * BackToTop Component
 * 
 * Botón flotante que aparece al hacer scroll hacia abajo.
 * Permite al usuario volver rápidamente al inicio de la página.
 * 
 * @component
 * @version 1.0.0
 */

'use client';

import { useEffect, useState } from 'react';

/**
 * Componente de botón "Volver arriba"
 * Aparece después de hacer scroll de 300px
 */
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    /**
     * Controla la visibilidad del botón basado en la posición del scroll
     */
    const toggleVisibility = () => {
      // Mostrar el botón después de 300px de scroll
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Escuchar el evento de scroll
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup del event listener
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  /**
   * Función para hacer scroll suave hasta arriba
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-4 bg-gray-900 text-white rounded-full shadow-2xl hover:bg-black hover:scale-110 transition-all duration-300 group"
          aria-label="Volver arriba"
        >
          {/* Icono de flecha hacia arriba */}
          <svg
            className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
}
