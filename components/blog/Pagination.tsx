/**
 * Pagination Component
 * 
 * Componente de paginación premium para el blog.
 * Usa URL Search Params para mejor SEO y navegación.
 * 
 * Features:
 * - Navegación con URLs (/blog?page=2)
 * - Máximo 5 números de página visibles
 * - Sistema de "..." para indicar más páginas
 * - Botones Prev/Next con estados disabled
 * - Diseño premium acorde al sitio
 * - Totalmente responsive
 * 
 * @component
 * @version 1.0.0
 */

'use client';

import Link from 'next/link';

interface PaginationProps {
  /**
   * Página actual (1-indexed)
   */
  currentPage: number;
  
  /**
   * Total de páginas disponibles
   */
  totalPages: number;
  
  /**
   * Ruta base para los links (default: /blog)
   */
  basePath?: string;
}

/**
 * Genera array de números de página a mostrar
 * Máximo 5 números visibles con "..." cuando hay muchas páginas
 * 
 * Ejemplos:
 * - Total 5 páginas, actual 3: [1, 2, 3, 4, 5]
 * - Total 10 páginas, actual 1: [1, 2, 3, 4, 5, '...', 10]
 * - Total 10 páginas, actual 5: [1, '...', 4, 5, 6, '...', 10]
 * - Total 10 páginas, actual 10: [1, '...', 6, 7, 8, 9, 10]
 */
function generatePageNumbers(currentPage: number, totalPages: number): (number | string)[] {
  const pages: (number | string)[] = [];
  const maxVisible = 5; // Máximo de números visibles

  if (totalPages <= maxVisible + 2) {
    // Si hay pocas páginas, mostrar todas
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Siempre mostrar primera página
    pages.push(1);

    // Calcular rango alrededor de la página actual
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    // Ajustar si estamos cerca del inicio
    if (currentPage <= 3) {
      end = maxVisible;
    }

    // Ajustar si estamos cerca del final
    if (currentPage >= totalPages - 2) {
      start = totalPages - maxVisible + 1;
    }

    // Añadir "..." si hay gap después de la primera página
    if (start > 2) {
      pages.push('...');
    }

    // Añadir páginas del rango
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Añadir "..." si hay gap antes de la última página
    if (end < totalPages - 1) {
      pages.push('...');
    }

    // Siempre mostrar última página
    pages.push(totalPages);
  }

  return pages;
}

/**
 * Componente Pagination
 */
export function Pagination({ currentPage, totalPages, basePath = '/blog' }: PaginationProps) {
  // Si solo hay una página, no mostrar paginación
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = generatePageNumbers(currentPage, totalPages);
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className="flex justify-center items-center gap-2 mt-16">
      {/* Botón Previous */}
      {hasPrevPage ? (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="group p-3 rounded-full hover:bg-gray-100 transition-all duration-300"
          aria-label="Página anterior"
        >
          <svg 
            className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      ) : (
        <button
          disabled
          className="p-3 rounded-full cursor-not-allowed opacity-40"
          aria-label="Sin página anterior"
        >
          <svg 
            className="w-5 h-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Números de página */}
      <div className="flex gap-2">
        {pageNumbers.map((pageNum, index) => {
          // Si es "..." mostrar elemento no clickeable
          if (pageNum === '...') {
            return (
              <div 
                key={`ellipsis-${index}`}
                className="w-10 h-10 flex items-center justify-center text-gray-400 text-sm font-light"
              >
                ...
              </div>
            );
          }

          // Si es la página actual
          if (pageNum === currentPage) {
            return (
              <div
                key={pageNum}
                className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-light shadow-lg"
                aria-current="page"
              >
                {pageNum}
              </div>
            );
          }

          // Páginas normales
          return (
            <Link
              key={pageNum}
              href={`${basePath}?page=${pageNum}`}
              className="w-10 h-10 rounded-full hover:bg-gray-100 text-gray-700 hover:text-gray-900 flex items-center justify-center text-sm font-light transition-all duration-300 hover:shadow-md"
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* Botón Next */}
      {hasNextPage ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="group p-3 rounded-full hover:bg-gray-100 transition-all duration-300"
          aria-label="Página siguiente"
        >
          <svg 
            className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <button
          disabled
          className="p-3 rounded-full cursor-not-allowed opacity-40"
          aria-label="Sin página siguiente"
        >
          <svg 
            className="w-5 h-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
