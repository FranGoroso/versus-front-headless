/**
 * Loading Component para página de propiedades
 * 
 * Muestra un skeleton loader elegante mientras cargan las propiedades.
 * Incluye:
 * - Skeleton del header con título
 * - Skeleton de la barra de filtros
 * - Grid de cards skeleton
 * 
 * @component
 * @version 1.0.0
 * @created 2025-10-28
 */

import { Container } from '@/components/layout/Container';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Skeleton del Header */}
      <section className="bg-white pt-28 pb-6 border-b">
        <Container>
          {/* Breadcrumb skeleton */}
          <div className="mb-6">
            <div className="h-4 bg-gray-100 rounded w-32 mb-3 animate-pulse" />
            
            {/* Título skeleton */}
            <div className="h-10 bg-gray-100 rounded w-64 animate-pulse" />
          </div>
          
          {/* Barra de filtros skeleton */}
          <div className="py-3">
            <div className="flex items-center gap-4">
              {/* Filtros skeleton */}
              <div className="h-10 bg-gray-100 rounded-full w-40 animate-pulse" />
              <div className="h-10 bg-gray-100 rounded-full w-32 animate-pulse" />
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex gap-2">
                <div className="h-10 w-10 bg-gray-100 rounded-full animate-pulse" />
                <div className="h-10 w-10 bg-gray-100 rounded-full animate-pulse" />
                <div className="h-10 w-10 bg-gray-100 rounded-full animate-pulse" />
                <div className="h-10 w-10 bg-gray-100 rounded-full animate-pulse" />
              </div>
              <div className="flex-1" />
              <div className="h-10 bg-gray-100 rounded-full w-44 animate-pulse" />
            </div>
          </div>
        </Container>
      </section>

      {/* Grid de propiedades skeleton */}
      <section className="pt-32 pb-12">
        <Container>
          {/* Grid de cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <PropertyCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

/**
 * PropertyCardSkeleton
 * 
 * Skeleton de una tarjeta de propiedad individual
 */
function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden border-0 shadow-sm bg-white rounded-xl">
      {/* Imagen skeleton */}
      <div className="relative h-52 bg-gray-100 animate-pulse">
        {/* Badges skeleton */}
        <div className="absolute top-3 left-3 flex gap-2">
          <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse" />
        </div>
      </div>

      {/* Contenido skeleton */}
      <div className="p-5">
        {/* Ubicación skeleton */}
        <div className="h-3 bg-gray-100 rounded w-1/3 mb-2 animate-pulse" />
        
        {/* Título skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-5 bg-gray-100 rounded animate-pulse" />
          <div className="h-5 bg-gray-100 rounded w-4/5 animate-pulse" />
        </div>

        {/* Características skeleton */}
        <div className="flex gap-4 mb-4">
          <div className="h-4 bg-gray-100 rounded w-12 animate-pulse" />
          <div className="h-4 bg-gray-100 rounded w-12 animate-pulse" />
          <div className="h-4 bg-gray-100 rounded w-16 animate-pulse" />
        </div>

        {/* Precio skeleton */}
        <div className="pt-4 border-t border-gray-100">
          <div className="h-7 bg-gray-100 rounded w-32 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
