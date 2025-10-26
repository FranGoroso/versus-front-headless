/**
 * PropertyCard Component
 * 
 * Tarjeta de propiedad minimalista y elegante con detalles en color brand.
 * Diseño compacto con énfasis en la simplicidad y toques visuales sutiles.
 * 
 * Mejoras visuales v3.0:
 * - Borde superior amarillo en hover (sutil pero elegante)
 * - Badge "Destacada" con fondo brand (#E6E258)
 * - Badge de tipo de propiedad (Chalet, Ático, etc.)
 * - Badge de estado (Venta/Alquiler) en esquina superior derecha
 * - Ciudad mostrada si no hay dirección específica
 * - Precio con acento brand al hacer hover
 * - Iconos con transición suave a color brand
 * - Flecha de navegación con efecto brand en hover
 * - Overlay de imagen con gradiente más rico
 * 
 * @component
 * @version 3.0.0
 * @updated 2025-10-26
 * @example
 * ```tsx
 * <PropertyCard property={propertyData} />
 * ```
 */

import Image from 'next/image';
import Link from 'next/link';
import { PropertyCard as PropertyCardType } from '@/types';
import { Card } from '@/components/ui/card';
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
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-500 bg-white
                     relative before:absolute before:top-0 before:left-0 before:right-0 before:h-1 
                     before:bg-brand before:scale-x-0 before:origin-left 
                     before:transition-transform before:duration-500 
                     hover:before:scale-x-100">
      {/* Imagen de la propiedad */}
      <Link href={propertyUrl} className="block relative h-52 overflow-hidden bg-gray-100">
        {property.featured_image ? (
          <Image
            src={property.featured_image}
            alt={property.title || 'Propiedad'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm font-light">Sin imagen</span>
          </div>
        )}
        
        {/* Badges de taxonomías - lado izquierdo */}
        <div className="absolute top-3 left-3 flex gap-2">
          {/* Badge de destacado */}
          {property.featured && (
            <div className="bg-brand text-gray-900 px-3 py-1 rounded-full text-xs font-medium shadow-lg">
              Destacada
            </div>
          )}
          
          {/* Badge de tipo de propiedad */}
          {property.type && (
            <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-light shadow-md">
              {property.type}
            </div>
          )}
        </div>

        {/* Badge de estado (Venta/Alquiler) - esquina superior derecha */}
        {property.status && (
          <div className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-light shadow-md">
            {property.status}
          </div>
        )}

        {/* Overlay con gradiente mejorado - visible on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-2xl font-light tracking-tight drop-shadow-lg">
              {formatPrice(property.price)}
            </p>
          </div>
        </div>
      </Link>

      {/* Contenido de la tarjeta */}
      <div className="p-5">
        {/* Ubicación - priorizar ciudad si no hay address */}
        {(property.city || property.address) && (
          <p className="text-gray-500 text-xs font-light mb-2 uppercase tracking-wider">
            {property.address || property.city}
          </p>
        )}

        {/* Título */}
        <Link href={propertyUrl}>
          <h3 className="text-lg font-light tracking-tight text-gray-900 mb-3 line-clamp-2 
                         hover:text-gray-600 transition-colors duration-300">
            {property.title}
          </h3>
        </Link>

        {/* Características con iconos que cambian a brand en hover */}
        <div className="flex items-center gap-4 text-sm text-gray-600 font-light mb-4">
          {property.bedrooms && property.bedrooms !== '0' && (
            <span className="flex items-center gap-1.5 group/icon">
              <span className="text-gray-400 group-hover/icon:text-brand transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </span>
              <span className="group-hover/icon:text-black transition-colors duration-300">
                {property.bedrooms}
              </span>
            </span>
          )}
          
          {property.bathrooms && property.bathrooms !== '0' && (
            <span className="flex items-center gap-1.5 group/icon">
              <span className="text-gray-400 group-hover/icon:text-brand transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0V5a2 2 0 00-2-2H6a2 2 0 00-2 2v2m16 0h-2.5M4 7h2.5" />
                </svg>
              </span>
              <span className="group-hover/icon:text-black transition-colors duration-300">
                {property.bathrooms}
              </span>
            </span>
          )}
          
          {property.area && (
            <span className="flex items-center gap-1.5 group/icon">
              <span className="text-gray-400 group-hover/icon:text-brand transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </span>
              <span className="group-hover/icon:text-black transition-colors duration-300">
                {property.area} {property.area_unit}
              </span>
            </span>
          )}
        </div>

        {/* Precio y enlace con efectos brand */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-2xl font-light tracking-tight text-gray-900 group-hover:text-brand transition-colors duration-300">
              {formatPrice(property.price)}
            </p>
          </div>
          
          {/* Flecha con efecto brand */}
          <Link href={propertyUrl}>
            <span className="text-gray-900 hover:text-brand group-hover:translate-x-1 transition-all duration-300 inline-block text-xl">
              →
            </span>
          </Link>
        </div>
      </div>
    </Card>
  );
}

/**
 * PropertyCardSkeleton
 * 
 * Skeleton loader minimalista para las cards con animación suave
 */
export function PropertyCardSkeleton() {
  return (
    <Card className="overflow-hidden border-0 shadow-sm bg-white">
      <div className="relative h-52 bg-gray-100 animate-pulse" />
      <div className="p-5">
        <div className="h-3 bg-gray-100 rounded w-1/3 mb-2 animate-pulse" />
        <div className="h-5 bg-gray-100 rounded mb-3 animate-pulse" />
        <div className="flex gap-4 mb-4">
          <div className="h-4 bg-gray-100 rounded w-12 animate-pulse" />
          <div className="h-4 bg-gray-100 rounded w-12 animate-pulse" />
          <div className="h-4 bg-gray-100 rounded w-16 animate-pulse" />
        </div>
        <div className="pt-4 border-t border-gray-100">
          <div className="h-7 bg-gray-100 rounded w-32 animate-pulse" />
        </div>
      </div>
    </Card>
  );
}

/**
 * PropertyCardCompact
 * 
 * Versión compacta para sidebars con toques brand en hover
 */
export function PropertyCardCompact({ property }: PropertyCardProps) {
  const propertyUrl = `/propiedades/${property.slug}`;

  if (!property.id || !property.slug) {
    return null;
  }

  return (
    <Link href={propertyUrl} className="group/compact block">
      <div className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-300 
                      border border-transparent hover:border-brand/20">
        {/* Imagen thumbnail */}
        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          {property.featured_image ? (
            <Image
              src={property.featured_image}
              alt={property.title || 'Propiedad'}
              fill
              className="object-cover group-hover/compact:scale-105 transition-transform duration-500"
              sizes="96px"
            />
          ) : (
            <div className="w-full h-full bg-gray-100" />
          )}
          
          {/* Badge mini para destacadas */}
          {property.featured && (
            <div className="absolute top-1 right-1 w-2 h-2 bg-brand rounded-full" />
          )}
        </div>

        {/* Info compacta */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-light text-gray-900 line-clamp-2 mb-1 
                         group-hover/compact:text-gray-600 transition-colors">
            {property.title}
          </h4>
          <p className="text-xs text-gray-500 font-light mb-2 
                        group-hover/compact:text-brand transition-colors duration-300">
            {property.city || property.address || 'Andorra'}
          </p>
          <p className="text-base font-light text-gray-900 group-hover/compact:text-brand transition-colors duration-300">
            {formatPrice(property.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}
