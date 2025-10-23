'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <div className="text-2xl font-serif font-bold tracking-tight">VERSUS</div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#propiedades" className="text-sm text-gray-700 hover:text-black transition-colors">
                Propiedades
              </a>
              <a href="#servicios" className="text-sm text-gray-700 hover:text-black transition-colors">
                Servicios
              </a>
              <a href="#nosotros" className="text-sm text-gray-700 hover:text-black transition-colors">
                Nosotros
              </a>
              <a href="#contacto">
                <Button variant="outline" size="sm" className="rounded-full">
                  Contacto
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Luxury property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Tu hogar perfecto<br />te está esperando
          </h1>
          <p className="text-lg md:text-xl mb-12 text-white/90 max-w-2xl mx-auto">
            Descubre propiedades exclusivas con el servicio personalizado que mereces
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 rounded-full px-8">
              Ver propiedades
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8">
              Agendar visita
            </Button>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Propiedades destacadas</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Selección exclusiva de inmuebles con las mejores ubicaciones y amenidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
              title: 'Villa Moderna',
              location: 'Marbella, España',
              price: '€2,450,000',
              beds: 4,
              baths: 3,
              sqm: 320
            },
            {
              image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
              title: 'Apartamento Exclusivo',
              location: 'Barcelona, España',
              price: '€890,000',
              beds: 3,
              baths: 2,
              sqm: 180
            },
            {
              image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
              title: 'Casa de Campo',
              location: 'Mallorca, España',
              price: '€1,250,000',
              beds: 5,
              baths: 4,
              sqm: 450
            }
          ].map((property, index) => (
            <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="relative h-80 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl font-bold mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-4">{property.location}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b">
                  <span>{property.beds} habitaciones</span>
                  <span>•</span>
                  <span>{property.baths} baños</span>
                  <span>•</span>
                  <span>{property.sqm}m²</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-bold">{property.price}</span>
                  <Button variant="ghost" className="rounded-full">
                    Ver más
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="relative py-40 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Luxury interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-8">
            Experiencia que marca la diferencia
          </h2>
          <p className="text-xl mb-12 text-white/90 leading-relaxed">
            En Versus, cada propiedad cuenta una historia única. Nuestro compromiso es conectarte con espacios que reflejen tu estilo de vida y aspiraciones.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            <div>
              <div className="text-5xl font-serif font-bold mb-2">500+</div>
              <div className="text-white/80">Propiedades vendidas</div>
            </div>
            <div>
              <div className="text-5xl font-serif font-bold mb-2">15</div>
              <div className="text-white/80">Años de experiencia</div>
            </div>
            <div>
              <div className="text-5xl font-serif font-bold mb-2">98%</div>
              <div className="text-white/80">Clientes satisfechos</div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Nuestros servicios</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Soluciones integrales para todas tus necesidades inmobiliarias
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="group">
            <div className="relative h-96 mb-8 overflow-hidden rounded-2xl">
              <img
                src="https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Compra"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="font-serif text-3xl font-bold mb-4">Compra</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Te acompañamos en cada paso del proceso de compra, desde la búsqueda inicial hasta la firma final, garantizando una experiencia sin complicaciones.
            </p>
          </div>

          <div className="group">
            <div className="relative h-96 mb-8 overflow-hidden rounded-2xl">
              <img
                src="https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Venta"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="font-serif text-3xl font-bold mb-4">Venta</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Maximizamos el valor de tu propiedad con estrategias de marketing personalizadas y una red de compradores calificados.
            </p>
          </div>

          <div className="group">
            <div className="relative h-96 mb-8 overflow-hidden rounded-2xl">
              <img
                src="https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Alquiler"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="font-serif text-3xl font-bold mb-4">Alquiler</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Gestión completa de alquileres con inquilinos verificados y un servicio de atención que protege tu inversión.
            </p>
          </div>

          <div className="group">
            <div className="relative h-96 mb-8 overflow-hidden rounded-2xl">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Asesoría"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="font-serif text-3xl font-bold mb-4">Asesoría</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Consultoría especializada en inversiones inmobiliarias y análisis de mercado para tomar las mejores decisiones.
            </p>
          </div>
        </div>
      </section>

      <section id="contacto" className="py-32 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Hablemos</h2>
            <p className="text-gray-600 text-lg">
              Estamos aquí para ayudarte a encontrar tu próximo hogar
            </p>
          </div>

          <Card className="p-12 border-0 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre</label>
                  <Input placeholder="Tu nombre" className="h-12" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Apellido</label>
                  <Input placeholder="Tu apellido" className="h-12" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Teléfono</label>
                <Input placeholder="+34 600 000 000" className="h-12" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mensaje</label>
                <textarea
                  placeholder="Cuéntanos qué estás buscando..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <Button type="submit" size="lg" className="w-full rounded-full h-14 text-base">
                Enviar mensaje
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <footer className="bg-black text-white py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="font-serif text-3xl font-bold mb-6">VERSUS</div>
              <p className="text-gray-400">
                Tu socio de confianza en el mercado inmobiliario de lujo
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Propiedades</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Casas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Apartamentos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Villas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Comercial</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre nosotros</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Equipo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@versus.com</li>
                <li>+34 900 000 000</li>
                <li>Madrid, España</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Versus Inmobiliaria. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
