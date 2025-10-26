/**
 * Team Page
 * 
 * Página del equipo con diseño minimalista y elegante.
 * Muestra el equipo desde WordPress con cards centradas.
 * 
 * @author Versus Andorra Development Team
 * @version 3.0.0
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
 * Busca en múltiples ubicaciones posibles de WordPress
 * NOTA: Los media IDs faltantes ya se resuelven en getTeamMembers()
 */
function getImageUrl(member: any): string {
  // 1. Prioridad: Imagen destacada embebida (ya resuelta por resolveMissingMedia)
  if (member._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return member._embedded['wp:featuredmedia'][0].source_url;
  }
  
  // 3. Media URL directa
  if (member.featured_media_url) {
    return member.featured_media_url;
  }
  
  // 4. Campos ACF (Advanced Custom Fields)
  if (member.acf?.photo) {
    if (typeof member.acf.photo === 'string') {
      return member.acf.photo;
    }
    if (member.acf.photo?.url) {
      return member.acf.photo.url;
    }
  }
  
  if (member.acf?.image) {
    if (typeof member.acf.image === 'string') {
      return member.acf.image;
    }
    if (member.acf.image?.url) {
      return member.acf.image.url;
    }
  }
  
  if (member.acf?.profile_image) {
    if (typeof member.acf.profile_image === 'string') {
      return member.acf.profile_image;
    }
    if (member.acf.profile_image?.url) {
      return member.acf.profile_image.url;
    }
  }
  
  // 5. Avatar URLs (para usuarios de WordPress)
  if (member.avatar_urls) {
    const sizes = Object.keys(member.avatar_urls).map(Number).sort((a, b) => b - a);
    if (sizes.length > 0) {
      return member.avatar_urls[sizes[0]];
    }
  }
  
  // 6. URL directa en el objeto
  if (member.image_url) {
    return member.image_url;
  }
  
  // 7. FALLBACK: Imagen genérica de equipo profesional
  console.warn(`No se encontró imagen para el miembro: ${member.title?.rendered || member.name || 'desconocido'}`);
  return 'https://images.pexels.com/photos/3184435/pexels-photo-3184435.jpeg?auto=compress&cs=tinysrgb&w=800';
}

/**
 * Función auxiliar para obtener datos del miembro
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
    languages: member.acf?.languages || 
               member.acf?.idiomas || 
               [],
    image: getImageUrl(member),
  };
}

/**
 * Función para limpiar HTML
 */
function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

export default async function TeamPage() {
  const siteConfig = await getSiteConfig();
  const teamMembers = await getTeamMembers();
  
  // DEBUG: Ver datos crudos de WordPress
  if (teamMembers && teamMembers.length > 0) {
    console.log('='.repeat(60));
    console.log('[TEAM DEBUG] Datos recibidos de WordPress:');
    console.log('='.repeat(60));
    teamMembers.forEach((member: any, index: number) => {
      console.log(`\nMiembro #${index + 1}:`);
      console.log('Nombre:', member.title?.rendered || member.name);
      console.log('Featured Media ID:', member.featured_media);
      console.log('Featured Media (embedded):', member._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'NO');
      console.log('ACF Photo:', member.acf?.photo || 'NO');
      console.log('ACF Image:', member.acf?.image || 'NO');
      console.log('Avatar URLs:', member.avatar_urls ? Object.keys(member.avatar_urls).length + ' tamaños' : 'NO');
    });
    console.log('='.repeat(60));
  }
  
  const processedTeam = teamMembers.map(getMemberData);
  const hasTeamMembers = processedTeam.length > 0;

  return (
    <>
      <Header config={siteConfig} />

      <main className="min-h-screen bg-white">
        {/* Hero Section - Minimalista */}
        <section className="bg-gradient-to-b from-gray-50 to-white pt-32 pb-20">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
                Nuestro Equipo
              </h1>
              <p className="text-gray-600 text-lg font-light mb-8 leading-relaxed">
                Profesionales comprometidos con hacer realidad tu proyecto inmobiliario. 
                Experiencia y dedicación en cada paso del camino.
              </p>
              
              <nav className="flex justify-center items-center gap-2 text-sm text-gray-600 font-light">
                <Link href="/" className="hover:text-black transition-colors">
                  Inicio
                </Link>
                <span>›</span>
                <span className="text-black">Nuestro Equipo</span>
              </nav>
            </div>
          </Container>
        </section>

        {/* Team Grid - Cards Centradas y Elegantes */}
        <section className="py-20">
          <Container>
            {hasTeamMembers ? (
              <div className="max-w-5xl mx-auto">
                {/* Grid centrado con máximo 3 columnas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {processedTeam.map((member) => (
                    <Card key={member.id} className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-500 bg-white">
                      {/* Foto del miembro - más grande para ver mejor */}
                      <div className="relative h-96 overflow-hidden bg-gray-100">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Overlay sutil con gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Información del miembro - diseño minimalista */}
                      <div className="p-6">
                        <h3 className="text-xl font-light tracking-tight text-gray-900 mb-1">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-500 font-light uppercase tracking-wider mb-4">
                          {member.position}
                        </p>
                        
                        {/* Bio - más sutil */}
                        {member.bio && (
                          <p className="text-sm text-gray-600 font-light leading-relaxed line-clamp-2 mb-4">
                            {stripHtml(member.bio)}
                          </p>
                        )}
                        
                        {/* Idiomas - diseño simplificado */}
                        {member.languages.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {member.languages.map((lang: string, index: number) => (
                              <span 
                                key={index}
                                className="text-xs text-gray-500 font-light px-2 py-1 bg-gray-50 rounded-full"
                              >
                                {lang}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Contacto - diseño más limpio */}
                        <div className="space-y-2 pt-4 border-t border-gray-100">
                          {member.email && (
                            <a 
                              href={`mailto:${member.email}`}
                              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300 font-light"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                              </svg>
                              <span className="truncate">Contactar</span>
                            </a>
                          )}
                          
                          {member.phone && (
                            <a 
                              href={`tel:${member.phone}`}
                              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300 font-light"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                              </svg>
                              <span>{member.phone}</span>
                            </a>
                          )}
                        </div>
                        
                        {/* Redes sociales - más sutiles */}
                        {member.linkedin && (
                          <div className="flex gap-3 mt-4">
                            <a 
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-900 transition-colors duration-300"
                              aria-label="LinkedIn"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                            </a>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Mensaje si hay menos de 3 miembros - para mantener el diseño centrado */}
                {processedTeam.length < 3 && (
                  <div className="text-center mt-16 py-12 bg-gray-50 rounded-2xl">
                    <p className="text-gray-600 font-light">
                      Estamos ampliando nuestro equipo. Pronto más profesionales se unirán a nosotros.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Mensaje cuando no hay datos del equipo - diseño minimalista */
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-2xl p-12 max-w-2xl mx-auto">
                  <svg 
                    className="w-16 h-16 text-gray-300 mx-auto mb-6" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
                  <h2 className="text-2xl font-light tracking-tight mb-3">
                    Información del equipo no disponible
                  </h2>
                  <p className="text-gray-600 font-light">
                    No se pudo cargar la información del equipo en este momento.
                  </p>
                </div>
              </div>
            )}
          </Container>
        </section>

        {/* CTA - Diseño minimalista */}
        {hasTeamMembers && (
          <section className="py-20">
            <Container>
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
                  ¿Listo para encontrar tu hogar ideal?
                </h2>
                <p className="text-gray-600 font-light mb-8 leading-relaxed">
                  Nuestro equipo está aquí para ayudarte en cada paso. 
                  Contáctanos y comenzaremos a buscar juntos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contacto">
                    <button className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-brand hover:text-black hover:border-brand transition-colors duration-300 font-light">
                      Contactar con el equipo
                    </button>
                  </Link>
                  <Link href="/propiedades">
                    <button className="border border-gray-900 text-gray-900 px-8 py-3 rounded-full hover:bg-brand hover:text-black hover:border-brand transition-colors duration-300 font-light">
                      Ver propiedades
                    </button>
                  </Link>
                </div>
              </div>
            </Container>
          </section>
        )}
      </main>

      <Footer config={siteConfig} />
    </>
  );
}
