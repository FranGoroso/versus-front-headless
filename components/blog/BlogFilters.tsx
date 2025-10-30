/**
 * BlogFilters Component
 * 
 * Filtros interactivos para la página de blog.
 * Permite filtrar posts por categoría con navegación por URL.
 * 
 * CARACTERÍSTICAS:
 * - Botones interactivos para categorías
 * - Estado activo visual
 * - Actualización de URL con query params
 * - Compatible con paginación
 * - Botón "Todos" para limpiar filtros
 * 
 * @component
 * @version 1.0.0
 * @created 2025-10-30
 */

'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

/**
 * Interface para categorías de blog
 */
interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

/**
 * Props del componente
 */
interface BlogFiltersProps {
  /** Lista de categorías disponibles desde WordPress */
  categories: BlogCategory[];
}

/**
 * Componente principal de filtros
 */
export function BlogFilters({ categories }: BlogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Obtener categoría activa de la URL
  const activeCategory = searchParams.get('categoria') || '';

  /**
   * Manejar click en categoría
   * Actualiza la URL con el filtro seleccionado
   */
  const handleCategoryClick = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (categorySlug === '') {
      // Si es "Todos", eliminar filtro de categoría
      params.delete('categoria');
    } else {
      // Si es una categoría específica, agregar a URL
      params.set('categoria', categorySlug);
    }
    
    // Resetear página al cambiar categoría
    params.delete('page');
    
    // Navegar a nueva URL
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {/* Botón "Todos" */}
      <button
        onClick={() => handleCategoryClick('')}
        className={`
          px-6 py-2.5 rounded-full text-sm font-light transition-all duration-300
          ${activeCategory === '' 
            ? 'bg-gray-900 text-white shadow-md scale-105' 
            : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-900 hover:bg-gray-50'
          }
        `}
      >
        Todos
      </button>

      {/* Botones de categorías dinámicas */}
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.slug)}
          className={`
            px-6 py-2.5 rounded-full text-sm font-light transition-all duration-300
            ${activeCategory === category.slug 
              ? 'bg-gray-900 text-white shadow-md scale-105' 
              : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-900 hover:bg-gray-50'
            }
          `}
        >
          {category.name}
          {category.count > 0 && (
            <span className="ml-1.5 opacity-60">({category.count})</span>
          )}
        </button>
      ))}
    </div>
  );
}
