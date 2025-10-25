/**
 * PriceRangeModal Component
 * 
 * Modal para seleccionar rango de precio.
 * Solo visual para presentación - sin funcionalidad.
 * 
 * @component
 * @version 1.0.0
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface PriceRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PriceRangeModal({ isOpen, onClose }: PriceRangeModalProps) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  if (!isOpen) return null;

  /**
   * Rangos de precio predefinidos para selección rápida
   */
  const priceRanges = [
    { label: 'Hasta 200.000', min: '', max: '200000' },
    { label: '200.000 - 400.000', min: '200000', max: '400000' },
    { label: '400.000 - 600.000', min: '400000', max: '600000' },
    { label: '600.000 - 800.000', min: '600000', max: '800000' },
    { label: '800.000 - 1.000.000', min: '800000', max: '1000000' },
    { label: 'Más de 1.000.000', min: '1000000', max: '' },
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md animate-in zoom-in-95 duration-200">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-light text-gray-900">
              Rango de precio
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Inputs personalizados */}
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-light text-gray-600 mb-2">
                Precio mínimo
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  €
                </span>
                <input
                  type="text"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="100.000"
                  className="w-full h-12 pl-8 pr-4 border border-gray-300 rounded-full font-light focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-light text-gray-600 mb-2">
                Precio máximo
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  €
                </span>
                <input
                  type="text"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="500.000"
                  className="w-full h-12 pl-8 pr-4 border border-gray-300 rounded-full font-light focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Rangos rápidos */}
          <div className="mb-8">
            <p className="text-sm font-light text-gray-600 mb-3">
              Rangos rápidos
            </p>
            <div className="grid grid-cols-2 gap-2">
              {priceRanges.map((range, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setMinPrice(range.min);
                    setMaxPrice(range.max);
                  }}
                  className="px-4 py-2 text-sm font-light border border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all"
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-full"
            >
              Cancelar
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 rounded-full bg-gray-900 hover:bg-gray-800"
            >
              Aplicar filtros
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
