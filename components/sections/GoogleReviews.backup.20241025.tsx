/**
 * GoogleReviews Component
 * 
 * Sección de reseñas de Google con diseño elegante y minimalista.
 * Mockup de datos para presentación - Se conectará a Google API posteriormente.
 * 
 * @component
 * @version 1.0.0
 */

'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/Container';

/**
 * Interface para una reseña individual
 */
interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

/**
 * Datos mockeados de reseñas
 */
const mockReviews: Review[] = [
  {
    id: 1,
    author: 'María González',
    rating: 5,
    text: 'Excelente servicio y profesionalidad. Encontramos nuestra casa ideal gracias al equipo de Versus. Todo el proceso fue transparente y eficiente.',
    date: 'Hace 2 semanas',
  },
  {
    id: 2,
    author: 'Jean-Pierre Dubois',
    rating: 5,
    text: 'Très professionnel! L\'équipe a été d\'une grande aide pour trouver notre appartement à Andorra la Vella. Service impeccable et suivi personnalisé.',
    date: 'Hace 1 mes',
  },
  {
    id: 3,
    author: 'Carlos Martínez',
    rating: 5,
    text: 'La mejor inmobiliaria en Andorra. Atentos, profesionales y con un portfolio excepcional de propiedades premium. Altamente recomendados.',
    date: 'Hace 3 semanas',
  },
  {
    id: 4,
    author: 'Sophie Laurent',
    rating: 5,
    text: 'Outstanding service from start to finish. The team understood exactly what we were looking for and delivered beyond our expectations.',
    date: 'Hace 1 semana',
  },
  {
    id: 5,
    author: 'Antonio Ruiz',
    rating: 5,
    text: 'Compramos nuestro chalet con Versus y la experiencia fue impecable. Asesoramiento personalizado y conocimiento profundo del mercado andorrano.',
    date: 'Hace 2 meses',
  },
  {
    id: 6,
    author: 'Emma Wilson',
    rating: 5,
    text: 'Professional, reliable, and truly dedicated to finding the perfect property. The entire process was seamless and stress-free.',
    date: 'Hace 3 semanas',
  },
];

export function GoogleReviews() {
  const [visibleReviews, setVisibleReviews] = useState(6);

  /**
   * Calcular promedio de calificaciones
   */
  const averageRating = (
    mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length
  ).toFixed(1);

  /**
   * Generar iniciales del nombre
   */
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  /**
   * Renderizar estrellas
   */
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="py-32 bg-white">
      <Container>
        {/* Header con logo de Google */}
        <div className="text-center mb-16">
          {/* Google logo + rating */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-light text-gray-900">{averageRating}</span>
                {renderStars(5)}
              </div>
              <p className="text-sm text-gray-600 font-light">
                Basado en {mockReviews.length} reseñas
              </p>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
            La confianza de nuestros clientes es nuestro mayor logro
          </p>
        </div>

        {/* Grid de reseñas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mockReviews.slice(0, visibleReviews).map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Header de la card */}
              <div className="flex items-start gap-4 mb-4">
                {/* Avatar con iniciales */}
                <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-light text-sm flex-shrink-0">
                  {getInitials(review.author)}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-light text-gray-900 mb-1">
                    {review.author}
                  </h4>
                  {renderStars(review.rating)}
                </div>
              </div>

              {/* Texto de la reseña */}
              <p className="text-gray-600 font-light leading-relaxed mb-4">
                {review.text}
              </p>

              {/* Fecha */}
              <p className="text-sm text-gray-400 font-light">
                {review.date}
              </p>
            </div>
          ))}
        </div>

        {/* Botón ver más (opcional) */}
        {visibleReviews < mockReviews.length && (
          <div className="text-center">
            <button
              onClick={() => setVisibleReviews(mockReviews.length)}
              className="px-8 py-3 border border-gray-300 rounded-full text-sm font-light hover:bg-gray-50 transition-colors duration-300"
            >
              Ver todas las reseñas
            </button>
          </div>
        )}

        {/* Link a Google Reviews */}
        <div className="text-center mt-12">
          <a
            href="https://www.google.com/search?q=versus+andorra+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-light transition-colors"
          >
            <span>Ver todas en Google</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </Container>
    </section>
  );
}
