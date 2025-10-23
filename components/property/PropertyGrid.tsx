/**
 * PropertyGrid Component
 * 
 * Grid responsive de propiedades con manejo de estados.
 * Muestra PropertyCard en layout de grid con diferentes breakpoints.
 * 
 * @component
 * @example
 * ```tsx
 * <PropertyGrid properties={properties} loading={false} />
 * ```
 */

import { PropertyCard, PropertyCardSkeleton } from './PropertyCard';
import { PropertyCard as PropertyCardType } from '@/types';

interface PropertyGridProps {
  properties: PropertyCardType[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  columns?: 2 | 3 | 4;
  showFeaturedFirst?: boolean;
}

export function PropertyGrid({
  properties,
  loading = false,
  error = null,
  emptyMessage = 'No se encontraron propiedades',
  columns = 3,
  showFeaturedFirst = true,
}: PropertyGridProps) {
  /**
   * Ordenar propiedades: destacadas primero si está habilitado
   */
  const sortedProperties = showFeaturedFirst
    ? [...properties].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      })
    : properties;

  /**
   * Clases para grid según número de columnas
   */
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  /**
   * Estado de error
   */
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg inline-block">
          <p className="font-medium mb-1">Error al cargar propiedades</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  /**
   * Estado de loading
   */
  if (loading) {
    return (
      <div className={`grid ${gridClasses[columns]} gap-8`}>
        {Array.from({ length: columns * 2 }).map((_, index) => (
          <PropertyCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  /**
   * Estado vacío
   */
  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-block">
          <svg
            className="w-16 h-16 text-gray-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <p className="text-gray-500 text-lg">{emptyMessage}</p>
          <p className="text-gray-400 text-sm mt-2">
            Intenta ajustar tus filtros de búsqueda
          </p>
        </div>
      </div>
    );
  }

  /**
   * Renderizar grid de propiedades
   */
  return (
    <div className={`grid ${gridClasses[columns]} gap-8`}>
      {sortedProperties.map((property, index) => (
        <PropertyCard
          key={property.id}
          property={property}
          priority={index < 3} // Priorizar carga de las primeras 3
        />
      ))}
    </div>
  );
}

/**
 * PropertyGridSection
 * 
 * Wrapper del grid con título y descripción opcionales
 */
interface PropertyGridSectionProps extends PropertyGridProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function PropertyGridSection({
  title,
  description,
  action,
  ...gridProps
}: PropertyGridSectionProps) {
  return (
    <section className="py-16">
      {/* Header de la sección */}
      {(title || description || action) && (
        <div className="mb-12">
          {title && (
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-center">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto mb-6">
              {description}
            </p>
          )}
          {action && (
            <div className="flex justify-center mt-8">{action}</div>
          )}
        </div>
      )}

      {/* Grid de propiedades */}
      <PropertyGrid {...gridProps} />
    </section>
  );
}
