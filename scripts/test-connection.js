/**
 * Script de Testing de Conexión WordPress API
 * 
 * Este script prueba la conectividad con todos los endpoints principales
 * de WordPress para verificar que el backend headless funciona correctamente.
 * 
 * Uso:
 *   node scripts/test-connection.js
 * 
 * Requisitos:
 *   - WordPress corriendo en Local
 *   - Plugin versus-headless-api activado
 *   - Node.js 18+
 * 
 * @author Versus Andorra Dev Team
 * @version 1.0.0
 */

const WORDPRESS_API_URL = 'http://versusandorra.local/wp-json';
const TIMEOUT = 5000; // 5 segundos

/**
 * Lista de endpoints a probar
 * Cada entrada contiene: nombre, URL, método HTTP y validación esperada
 */
const ENDPOINTS_TO_TEST = [
  {
    name: 'API Root',
    url: `${WORDPRESS_API_URL}/`,
    method: 'GET',
    validate: (data) => data.namespaces && data.namespaces.includes('wp/v2')
  },
  {
    name: 'Propiedades (Properties)',
    url: `${WORDPRESS_API_URL}/wp/v2/properties`,
    method: 'GET',
    validate: (data) => Array.isArray(data)
  },
  {
    name: 'Posts de Blog',
    url: `${WORDPRESS_API_URL}/wp/v2/posts`,
    method: 'GET',
    validate: (data) => Array.isArray(data)
  },
  {
    name: 'Páginas',
    url: `${WORDPRESS_API_URL}/wp/v2/pages`,
    method: 'GET',
    validate: (data) => Array.isArray(data)
  },
  {
    name: 'Config Versus',
    url: `${WORDPRESS_API_URL}/versus/v1/config`,
    method: 'GET',
    validate: (data) => data.site_name && data.property_settings
  },
  {
    name: 'Propiedades Destacadas',
    url: `${WORDPRESS_API_URL}/versus/v1/properties/featured?limit=3`,
    method: 'GET',
    validate: (data) => Array.isArray(data)
  },
  {
    name: 'Estadísticas',
    url: `${WORDPRESS_API_URL}/versus/v1/stats`,
    method: 'GET',
    validate: (data) => typeof data.total_properties === 'number'
  },
  {
    name: 'Tipos de Propiedad',
    url: `${WORDPRESS_API_URL}/wp/v2/type`,
    method: 'GET',
    validate: (data) => Array.isArray(data)
  },
  {
    name: 'Ciudades',
    url: `${WORDPRESS_API_URL}/wp/v2/city`,
    method: 'GET',
    validate: (data) => Array.isArray(data)
  },
];

/**
 * Colores para output en consola
 */
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

/**
 * Función para hacer fetch con timeout
 * 
 * @param {string} url - URL a fetchear
 * @param {number} timeout - Timeout en milisegundos
 * @returns {Promise<Response>}
 */
async function fetchWithTimeout(url, timeout = TIMEOUT) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

/**
 * Probar un endpoint individual
 * 
 * @param {Object} endpoint - Configuración del endpoint
 * @returns {Promise<Object>} Resultado del test
 */
async function testEndpoint(endpoint) {
  const startTime = Date.now();
  
  try {
    const response = await fetchWithTimeout(endpoint.url);
    const responseTime = Date.now() - startTime;
    
    if (!response.ok) {
      return {
        success: false,
        name: endpoint.name,
        status: response.status,
        statusText: response.statusText,
        responseTime,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();
    const isValid = endpoint.validate(data);

    return {
      success: isValid,
      name: endpoint.name,
      status: response.status,
      statusText: response.statusText,
      responseTime,
      dataCount: Array.isArray(data) ? data.length : 'N/A',
      validationPassed: isValid,
      error: isValid ? null : 'Validación de datos falló',
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    return {
      success: false,
      name: endpoint.name,
      status: null,
      statusText: null,
      responseTime,
      error: error.name === 'AbortError' ? 'Timeout excedido' : error.message,
    };
  }
}

/**
 * Verificar CORS headers
 * 
 * @param {string} url - URL a verificar
 * @returns {Promise<Object>}
 */
async function checkCORS(url) {
  try {
    const response = await fetch(url);
    const headers = {
      'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
      'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
      'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers'),
    };

    return {
      success: headers['Access-Control-Allow-Origin'] !== null,
      headers,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Función principal
 */
async function main() {
  console.log(`${colors.bright}${colors.blue}${'='.repeat(70)}${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}    WordPress Headless API - Test de Conexión${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}${'='.repeat(70)}${colors.reset}\n`);

  console.log(`${colors.bright}Base URL:${colors.reset} ${WORDPRESS_API_URL}`);
  console.log(`${colors.bright}Fecha:${colors.reset} ${new Date().toLocaleString('es-ES')}`);
  console.log(`${colors.bright}Timeout:${colors.reset} ${TIMEOUT}ms\n`);

  console.log(`${colors.yellow}Probando ${ENDPOINTS_TO_TEST.length} endpoints...${colors.reset}\n`);

  const results = [];
  let successCount = 0;
  let failCount = 0;

  // Probar cada endpoint
  for (let i = 0; i < ENDPOINTS_TO_TEST.length; i++) {
    const endpoint = ENDPOINTS_TO_TEST[i];
    process.stdout.write(`[${i + 1}/${ENDPOINTS_TO_TEST.length}] Probando: ${endpoint.name}...`);
    
    const result = await testEndpoint(endpoint);
    results.push(result);

    if (result.success) {
      successCount++;
      console.log(` ${colors.green}✓ OK${colors.reset} (${result.responseTime}ms, ${result.dataCount} items)`);
    } else {
      failCount++;
      console.log(` ${colors.red}✗ FAIL${colors.reset}`);
      console.log(`  ${colors.red}Error: ${result.error}${colors.reset}`);
    }
  }

  // Verificar CORS
  console.log(`\n${colors.yellow}Verificando CORS headers...${colors.reset}`);
  const corsResult = await checkCORS(WORDPRESS_API_URL);
  
  if (corsResult.success) {
    console.log(`${colors.green}✓ CORS configurado correctamente${colors.reset}`);
    console.log(`  Allow-Origin: ${corsResult.headers['Access-Control-Allow-Origin']}`);
    console.log(`  Allow-Methods: ${corsResult.headers['Access-Control-Allow-Methods']}`);
  } else {
    console.log(`${colors.red}✗ CORS NO configurado${colors.reset}`);
    console.log(`  Error: ${corsResult.error}`);
    failCount++;
  }

  // Resumen final
  console.log(`\n${colors.bright}${colors.blue}${'='.repeat(70)}${colors.reset}`);
  console.log(`${colors.bright}                          RESUMEN${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}${'='.repeat(70)}${colors.reset}\n`);

  const totalTests = ENDPOINTS_TO_TEST.length + 1; // +1 por CORS
  const successRate = ((successCount / totalTests) * 100).toFixed(1);

  console.log(`${colors.green}✓ Exitosos:${colors.reset} ${successCount}/${totalTests}`);
  console.log(`${colors.red}✗ Fallidos:${colors.reset} ${failCount}/${totalTests}`);
  console.log(`${colors.bright}Tasa de éxito:${colors.reset} ${successRate}%\n`);

  // Calcular tiempo promedio de respuesta
  const avgResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;
  console.log(`${colors.bright}Tiempo promedio de respuesta:${colors.reset} ${avgResponseTime.toFixed(0)}ms\n`);

  // Recomendaciones si hay fallos
  if (failCount > 0) {
    console.log(`${colors.yellow}⚠ RECOMENDACIONES:${colors.reset}\n`);
    
    const hasCORSError = !corsResult.success;
    const has404Error = results.some(r => r.status === 404);
    const hasTimeoutError = results.some(r => r.error && r.error.includes('Timeout'));
    
    if (hasCORSError) {
      console.log(`  1. Verificar que el plugin versus-headless-api esté activado:`);
      console.log(`     ${colors.cyan}wp plugin activate versus-headless-api${colors.reset}\n`);
    }
    
    if (has404Error) {
      console.log(`  2. Configurar permalinks y flush rewrite rules:`);
      console.log(`     ${colors.cyan}wp rewrite structure '/%postname%/' --hard${colors.reset}`);
      console.log(`     ${colors.cyan}wp rewrite flush --hard${colors.reset}\n`);
    }
    
    if (hasTimeoutError) {
      console.log(`  3. Verificar que WordPress esté corriendo en Local\n`);
    }
    
    console.log(`  Ver documentación completa en:`);
    console.log(`  ${colors.cyan}docs/wordpress-headless/04-DEBUGGING-TROUBLESHOOTING.md${colors.reset}\n`);
  } else {
    console.log(`${colors.green}${colors.bright}✓ ¡Todo funciona correctamente!${colors.reset}\n`);
    console.log(`  El backend headless está listo para usar.`);
    console.log(`  Puedes iniciar el desarrollo con: ${colors.cyan}npm run dev${colors.reset}\n`);
  }

  console.log(`${colors.bright}${colors.blue}${'='.repeat(70)}${colors.reset}\n`);

  // Exit code basado en resultados
  process.exit(failCount > 0 ? 1 : 0);
}

// Ejecutar
main().catch((error) => {
  console.error(`${colors.red}Error fatal:${colors.reset}`, error);
  process.exit(1);
});
