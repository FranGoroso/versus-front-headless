/**
 * Team Page
 * 
 * Página del equipo mostrando agentes desde WordPress.
 * Utiliza datos reales de WordPress con múltiples fallbacks:
 * 1. Custom Post Type 'agents'
 * 2. Custom Post Type 'team' o 'team_members'
 * 3. Usuarios de WordPress como fallback
 * 
 * @author Versus Andorra Development Team
 * @version 2.0.0
 */

import Link from 'next/link';
import Image from 'next/image';
import { getSiteConfig, getTeamMembers } from '@/lib/wordpress';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';

/**
 * Revalidación ISR - cada hora
 * Los datos del equipo no cambian frecuentemente
 */
export const revalidate = 3600;

/**
 * Metadata de la página
 */
export const metadata = {
  title: 'Nuestro Equipo | Versus Andorra',
  description: 'Conoce al equipo de profesionales de Versus Andorra. Expertos en el mercado inmobiliario de Andorra.',
};

/**
 * Función auxiliar para extraer la URL de imagen
 * Compatible con diferentes estructuras de datos de WordPress
 */
function getImageUrl(member: any): string {
  // Si tiene imagen destacada (featured media)
  if (member._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return member._embedded['wp:featuredmedia'][0].source_url;
  }
  
  // Si es un usuario de WordPress con avatar
  if (member.avatar_urls) {
    // Obtener la URL más grande disponible
    const sizes = Object.keys(member.avatar_urls).map(Number).sort((a, b) => b - a);
    if (sizes.length > 0) {
      return member.avatar_urls[sizes[0]];
    }
  }
  
  // Si tiene imagen en ACF
  if (member.acf?.photo || member.acf?.image) {
    const imageField = member.acf.photo || member.acf.image;
    if (typeof imageField === 'string') {
      return imageField;
    }
    if (imageField?.url) {
      return imageField.url;
    }
  }
  
  // Imagen por defecto
  return 'https://images.pexels.com/photos/3184435/pexels-photo-3184435.jpeg?auto=compress&cs=tinysrgb&w=400';
}

/**
 * Función auxiliar para obtener datos del miembro
 * Normaliza diferentes estructuras de datos
 */
function getMemberData(member: any) {
  return {
    id: member.id,
    name: member.title?.rendered || member.name || 'Nombre no disponible',
    position: member.acf?.position || 
              member.acf?.cargo || 
              member.acf?.role || 
              member.position ||
              'Agente Inmobiliario',
    bio: member.content?.rendered || 
         member.description || 
         member.acf?.bio || 
         member.acf?.description || 
         '',
    email: member.acf?.email || 
           member.email || 
           member.user_email || 
           '',
    phone: member.acf?.phone || 
           member.acf?.telefono || 
           member.acf?.mobile || 
           '',
    linkedin: member.acf?.linkedin || '',
    instagram: member.acf?.instagram || '',
    facebook: member.acf?.facebook || '',
    languages: member.acf?.languages || 
               member.acf?.idiomas || 
               [],
    specialties: member.acf?.specialties || 
                 member.acf?.especialidades || 
                 [],
    image: getImageUrl(member),
  };
}

/**
 * Función para limpiar HTML de WordPress
 */
function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

export default async function TeamPage() {
  /**
   * Obtener configuración del sitio
   */
  const siteConfig = await getSiteConfig();
  
  /**
   * Obtener miembros del equipo desde WordPress
   * La función getTeamMembers intenta múltiples endpoints automáticamente
   */
  const teamMembers = await getTeamMembers();
  
  /**
   * Procesar y normalizar datos del equipo
   */
  const processedTeam = teamMembers.map(getMemberData);
  
  /**
   * Si no hay miembros del equipo, mostrar mensaje
   */
  const hasTeamMembers = processedTeam.length > 0;

  return (
    <>
      <Header config={siteConfig} />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
                Nuestro Equipo
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Conoce a los profesionales que harán realidad tu proyecto inmobiliario. 
                Experiencia, dedicación y compromiso en cada paso del camino.
              </p>
              
              <nav className="flex justify-center items-center gap-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-black transition-colors">
                  Inicio
                </Link>
                <span>›</span>
                <span className="text-black font-medium">Nuestro Equipo</span>
              </nav>
            </div>
          </Container>
        </section>

        {/* Team Grid */}
        <section className="py-20">
          <Container>
            {hasTeamMembers ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processedTeam.map((member) => (
                  <Card key={member.id} className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                    {/* Foto del miembro */}
                    <div className="relative h-80">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Información del miembro */}
                    <div className="p-6">
                      <h3 className="font-serif text-2xl font-bold mb-1">
                        {member.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {member.position}
                      </p>
                      
                      {/* Bio si existe */}
                      {member.bio && (
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">
                          {stripHtml(member.bio)}
                        </p>
                      )}
                      
                      {/* Especialidades si existen */}
                      {member.specialties.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-500 mb-2">Especialidades:</p>
                          <div className="flex flex-wrap gap-1">
                            {member.specialties.slice(0, 3).map((specialty: string, index: number) => (
                              <span 
                                key={index}
                                className="text-xs bg-gray-100 px-2 py-1 rounded"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Idiomas si existen */}
                      {member.languages.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-500 mb-2">Idiomas:</p>
                          <p className="text-xs text-gray-600">
                            {member.languages.join(', ')}
                          </p>
                        </div>
                      )}

                      {/* Información de contacto */}
                      <div className="space-y-2 text-sm">
                        {member.email && (
                          <a 
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="truncate">{member.email}</span>
                          </a>
                        )}
                        
                        {member.phone && (
                          <a 
                            href={`tel:${member.phone}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {member.phone}
                          </a>
                        )}
                      </div>
                      
                      {/* Redes sociales si existen */}
                      {(member.linkedin || member.instagram || member.facebook) && (
                        <div className="flex gap-2 mt-4 pt-4 border-t">
                          {member.linkedin && (
                            <a 
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-black transition-colors"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                            </a>
                          )}
                          {member.instagram && (
                            <a 
                              href={member.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-black transition-colors"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                              </svg>
                            </a>
                          )}
                          {member.facebook && (
                            <a 
                              href={member.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-black transition-colors"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              /* Mensaje cuando no hay datos del equipo */
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-lg p-12 max-w-2xl mx-auto">
                  <svg 
                    className="w-16 h-16 text-gray-400 mx-auto mb-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                    />
                  </svg>
                  <h2 className="text-2xl font-semibold mb-3">
                    Información del equipo no disponible
                  </h2>
                  <p className="text-gray-600 mb-6">
                    No se pudo cargar la información del equipo en este momento. 
                    Esto puede deberse a que:
                  </p>
                  <ul className="text-left text-gray-600 space-y-2 max-w-md mx-auto mb-6">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">•</span>
                      <span>No hay miembros del equipo agregados en WordPress</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">•</span>
                      <span>El Custom Post Type del equipo no está configurado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">•</span>
                      <span>Hay un problema de conexión con WordPress</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-500">
                    Por favor, contacta con el administrador del sitio.
                  </p>
                </div>
              </div>
            )}
          </Container>
        </section>

        {/* CTA - Solo mostrar si hay miembros del equipo */}
        {hasTeamMembers && (
          <section className="py-20 bg-gray-50">
            <Container>
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="font-serif text-4xl font-bold mb-6">
                  ¿Listo para encontrar tu hogar ideal?
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  Nuestro equipo está aquí para ayudarte en cada paso. 
                  Contáctanos y comenzaremos a buscar juntos.
                </p>
                <Link href="/contacto">
                  <button className="bg-black text-white px-12 py-4 rounded-full hover:bg-gray-800 transition-colors text-lg font-medium">
                    Contáctanos
                  </button>
                </Link>
              </div>
            </Container>
          </section>
        )}
      </main>

      <Footer config={siteConfig} />
    </>
  );
}
