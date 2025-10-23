/**
 * Property Not Found Page
 * 
 * Página 404 personalizada para propiedades que no existen.
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/Container';

export default function PropertyNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <Container size="md">
        <div className="text-center">
          {/* Icono */}
          <div className="mb-8">
            <svg
              className="w-24 h-24 mx-auto text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>

          {/* Título */}
          <h1 className="font-serif text-5xl font-bold mb-4">
            Propiedad no encontrada
          </h1>

          {/* Descripción */}
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
            Lo sentimos, la propiedad que buscas no existe o ha sido eliminada.
          </p>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/propiedades">
              <Button size="lg" className="rounded-full px-8">
                Ver todas las propiedades
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Volver al inicio
              </Button>
            </Link>
          </div>

          {/* Sugerencias */}
          <div className="mt-16 text-left">
            <h2 className="font-serif text-2xl font-bold mb-4 text-center">
              ¿Qué puedes hacer?
            </h2>
            <ul className="space-y-3 text-gray-600 max-w-md mx-auto">
              <li className="flex items-start gap-3">
                <span className="text-black">•</span>
                <span>Explora nuestro catálogo completo de propiedades disponibles</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black">•</span>
                <span>Contacta con nosotros para ayudarte a encontrar lo que buscas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black">•</span>
                <span>Revisa que la URL esté escrita correctamente</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
