'use client';

/**
 * PropertyGallery Component
 * 
 * Componente de galería de imágenes con lightbox integrado para propiedades.
 * 
 * Características:
 * - Grid responsive con imagen principal destacada
 * - Lightbox/Modal para ver imágenes en tamaño completo
 * - Navegación entre imágenes (flechas y teclado)
 * - Contador de imágenes
 * - Cierre con ESC o click fuera del modal
 * - Transiciones suaves y elegantes
 * - Diseño minimalista acorde al proyecto
 * 
 * @component
 * @example
 * ```tsx
 * <PropertyGallery
 *   images={propertyImages}
 *   title="Nombre de la propiedad"
 * />
 * ```
 */

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Interface para las imágenes de la galería
 */
interface GalleryImage {
  id: number;
  url: string;
  alt?: string;
}

/**
 * Props del componente PropertyGallery
 */
interface PropertyGalleryProps {
  /** Imagen principal destacada */
  featuredImage?: {
    url: string;
    alt?: string;
  };
  /** Array de imágenes de la galería */
  gallery?: GalleryImage[];
  /** Título de la propiedad para alt text */
  title: string;
}

export function PropertyGallery({ 
  featuredImage, 
  gallery = [], 
  title 
}: PropertyGalleryProps) {
  /**
   * Estados del componente
   */
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * Combinar imagen destacada con galería
   * La imagen destacada será la primera del array
   */
  const allImages: GalleryImage[] = [
    ...(featuredImage ? [{ id: 0, url: featuredImage.url, alt: featuredImage.alt || title }] : []),
    ...gallery,
  ];

  const totalImages = allImages.length;

  /**
   * Abrir lightbox con imagen específica
   */
  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  };

  /**
   * Cerrar lightbox
   */
  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    // Restaurar scroll del body
    document.body.style.overflow = 'unset';
  }, []);

  /**
   * Navegar a la imagen anterior
   */
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  }, [totalImages]);

  /**
   * Navegar a la imagen siguiente
   */
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  }, [totalImages]);

  /**
   * Manejo de teclado
   * - ESC: cerrar modal
   * - Flecha izquierda: imagen anterior
   * - Flecha derecha: imagen siguiente
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeLightbox, goToPrevious, goToNext]);

  /**
   * Renderizar galería vacía si no hay imágenes
   */
  if (totalImages === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative h-[500px] rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 font-light">Sin imágenes disponibles</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Grid de galería */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Imagen principal - Primera del array */}
        <button
          onClick={() => openLightbox(0)}
          className="relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer"
        >
          <Image
            src={allImages[0].url}
            alt={allImages[0].alt || `${title} - Imagen principal`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          {/* Overlay en hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 font-light">
                Ver imagen completa
              </div>
            </div>
          </div>
        </button>

        {/* Grid secundario de miniaturas */}
        <div className="grid grid-cols-2 gap-4">
          {allImages.slice(1, 5).map((image, index) => {
            const actualIndex = index + 1;
            return (
              <button
                key={image.id}
                onClick={() => openLightbox(actualIndex)}
                className="relative h-[240px] rounded-xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={image.url}
                  alt={image.alt || `${title} - Galería ${actualIndex + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay en hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </button>
            );
          })}

          {/* Rellenar espacios vacíos si hay menos de 5 imágenes */}
          {totalImages < 5 && Array.from({ length: 5 - totalImages }).map((_, index) => (
            <div key={`empty-${index}`} className="relative h-[240px] rounded-xl bg-gray-100" />
          ))}
        </div>
      </div>

      {/* Botón para ver todas las fotos si hay más de 5 */}
      {totalImages > 5 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => openLightbox(0)}
            className="inline-flex items-center gap-2 px-8 py-3 border border-gray-300 rounded-full font-light
                     hover:bg-brand hover:text-black hover:border-brand transition-all duration-300"
          >
            Ver todas las fotos ({totalImages})
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Contenedor del modal */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Botón cerrar */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 
                       text-white transition-colors duration-300 backdrop-blur-sm"
              aria-label="Cerrar galería"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Contador de imágenes */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full 
                          bg-white/10 backdrop-blur-sm text-white font-light text-sm">
              {currentIndex + 1} / {totalImages}
            </div>

            {/* Botón anterior */}
            {totalImages > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-6 z-10 p-4 rounded-full bg-white/10 hover:bg-white/20 
                         text-white transition-colors duration-300 backdrop-blur-sm"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            {/* Imagen actual */}
            <div 
              className="relative max-w-7xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={allImages[currentIndex].url}
                alt={allImages[currentIndex].alt || `${title} - Imagen ${currentIndex + 1}`}
                fill
                className="object-contain"
                quality={100}
                priority
              />
            </div>

            {/* Botón siguiente */}
            {totalImages > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-6 z-10 p-4 rounded-full bg-white/10 hover:bg-white/20 
                         text-white transition-colors duration-300 backdrop-blur-sm"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}

            {/* Miniaturas de navegación (opcional, solo en desktop) */}
            {totalImages > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:flex gap-2 
                            max-w-4xl overflow-x-auto px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-sm">
                {allImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 
                              transition-all duration-300 ${
                              index === currentIndex 
                                ? 'ring-2 ring-brand scale-110' 
                                : 'opacity-60 hover:opacity-100'
                            }`}
                  >
                    <Image
                      src={image.url}
                      alt={`Miniatura ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
