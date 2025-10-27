/**
 * ReadingProgressBar Component
 * 
 * Barra de progreso que muestra el porcentaje de lectura del artículo.
 * Se llena gradualmente mientras el usuario hace scroll por el contenido.
 * 
 * @component
 * @version 1.0.0
 */

'use client';

import { useEffect, useState } from 'react';

/**
 * Componente de barra de progreso de lectura
 * Calcula automáticamente el progreso basado en el scroll
 */
export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    /**
     * Calcula el progreso de lectura basado en la posición del scroll
     */
    const updateProgress = () => {
      // Altura total del documento
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Posición actual del scroll
      const scrollTop = window.scrollY;
      
      // Calcular porcentaje de progreso
      const progress = (scrollTop / scrollHeight) * 100;
      
      setProgress(progress);
    };

    // Actualizar al hacer scroll
    window.addEventListener('scroll', updateProgress);
    
    // Actualizar al cargar la página
    updateProgress();

    // Cleanup del event listener
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progreso de lectura del artículo"
    >
      <div
        className="h-full bg-gradient-to-r from-gray-800 via-gray-900 to-black transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
