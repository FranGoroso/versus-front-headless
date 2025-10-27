/**
 * PropertyDetailNavBar Component
 * 
 * Barra de navegación fija para la página individual de propiedades.
 * Incluye navegación interna, precio destacado y botones de acción.
 * Efecto glassmorphism premium igual que PropertyFilters.
 * 
 * Características:
 * - Navegación interna con scroll suave a secciones
 * - Precio siempre visible
 * - Botones de acción (Contactar, Compartir, Favoritos)
 * - Active states dinámicos
 * - Responsive con menú colapsable en mobile
 * - Glassmorphism effect
 * 
 * @component
 * @version 1.0.0
 * @created 2025-10-27
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';

/**
 * Props del componente PropertyDetailNavBar
 */
interface PropertyDetailNavBarProps {
  /** Precio formateado de la propiedad (ej: "450.000 €") */
  price: string;
  /** Título de la propiedad para compartir */
  propertyTitle: string;
  /** URL actual de la propiedad para compartir */
  propertyUrl?: string;
}

/**
 * Secciones de navegación disponibles
 */
const NAV_SECTIONS = [
  { id: 'galeria', label: 'Galería', icon: '🖼️' },
  { id: 'caracteristicas', label: 'Características', icon: '🏠' },
  { id: 'ubicacion', label: 'Ubicación', icon: '📍' },
] as const;

/**
 * Componente principal de la barra de navegación
 */
export function PropertyDetailNavBar({ 
  price, 
  propertyTitle, 
  propertyUrl 
}: PropertyDetailNavBarProps) {
  const [activeSection, setActiveSection] = useState<string>('galeria');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Scroll suave a una sección específica
   * Compensa la altura del header (80px) + navbar (~60px)
   */
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 160; // Header + NavBar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setActiveSection(sectionId);
      setIsMobileMenuOpen(false); // Cerrar menú mobile después de navegar
    }
  };

  /**
   * Detectar sección activa durante el scroll
   * Actualiza el estado para resaltar el link correspondiente
   */
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_SECTIONS.map(section => section.id);
      const headerOffset = 200; // Offset para cambiar antes de llegar a la sección

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= headerOffset && rect.bottom >= headerOffset) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Cerrar menú de compartir al hacer click fuera
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.share-menu-container')) {
        setShowShareMenu(false);
      }
    };

    if (showShareMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [showShareMenu]);

  /**
   * Funciones para compartir en redes sociales
   */
  const currentUrl = propertyUrl || (typeof window !== 'undefined' ? window.location.href : '');
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(propertyTitle)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(propertyTitle + ' - ' + currentUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(propertyTitle)}&body=${encodeURIComponent(currentUrl)}`,
  };

  /**
   * Copiar link al portapapeles
   */
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert('Link copiado al portapapeles');
      setShowShareMenu(false);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  /**
   * Toggle favoritos (solo visual, sin backend por ahora)
   */
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="fixed top-[80px] left-0 right-0 z-40 backdrop-blur-xl bg-white/80 border-b border-gray-100 shadow-sm transition-all duration-300">
      <Container>
        <div className="py-3">
          
          {/* DESKTOP VIEW */}
          <div className="hidden md:flex items-center justify-between">
            
            {/* Navegación interna - Izquierda */}
            <nav className="flex items-center gap-6">
              {NAV_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    flex items-center gap-2 pb-1 text-sm font-light transition-all duration-300
                    ${activeSection === section.id 
                      ? 'text-gray-900 border-b-2 border-gray-900' 
                      : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent'
                    }
                  `}
                >
                  <span className="text-base">{section.icon}</span>
                  <span>{section.label}</span>
                </button>
              ))}
            </nav>

            {/* Precio + Botones de acción - Derecha */}
            <div className="flex items-center gap-4">
              
              {/* Precio destacado */}
              <div className="px-6 py-2 bg-gray-50 rounded-full">
                <span className="text-xl font-light text-gray-900">{price}</span>
              </div>

              {/* Botón Contactar */}
              <Link href="/contacto">
                <Button 
                  className="rounded-full px-5 py-2 bg-gray-900 text-white hover:bg-black transition-all duration-300 text-sm font-light shadow-md hover:shadow-lg"
                >
                  <span className="mr-2">📞</span>
                  Contactar
                </Button>
              </Link>

              {/* Botón Compartir con dropdown */}
              <div className="relative share-menu-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowShareMenu(!showShareMenu);
                  }}
                  className="p-2.5 rounded-full bg-gray-50 text-gray-700 hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="Compartir propiedad"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>

                {/* Menú desplegable de compartir */}
                {showShareMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500 font-light">Compartir propiedad</p>
                    </div>
                    
                    {/* Redes sociales */}
                    <a
                      href={shareLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="text-sm font-light text-gray-700">Facebook</span>
                    </a>

                    <a
                      href={shareLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      <span className="text-sm font-light text-gray-700">Twitter</span>
                    </a>

                    <a
                      href={shareLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      <span className="text-sm font-light text-gray-700">WhatsApp</span>
                    </a>

                    <a
                      href={shareLinks.email}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-light text-gray-700">Email</span>
                    </a>

                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors w-full"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-light text-gray-700">Copiar link</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Botón Favoritos */}
              <button
                onClick={toggleFavorite}
                className={`
                  p-2.5 rounded-full transition-all duration-300 hover:scale-110
                  ${isFavorite 
                    ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-900 hover:text-white'
                  }
                `}
                aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              >
                <svg 
                  className="w-5 h-5" 
                  fill={isFavorite ? 'currentColor' : 'none'} 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* MOBILE VIEW */}
          <div className="md:hidden">
            <div className="flex items-center justify-between">
              
              {/* Precio - Mobile */}
              <div className="px-4 py-1.5 bg-gray-50 rounded-full">
                <span className="text-lg font-light text-gray-900">{price}</span>
              </div>

              {/* Botones de acción compactos - Mobile */}
              <div className="flex items-center gap-2">
                <Link href="/contacto">
                  <Button 
                    size="sm"
                    className="rounded-full px-4 py-2 bg-gray-900 text-white text-xs font-light"
                  >
                    📞 Contactar
                  </Button>
                </Link>

                {/* Menú hamburguesa */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-full bg-gray-50 text-gray-700"
                  aria-label="Menú de navegación"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Menú mobile expandido */}
            {isMobileMenuOpen && (
              <div className="mt-3 pt-3 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                <nav className="flex flex-col gap-2">
                  {NAV_SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`
                        flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-light transition-all
                        ${activeSection === section.id 
                          ? 'bg-gray-900 text-white' 
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      <span className="text-lg">{section.icon}</span>
                      <span>{section.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Botones adicionales mobile */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setShowShareMenu(!showShareMenu);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 text-gray-700 text-sm font-light hover:bg-gray-100 transition-colors"
                  >
                    📤 Compartir
                  </button>
                  <button
                    onClick={toggleFavorite}
                    className={`
                      flex-1 px-4 py-2.5 rounded-xl text-sm font-light transition-colors
                      ${isFavorite 
                        ? 'bg-red-50 text-red-600' 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    {isFavorite ? '❤️ Guardado' : '🤍 Guardar'}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </Container>
    </div>
  );
}
