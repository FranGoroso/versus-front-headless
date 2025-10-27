/**
 * Debug Component - Temporary
 * 
 * Este componente muestra en consola los datos que llegan a PropertyFilters
 * para diagnosticar el problema con los dropdowns vacíos.
 * 
 * @component
 * @version 1.0.0
 * @created 2025-10-27
 * @temporary Solo para diagnóstico, eliminar después
 */

'use client';

import { useEffect } from 'react';
import { WPTaxonomy } from '@/types';

/**
 * Props del componente de debug
 */
interface DebugTaxonomiesProps {
  /** Tipos de propiedades recibidos desde el servidor */
  propertyTypes: WPTaxonomy[];
  /** Ciudades/parroquias recibidas desde el servidor */
  propertyCities: WPTaxonomy[];
}

/**
 * Componente que muestra información de debug en la consola del navegador.
 * No renderiza nada visible en la UI.
 */
export function DebugTaxonomies({ propertyTypes, propertyCities }: DebugTaxonomiesProps) {
  useEffect(() => {
    console.log('\n═════════════════════════════════════════════════════════════════');
    console.log('🔍 DEBUG TAXONOMIES - PropertyFilters (CLIENT SIDE)');
    console.log('═════════════════════════════════════════════════════════════════');
    
    console.log('\n📦 Property Types received in CLIENT:');
    console.log('   - Is Array?', Array.isArray(propertyTypes));
    console.log('   - Length:', propertyTypes?.length || 0);
    console.log('   - Type of data:', typeof propertyTypes);
    
    if (propertyTypes && propertyTypes.length > 0) {
      console.log('   - First 3 items:');
      propertyTypes.slice(0, 3).forEach((type, index) => {
        console.log(`      ${index + 1}. ${type.name} (${type.slug}) [ID: ${type.id}]`);
      });
    } else {
      console.log('   - ⚠️  ARRAY VACÍO O NULL EN EL CLIENTE!');
    }
    
    console.log('\n📦 Property Cities received in CLIENT:');
    console.log('   - Is Array?', Array.isArray(propertyCities));
    console.log('   - Length:', propertyCities?.length || 0);
    console.log('   - Type of data:', typeof propertyCities);
    
    if (propertyCities && propertyCities.length > 0) {
      console.log('   - First 3 items:');
      propertyCities.slice(0, 3).forEach((city, index) => {
        console.log(`      ${index + 1}. ${city.name} (${city.slug}) [ID: ${city.id}]`);
      });
    } else {
      console.log('   - ⚠️  ARRAY VACÍO O NULL EN EL CLIENTE!');
    }
    
    console.log('\n═════════════════════════════════════════════════════════════════');
    console.log('Nota: Compara estos logs con los del servidor en la terminal');
    console.log('═════════════════════════════════════════════════════════════════\n');
  }, [propertyTypes, propertyCities]);

  // No renderizar nada en la UI
  return null;
}
