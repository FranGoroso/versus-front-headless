/**
 * Script de Diagnóstico WordPress Headless
 * 
 * Verifica el estado actual del backend WordPress y reporta problemas.
 * Ejecutar con: node scripts/diagnostico-headless.js
 * 
 * @version 1.0.0
 * @created 2025-10-26
 */

const https = require('https');
const http = require('http');

// Configuración
const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://versusandorra.local/wp-json';
const TIMEOUT = 5000;

// Colores para consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

/**
 * Función para hacer peticiones HTTP
 */
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.get(url, { timeout: TIMEOUT }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: data,
        });
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Imprimir resultado de test
 */
function printResult(name, passed, message = '') {
  const icon = passed ? '✅' : '❌';
  const color = passed ? colors.green : colors.red;
  console.log(`${icon} ${color}${name}${colors.reset}${message ? ` - ${message}` : ''}`);
}

/**
 * Imprimir header de sección
 */
function printSection(title) {
  console.log(`\n${colors.cyan}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.cyan}${title}${colors.reset}`);
  console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}\n`);
}

/**
 * Test 1: Verificar API Root
 */
async function testAPIRoot() {
  try {
    const response = await makeRequest(WORDPRESS_URL);
    
    if (response.status === 200) {
      const data = JSON.parse(response.data);
      printResult('API Root accesible', true, `Nombre: ${data.name || 'N/A'}`);
      return true;
    } else {
      printResult('API Root accesible', false, `Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    printResult('API Root accesible', false, `Error: ${error.message}`);
    return false;
  }
}

/**
 * Test 2: Verificar CORS
 */
async function testCORS() {
  try {
    const response = await makeRequest(WORDPRESS_URL);
    const corsHeader = response.headers['access-control-allow-origin'];
    
    if (corsHeader) {
      printResult('CORS configurado', true, `Origin: ${corsHeader}`);
      return true;
    } else {
      printResult('CORS configurado', false, 'Header no encontrado');
      return false;
    }
  } catch (error) {
    printResult('CORS configurado', false, `Error: ${error.message}`);
    return false;
  }
}

/**
 * Test 3: Verificar Endpoint de Propiedades
 */
async function testPropertiesEndpoint() {
  try {
    const url = `${WORDPRESS_URL}/wp/v2/properties?per_page=1`;
    const response = await makeRequest(url);
    
    if (response.status === 200) {
      const data = JSON.parse(response.data);
      const count = Array.isArray(data) ? data.length : 0;
      printResult('Endpoint Properties', true, `${count} propiedad(es) disponible(s)`);
      
      // Verificar campo de precio si hay propiedades
      if (count > 0 && data[0].property_meta) {
        const hasPrice = data[0].property_meta.REAL_HOMES_property_price || 
                        data[0].property_meta.property_price;
        if (hasPrice) {
          printResult('  - Campo precio', true, `Valor: ${hasPrice}`);
        } else {
          printResult('  - Campo precio', false, 'No encontrado en property_meta');
        }
      }
      
      return true;
    } else {
      printResult('Endpoint Properties', false, `Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    printResult('Endpoint Properties', false, `Error: ${error.message}`);
    return false;
  }
}

/**
 * Test 4: Verificar Endpoint de Blog
 */
async function testPostsEndpoint() {
  try {
    const url = `${WORDPRESS_URL}/wp/v2/posts?per_page=1`;
    const response = await makeRequest(url);
    
    if (response.status === 200) {
      const data = JSON.parse(response.data);
      const count = Array.isArray(data) ? data.length : 0;
      printResult('Endpoint Posts', true, `${count} post(s) disponible(s)`);
      return true;
    } else {
      printResult('Endpoint Posts', false, `Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    printResult('Endpoint Posts', false, `Error: ${error.message}`);
    return false;
  }
}

/**
 * Test 5: Verificar Endpoint Custom (versus/v1/config)
 */
async function testCustomConfigEndpoint() {
  try {
    const url = `${WORDPRESS_URL}/versus/v1/config`;
    const response = await makeRequest(url);
    
    if (response.status === 200) {
      printResult('Endpoint Custom Config', true);
      return true;
    } else if (response.status === 404) {
      printResult('Endpoint Custom Config', false, 'Plugin headless no activado o no encontrado');
      return false;
    } else {
      printResult('Endpoint Custom Config', false, `Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    printResult('Endpoint Custom Config', false, `Error: ${error.message}`);
    return false;
  }
}

/**
 * Test 6: Verificar Endpoint de Búsqueda Custom
 */
async function testCustomSearchEndpoint() {
  try {
    const url = `${WORDPRESS_URL}/versus/v1/properties/search`;
    const response = await makeRequest(url);
    
    if (response.status === 200) {
      printResult('Endpoint Custom Search', true);
      return true;
    } else if (response.status === 404) {
      printResult('Endpoint Custom Search', false, 'Plugin headless no activado');
      return false;
    } else {
      printResult('Endpoint Custom Search', false, `Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    printResult('Endpoint Custom Search', false, `Error: ${error.message}`);
    return false;
  }
}

/**
 * Test 7: Verificar Taxonomías
 */
async function testTaxonomies() {
  const taxonomies = [
    { name: 'Property Types', endpoint: '/wp/v2/type' },
    { name: 'Property Status', endpoint: '/wp/v2/status' },
    { name: 'Property Cities', endpoint: '/wp/v2/city' },
    { name: 'Property Features', endpoint: '/wp/v2/feature' },
  ];
  
  let allPassed = true;
  
  for (const taxonomy of taxonomies) {
    try {
      const url = `${WORDPRESS_URL}${taxonomy.endpoint}?per_page=1`;
      const response = await makeRequest(url);
      
      if (response.status === 200) {
        const data = JSON.parse(response.data);
        const count = Array.isArray(data) ? data.length : 0;
        printResult(`  - ${taxonomy.name}`, true, `${count} término(s)`);
      } else {
        printResult(`  - ${taxonomy.name}`, false, `Status: ${response.status}`);
        allPassed = false;
      }
    } catch (error) {
      printResult(`  - ${taxonomy.name}`, false, `Error: ${error.message}`);
      allPassed = false;
    }
  }
  
  return allPassed;
}

/**
 * Resumen Final
 */
function printSummary(results) {
  printSection('RESUMEN');
  
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  const percentage = Math.round((passed / total) * 100);
  
  console.log(`Tests pasados: ${passed}/${total} (${percentage}%)\n`);
  
  if (percentage === 100) {
    console.log(`${colors.green}🎉 ¡PERFECTO! WordPress está 100% listo como backend headless.${colors.reset}\n`);
  } else if (percentage >= 70) {
    console.log(`${colors.yellow}⚠️  WordPress está parcialmente configurado. Revisar tests fallidos.${colors.reset}\n`);
  } else {
    console.log(`${colors.red}❌ WordPress requiere configuración. Revisar documentación.${colors.reset}\n`);
  }
  
  // Recomendaciones
  console.log(`${colors.blue}PRÓXIMOS PASOS:${colors.reset}\n`);
  
  const failedTests = results.filter(r => !r.passed);
  if (failedTests.length > 0) {
    console.log('1. Revisar los tests fallidos arriba');
    console.log('2. Consultar documentación en docs/conversion-headless-2025/');
    console.log('3. Verificar que el plugin versus-headless-api está activado');
    console.log('4. Verificar permalinks en WordPress: /%postname%/\n');
  } else {
    console.log('1. ✅ Backend WordPress listo');
    console.log('2. ✅ Continuar con frontend Next.js');
    console.log('3. ✅ Ejecutar: npm run dev\n');
  }
}

/**
 * Ejecutar todos los tests
 */
async function runDiagnostics() {
  console.log(`\n${colors.cyan}╔${'═'.repeat(58)}╗${colors.reset}`);
  console.log(`${colors.cyan}║  DIAGNÓSTICO WORDPRESS HEADLESS - VERSUS ANDORRA        ║${colors.reset}`);
  console.log(`${colors.cyan}╚${'═'.repeat(58)}╝${colors.reset}`);
  console.log(`\nFecha: ${new Date().toLocaleString('es-ES')}`);
  console.log(`WordPress API: ${WORDPRESS_URL}\n`);
  
  const results = [];
  
  // Test 1: API Root
  printSection('TEST 1: Conectividad Básica');
  results.push({ name: 'API Root', passed: await testAPIRoot() });
  results.push({ name: 'CORS', passed: await testCORS() });
  
  // Test 2: Endpoints Core
  printSection('TEST 2: Endpoints Core de WordPress');
  results.push({ name: 'Properties', passed: await testPropertiesEndpoint() });
  results.push({ name: 'Posts', passed: await testPostsEndpoint() });
  
  // Test 3: Endpoints Custom
  printSection('TEST 3: Endpoints Personalizados (Plugin)');
  results.push({ name: 'Custom Config', passed: await testCustomConfigEndpoint() });
  results.push({ name: 'Custom Search', passed: await testCustomSearchEndpoint() });
  
  // Test 4: Taxonomías
  printSection('TEST 4: Taxonomías de Propiedades');
  results.push({ name: 'Taxonomies', passed: await testTaxonomies() });
  
  // Resumen
  printSummary(results);
}

// Ejecutar diagnóstico
runDiagnostics().catch((error) => {
  console.error(`\n${colors.red}ERROR CRÍTICO:${colors.reset}`, error);
  process.exit(1);
});
