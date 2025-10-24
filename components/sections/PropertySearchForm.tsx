/**
 * Property Search Form Component
 * 
 * Formulario de búsqueda de propiedades con diseño minimalista.
 * Mantiene la estética elegante del sitio con tipografía light y animaciones sutiles.
 * 
 * @component
 * @version 1.0.0
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Tipos de datos para el componente
 */
interface SearchFilters {
  operation: 'buy' | 'rent';
  location: string;
  propertyType: string;
  priceMin: string;
  priceMax: string;
  bedrooms: string;
  bathrooms: string;
  surfaceMin: string;
  surfaceMax: string;
  features: string[];
}

interface LocationSuggestion {
  id: string;
  name: string;
  type: 'parish' | 'area' | 'city';
}

/**
 * Props del componente
 */
interface PropertySearchFormProps {
  variant?: 'default' | 'hero' | 'compact';
  className?: string;
  onSearch?: (filters: SearchFilters) => void;
}

/**
 * Datos mock de ubicaciones en Andorra
 */
const ANDORRA_LOCATIONS: LocationSuggestion[] = [
  { id: '1', name: 'Andorra la Vella', type: 'parish' },
  { id: '2', name: 'Escaldes-Engordany', type: 'parish' },
  { id: '3', name: 'Encamp', type: 'parish' },
  { id: '4', name: 'La Massana', type: 'parish' },
  { id: '5', name: 'Ordino', type: 'parish' },
  { id: '6', name: 'Sant Julià de Lòria', type: 'parish' },
  { id: '7', name: 'Canillo', type: 'parish' },
  { id: '8', name: 'Pas de la Casa', type: 'area' },
  { id: '9', name: 'Soldeu', type: 'area' },
  { id: '10', name: 'El Tarter', type: 'area' },
];

/**
 * Tipos de propiedad
 */
const PROPERTY_TYPES = [
  { value: '', label: 'Todos los tipos' },
  { value: 'apartment', label: 'Piso' },
  { value: 'house', label: 'Casa' },
  { value: 'chalet', label: 'Chalet' },
  { value: 'penthouse', label: 'Ático' },
  { value: 'duplex', label: 'Dúplex' },
  { value: 'studio', label: 'Estudio' },
  { value: 'land', label: 'Terreno' },
  { value: 'commercial', label: 'Local comercial' },
  { value: 'parking', label: 'Parking' },
];

/**
 * Rangos de precio para compra
 */
const BUY_PRICE_RANGES = [
  { value: '', label: 'Precio máximo' },
  { value: '300000', label: '300.000€' },
  { value: '500000', label: '500.000€' },
  { value: '750000', label: '750.000€' },
  { value: '1000000', label: '1.000.000€' },
  { value: '1500000', label: '1.500.000€' },
  { value: '2000000', label: '2.000.000€' },
  { value: '3000000', label: '3.000.000€' },
  { value: '5000000', label: '5.000.000€' },
];

/**
 * Rangos de precio para alquiler
 */
const RENT_PRICE_RANGES = [
  { value: '', label: 'Precio máximo' },
  { value: '800', label: '800€/mes' },
  { value: '1200', label: '1.200€/mes' },
  { value: '1500', label: '1.500€/mes' },
  { value: '2000', label: '2.000€/mes' },
  { value: '2500', label: '2.500€/mes' },
  { value: '3000', label: '3.000€/mes' },
  { value: '4000', label: '4.000€/mes' },
  { value: '5000', label: '5.000€/mes' },
];

/**
 * Opciones de habitaciones
 */
const BEDROOM_OPTIONS = [
  { value: '', label: 'Habitaciones' },
  { value: '1', label: '1 hab.' },
  { value: '2', label: '2 hab.' },
  { value: '3', label: '3 hab.' },
  { value: '4', label: '4 hab.' },
  { value: '5+', label: '5+ hab.' },
];

/**
 * Características adicionales
 */
const PROPERTY_FEATURES = [
  { id: 'terrace', label: 'Terraza', icon: '🏠' },
  { id: 'parking', label: 'Parking', icon: '🚗' },
  { id: 'elevator', label: 'Ascensor', icon: '🔼' },
  { id: 'pool', label: 'Piscina', icon: '🏊' },
  { id: 'garden', label: 'Jardín', icon: '🌳' },
  { id: 'storage', label: 'Trastero', icon: '📦' },
  { id: 'mountain_views', label: 'Vistas montaña', icon: '🏔️' },
  { id: 'new_construction', label: 'Obra nueva', icon: '✨' },
];

/**
 * Componente de búsqueda de propiedades
 */
export function PropertySearchForm({
  variant = 'default',
  className = '',
  onSearch
}: PropertySearchFormProps) {
  const router = useRouter();
  const locationInputRef = useRef<HTMLInputElement>(null);
  
  // Estado del formulario
  const [filters, setFilters] = useState<SearchFilters>({
    operation: 'buy',
    location: '',
    propertyType: '',
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    bathrooms: '',
    surfaceMin: '',
    surfaceMax: '',
    features: []
  });

  // Estado de UI
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  /**
   * Filtrar sugerencias de ubicación
   */
  useEffect(() => {
    if (filters.location.length > 0) {
      const filtered = ANDORRA_LOCATIONS.filter(loc =>
        loc.name.toLowerCase().includes(filters.location.toLowerCase())
      );
      setLocationSuggestions(filtered);
      setShowLocationSuggestions(filtered.length > 0);
    } else {
      setLocationSuggestions([]);
      setShowLocationSuggestions(false);
    }
  }, [filters.location]);

  /**
   * Manejar cambio en los filtros
   */
  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  /**
   * Seleccionar ubicación de las sugerencias
   */
  const handleSelectLocation = (location: LocationSuggestion) => {
    setFilters(prev => ({
      ...prev,
      location: location.name
    }));
    setShowLocationSuggestions(false);
  };

  /**
   * Manejar características seleccionadas
   */
  const handleFeatureToggle = (featureId: string) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId]
    }));
  };

  /**
   * Ejecutar búsqueda
   */
  const handleSearch = async () => {
    setIsSearching(true);
    
    // Si hay callback, usarlo
    if (onSearch) {
      onSearch(filters);
    } else {
      // Construir query string y navegar
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== '') {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v));
          } else {
            params.append(key, value);
          }
        }
      });
      
      router.push(`/propiedades?${params.toString()}`);
    }
    
    // Simular tiempo de búsqueda
    setTimeout(() => setIsSearching(false), 1000);
  };

  /**
   * Obtener rangos de precio según operación
   */
  const priceRanges = filters.operation === 'buy' ? BUY_PRICE_RANGES : RENT_PRICE_RANGES;

  return (
    <>
      <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md ${className}`}>
        {/* Tabs de Operación */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => handleFilterChange('operation', 'buy')}
              className={`
                px-8 py-2.5 rounded-full text-sm font-light transition-all duration-300
                ${filters.operation === 'buy'
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              Comprar
            </button>
            <button
              onClick={() => handleFilterChange('operation', 'rent')}
              className={`
                px-8 py-2.5 rounded-full text-sm font-light transition-all duration-300
                ${filters.operation === 'rent'
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              Alquilar
            </button>
          </div>
        </div>

        {/* Campo de búsqueda principal */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <input
            ref={locationInputRef}
            type="text"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            onFocus={() => setShowLocationSuggestions(locationSuggestions.length > 0)}
            placeholder="Buscar por ubicación o referencia..."
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-full
                       font-light text-gray-900 placeholder-gray-500
                       focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900
                       transition-all duration-300"
          />
          
          {/* Dropdown de sugerencias */}
          {showLocationSuggestions && (
            <div className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 py-2">
              {locationSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSelectLocation(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200
                           flex items-center justify-between group"
                >
                  <span className="font-light text-gray-900">{suggestion.name}</span>
                  <span className="text-xs text-gray-500 font-light">
                    {suggestion.type === 'parish' ? 'Parroquia' : 'Zona'}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filtros rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Tipo de propiedad */}
          <select
            value={filters.propertyType}
            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-full
                     font-light text-gray-900 bg-white
                     focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900
                     transition-all duration-300 cursor-pointer"
          >
            {PROPERTY_TYPES.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          {/* Precio */}
          <select
            value={filters.priceMax}
            onChange={(e) => handleFilterChange('priceMax', e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-full
                     font-light text-gray-900 bg-white
                     focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900
                     transition-all duration-300 cursor-pointer"
          >
            {priceRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>

          {/* Habitaciones */}
          <select
            value={filters.bedrooms}
            onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-full
                     font-light text-gray-900 bg-white
                     focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900
                     transition-all duration-300 cursor-pointer"
          >
            {BEDROOM_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="px-6 py-3 text-gray-700 font-light border border-gray-200 rounded-full
                     hover:border-gray-900 hover:bg-gray-50 transition-all duration-300
                     flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Más filtros
            {filters.features.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-gray-900 text-white text-xs rounded-full">
                {filters.features.length}
              </span>
            )}
          </button>

          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="px-8 py-3 bg-gray-900 text-white rounded-full
                     hover:bg-gray-800 transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2 flex-1 sm:flex-initial"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {isSearching ? 'Buscando...' : 'Buscar propiedades'}
          </button>
        </div>
      </div>

      {/* Modal de filtros avanzados */}
      {showAdvancedFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
             onClick={() => setShowAdvancedFilters(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
               onClick={(e) => e.stopPropagation()}>
            
            {/* Header del modal */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-light text-gray-900">Filtros avanzados</h3>
              <button
                onClick={() => setShowAdvancedFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Rango de precio detallado */}
              <div>
                <label className="block text-sm font-light text-gray-700 mb-3">
                  Rango de precio {filters.operation === 'rent' ? '(€/mes)' : '(€)'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={filters.priceMin}
                    onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                    placeholder="Mínimo"
                    className="px-4 py-2.5 border border-gray-200 rounded-full font-light
                             focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900
                             transition-all duration-300"
                  />
                  <input
                    type="number"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                    placeholder="Máximo"
                    className="px-4 py-2.5 border border-gray-200 rounded-full font-light
                             focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900
                             transition-all duration-300"
                  />
                </div>
              </div>

              {/* Superficie */}
              <div>
                <label className="block text-sm font-light text-gray-700 mb-3">
                  Superficie (m²)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={filters.surfaceMin}
                    onChange={(e) => handleFilterChange('surfaceMin', e.target.value)}
                    placeholder="Mínimo"
                    className="px-4 py-2.5 border border-gray-200 rounded-full font-light
                             focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900
                             transition-all duration-300"
                  />
                  <input
                    type="number"
                    value={filters.surfaceMax}
                    onChange={(e) => handleFilterChange('surfaceMax', e.target.value)}
                    placeholder="Máximo"
                    className="px-4 py-2.5 border border-gray-200 rounded-full font-light
                             focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900
                             transition-all duration-300"
                  />
                </div>
              </div>

              {/* Baños */}
              <div>
                <label className="block text-sm font-light text-gray-700 mb-3">
                  Baños
                </label>
                <div className="flex gap-3">
                  {['1', '2', '3', '4+'].map(num => (
                    <button
                      key={num}
                      onClick={() => handleFilterChange('bathrooms', filters.bathrooms === num ? '' : num)}
                      className={`
                        px-4 py-2.5 rounded-full font-light transition-all duration-300
                        ${filters.bathrooms === num
                          ? 'bg-gray-900 text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-900'
                        }
                      `}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Características */}
              <div>
                <label className="block text-sm font-light text-gray-700 mb-3">
                  Características
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {PROPERTY_FEATURES.map(feature => (
                    <button
                      key={feature.id}
                      onClick={() => handleFeatureToggle(feature.id)}
                      className={`
                        px-4 py-2.5 rounded-full font-light text-sm
                        transition-all duration-300 flex items-center gap-2
                        ${filters.features.includes(feature.id)
                          ? 'bg-gray-900 text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-900'
                        }
                      `}
                    >
                      <span className="text-base">{feature.icon}</span>
                      {feature.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botones de acción del modal */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setFilters({
                      ...filters,
                      priceMin: '',
                      priceMax: '',
                      bathrooms: '',
                      surfaceMin: '',
                      surfaceMax: '',
                      features: []
                    });
                  }}
                  className="px-6 py-3 text-gray-700 font-light border border-gray-200 rounded-full
                           hover:border-gray-900 hover:bg-gray-50 transition-all duration-300"
                >
                  Limpiar filtros
                </button>
                <button
                  onClick={() => {
                    setShowAdvancedFilters(false);
                    handleSearch();
                  }}
                  className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-full
                           hover:bg-gray-800 transition-all duration-300"
                >
                  Aplicar filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
