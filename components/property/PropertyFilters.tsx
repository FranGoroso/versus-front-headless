/**
 * PropertyFilters Component
 * 
 * Barra de filtros sticky con estilos mejorados.
 * Solo visual para presentación - sin funcionalidad real.
 * 
 * @component
 * @version 1.0.0
 */

'use client';

import { useState } from 'react';
import { PriceRangeModal } from './PriceRangeModal';

interface PropertyFiltersProps {
  propertyCount?: number;
}

export function PropertyFilters({ propertyCount = 0 }: PropertyFiltersProps) {
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [selectedParish, setSelectedParish] = useState('');
  const [selectedBedrooms, setSelectedBedrooms] = useState('');
  const [selectedSort, setSelectedSort] = useState('recent');

  /**
   * Contar filtros activos para el badge
   */
  const activeFiltersCount = [selectedType, selectedParish, selectedBedrooms].filter(Boolean).length;

  /**
   * Limpiar todos los filtros
   */
  const clearFilters = () => {
    setSelectedType('');
    setSelectedParish('');
    setSelectedBedrooms('');
    setSelectedSort('recent');
  };

  return (
    <>
      <div className="sticky top-20 z-40 bg-white py-4 -mx-6 px-6 border-y border-gray-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          {/* Tipo de propiedad */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-full text-sm font-light bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all hover:border-gray-400 cursor-pointer"
          >
            <option value="">Tipo de propiedad</option>
            <option value="casa-chalet-lujo">Casa / Chalet de lujo</option>
            <option value="pisos">Pisos</option>
            <option value="aticos">Áticos</option>
            <option value="terrenos">Terrenos</option>
            <option value="hosteleria">Hostelería</option>
            <option value="locales-comerciales">Locales comerciales</option>
          </select>

          {/* Parroquia */}
          <select
            value={selectedParish}
            onChange={(e) => setSelectedParish(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-full text-sm font-light bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all hover:border-gray-400 cursor-pointer"
          >
            <option value="">Todas las parroquias</option>
            <option value="andorra-la-vella">Andorra la Vella</option>
            <option value="escaldes-engordany">Escaldes-Engordany</option>
            <option value="encamp">Encamp</option>
            <option value="la-massana">La Massana</option>
            <option value="ordino">Ordino</option>
            <option value="sant-julia-de-loria">Sant Julià de Lòria</option>
            <option value="canillo">Canillo</option>
          </select>

          {/* Botón Precio - Abre modal */}
          <button
            onClick={() => setShowPriceModal(true)}
            className="px-4 py-2 border border-gray-300 rounded-full text-sm font-light bg-white hover:border-gray-400 hover:bg-gray-50 transition-all whitespace-nowrap"
          >
            Precio
          </button>

          {/* Habitaciones */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-light hidden md:inline">
              Habitaciones:
            </span>
            <div className="flex gap-1">
              {['1', '2', '3', '4+'].map((num) => (
                <button
                  key={num}
                  onClick={() => setSelectedBedrooms(selectedBedrooms === num ? '' : num)}
                  className={`w-10 h-10 border rounded-full text-sm font-light transition-all ${
                    selectedBedrooms === num
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Ordenar - Desktop */}
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="ml-auto px-4 py-2 border border-gray-300 rounded-full text-sm font-light bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all hover:border-gray-400 cursor-pointer hidden md:block"
          >
            <option value="recent">Más recientes</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="featured">Destacadas</option>
          </select>

          {/* Limpiar filtros - Solo visible si hay filtros activos */}
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-light underline transition-colors whitespace-nowrap flex items-center gap-2"
            >
              Limpiar filtros
              <span className="inline-flex items-center justify-center w-5 h-5 bg-gray-900 text-white text-xs rounded-full">
                {activeFiltersCount}
              </span>
            </button>
          )}
        </div>

        {/* Ordenar - Mobile */}
        <div className="mt-3 md:hidden">
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm font-light bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all hover:border-gray-400 cursor-pointer"
          >
            <option value="recent">Más recientes</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="featured">Destacadas</option>
          </select>
        </div>
      </div>

      {/* Modal de precio */}
      <PriceRangeModal
        isOpen={showPriceModal}
        onClose={() => setShowPriceModal(false)}
      />
    </>
  );
}
