/**
 * Probar rutas con URL encoding correcto
 */

const WORDPRESS_URL = 'http://versusandorra.local';
const API_BASE = `${WORDPRESS_URL}/wp-json`;

async function testWithEncoding() {
  console.log('🔍 Probando rutas con diferentes encodings...\n');
  
  const routes = [
    { name: 'Tipos de Propiedad', paths: [
      '/wp/v2/tipos-propiedad',
      '/wp/v2/property-type',
      '/wp-json/wp/v2/property-type',
    ]},
    { name: 'Estados/Estatus', paths: [
      '/wp/v2/estatus-propiedad',
      '/wp/v2/property-status',
      '/wp-json/wp/v2/property-status',
    ]},
    { name: 'Características', paths: [
      '/wp/v2/características-propiedad',
      '/wp/v2/caracteristicas-propiedad',
      '/wp/v2/property-feature',
      '/wp-json/wp/v2/property-feature',
    ]},
    { name: 'Ciudades', paths: [
      '/wp/v2/ciudades-propiedad',
      '/wp/v2/property-city',
      '/wp-json/wp/v2/property-city',
    ]},
  ];
  
  for (const route of routes) {
    console.log(`📋 ${route.name}:`);
    
    for (const path of route.paths) {
      // Probar con y sin encoding
      const testUrls = [
        `${WORDPRESS_URL}${path}`,
        `${WORDPRESS_URL}${encodeURI(path)}`,
      ];
      
      for (const url of testUrls) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            const count = Array.isArray(data) ? data.length : 1;
            console.log(`   ✅ ${path}`);
            console.log(`      URL: ${url}`);
            console.log(`      Términos: ${count}`);
            if (Array.isArray(data) && data.length > 0) {
              console.log(`      Ejemplos: ${data.slice(0, 3).map(d => d.name).join(', ')}`);
            }
            // Si funciona, no probar más variantes
            break;
          }
        } catch (err) {
          // Continuar con siguiente variante
        }
      }
    }
    console.log('');
  }
  
  // Probar también acceso directo a términos embebidos en propiedades
  console.log('🔍 Probando taxonomías embebidas en propiedades...\n');
  
  try {
    const propUrl = `${WORDPRESS_URL}/wp-json/wp/v2/properties?per_page=1&_embed=true`;
    const response = await fetch(propUrl);
    if (response.ok) {
      const properties = await response.json();
      if (properties.length > 0) {
        const prop = properties[0];
        
        console.log('📦 Datos embebidos en la propiedad:');
        console.log(`   Propiedad: ${prop.title?.rendered || prop.title}`);
        
        // Buscar términos embebidos
        if (prop._embedded) {
          Object.keys(prop._embedded).forEach(key => {
            if (key.includes('term') || key.includes('wp:term')) {
              console.log(`   ✓ ${key}:`, prop._embedded[key]);
            }
          });
        }
        
        // Buscar en el objeto directo
        const taxonomyKeys = [
          'property-type',
          'property-status', 
          'property-feature',
          'property-city',
          'property_type',
          'property_status',
          'property_feature',
          'property_city',
          'tipos-propiedad',
          'estatus-propiedad',
          'características-propiedad',
          'ciudades-propiedad'
        ];
        
        console.log('\n   📋 Taxonomías encontradas en la propiedad:');
        taxonomyKeys.forEach(key => {
          if (prop[key] !== undefined) {
            console.log(`      ✓ ${key}:`, prop[key]);
          }
        });
      }
    }
  } catch (err) {
    console.log('   ❌ Error obteniendo propiedad:', err.message);
  }
}

testWithEncoding();
