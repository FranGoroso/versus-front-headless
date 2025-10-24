/**
 * Header Component - BACKUP 24/10/2024
 * 
 * Header principal del sitio con diseño premium y minimalista.
 * Incluye navegación dinámica con dropdowns, selector de idiomas y logo.
 * 
 * @component
 * @version 4.0.0
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SiteConfig } from '@/types';

interface HeaderProps {
  config?: SiteConfig | null;
}

/**
 * Idiomas disponibles
 */
const languages = [
  { code: 'es', name: 'ES', fullName: 'Español' },
  { code: 'en', name: 'EN', fullName: 'English' },
  { code: 'fr', name: 'FR', fullName: 'Français' },
  { code: 'ca', name: 'CA', fullName: 'Català' },
];

/**
 * Parroquias de Andorra
 */
const parishes = [
  { name: 'Andorra la Vella', slug: 'andorra-la-vella' },
  { name: 'Escaldes-Engordany', slug: 'escaldes-engordany' },
  { name: 'Encamp', slug: 'encamp' },
  { name: 'La Massana', slug: 'la-massana' },
  { name: 'Ordino', slug: 'ordino' },
  { name: 'Sant Julià de Lòria', slug: 'sant-julia-de-loria' },
  { name: 'Canillo', slug: 'canillo' },
];

/**
 * Tipos de propiedades
 */
const propertyTypes = [
  { name: 'Todas las propiedades', slug: 'todas' },
  { name: 'Casa / Chalet de lujo', slug: 'casa-chalet-lujo' },
  { name: 'Pisos', slug: 'pisos' },
  { name: 'Áticos', slug: 'aticos' },
  { name: 'Terrenos', slug: 'terrenos' },
  { name: 'Hostelería', slug: 'hosteleria' },
  { name: 'Locales comerciales', slug: 'locales-comerciales' },
];

export function Header({ config }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isPropertiesDropdownOpen, setIsPropertiesDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMobilePropertiesOpen, setIsMobilePropertiesOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('ES');
  const pathname = usePathname();
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const propertiesDropdownRef = useRef<HTMLDivElement>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);

  /**
   * Detectar scroll para cambiar estilo del header
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Cerrar menú móvil al cambiar de página
   */
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLangDropdownOpen(false);
    setIsPropertiesDropdownOpen(false);
    setIsAboutDropdownOpen(false);
    setIsMobilePropertiesOpen(false);
    setIsMobileAboutOpen(false);
  }, [pathname]);

  /**
   * Cerrar dropdowns al hacer click fuera
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
      if (propertiesDropdownRef.current && !propertiesDropdownRef.current.contains(event.target as Node)) {
        setIsPropertiesDropdownOpen(false);
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
        setIsAboutDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Items del menú actualizados
   */
  const menuItems = [
    { id: 1, title: 'Inicio', url: '/', hasDropdown: false },
    { id: 2, title: 'Propiedades', url: '/propiedades', hasDropdown: true, dropdownType: 'properties' },
    { id: 3, title: 'Sobre Nosotros', url: '/nosotros', hasDropdown: true, dropdownType: 'about' },
    { id: 4, title: 'Vender', url: '/vender', hasDropdown: false },
    { id: 5, title: 'Blog', url: '/blog', hasDropdown: false },
  ];

  /**
   * Verificar si un link está activo
   */
  const isActiveLink = (url: string) => {
    if (url === '/') return pathname === '/';
    return pathname.startsWith(url);
  };

  /**
   * Determinar si el header debe ser transparente
   * Solo en el home y cuando no está scrolled y el menú móvil está cerrado
   */
  const isTransparent = pathname === '/' && !isScrolled && !isMobileMenuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isTransparent
            ? 'bg-transparent py-6'
            : 'bg-white/95 backdrop-blur-md shadow-sm py-4'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="flex items-center gap-2">
                <span 
                  className={`text-2xl md:text-3xl font-light tracking-[0.2em] transition-colors duration-300 ${
                    isTransparent ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  VERSUS
                </span>
                <span 
                  className={`text-xs font-light tracking-wider transition-colors duration-300 ${
                    isTransparent ? 'text-white/70' : 'text-gray-600'
                  }`}
                >
                  ANDORRA
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              {/* Menu Items */}
              <nav className="flex items-center space-x-8 mr-8">
                {menuItems.map((item) => {
                  const isActive = isActiveLink(item.url);
                  
                  // Si tiene dropdown (Propiedades)
                  if (item.hasDropdown && item.dropdownType === 'properties') {
                    return (
                      <div key={item.id} className="relative" ref={propertiesDropdownRef}>
                        <button
                          onClick={() => setIsPropertiesDropdownOpen(!isPropertiesDropdownOpen)}
                          className="group relative py-2 flex items-center gap-1"
                        >
                          <span 
                            className={`text-sm font-light tracking-wide transition-all duration-300 ${
                              isTransparent
                                ? isActive 
                                  ? 'text-white' 
                                  : 'text-white/80 hover:text-white'
                                : isActive
                                  ? 'text-gray-900'
                                  : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            {item.title}
                          </span>
                          <svg 
                            className={`w-4 h-4 transition-all duration-300 ${
                              isPropertiesDropdownOpen ? 'rotate-180' : ''
                            } ${
                              isTransparent ? 'text-white/80' : 'text-gray-600'
                            }`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          <span 
                            className={`absolute -bottom-0 left-0 h-[1px] transition-all duration-300 ${
                              isActive ? 'w-full' : 'w-0 group-hover:w-full'
                            } ${
                              isTransparent ? 'bg-white' : 'bg-gray-900'
                            }`}
                          />
                        </button>

                        {/* Dropdown Desktop */}
                        {isPropertiesDropdownOpen && (
                          <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="grid grid-cols-2 divide-x divide-gray-100">
                              {/* Columna Parroquias */}
                              <div className="p-4">
                                <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 px-2">
                                  Parroquias
                                </h3>
                                <div className="space-y-1">
                                  {parishes.map((parish) => (
                                    <Link
                                      key={parish.slug}
                                      href={`/propiedades?parroquia=${parish.slug}`}
                                      onClick={() => setIsPropertiesDropdownOpen(false)}
                                      className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-light"
                                    >
                                      {parish.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>

                              {/* Columna Tipos */}
                              <div className="p-4">
                                <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 px-2">
                                  Tipo
                                </h3>
                                <div className="space-y-1">
                                  {propertyTypes.map((type) => (
                                    <Link
                                      key={type.slug}
                                      href={`/propiedades?tipo=${type.slug}`}
                                      onClick={() => setIsPropertiesDropdownOpen(false)}
                                      className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-light"
                                    >
                                      {type.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                  
                  // Si tiene dropdown (Sobre Nosotros)
                  if (item.hasDropdown && item.dropdownType === 'about') {
                    return (
                      <div key={item.id} className="relative" ref={aboutDropdownRef}>
                        <button
                          onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                          className="group relative py-2 flex items-center gap-1"
                        >
                          <span 
                            className={`text-sm font-light tracking-wide transition-all duration-300 ${
                              isTransparent
                                ? isActive 
                                  ? 'text-white' 
                                  : 'text-white/80 hover:text-white'
                                : isActive
                                  ? 'text-gray-900'
                                  : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            {item.title}
                          </span>
                          <svg 
                            className={`w-4 h-4 transition-all duration-300 ${
                              isAboutDropdownOpen ? 'rotate-180' : ''
                            } ${
                              isTransparent ? 'text-white/80' : 'text-gray-600'
                            }`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          <span 
                            className={`absolute -bottom-0 left-0 h-[1px] transition-all duration-300 ${
                              isActive ? 'w-full' : 'w-0 group-hover:w-full'
                            } ${
                              isTransparent ? 'bg-white' : 'bg-gray-900'
                            }`}
                          />
                        </button>

                        {/* Dropdown Desktop - Sobre Nosotros */}
                        {isAboutDropdownOpen && (
                          <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="p-2">
                              <Link
                                href="/nosotros"
                                onClick={() => setIsAboutDropdownOpen(false)}
                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-light"
                              >
                                <div className="font-medium mb-0.5">Quiénes somos</div>
                                <div className="text-xs text-gray-500">Conoce nuestra historia</div>
                              </Link>
                              <Link
                                href="/nuestro-equipo"
                                onClick={() => setIsAboutDropdownOpen(false)}
                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-light"
                              >
                                <div className="font-medium mb-0.5">Nuestro equipo</div>
                                <div className="text-xs text-gray-500">Profesionales expertos</div>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                  
                  // Items normales sin dropdown
                  return (
                    <Link
                      key={item.id}
                      href={item.url}
                      className="group relative py-2"
                    >
                      <span 
                        className={`text-sm font-light tracking-wide transition-all duration-300 ${
                          isTransparent
                            ? isActive 
                              ? 'text-white' 
                              : 'text-white/80 hover:text-white'
                            : isActive
                              ? 'text-gray-900'
                              : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {item.title}
                      </span>
                      <span 
                        className={`absolute -bottom-0 left-0 h-[1px] transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        } ${
                          isTransparent ? 'bg-white' : 'bg-gray-900'
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* Language Selector */}
              <div className="relative mr-6" ref={langDropdownRef}>
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isTransparent
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" 
                    />
                  </svg>
                  <span className="text-sm font-light">{currentLang}</span>
                  <svg 
                    className={`w-3 h-3 transition-transform duration-300 ${
                      isLangDropdownOpen ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Language Dropdown */}
                {isLangDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-1 border border-gray-100">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.name);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-200 ${
                          currentLang === lang.name ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        <span className="font-light">{lang.fullName}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <Link href="/contacto">
                <Button 
                  variant={isTransparent ? "outline" : "default"}
                  className={`
                    relative px-8 py-5 rounded-full transition-all duration-300 overflow-hidden group
                    ${isTransparent
                      ? 'border-white text-white hover:bg-white hover:text-gray-900' 
                      : 'bg-gray-900 text-white hover:bg-gray-800 border-gray-900'
                    }
                  `}
                >
                  <span className="relative z-10 text-sm font-light tracking-wide">
                    Contactar
                  </span>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              {/* Mobile Language Button */}
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="p-2 rounded-lg transition-colors duration-300 text-gray-900 hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" 
                  />
                </svg>
              </button>

              {/* Mobile Language Dropdown */}
              {isLangDropdownOpen && (
                <div className="absolute top-16 right-16 w-40 bg-white rounded-lg shadow-lg py-1 border border-gray-100 lg:hidden z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.name);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-200 ${
                        currentLang === lang.name ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                      }`}
                    >
                      <span className="font-light">{lang.fullName}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Hamburger Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative w-8 h-8 flex flex-col justify-center items-center group text-gray-900"
                aria-label="Toggle menu"
              >
                <span className={`
                  block w-6 h-[1.5px] bg-gray-900 transition-all duration-300 ease-out
                  ${isMobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : '-translate-y-1'}
                `} />
                <span className={`
                  block w-6 h-[1.5px] bg-gray-900 transition-all duration-300 ease-out
                  ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}
                `} />
                <span className={`
                  block w-6 h-[1.5px] bg-gray-900 transition-all duration-300 ease-out
                  ${isMobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : 'translate-y-1'}
                `} />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`
          lg:hidden fixed inset-0 bg-white transition-all duration-500 ease-in-out
          ${isMobileMenuOpen 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-full pointer-events-none'
          }
        `}>
          <div className="flex flex-col h-full pt-24 px-8 pb-8 overflow-y-auto">
            {/* Mobile Menu Items */}
            <nav className="flex-1 flex flex-col justify-center -mt-20">
              {menuItems.map((item, index) => {
                const isActive = isActiveLink(item.url);
                
                // Si tiene dropdown (Propiedades)
                if (item.hasDropdown && item.dropdownType === 'properties') {
                  return (
                    <div key={item.id} className="py-2">
                      <button
                        onClick={() => setIsMobilePropertiesOpen(!isMobilePropertiesOpen)}
                        className="w-full text-left group flex items-center justify-between"
                        style={{
                          animation: isMobileMenuOpen 
                            ? `slideInFromRight ${0.4 + index * 0.1}s ease-out`
                            : ''
                        }}
                      >
                        <span className={`
                          text-2xl font-light tracking-wide transition-colors duration-300
                          ${isActive 
                            ? 'text-gray-900' 
                            : 'text-gray-600 group-hover:text-gray-900'
                          }
                        `}>
                          {item.title}
                        </span>
                        <svg 
                          className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                            isMobilePropertiesOpen ? 'rotate-180' : ''
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Mobile Dropdown Content */}
                      {isMobilePropertiesOpen && (
                        <div className="mt-4 ml-4 space-y-4">
                          {/* Parroquias */}
                          <div>
                            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                              Parroquias
                            </h3>
                            <div className="space-y-2">
                              {parishes.map((parish) => (
                                <Link
                                  key={parish.slug}
                                  href={`/propiedades?parroquia=${parish.slug}`}
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setIsMobilePropertiesOpen(false);
                                  }}
                                  className="block text-base text-gray-600 hover:text-gray-900 transition-colors duration-200 font-light"
                                >
                                  {parish.name}
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Tipos */}
                          <div>
                            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                              Tipo
                            </h3>
                            <div className="space-y-2">
                              {propertyTypes.map((type) => (
                                <Link
                                  key={type.slug}
                                  href={`/propiedades?tipo=${type.slug}`}
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setIsMobilePropertiesOpen(false);
                                  }}
                                  className="block text-base text-gray-600 hover:text-gray-900 transition-colors duration-200 font-light"
                                >
                                  {type.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // Si tiene dropdown (Sobre Nosotros) - Móvil
                if (item.hasDropdown && item.dropdownType === 'about') {
                  return (
                    <div key={item.id} className="py-2">
                      <button
                        onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                        className="w-full text-left group flex items-center justify-between"
                        style={{
                          animation: isMobileMenuOpen 
                            ? `slideInFromRight ${0.4 + index * 0.1}s ease-out`
                            : ''
                        }}
                      >
                        <span className={`
                          text-2xl font-light tracking-wide transition-colors duration-300
                          ${isActive 
                            ? 'text-gray-900' 
                            : 'text-gray-600 group-hover:text-gray-900'
                          }
                        `}>
                          {item.title}
                        </span>
                        <svg 
                          className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                            isMobileAboutOpen ? 'rotate-180' : ''
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Mobile Dropdown Content - Sobre Nosotros */}
                      {isMobileAboutOpen && (
                        <div className="mt-4 ml-4 space-y-2">
                          <Link
                            href="/nosotros"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsMobileAboutOpen(false);
                            }}
                            className="block text-base text-gray-600 hover:text-gray-900 transition-colors duration-200 font-light"
                          >
                            Quiénes somos
                          </Link>
                          <Link
                            href="/nuestro-equipo"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsMobileAboutOpen(false);
                            }}
                            className="block text-base text-gray-600 hover:text-gray-900 transition-colors duration-200 font-light"
                          >
                            Nuestro equipo
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                }
                
                // Items normales
                return (
                  <Link
                    key={item.id}
                    href={item.url}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group py-4"
                    style={{
                      animation: isMobileMenuOpen 
                        ? `slideInFromRight ${0.4 + index * 0.1}s ease-out`
                        : ''
                    }}
                  >
                    <span className={`
                      text-2xl font-light tracking-wide transition-colors duration-300
                      ${isActive 
                        ? 'text-gray-900' 
                        : 'text-gray-600 group-hover:text-gray-900'
                      }
                    `}>
                      {item.title}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile CTA */}
            <div 
              className="pt-8 border-t border-gray-200"
              style={{
                animation: isMobileMenuOpen 
                  ? `slideInFromBottom 0.6s ease-out`
                  : ''
              }}
            >
              <Link 
                href="/contacto" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="w-full py-6 bg-gray-900 text-white hover:bg-gray-800 rounded-full text-base font-light tracking-wide">
                  Contactar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer para páginas que no son el home */}
      {pathname !== '/' && <div className="h-24" />}

      {/* Estilos para animaciones */}
      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
