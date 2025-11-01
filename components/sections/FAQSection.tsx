/**
 * FAQ Section Component
 * 
 * Sección de preguntas frecuentes con diseño acordeón elegante.
 * Mantiene la estética minimalista del sitio con tipografía light y animaciones sutiles.
 * 
 * Características:
 * - Acordeón con animaciones suaves
 * - Iconos minimalistas (+/-)
 * - Hover effects profesionales con color brand (amarillo)
 * - Muestra 4 preguntas inicialmente con botón "Ver más"
 * - Preguntas sobre inmobiliaria en Andorra
 * 
 * @component
 * @version 1.2.0
 * @updated 2025-11-01 - Agregado botón "Ver más preguntas" para mostrar contenido colapsado
 */

'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/Container';

/**
 * Interface para las preguntas frecuentes
 */
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

/**
 * Lista de preguntas frecuentes sobre inmobiliaria en Andorra
 */
const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    question: '¿Por qué invertir en propiedades en Andorra?',
    answer: 'Andorra ofrece un entorno fiscal favorable con impuestos reducidos, estabilidad política y económica, y una alta calidad de vida. El mercado inmobiliario andorrano se caracteriza por su solidez y potencial de revalorización, especialmente en zonas clave como Andorra la Vella y las áreas turísticas de montaña.'
  },
  {
    id: 2,
    question: '¿Qué impuestos existen al comprar una propiedad en Andorra?',
    answer: 'Al comprar una propiedad en Andorra, debes considerar el Impuesto Indirecto (similar al IVA) del 4,5% sobre el precio de compra, más los gastos notariales y de registro. No existe un impuesto sobre el patrimonio inmobiliario anual, lo que hace muy atractiva la inversión a largo plazo.'
  },
  {
    id: 3,
    question: '¿Puedo comprar una propiedad en Andorra si no soy residente?',
    answer: 'Sí, los extranjeros pueden comprar propiedades en Andorra, aunque existen algunas restricciones dependiendo del tipo de inmueble. Para propiedades de uso residencial, se requiere una autorización previa del gobierno andorrano. Nuestro equipo te guiará en todo el proceso y la documentación necesaria.'
  },
  {
    id: 4,
    question: '¿Cuánto tiempo toma el proceso de compra?',
    answer: 'El proceso completo de compra en Andorra suele tomar entre 2 y 4 meses, dependiendo de factores como la obtención de autorizaciones, financiación y trámites notariales. Trabajamos para agilizar al máximo cada paso y mantenerte informado en todo momento.'
  },
  {
    id: 5,
    question: '¿Qué documentos necesito para comprar una propiedad?',
    answer: 'Necesitarás tu pasaporte o documento de identidad válido, certificado de empadronamiento, justificante de ingresos o capacidad económica, y en algunos casos, un certificado de antecedentes penales. Si requieres financiación, el banco solicitará documentación adicional. Te proporcionamos una lista detallada personalizada según tu situación.'
  },
  {
    id: 6,
    question: '¿Ofrecen servicios de gestión de propiedades en alquiler?',
    answer: 'Sí, ofrecemos un servicio completo de gestión de alquileres que incluye búsqueda de inquilinos verificados, gestión de contratos, cobro de rentas, mantenimiento de la propiedad y atención de incidencias. Nos encargamos de todo para que tu inversión sea completamente pasiva y rentable.'
  },
  {
    id: 7,
    question: '¿Cuál es la mejor zona para invertir en Andorra?',
    answer: 'Depende de tus objetivos. Andorra la Vella y Escaldes-Engordany son ideales para residencia permanente y alquiler a largo plazo. Las zonas de montaña como Canillo o Soldeu son excelentes para alquiler turístico. Te asesoramos personalmente según tu perfil de inversión y objetivos financieros.'
  },
  {
    id: 8,
    question: '¿Ayudan con la financiación hipotecaria?',
    answer: 'Sí, trabajamos con las principales entidades bancarias de Andorra y te ayudamos a obtener las mejores condiciones de financiación. Las hipotecas en Andorra suelen cubrir hasta el 80% del valor de tasación, con tipos de interés competitivos. Gestionamos todo el proceso por ti.'
  }
];

/**
 * Props del componente
 */
interface FAQSectionProps {
  className?: string;
}

/**
 * Componente principal de la sección FAQ
 */
export function FAQSection({ className = '' }: FAQSectionProps) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  /**
   * Maneja la apertura/cierre de las preguntas del acordeón
   */
  const toggleQuestion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  /**
   * Filtra las preguntas a mostrar según el estado showAll
   * Por defecto muestra solo las primeras 4
   */
  const visibleFAQs = showAll ? FAQ_ITEMS : FAQ_ITEMS.slice(0, 4);
  const hasMoreQuestions = FAQ_ITEMS.length > 4;

  return (
    <section className={`py-32 bg-gray-50 ${className}`}>
      <Container>
        {/* Header de la sección */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
            Preguntas frecuentes
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Resolvemos tus dudas sobre la compra, venta y alquiler de propiedades en Andorra
          </p>
        </div>

        {/* Acordeón de preguntas */}
        <div className="max-w-4xl mx-auto space-y-4">
          {visibleFAQs.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-brand/20"
            >
              {/* Pregunta (botón clickeable) */}
              <button
                onClick={() => toggleQuestion(item.id)}
                className="w-full px-8 py-6 flex items-center justify-between text-left transition-colors duration-300 hover:bg-gray-50 relative group"
              >
                {/* Borde izquierdo amarillo en hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top rounded-l-2xl" />
                
                <span className="text-lg font-light text-gray-900 pr-8">
                  {item.question}
                </span>
                
                {/* Icono + / - con color brand cuando está abierto */}
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                  <svg
                    className={`w-6 h-6 transition-all duration-300 ${
                      openId === item.id 
                        ? 'rotate-45 text-brand' 
                        : 'rotate-0 text-gray-400 group-hover:text-gray-600'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
              </button>

              {/* Respuesta (expandible) */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openId === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-6 pt-2">
                  <p className="text-gray-600 font-light leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón "Ver más preguntas" */}
        {hasMoreQuestions && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-8 py-3 border border-gray-200 rounded-full hover:border-brand hover:bg-brand/5 transition-all duration-300 font-light text-gray-900 group"
            >
              <span>{showAll ? 'Ver menos preguntas' : 'Ver más preguntas'}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  showAll ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* CTA al final */}
        <div className="text-center mt-16">
          <p className="text-gray-600 font-light mb-4">
            ¿No encuentras la respuesta que buscas?
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 text-gray-900 hover:text-brand transition-colors duration-300 font-light group"
          >
            <span>Contáctanos directamente</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </Container>
    </section>
  );
}
