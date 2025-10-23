/**
 * PropertyCard Component
 * 
 * Tarjeta de propiedad para mostrar en listados y grids.
 * Incluye imagen, título, ubicación, características y precio.
 * 
 * @component
 * @example
 * ```tsx
 * <PropertyCard property={propertyData} />
 * ```
 */

import Image from 'next/image';
import Link from 'next/link';
import { PropertyCard as PropertyCardType } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/wordpress';

interface PropertyCardProps {
  property: PropertyCardType;
  priority?: boolean;
}

export function PropertyCard({ property, priority = false }: PropertyCardProps) {
  /**
   * Construir la URL de la propiedad
   * Formato: /propiedades/[slug]
   */
  const propertyUrl = `/propiedades/${property.slug}`;

  /**
   * Validar que los datos mínimos estén presentes
   */
  if (!property.id || !property.slug) {
    return null;
  }

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
      {/* Imagen de la propiedad */}
      <Link href={propertyUrl} className="block relative h-80 overflow-hidden">
        {property.featured_image ? (
          <Image
            src={property.featured_image}
            alt={property.title || 'Propiedad'}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Sin imagen</span>
          </div>
        )}
        
        {/* Badge de destacado */}
        {property.featured && (
          <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-medium">
            Destacada
          </div>
        )}
      </Link>

      {/* Contenido de la tarjeta */}
      <div className="p-8">
        {/* Título */}
        <Link href={propertyUrl}>
          <h3 className="font-serif text-2xl font-bold mb-2 line-clamp-2 hover:text-gray-600 transition-colors">
            {property.title}
          </h3>
        </Link>

        {/* Ubicación */}
        {(property.address || property.city) && (
          <p className="text-gray-600 mb-4 line-clamp-1 text-sm">
            {property.address || property.city || 'Andorra'}
          </p>
        )}

        {/* Características (habitaciones, baños, área) */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b">
          {property.bedrooms && property.bedrooms !== '0' && (
            <>
              <span className="flex items-center gap-1">
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                  />
                </svg>
                {property.bedrooms} hab.
              </span>
              <span aria-hidden="true">•</span>
            </>
          )}
          
          {property.bathrooms && property.bathrooms !== '0' && (
            <>
              <span className="flex items-center gap-1">
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
                {property.bathrooms} baños
              </span>
              <span aria-hidden="true">•</span>
            </>
          )}
          
          {property.area && (
            <span className="flex items-center gap-1">
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" 
                />
              </svg>
              {property.area}{property.area_unit}
            </span>
          )}
        </div>

        {/* Precio y botón */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1">Precio</p>
            <p className="font-serif text-3xl font-bold">
              {formatPrice(property.price)}
            </p>
          </div>
          
          <Link href={propertyUrl}>
            <Button 
              variant="ghost" 
              className="rounded-full hover:bg-black hover:text-white transition-colors"
              aria-label={`Ver detalles de ${property.title}`}
            >
              Ver más
            </Button>
          </Link>
        </div>

        {/* Tipo y estado (si están disponibles) */}
        {(property.type || property.status) && (
          <div className="mt-4 pt-4 border-t flex gap-2 flex-wrap">
            {property.type && (
              <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                {property.type}
              </span>
            )}
            {property.status && (
              <span className="text-xs bg-blue-100 px-3 py-1 rounded-full text-blue-700">
                {property.status}
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

/**
 * PropertyCardSkeleton
 * 
 * Skeleton loader para mostrar mientras cargan las propiedades
 */
export function PropertyCardSkeleton() {
  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <div className="relative h-80 bg-gray-200 animate-pulse" />
      <div className="p-8">
        <div className="h-8 bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4 animate-pulse" />
        <div className="flex gap-4 mb-6 pb-6 border-b">
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded-full w-24 animate-pulse" />
        </div>
      </div>
    </Card>
  );
}
