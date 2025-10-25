/**
 * Cookie Banner Component
 * 
 * Banner de consentimiento de cookies elegante y minimalista.
 * Incluye modal de preferencias detalladas con gestión granular por categorías.
 * Almacena el consentimiento en localStorage y respeta las preferencias del usuario.
 * 
 * Diseño 100% acorde con la estética minimalista del sitio:
 * - Font-light, tracking-tight
 * - Colores negro/gris/blanco
 * - Animaciones suaves
 * - Responsive design
 * 
 * @component
 * @version 1.0.0
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * Interfaz para las preferencias de cookies
 */
interface CookiePreferences {
  necessary: boolean;      // Siempre true, no se puede desactivar
  analytics: boolean;      // Google Analytics
  personalization: boolean; // Preferencias de usuario
}

/**
 * Interfaz para el consentimiento guardado
 */
interface CookieConsent {
  preferences: CookiePreferences;
  timestamp: number;
  version: string; // Para futuras actualizaciones de política
}

/**
 * Cookie Banner Component
 * 
 * Muestra un banner de consentimiento de cookies en la parte inferior de la pantalla.
 * Incluye opciones para aceptar todo, rechazar opcionales o personalizar preferencias.
 * 
 * @returns {JSX.Element | null} Banner de cookies o null si ya hay consentimiento
 */
export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    personalization: false,
  });

  const CONSENT_KEY = 'cookie_consent';
  const CONSENT_VERSION = '1.0';

  /**
   * Verifica si ya existe un consentimiento guardado al montar el componente
   */
  useEffect(() => {
    const savedConsent = localStorage.getItem(CONSENT_KEY);
    
    if (!savedConsent) {
      // Si no hay consentimiento, mostrar el banner después de un pequeño delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      try {
        const consent: CookieConsent = JSON.parse(savedConsent);
        // Verificar si la versión coincide, si no, pedir consentimiento nuevamente
        if (consent.version !== CONSENT_VERSION) {
          setIsVisible(true);
        }
      } catch (error) {
        // Si hay error al parsear, mostrar banner
        setIsVisible(true);
      }
    }
  }, []);

  /**
   * Guarda las preferencias de cookies en localStorage
   * @param prefs - Preferencias de cookies a guardar
   */
  const savePreferences = (prefs: CookiePreferences) => {
    const consent: CookieConsent = {
      preferences: prefs,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
    
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    
    // Aquí puedes añadir lógica para activar/desactivar scripts según las preferencias
    // Por ejemplo, inicializar Google Analytics solo si analytics es true
    if (prefs.analytics) {
      // Inicializar Google Analytics
      console.log('Google Analytics activado');
    }
    
    setIsVisible(false);
    setShowPreferences(false);
  };

  /**
   * Acepta todas las cookies
   */
  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      personalization: true,
    };
    savePreferences(allAccepted);
  };

  /**
   * Rechaza todas las cookies opcionales (solo necesarias)
   */
  const rejectOptional = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      personalization: false,
    };
    savePreferences(onlyNecessary);
  };

  /**
   * Guarda las preferencias personalizadas
   */
  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  /**
   * Toggle de una categoría de cookie específica
   * @param category - Categoría a modificar
   */
  const togglePreference = (category: keyof CookiePreferences) => {
    if (category === 'necessary') return; // Las necesarias no se pueden desactivar
    
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // No renderizar nada si el banner no debe ser visible
  if (!isVisible) return null;

  return (
    <>
      {/* Banner Principal */}
      <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
        <div className="bg-white border-t border-gray-200 shadow-2xl">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 lg:py-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              
              {/* Contenido */}
              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-light tracking-tight text-gray-900">
                  Uso de Cookies
                </h3>
                <p className="text-sm text-gray-600 font-light leading-relaxed max-w-3xl">
                  Utilizamos cookies propias y de terceros para mejorar su experiencia de navegación, 
                  analizar el tráfico web y personalizar el contenido. Puede aceptar todas las cookies, 
                  rechazar las opcionales o gestionar sus preferencias.
                  {' '}
                  <Link 
                    href="/cookies" 
                    className="text-gray-900 hover:underline"
                  >
                    Más información
                  </Link>
                </p>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="px-6 py-3 text-sm font-light text-gray-700 border border-gray-300 rounded-full hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
                >
                  Configurar
                </button>
                <button
                  onClick={rejectOptional}
                  className="px-6 py-3 text-sm font-light text-gray-700 border border-gray-300 rounded-full hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
                >
                  Solo necesarias
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-3 text-sm font-light bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300"
                >
                  Aceptar todas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Preferencias */}
      {showPreferences && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPreferences(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scale-up">
            
            {/* Header */}
            <div className="border-b border-gray-200 px-8 py-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-light tracking-tight text-gray-900">
                  Preferencias de Cookies
                </h2>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
                  aria-label="Cerrar"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-600 font-light mt-2 leading-relaxed">
                Gestiona tus preferencias de cookies por categoría. Las cookies necesarias son esenciales 
                para el funcionamiento del sitio y no pueden ser desactivadas.
              </p>
            </div>

            {/* Body - Scrollable */}
            <div className="px-8 py-6 overflow-y-auto max-h-[calc(90vh-240px)]">
              <div className="space-y-6">
                
                {/* Cookies Necesarias */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-light text-gray-900">Cookies Necesarias</h3>
                        <span className="px-2 py-0.5 text-xs bg-gray-900 text-white rounded-full">
                          Siempre activas
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 font-light leading-relaxed">
                        Estas cookies son esenciales para el funcionamiento básico del sitio web. 
                        Permiten la navegación y el uso de funcionalidades como el acceso a áreas 
                        seguras. El sitio web no puede funcionar correctamente sin estas cookies.
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-11 h-6 bg-gray-900 rounded-full flex items-center justify-end px-1">
                        <div className="w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cookies Analíticas */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-light text-gray-900 mb-2">Cookies de Análisis</h3>
                      <p className="text-sm text-gray-600 font-light leading-relaxed">
                        Nos ayudan a entender cómo los visitantes interactúan con el sitio web, 
                        recopilando información de forma anónima. Utilizamos Google Analytics con 
                        IP anonimizada para obtener estadísticas de uso y mejorar el sitio.
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference('analytics')}
                      className="flex-shrink-0 focus:outline-none"
                      aria-label="Toggle cookies analíticas"
                    >
                      <div className={`w-11 h-6 rounded-full transition-colors duration-300 flex items-center px-1 ${
                        preferences.analytics 
                          ? 'bg-gray-900 justify-end' 
                          : 'bg-gray-300 justify-start'
                      }`}>
                        <div className="w-4 h-4 bg-white rounded-full transition-transform duration-300" />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Cookies de Personalización */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-light text-gray-900 mb-2">Cookies de Personalización</h3>
                      <p className="text-sm text-gray-600 font-light leading-relaxed">
                        Permiten recordar sus preferencias (como el idioma o región) para ofrecerle 
                        una experiencia más personalizada. Estas cookies mejoran la funcionalidad 
                        del sitio pero no son esenciales.
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference('personalization')}
                      className="flex-shrink-0 focus:outline-none"
                      aria-label="Toggle cookies de personalización"
                    >
                      <div className={`w-11 h-6 rounded-full transition-colors duration-300 flex items-center px-1 ${
                        preferences.personalization 
                          ? 'bg-gray-900 justify-end' 
                          : 'bg-gray-300 justify-start'
                      }`}>
                        <div className="w-4 h-4 bg-white rounded-full transition-transform duration-300" />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Información Adicional */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    Para más información sobre cómo utilizamos las cookies, consulte nuestra{' '}
                    <Link href="/cookies" className="text-gray-900 hover:underline">
                      Política de Cookies
                    </Link>
                    {' '}y nuestra{' '}
                    <Link href="/privacidad" className="text-gray-900 hover:underline">
                      Política de Privacidad
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Footer - Botones de Acción */}
            <div className="border-t border-gray-200 px-8 py-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
                <button
                  onClick={rejectOptional}
                  className="px-6 py-3 text-sm font-light text-gray-700 border border-gray-300 rounded-full hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
                >
                  Rechazar opcionales
                </button>
                <button
                  onClick={saveCustomPreferences}
                  className="px-6 py-3 text-sm font-light bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300"
                >
                  Guardar preferencias
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estilos para animaciones */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-up {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-up {
          animation: scale-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
