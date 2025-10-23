/**
 * Newsletter Form Component
 * 
 * Formulario de suscripción al newsletter.
 * Client Component para manejar interacciones del usuario.
 * 
 * @component
 * @version 1.0.0
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

/**
 * Props del componente NewsletterForm
 */
interface NewsletterFormProps {
  /** Texto del título */
  title?: string;
  /** Texto de la descripción */
  description?: string;
  /** Texto del placeholder del input */
  placeholder?: string;
  /** Texto del botón */
  buttonText?: string;
  /** Clase CSS adicional para el contenedor */
  className?: string;
}

/**
 * Componente de formulario de newsletter
 * 
 * Maneja la suscripción al newsletter con validación de email
 * y feedback visual al usuario.
 */
export function NewsletterForm({
  title = "No te pierdas ninguna novedad",
  description = "Suscríbete a nuestro newsletter y recibe las últimas noticias del mercado inmobiliario de Andorra directamente en tu inbox.",
  placeholder = "Tu email",
  buttonText = "Suscribirse",
  className = ""
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  /**
   * Manejar el envío del formulario
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validación básica de email
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Por favor, introduce un email válido');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      // TODO: Implementar la llamada real a la API de suscripción
      // Por ahora simulamos una petición
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulamos éxito
      setStatus('success');
      setMessage('¡Gracias por suscribirte! Te hemos enviado un email de confirmación.');
      setEmail('');
      
      // Resetear el estado después de 5 segundos
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
      
    } catch (error) {
      setStatus('error');
      setMessage('Ha ocurrido un error. Por favor, inténtalo de nuevo.');
      
      // Resetear el estado de error después de 5 segundos
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  return (
    <div className={`max-w-2xl mx-auto text-center ${className}`}>
      <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
        {title}
      </h2>
      <p className="text-gray-600 font-light mb-8">
        {description}
      </p>
      
      <form 
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          disabled={status === 'loading' || status === 'success'}
          className="flex-1 px-6 py-3 border border-gray-200 rounded-full 
                     focus:outline-none focus:ring-1 focus:ring-gray-900 
                     focus:border-gray-900 transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
          required
        />
        <Button 
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="px-8 py-3 bg-gray-900 text-white rounded-full 
                     hover:bg-gray-800 transition-colors duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Enviando...' : 
           status === 'success' ? '¡Suscrito!' : 
           buttonText}
        </Button>
      </form>
      
      {/* Mensaje de feedback */}
      {message && (
        <p className={`mt-4 text-sm font-light transition-all duration-300
          ${status === 'success' ? 'text-green-600' : ''}
          ${status === 'error' ? 'text-red-600' : ''}
        `}>
          {message}
        </p>
      )}
    </div>
  );
}
