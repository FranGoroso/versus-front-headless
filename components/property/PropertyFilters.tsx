/**
 * PropertyFilters Component (v4.0 - Production Ready)
 * 
 * Barra de filtros fija con glassmorphism para la página de listado de propiedades.
 * VERSIÓN 4.0: Diseño profesional sin emojis, código limpio sin debug logs
 * 
 * Características v4.0:
 * - ✅ Diseño profesional con iconos SVG (sin emojis)
 * - ✅ Código limpio (debug logs removidos)
 * - ✅ Filtros funcionales con URL state management
 * - ✅ Taxonomías dinámicas desde WordPress API
 * - ✅ Glassmorphism effect premium
 * - ✅ Posición fixed siempre visible
 * - ✅ Responsive mobile optimizado
 * - ✅ Back button compatible
 * 
 * @component
 * @version 4.0.0
 * @created 2025-10-26
 * @updated 2025-10-28 - Diseño profesional sin emojis
 */

'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { WPTaxonomy } from '@/types';

/**
 * Props del componente PropertyFilters
 */
interface PropertyFiltersProps {
  /** Número total de propiedades (para mostrar contador) */
  propertyCount: number;
  /** Tipos de propiedades disponibles desde WordPress */
  propertyTypes: WPTaxonomy[];
  /** Ciudades/parroquias disponibles desde WordPress */
  propertyCities: WPTaxonomy[];
}

/**
 * Opciones de ordenamiento disponibles
 */
const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Más recientes' },
  { value: 'date-asc', label: 'Más antiguos' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
] as const;

/**
 * Opciones de habitaciones
 */
const BEDROOMS_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4+' },
] as const;

/**
 * Componente principal de filtros funcionales
 */
export function PropertyFilters({ 
  propertyCount, 
  propertyTypes,
  propertyCities 
}: PropertyFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * Obtener valores actuales de los filtros desde URL
   */
  const currentType = searchParams.get('tipo') || '';
  const currentCity = searchParams.get('ciudad') || '';
  const currentBedrooms = searchParams.get('habitaciones') || '';
  const currentSort = searchParams.get('orden') || 'date-desc';

  /**
   * Actualizar un filtro específico
   * Construye nueva URL con el parámetro actualizado
   */
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== '') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Resetear página al cambiar filtros
    params.delete('page');
    
    // Navegar a la nueva URL
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  /**
   * Limpiar todos los filtros
   */
  const clearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  /**
   * Verificar si hay filtros activos
   */
  const hasActiveFilters = currentType || currentCity || currentBedrooms || (currentSort && currentSort !== 'date-desc');

  return (
    <div className="fixed top-[80px] left-0 right-0 z-40 backdrop-blur-xl bg-white/80 border-b border-gray-100 shadow-sm transition-all duration-300">
      <Container>
        <div className="py-3">
          
          {/* DESKTOP VIEW */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Filtro: Tipo de Propiedad */}
            <div className="relative">
              <select
                value={currentType}
                onChange={(e) => updateFilter('tipo', e.target.value)}
                className="appearance-none h-10 pl-4 pr-10 bg-white/90 border border-gray-200 rounded-full text-sm font-light text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 cursor-pointer backdrop-blur-sm"
              >
                <option value="">Tipo de propiedad</option>
                {propertyTypes?.map((type) => (
                  <option key={type.id} value={type.slug}>
                    {type.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Filtro: Ciudad/Parroquia */}
            <div className="relative">
              <select
                value={currentCity}
                onChange={(e) => updateFilter('ciudad', e.target.value)}
                className="appearance-none h-10 pl-4 pr-10 bg-white/90 border border-gray-200 rounded-full text-sm font-light text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 cursor-pointer backdrop-blur-sm"
              >
                <option value="">Parroquia</option>
                {propertyCities?.map((city) => (
                  <option key={city.id} value={city.slug}>
                    {city.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Separador visual */}
            <div className="h-6 w-px bg-gray-200"></div>

            {/* Filtro: Habitaciones */}
            <div className="flex items-center gap-2">
              {/* Icono SVG profesional de cama */}
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                      d="M3 12h18M3 12v6h18v-6M3 12V9a3 3 0 013-3h12a3 3 0 013 3v3M7 21v-3m10 3v-3" />
              </svg>
              <div className="flex gap-1">
                {BEDROOMS_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFilter('habitaciones', currentBedrooms === option.value ? '' : option.value)}
                    className={`
                      w-10 h-10 rounded-full text-sm font-light transition-all duration-300
                      ${currentBedrooms === option.value
                        ? 'bg-gray-900 text-white shadow-md hover:bg-black'
                        : 'bg-white/90 text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Espaciador flexible */}
            <div className="flex-1"></div>

            {/* Ordenar */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-light text-gray-600">Ordenar:</span>
              <select
                value={currentSort}
                onChange={(e) => updateFilter('orden', e.target.value)}
                className="appearance-none h-10 pl-4 pr-10 bg-white/90 border border-gray-200 rounded-full text-sm font-light text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 cursor-pointer backdrop-blur-sm"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Botón Limpiar Filtros */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="h-10 px-4 rounded-full bg-gray-100 text-gray-700 text-sm font-light hover:bg-gray-200 transition-all duration-300"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {/* MOBILE VIEW */}
          <div className="md:hidden">
            <div className="flex flex-col gap-3">
              
              {/* Fila 1: Tipo y Ciudad */}
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <select
                    value={currentType}
                    onChange={(e) => updateFilter('tipo', e.target.value)}
                    className="w-full appearance-none h-10 pl-3 pr-8 bg-white/90 border border-gray-200 rounded-full text-xs font-light text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  >
                    <option value="">Tipo</option>
                    {propertyTypes?.map((type) => (
                      <option key={type.id} value={type.slug}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <select
                    value={currentCity}
                    onChange={(e) => updateFilter('ciudad', e.target.value)}
                    className="w-full appearance-none h-10 pl-3 pr-8 bg-white/90 border border-gray-200 rounded-full text-xs font-light text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  >
                    <option value="">Parroquia</option>
                    {propertyCities?.map((city) => (
                      <option key={city.id} value={city.slug}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Fila 2: Habitaciones y Ordenar */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {/* Icono SVG profesional de cama (mobile) */}
                  <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                          d="M3 12h18M3 12v6h18v-6M3 12V9a3 3 0 013-3h12a3 3 0 013 3v3M7 21v-3m10 3v-3" />
                  </svg>
                  {BEDROOMS_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateFilter('habitaciones', currentBedrooms === option.value ? '' : option.value)}
                      className={`
                        w-8 h-8 rounded-full text-xs font-light transition-all
                        ${currentBedrooms === option.value
                          ? 'bg-gray-900 text-white'
                          : 'bg-white/90 text-gray-700 border border-gray-200'
                        }
                      `}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <div className="relative flex-1 max-w-[140px]">
                  <select
                    value={currentSort}
                    onChange={(e) => updateFilter('orden', e.target.value)}
                    className="w-full appearance-none h-8 pl-3 pr-7 bg-white/90 border border-gray-200 rounded-full text-xs font-light text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Botón Limpiar (mobile) */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full h-8 rounded-full bg-gray-100 text-gray-700 text-xs font-light hover:bg-gray-200 transition-all"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
