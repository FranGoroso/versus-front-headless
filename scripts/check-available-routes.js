/**
 * Verificar todas las rutas disponibles en WordPress
 */

const WORDPRESS_URL = 'http://versusandorra.local';
const API_BASE = `${WORDPRESS_URL}/wp-json`;

async function checkRoutes() {
  console.log('🔍 Obteniendo todas las rutas disponibles en WordPress...\n');
  
  try {
    const response = await fetch(API_BASE);
    const data = await response.json();
    
    console.log('📋 Namespaces disponibles:');
    data.namespaces.forEach(ns => console.log(`   - ${ns}`));
    
    console.log('\n📋 Rutas relacionadas con propiedades:');
    const routes = data.routes || {};
    
    Object.keys(routes).forEach(route => {
      if (route.includes('propert')) {
        console.log(`   ✓ ${route}`);
      }
    });
    
    console.log('\n💡 Buscando rutas de taxonomías explícitamente:');
    const taxonomyPatterns = [
      'property-type',
      'property-status', 
      'property-feature',
      'property-city',
      'property_type',
      'property_status',
      'property_feature', 
      'property_city',
      'type',
      'status',
      'feature',
      'city'
    ];
    
    taxonomyPatterns.forEach(pattern => {
      const found = Object.keys(routes).filter(r => 
        r.includes(pattern) && r.includes('wp/v2')
      );
      if (found.length > 0) {
        console.log(`   ✓ ${pattern}:`);
        found.forEach(r => console.log(`      ${r}`));
      }
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkRoutes();
