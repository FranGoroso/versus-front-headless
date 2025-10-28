/**
 * Root Loading Component
 * 
 * Loading global de la aplicación.
 * Se muestra mientras carga cualquier página que no tenga su propio loading.tsx
 * 
 * @component
 * @version 1.0.0
 * @created 2025-10-28
 */

import { LoadingScreen } from '@/components/ui/spinner';

export default function Loading() {
  return <LoadingScreen message="Cargando..." />;
}
