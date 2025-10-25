/**
 * ScrollToButton Component
 * 
 * Client Component que maneja navegación scroll sin romper Next.js 13 Server Components.
 * Wrapper para el componente Button de shadcn/ui que acepta event handlers.
 * 
 * @component
 * @version 1.0.0
 * 
 * @example
 * // Uso básico
 * <ScrollToButton targetId="section-id">
 *   Click aquí
 * </ScrollToButton>
 * 
 * @example
 * // Con props personalizadas
 * <ScrollToButton 
 *   targetId="form" 
 *   size="lg" 
 *   className="rounded-full"
 * >
 *   Ir al formulario
 * </ScrollToButton>
 */

'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

/**
 * Props del componente ScrollToButton
 */
interface ScrollToButtonProps {
  /**
   * ID del elemento HTML al que se hará scroll
   */
  targetId: string;
  
  /**
   * Contenido del botón
   */
  children: ReactNode;
  
  /**
   * Tamaño del botón (de shadcn/ui Button)
   */
  size?: 'default' | 'sm' | 'lg' | 'icon';
  
  /**
   * Variante visual del botón (de shadcn/ui Button)
   */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
  
  /**
   * Comportamiento del scroll
   * - 'smooth': animación suave
   * - 'auto': scroll instantáneo
   * @default 'smooth'
   */
  scrollBehavior?: ScrollBehavior;
}

/**
 * Componente ScrollToButton
 * 
 * Encapsula la lógica de scroll en un Client Component para evitar
 * pasar event handlers desde Server Components a Client Components.
 * 
 * Utiliza scrollIntoView() con smooth behavior para una experiencia fluida.
 */
export function ScrollToButton({
  targetId,
  children,
  size = 'default',
  variant = 'default',
  className = '',
  scrollBehavior = 'smooth',
}: ScrollToButtonProps) {
  /**
   * Handler de click que ejecuta el scroll al elemento objetivo
   */
  const handleScrollTo = () => {
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: scrollBehavior,
        block: 'start',
      });
    } else {
      console.warn(`ScrollToButton: No se encontró elemento con id="${targetId}"`);
    }
  };

  return (
    <Button
      onClick={handleScrollTo}
      size={size}
      variant={variant}
      className={className}
    >
      {children}
    </Button>
  );
}
