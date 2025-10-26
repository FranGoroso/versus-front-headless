/**
 * Buscar todas las rutas de taxonomías en español
 */

const WORDPRESS_URL = 'http://versusandorra.local';
const API_BASE = `${WORDPRESS_URL}/wp-json`;

async function findSpanishRoutes() {
  console.log('🔍 Buscando rutas de taxonomías en español...\n');
  
  try {
    const response = await fetch(API_BASE);
    const data = await response.json();
    const routes = data.routes || {};
    
    // Palabras clave en español relacionadas con propiedades
    const spanishKeywords = [
      'propiedad',
      'tipo',
      'estado',
      'estatus',
      'caracteristica',
      'ciudad',
      'ubicacion',
      'zona',
      'area'
    ];
    
    console.log('📋 Rutas encontradas relacionadas con propiedades:\n');
    
    const foundRoutes = {};
    
    Object.keys(routes).forEach(route => {
      // Solo rutas de wp/v2 y que no sean de properties directamente
      if (route.includes('/wp/v2/') && !route.includes('/properties')) {
        spanishKeywords.forEach(keyword => {
          if (route.toLowerCase().includes(keyword)) {
            // Extraer el endpoint base (sin parámetros)
            const baseRoute = route.split('(?P')[0];
            if (!foundRoutes[baseRoute]) {
              foundRoutes[baseRoute] = true;
            }
          }
        });
      }
    });
    
    const uniqueRoutes = Object.keys(foundRoutes).sort();
    
    if (uniqueRoutes.length > 0) {
      console.log('✅ Encontradas:');
      uniqueRoutes.forEach(route => {
        console.log(`   ${route}`);
      });
      
      // Intentar obtener datos de cada ruta
      console.log('\n🧪 Probando cada ruta...\n');
      
      for (const route of uniqueRoutes) {
        const fullUrl = `${WORDPRESS_URL}${route}`;
        try {
          const testResponse = await fetch(fullUrl);
          if (testResponse.ok) {
            const testData = await testResponse.json();
            const count = Array.isArray(testData) ? testData.length : 1;
            console.log(`✅ ${route}`);
            console.log(`   Términos: ${count}`);
            if (Array.isArray(testData) && testData.length > 0) {
              console.log(`   Ejemplo: "${testData[0].name}" (slug: ${testData[0].slug})`);
            }
          } else {
            console.log(`❌ ${route} - Status ${testResponse.status}`);
          }
        } catch (err) {
          console.log(`❌ ${route} - Error: ${err.message}`);
        }
        console.log('');
      }
      
    } else {
      console.log('❌ No se encontraron rutas en español');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

findSpanishRoutes();
