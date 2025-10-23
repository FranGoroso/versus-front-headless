/**
 * Header Component
 * 
 * Header principal del sitio con navegación dinámica desde WordPress.
 * Incluye menú responsive y comportamiento sticky.
 * 
 * @component
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SiteConfig } from '@/types';

interface HeaderProps {
  config?: SiteConfig | null;
}

export function Header({ config }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Detectar scroll para cambiar estilo del header
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Obtener items del menú principal
   */
  const menuItems = config?.menus?.['main-menu']?.items || [];

  /**
   * Nombre del sitio
   */
  const siteName = config?.site_name || 'VERSUS';

  /**
   * Cerrar menú móvil al hacer click en un link
   */
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-md'
            : 'bg-white/90 backdrop-blur-md border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-serif font-bold tracking-tight hover:text-gray-600 transition-colors"
            >
              {siteName}
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url.replace(config?.site_url || '', '')}
                  className="text-sm text-gray-700 hover:text-black transition-colors"
                >
                  {item.title}
                </Link>
              ))}

              <Link href="/contacto">
                <Button variant="outline" size="sm" className="rounded-full">
                  Contacto
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-black transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeMobileMenu}
          />

          {/* Menu Panel */}
          <div className="absolute top-20 left-0 right-0 bg-white shadow-xl">
            <div className="px-6 py-8 space-y-6">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url.replace(config?.site_url || '', '')}
                  onClick={closeMobileMenu}
                  className="block text-lg text-gray-700 hover:text-black transition-colors"
                >
                  {item.title}
                </Link>
              ))}

              <Link href="/contacto" onClick={closeMobileMenu}>
                <Button className="w-full rounded-full">Contacto</Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Spacer para compensar el header fixed */}
      <div className="h-20" />
    </>
  );
}
