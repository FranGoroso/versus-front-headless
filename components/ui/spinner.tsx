/**
 * Spinner Component
 * 
 * Componente de spinner/loader reutilizable con variantes de tamaño.
 * Diseño minimalista con animación suave.
 * 
 * @component
 * @version 1.0.0
 * @created 2025-10-28
 * 
 * @example
 * ```tsx
 * <Spinner size="lg" />
 * <Spinner size="sm" className="text-brand" />
 * ```
 */

import { cn } from '@/lib/utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-3',
  xl: 'w-16 h-16 border-4',
};

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div
      className={cn(
        'inline-block rounded-full border-gray-200 border-t-gray-900 animate-spin',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Cargando..."
    >
      <span className="sr-only">Cargando...</span>
    </div>
  );
}

/**
 * LoadingOverlay
 * 
 * Overlay de pantalla completa con spinner central.
 * Útil para operaciones que bloquean toda la interfaz.
 */
interface LoadingOverlayProps {
  message?: string;
  backdrop?: boolean;
}

export function LoadingOverlay({ 
  message = 'Cargando...', 
  backdrop = true 
}: LoadingOverlayProps) {
  return (
    <div 
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        backdrop && 'bg-white/80 backdrop-blur-sm'
      )}
    >
      <div className="text-center">
        <Spinner size="xl" className="mx-auto mb-4" />
        <p className="text-gray-600 font-light text-lg">{message}</p>
      </div>
    </div>
  );
}

/**
 * LoadingScreen
 * 
 * Pantalla de carga completa con branding.
 * Para uso en carga inicial de la aplicación.
 */
interface LoadingScreenProps {
  message?: string;
  showLogo?: boolean;
}

export function LoadingScreen({ 
  message = 'Cargando Versus Andorra...', 
  showLogo = true 
}: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        {showLogo && (
          <div className="mb-8">
            <h1 className="text-4xl font-light tracking-tight text-gray-900">
              Versus Andorra
            </h1>
            <div className="h-1 w-24 bg-brand mx-auto mt-4" />
          </div>
        )}
        
        <Spinner size="lg" className="mx-auto mb-6" />
        
        <p className="text-gray-600 font-light">{message}</p>
      </div>
    </div>
  );
}

/**
 * InlineLoader
 * 
 * Loader pequeño para uso inline en botones o texto.
 */
interface InlineLoaderProps {
  text?: string;
  className?: string;
}

export function InlineLoader({ text = 'Cargando...', className }: InlineLoaderProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Spinner size="sm" />
      <span className="text-sm font-light text-gray-600">{text}</span>
    </div>
  );
}

/**
 * PageLoader
 * 
 * Loader para secciones de página.
 * No ocupa toda la pantalla, solo el contenedor.
 */
interface PageLoaderProps {
  message?: string;
  minHeight?: string;
}

export function PageLoader({ 
  message = 'Cargando contenido...', 
  minHeight = 'min-h-[400px]' 
}: PageLoaderProps) {
  return (
    <div className={cn('flex items-center justify-center w-full', minHeight)}>
      <div className="text-center">
        <Spinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600 font-light">{message}</p>
      </div>
    </div>
  );
}
