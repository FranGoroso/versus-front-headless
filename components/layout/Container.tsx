/**
 * Container Component
 * 
 * Wrapper de contenido con ancho máximo y padding responsive.
 * Mantiene consistencia visual en todo el sitio.
 * 
 * @component
 */

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Container({ 
  children, 
  className = '',
  size = 'xl' 
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className={`${sizeClasses[size]} mx-auto px-6 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
