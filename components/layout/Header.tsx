/**
 * Header Component
 * 
 * Header principal del sitio con diseño premium y minimalista.
 * Incluye navegación dinámica, selector de idiomas y logo.
 * 
 * @component
 * @version 3.0.0
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

export function Header({ config }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('ES');
  const pathname = usePathname();
  const langDropdownRef = useRef<HTMLDivElement>(null);

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
  }, [pathname]);

  /**
   * Cerrar dropdown de idiomas al hacer click fuera
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Items del menú actualizados
   */
  const menuItems = [
    { id: 1, title: 'Inicio', url: '/' },
    { id: 2, title: 'Propiedades', url: '/propiedades' },
    { id: 3, title: 'Sobre Nosotros', url: '/nosotros' },
    { id: 4, title: 'Equipo', url: '/nuestro-equipo' },
    { id: 5, title: 'Blog', url: '/blog' },
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
              {/* Comentado: Logo de imagen - Descomenta cuando tengas el logo */}
              {/* <Image
                src="/logo-versus.png"
                alt="Versus Andorra"
                width={150}
                height={40}
                className="h-10 w-auto"
                priority
              /> */}
              
              {/* Logo temporal de texto - Eliminar cuando tengas el logo */}
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
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  isTransparent && !isMobileMenuOpen
                    ? 'text-white hover:bg-white/10'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" 
                  />
                </svg>
              </button>

              {/* Mobile Language Dropdown */}
              {isLangDropdownOpen && (
                <div className="absolute top-16 right-16 w-40 bg-white rounded-lg shadow-lg py-1 border border-gray-100 lg:hidden">
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
                className={`relative w-8 h-8 flex flex-col justify-center items-center group ${
                  isTransparent && !isMobileMenuOpen ? 'text-white' : 'text-gray-900'
                }`}
                aria-label="Toggle menu"
              >
                <span className={`
                  block w-6 h-[1.5px] transition-all duration-300 ease-out
                  ${isMobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : '-translate-y-1'}
                  ${isTransparent && !isMobileMenuOpen ? 'bg-white' : 'bg-gray-900'}
                `} />
                <span className={`
                  block w-6 h-[1.5px] transition-all duration-300 ease-out
                  ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}
                  ${isTransparent && !isMobileMenuOpen ? 'bg-white' : 'bg-gray-900'}
                `} />
                <span className={`
                  block w-6 h-[1.5px] transition-all duration-300 ease-out
                  ${isMobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : 'translate-y-1'}
                  ${isTransparent && !isMobileMenuOpen ? 'bg-white' : 'bg-gray-900'}
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
          <div className="flex flex-col h-full pt-24 px-8 pb-8">
            {/* Mobile Menu Items */}
            <nav className="flex-1 flex flex-col justify-center -mt-20">
              {menuItems.map((item, index) => {
                const isActive = isActiveLink(item.url);
                
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
