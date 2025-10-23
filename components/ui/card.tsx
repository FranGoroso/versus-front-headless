import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Card Component
 * Diseño elegante y minimalista con efectos hover sutiles
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
  }
>(({ className, hover = true, padding = 'md', ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'bg-white rounded-xl border border-gray-100',
      'transition-all duration-300',
      hover && 'hover:shadow-lg hover:border-gray-200 hover:-translate-y-0.5',
      {
        'p-0': padding === 'none',
        'p-4': padding === 'sm',
        'p-6': padding === 'md',
        'p-8': padding === 'lg',
      },
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

/**
 * Card Header
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

/**
 * Card Title
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-xl font-light tracking-wide text-gray-900',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

/**
 * Card Description
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-600 font-light', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

/**
 * Card Content
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
));
CardContent.displayName = 'CardContent';

/**
 * Card Footer
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

/**
 * Premium Card - Variante especial para destacar
 */
const PremiumCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative bg-white rounded-xl overflow-hidden',
      'shadow-xl hover:shadow-2xl',
      'transition-all duration-500',
      'group',
      className
    )}
    {...props}
  >
    {/* Gradient border effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative bg-white m-[1px] rounded-xl p-6">
      {children}
    </div>
  </div>
));
PremiumCard.displayName = 'PremiumCard';

/**
 * Glass Card - Efecto cristal
 */
const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'backdrop-blur-md bg-white/70',
      'border border-white/20',
      'rounded-xl p-6',
      'shadow-lg hover:shadow-xl',
      'transition-all duration-300',
      className
    )}
    {...props}
  />
));
GlassCard.displayName = 'GlassCard';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  PremiumCard,
  GlassCard,
};
