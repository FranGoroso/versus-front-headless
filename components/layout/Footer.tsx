/**
 * Footer Component
 * 
 * Footer principal del sitio con información dinámica desde WordPress.
 * Incluye menús, información de contacto y copyright.
 * 
 * @component
 */

import Link from 'next/link';
import { SiteConfig } from '@/types';

interface FooterProps {
  config?: SiteConfig | null;
}

export function Footer({ config }: FooterProps) {
  /**
   * Nombre del sitio y descripción
   */
  const siteName = config?.site_name || 'VERSUS';
  const siteDescription = config?.site_description || 'Tu socio de confianza en el mercado inmobiliario';

  /**
   * Año actual para copyright
   */
  const currentYear = new Date().getFullYear();

  /**
   * Menús disponibles
   */
  const footerMenu = config?.menus?.['footer-menu'];

  return (
    <footer className="bg-black text-white py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Columna 1: Branding */}
          <div>
            <div className="font-serif text-3xl font-bold mb-6">
              {siteName}
            </div>
            <p className="text-gray-400 leading-relaxed">
              {siteDescription}
            </p>
          </div>

          {/* Columna 2: Propiedades */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Propiedades</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/propiedades?type=casa" className="hover:text-white transition-colors">
                  Casas
                </Link>
              </li>
              <li>
                <Link href="/propiedades?type=apartamento" className="hover:text-white transition-colors">
                  Apartamentos
                </Link>
              </li>
              <li>
                <Link href="/propiedades?type=villa" className="hover:text-white transition-colors">
                  Villas
                </Link>
              </li>
              <li>
                <Link href="/propiedades?type=comercial" className="hover:text-white transition-colors">
                  Comercial
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Empresa */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Empresa</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/nosotros" className="hover:text-white transition-colors">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/nuestro-equipo" className="hover:text-white transition-colors">
                  Equipo
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contacto</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="mailto:info@versusandorra.com" className="hover:text-white transition-colors">
                  info@versusandorra.com
                </a>
              </li>
              <li>
                <a href="tel:+376000000" className="hover:text-white transition-colors">
                  +376 XXX XXX
                </a>
              </li>
              <li>Andorra la Vella</li>
              <li>Principado de Andorra</li>
            </ul>

            {/* Redes sociales (futuro) */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; {currentYear} {siteName}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
