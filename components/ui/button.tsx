import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap text-sm font-light tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden group',
  {
    variants: {
      variant: {
        default: 
          'bg-gray-900 text-white hover:bg-gray-800 shadow-sm hover:shadow-md',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow-md',
        outline:
          'border border-gray-200 bg-transparent hover:bg-gray-50 hover:border-gray-300',
        secondary:
          'bg-gray-100 text-gray-900 hover:bg-gray-200',
        ghost: 
          'hover:bg-gray-100 hover:text-gray-900',
        link: 
          'text-gray-900 underline-offset-4 hover:underline',
        premium:
          'bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:from-gray-800 hover:to-gray-600 shadow-lg hover:shadow-xl',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-8 px-4 py-1.5 text-xs',
        lg: 'h-12 px-8 py-3',
        xl: 'h-14 px-10 py-4 text-base',
        icon: 'h-10 w-10',
      },
      rounded: {
        default: 'rounded-md',
        full: 'rounded-full',
        lg: 'rounded-lg',
        none: 'rounded-none',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, loading = false, icon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {/* Efecto de hover suave */}
        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        
        {/* Loading spinner */}
        {loading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        
        {/* Icon */}
        {icon && !loading && (
          <span className="mr-2">{icon}</span>
        )}
        
        {/* Content */}
        <span className="relative z-10">{children}</span>
        
        {/* Ripple effect container */}
        <span className="absolute inset-0 overflow-hidden rounded-inherit">
          <span className="absolute inset-0 rounded-inherit bg-current opacity-0 group-hover:animate-ripple" />
        </span>
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
