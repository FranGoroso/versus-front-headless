/**
 * PropertyFilters Component (v5.0 - Dropdown Compact Version)
 * 
 * Barra de filtros fija minimalista con dropdown desplegable.
 * 
 * VERSIÓN 5.0: Nuevo diseño con dropdown
 * - Botón "Filtros" que abre dropdown con todos los filtros
 * - Estado local: filtros no se aplican hasta hacer click en "Buscar"
 * - Nuevos filtros: Precio min/max, Baños, Superficie min/max, Estado
 * - Loader mientras se aplican filtros
 * - Diseño compacto para barra fija superior
 * 
 * @component
 * @version 5.0.0
 * @updated 2025-10-30 - Diseño dropdown con nuevos filtros
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { PropertyLoader } from '@/components/property/PropertyLoader';
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
  /** Estados de propiedades disponibles desde WordPress */
  propertyStatuses?: WPTaxonomy[];
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
 * Opciones de habitaciones/baños
 */
const ROOMS_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4+' },
] as const;

/**
 * Interface para el estado local de filtros
 */
interface FilterState {
  tipo: string;
  ciudad: string;
  estado: string;
  habitaciones: string;
  banos: string;
  precio_min: string;
  precio_max: string;
  superficie_min: string;
  superficie_max: string;
  orden: string;
}

/**
 * Componente principal de filtros con dropdown
 */
export function PropertyFilters({ 
  propertyCount, 
  propertyTypes,
  propertyCities,
  propertyStatuses = []
}: PropertyFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Estado del dropdown (abierto/cerrado)
  const [isOpen, setIsOpen] = useState(false);

  // Estado del loader (mostrar spinner de carga)
  const [isLoading, setIsLoading] = useState(false);

  // Estado local de filtros (no se aplican hasta hacer click en "Buscar")
  const [filters, setFilters] = useState<FilterState>({
    tipo: searchParams.get('tipo') || '',
    ciudad: searchParams.get('ciudad') || '',
    estado: searchParams.get('estado') || '',
    habitaciones: searchParams.get('habitaciones') || '',
    banos: searchParams.get('banos') || '',
    precio_min: searchParams.get('precio_min') || '',
    precio_max: searchParams.get('precio_max') || '',
    superficie_min: searchParams.get('superficie_min') || '',
    superficie_max: searchParams.get('superficie_max') || '',
    orden: searchParams.get('orden') || 'date-desc',
  });

  // Sincronizar estado local con URL cuando cambia
  useEffect(() => {
    setFilters({
      tipo: searchParams.get('tipo') || '',
      ciudad: searchParams.get('ciudad') || '',
      estado: searchParams.get('estado') || '',
      habitaciones: searchParams.get('habitaciones') || '',
      banos: searchParams.get('banos') || '',
      precio_min: searchParams.get('precio_min') || '',
      precio_max: searchParams.get('precio_max') || '',
      superficie_min: searchParams.get('superficie_min') || '',
      superficie_max: searchParams.get('superficie_max') || '',
      orden: searchParams.get('orden') || 'date-desc',
    });
  }, [searchParams]);

  /**
   * Actualizar un filtro en el estado local (sin aplicar a URL aún)
   */
  const updateLocalFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  /**
   * Aplicar filtros a la URL (cuando se hace click en "Buscar")
   * Activa el loader durante 800ms para feedback visual
   */
  const applyFilters = () => {
    // Activar loader
    setIsLoading(true);
    
    const params = new URLSearchParams();
    
    // Agregar solo filtros con valores
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value);
      }
    });
    
    // Resetear página al cambiar filtros
    params.delete('page');
    
    // Cerrar dropdown
    setIsOpen(false);
    
    // Navegar a la nueva URL
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    
    // Desactivar loader después de 800ms (tiempo de transición suave)
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  /**
   * Limpiar todos los filtros
   */
  const clearFilters = () => {
    setFilters({
      tipo: '',
      ciudad: '',
      estado: '',
      habitaciones: '',
      banos: '',
      precio_min: '',
      precio_max: '',
      superficie_min: '',
      superficie_max: '',
      orden: 'date-desc',
    });
    setIsOpen(false);
    router.push(pathname, { scroll: false });
  };

  /**
   * Verificar si hay filtros activos (excluyendo orden por defecto)
   */
  const hasActiveFilters = filters.tipo || filters.ciudad || filters.estado || 
                           filters.habitaciones || filters.banos || 
                           filters.precio_min || filters.precio_max || 
                           filters.superficie_min || filters.superficie_max ||
                           (filters.orden && filters.orden !== 'date-desc');

  /**
   * Cerrar dropdown al hacer click fuera
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.filters-dropdown')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed top-[80px] left-0 right-0 z-40 backdrop-blur-xl bg-white/80 border-b border-gray-100 shadow-sm transition-all duration-300">
      <Container>
        <div className="py-3">
          
          {/* Barra superior minimalista */}
          <div className="flex items-center justify-between gap-4">
            
            {/* Botón Filtros con dropdown */}
            <div className="relative filters-dropdown">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                  flex items-center gap-2 h-10 px-4 rounded-full 
                  bg-white border-2 transition-all duration-300
                  ${hasActiveFilters 
                    ? 'border-gray-900 text-gray-900' 
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {/* Icono de filtro */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="font-light text-sm">Filtros</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
                )}
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown con filtros */}
              {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-[380px] max-h-[calc(100vh-180px)] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 animate-fadeIn custom-scrollbar">
                  <div className="space-y-4">
                    
                    {/* Tipo de propiedad */}
                    <div>
                      <label className="block text-xs font-light text-gray-600 mb-1.5">
                        Tipo de propiedad
                      </label>
                      <div className="relative">
                        <select
                          value={filters.tipo}
                          onChange={(e) => updateLocalFilter('tipo', e.target.value)}
                          className="w-full appearance-none h-10 pl-3 pr-8 bg-gray-50 border border-gray-200 rounded-lg text-sm font-light text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                        >
                          <option value="">Todos los tipos</option>
                          {propertyTypes?.map((type) => (
                            <option key={type.id} value={type.slug}>
                              {type.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Parroquia */}
                    <div>
                      <label className="block text-xs font-light text-gray-600 mb-1.5">
                        Parroquia
                      </label>
                      <div className="relative">
                        <select
                          value={filters.ciudad}
                          onChange={(e) => updateLocalFilter('ciudad', e.target.value)}
                          className="w-full appearance-none h-10 pl-3 pr-8 bg-gray-50 border border-gray-200 rounded-lg text-sm font-light text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                        >
                          <option value="">Todas las parroquias</option>
                          {propertyCities?.map((city) => (
                            <option key={city.id} value={city.slug}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Estado */}
                    {propertyStatuses.length > 0 && (
                      <div>
                        <label className="block text-xs font-light text-gray-600 mb-1.5">
                          Estado
                        </label>
                        <div className="relative">
                          <select
                            value={filters.estado}
                            onChange={(e) => updateLocalFilter('estado', e.target.value)}
                            className="w-full appearance-none h-10 pl-3 pr-8 bg-gray-50 border border-gray-200 rounded-lg text-sm font-light text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                          >
                            <option value="">Todos los estados</option>
                            {propertyStatuses?.map((status) => (
                              <option key={status.id} value={status.slug}>
                                {status.name}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Habitaciones */}
                    <div>
                      <label className="block text-xs font-light text-gray-600 mb-1.5">
                        Habitaciones
                      </label>
                      <div className="flex gap-2">
                        {ROOMS_OPTIONS.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => updateLocalFilter('habitaciones', filters.habitaciones === option.value ? '' : option.value)}
                            className={`
                              flex-1 h-10 rounded-lg text-sm font-light transition-all duration-300
                              ${filters.habitaciones === option.value
                                ? 'bg-gray-900 text-white shadow-md'
                                : 'bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300'
                              }
                            `}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Baños */}
                    <div>
                      <label className="block text-xs font-light text-gray-600 mb-1.5">
                        Baños
                      </label>
                      <div className="flex gap-2">
                        {ROOMS_OPTIONS.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => updateLocalFilter('banos', filters.banos === option.value ? '' : option.value)}
                            className={`
                              flex-1 h-10 rounded-lg text-sm font-light transition-all duration-300
                              ${filters.banos === option.value
                                ? 'bg-gray-900 text-white shadow-md'
                                : 'bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300'
                              }
                            `}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Precio */}
                    <div>
                      <label className="block text-xs font-light text-gray-600 mb-1.5">
                        Precio (€)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          placeholder="Mínimo"
                          value={filters.precio_min}
                          onChange={(e) => updateLocalFilter('precio_min', e.target.value)}
                          className="h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-light text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                        />
                        <input
                          type="number"
                          placeholder="Máximo"
                          value={filters.precio_max}
                          onChange={(e) => updateLocalFilter('precio_max', e.target.value)}
                          className="h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-light text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Superficie */}
                    <div>
                      <label className="block text-xs font-light text-gray-600 mb-1.5">
                        Superficie (m²)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          placeholder="Mínimo"
                          value={filters.superficie_min}
                          onChange={(e) => updateLocalFilter('superficie_min', e.target.value)}
                          className="h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-light text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                        />
                        <input
                          type="number"
                          placeholder="Máximo"
                          value={filters.superficie_max}
                          onChange={(e) => updateLocalFilter('superficie_max', e.target.value)}
                          className="h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-light text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={applyFilters}
                        className="flex-1 h-11 bg-gray-900 text-white rounded-lg font-light text-sm hover:bg-black transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Buscar
                      </button>
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="px-4 h-11 bg-gray-100 text-gray-700 rounded-lg font-light text-sm hover:bg-gray-200 transition-all duration-300"
                        >
                          Limpiar
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Ordenar */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-light text-gray-600 hidden md:inline">Ordenar:</span>
              <div className="relative">
                <select
                  value={filters.orden}
                  onChange={(e) => {
                    updateLocalFilter('orden', e.target.value);
                    // Aplicar orden inmediatamente (sin necesidad de "Buscar")
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('orden', e.target.value);
                    router.push(`${pathname}?${params.toString()}`, { scroll: false });
                  }}
                  className="appearance-none h-10 pl-3 pr-8 bg-white border border-gray-200 rounded-full text-sm font-light text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all cursor-pointer"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Contador de propiedades */}
            <div className="hidden md:block text-sm font-light text-gray-500">
              {propertyCount} {propertyCount === 1 ? 'propiedad' : 'propiedades'}
            </div>

          </div>

        </div>
      </Container>

      {/* Loader de búsqueda */}
      {isLoading && <PropertyLoader />}
    </div>
  );
}
