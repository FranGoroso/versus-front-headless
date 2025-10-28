/**
 * Property Search Form Component
 * 
 * Formulario de búsqueda de propiedades con diseño minimalista.
 * Mantiene la estética elegante del sitio con tipografía light y animaciones sutiles.
 * 
 * VERSIÓN 3.2:
 * - Diseño profesional sin emojis
 * - Integración con taxonomías reales de WordPress
 * - Soporte para propertyTypes y propertyCities desde WordPress API
 * - Construcción correcta de parámetros de URL (tipo, ciudad)
 * - UI limpia y elegante
 * - Modal "Más filtros" eliminado completamente
 * - Características eliminadas (no funcionales)
 * - Solo filtros básicos: tipo, precio, habitaciones, ubicación
 * 
 * @component
 * @version 3.2.0
 * @updated 2025-10-28 - Modal y características eliminados
 */

'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { WPTaxonomy } from '@/types';

interface SearchFilters {
  operation: 'buy' | 'rent';
  location: string;
  propertyType: string;
  priceMax: string;
  bedrooms: string;
}

interface LocationSuggestion {
  id: string;
  name: string;
  type: 'parish' | 'area' | 'city';
}

interface PropertySearchFormProps {
  variant?: 'default' | 'hero' | 'compact';
  className?: string;
  onSearch?: (filters: SearchFilters) => void;
  propertyTypes?: WPTaxonomy[];
  propertyCities?: WPTaxonomy[];
}

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

const BEDROOM_OPTIONS = [
  { value: '', label: 'Habitaciones' },
  { value: '1', label: '1 hab.' },
  { value: '2', label: '2 hab.' },
  { value: '3', label: '3 hab.' },
  { value: '4', label: '4 hab.' },
  { value: '5+', label: '5+ hab.' },
];

export function PropertySearchForm({
  variant = 'default',
  className = '',
  onSearch,
  propertyTypes = [],
  propertyCities = []
}: PropertySearchFormProps) {
  const router = useRouter();
  const locationInputRef = useRef<HTMLInputElement>(null);
  
  const availablePropertyTypes = useMemo(() => {
    return propertyTypes.length > 0 ? [
      { value: '', label: 'Todos los tipos' },
      ...propertyTypes.map(type => ({
        value: type.slug,
        label: type.name
      }))
    ] : PROPERTY_TYPES;
  }, [propertyTypes]);
  
  const availableCities = useMemo(() => {
    return propertyCities.length > 0 ? 
      propertyCities.map(city => ({
        id: String(city.id),
        name: city.name,
        type: 'parish' as const
      }))
    : ANDORRA_LOCATIONS;
  }, [propertyCities]);
  
  const [filters, setFilters] = useState<SearchFilters>({
    operation: 'buy',
    location: '',
    propertyType: '',
    priceMax: '',
    bedrooms: ''
  });

  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (filters.location.length > 0) {
      const filtered = availableCities.filter(loc =>
        loc.name.toLowerCase().includes(filters.location.toLowerCase())
      );
      setLocationSuggestions(filtered);
      setShowLocationSuggestions(filtered.length > 0);
    } else {
      setLocationSuggestions([]);
      setShowLocationSuggestions(false);
    }
  }, [filters.location, availableCities]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSelectLocation = (location: LocationSuggestion) => {
    setFilters(prev => ({
      ...prev,
      location: location.name
    }));
    setShowLocationSuggestions(false);
  };

  const handleSearch = async () => {
    setIsSearching(true);
    
    if (onSearch) {
      onSearch(filters);
    } else {
      const params = new URLSearchParams();
      
      if (filters.propertyType) {
        params.append('tipo', filters.propertyType);
      }
      
      if (filters.location) {
        const selectedCity = availableCities.find(city => 
          city.name.toLowerCase() === filters.location.toLowerCase()
        );
        if (selectedCity) {
          const citySlug = propertyCities.length > 0 
            ? propertyCities.find(c => c.name === selectedCity.name)?.slug
            : selectedCity.name.toLowerCase().replace(/\s+/g, '-');
          if (citySlug) {
            params.append('ciudad', citySlug);
          }
        }
      }
      
      if (filters.bedrooms) {
        params.append('habitaciones', filters.bedrooms);
      }
      
      if (filters.priceMax) {
        params.append('precio_max', filters.priceMax);
      }
      
      router.push(`/propiedades?${params.toString()}`);
    }
    
    setTimeout(() => setIsSearching(false), 1000);
  };

  const priceRanges = filters.operation === 'buy' ? BUY_PRICE_RANGES : RENT_PRICE_RANGES;

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md ${className}`}>
      {/* Tabs de Operación */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-100 rounded-full p-1">
          <button
            onClick={() => handleFilterChange('operation', 'buy')}
            className={`px-8 py-2.5 rounded-full text-sm font-light transition-all duration-300 ${
              filters.operation === 'buy'
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Comprar
          </button>
          <button
            onClick={() => handleFilterChange('operation', 'rent')}
            className={`px-8 py-2.5 rounded-full text-sm font-light transition-all duration-300 ${
              filters.operation === 'rent'
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
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
          className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-full font-light text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300"
        />
        
        {/* Dropdown de sugerencias */}
        {showLocationSuggestions && (
          <div className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 py-2">
            {locationSuggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSelectLocation(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between group"
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
          className="px-4 py-3 border border-gray-200 rounded-full font-light text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300 cursor-pointer"
        >
          {availablePropertyTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        {/* Precio */}
        <select
          value={filters.priceMax}
          onChange={(e) => handleFilterChange('priceMax', e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-full font-light text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300 cursor-pointer"
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
          className="px-4 py-3 border border-gray-200 rounded-full font-light text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300 cursor-pointer"
        >
          {BEDROOM_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Botón de búsqueda */}
      <div className="flex justify-center">
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="w-full md:w-auto px-12 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {isSearching ? 'Buscando...' : 'Buscar propiedades'}
        </button>
      </div>
    </div>
  );
}
