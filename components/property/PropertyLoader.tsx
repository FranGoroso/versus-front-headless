/**
 * PropertyLoader Component
 * 
 * Spinner de carga elegante que se muestra mientras se filtran propiedades.
 * Se activa cuando el usuario hace click en "Buscar" en los filtros.
 * 
 * CARACTERÍSTICAS:
 * - Overlay semi-transparente con blur
 * - Spinner circular animado
 * - Mensaje descriptivo
 * - Animación fade-in suave
 * - Centrado en pantalla
 * 
 * FUNCIONAMIENTO:
 * - Se renderiza condicionalmente desde PropertyFilters
 * - Aparece cuando isLoading === true
 * - Dura aproximadamente 800ms (tiempo de transición)
 * - Proporciona feedback visual al usuario
 * 
 * @component
 * @version 1.0.0
 * @created 2025-10-30
 */

'use client';

import React from 'react';

/**
 * Props del componente
 * 
 * @interface PropertyLoaderProps
 * @property {string} [message] - Mensaje personalizado a mostrar (opcional)
 */
interface PropertyLoaderProps {
  /** Mensaje personalizado (opcional, por defecto: "Buscando propiedades...") */
  message?: string;
}

/**
 * Componente principal de carga
 * 
 * Renderiza un overlay de pantalla completa con un spinner circular
 * y un mensaje de texto. El overlay usa backdrop-blur para un efecto
 * visual más elegante.
 * 
 * @param {PropertyLoaderProps} props - Props del componente
 * @returns {JSX.Element} Overlay con spinner y mensaje
 */
export function PropertyLoader({ message = 'Buscando propiedades...' }: PropertyLoaderProps) {
  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm animate-fadeIn"
      role="status"
      aria-live="polite"
      aria-label="Cargando propiedades"
    >
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner circular doble */}
        <div className="relative">
          {/* Círculo exterior estático (gris claro - base) */}
          <div 
            className="w-16 h-16 border-4 border-gray-200 rounded-full"
            aria-hidden="true"
          ></div>
          
          {/* Círculo interior animado (gris oscuro - rotación) */}
          <div 
            className="absolute inset-0 w-16 h-16 border-4 border-gray-900 rounded-full border-t-transparent animate-spin"
            aria-hidden="true"
          ></div>
        </div>

        {/* Mensaje de carga con animación pulse */}
        <p className="text-sm font-light text-gray-700 animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}
