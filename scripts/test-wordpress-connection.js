/**
 * Script de prueba de conexión con WordPress API
 * Ejecutar con: node scripts/test-wordpress-connection.js
 * 
 * Este script verifica que todos los endpoints funcionen correctamente
 */

const WORDPRESS_URL = 'http://versusandorra.local';
const API_BASE = `${WORDPRESS_URL}/wp-json`;

// Colores para consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'cyan');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logSection(title) {
  console.log('\n');
  log('═'.repeat(60), 'bright');
  log(`  ${title}`, 'bright');
  log('═'.repeat(60), 'bright');
}

/**
 * Test de endpoint
 */
async function testEndpoint(name, url, expectedFields = []) {
  log(`\n🔍 Probando: ${name}`, 'cyan');
  log(`   URL: ${url}`, 'reset');
  
  try {
    const response = await fetch(url);
    const status = response.status;
    
    log(`   Status: ${status}`, status === 200 ? 'green' : 'red');
    
    if (status !== 200) {
      const text = await response.text();
      logError(`   Respuesta: ${text.substring(0, 200)}`);
      return false;
    }
    
    const data = await response.json();
    const isArray = Array.isArray(data);
    const count = isArray ? data.length : 1;
    
    logSuccess(`   ✓ Datos recibidos: ${count} ${isArray ? 'items' : 'item'}`);
    
    // Verificar campos esperados
    if (expectedFields.length > 0) {
      const firstItem = isArray ? data[0] : data;
      if (firstItem) {
        const missingFields = [];
        const presentFields = [];
        
        expectedFields.forEach(field => {
          // Soporte para campos anidados (ej: "property_meta.price")
          const fieldParts = field.split('.');
          let value = firstItem;
          
          for (const part of fieldParts) {
            value = value?.[part];
          }
          
          if (value !== undefined) {
            presentFields.push(field);
          } else {
            missingFields.push(field);
          }
        });
        
        if (presentFields.length > 0) {
          log(`   ✓ Campos presentes: ${presentFields.join(', ')}`, 'green');
        }
        
        if (missingFields.length > 0) {
          logWarning(`   ⚠ Campos faltantes: ${missingFields.join(', ')}`);
        }
      }
    }
    
    // Mostrar muestra de datos
    if (count > 0) {
      const sample = isArray ? data[0] : data;
      log(`   📦 Muestra de datos:`, 'blue');
      
      // Mostrar solo campos importantes
      const importantKeys = ['id', 'title', 'slug', 'name', 'price', 'property_price'];
      Object.keys(sample).forEach(key => {
        if (importantKeys.some(ik => key.includes(ik))) {
          const value = typeof sample[key] === 'object' 
            ? JSON.stringify(sample[key]).substring(0, 50) + '...'
            : sample[key];
          log(`      ${key}: ${value}`, 'reset');
        }
      });
    }
    
    return true;
  } catch (error) {
    logError(`   Error: ${error.message}`);
    return false;
  }
}

/**
 * Ejecutar todos los tests
 */
async function runTests() {
  logSection('TEST DE CONEXIÓN WORDPRESS HEADLESS API');
  
  let passedTests = 0;
  let totalTests = 0;
  
  // Test 1: WordPress API disponible
  totalTests++;
  logSection('1. Verificar que WordPress API esté disponible');
  if (await testEndpoint('WordPress API Root', API_BASE)) {
    passedTests++;
  }
  
  // Test 2: Propiedades
  totalTests++;
  logSection('2. Endpoint de Propiedades (WordPress Core)');
  if (await testEndpoint(
    'Propiedades (WP REST API)',
    `${API_BASE}/wp/v2/properties?per_page=3&_embed=true`,
    ['id', 'title', 'slug', 'property_meta']
  )) {
    passedTests++;
  }
  
  // Test 3: Propiedades destacadas (custom endpoint)
  totalTests++;
  logSection('3. Endpoint Custom de Propiedades Destacadas');
  if (await testEndpoint(
    'Propiedades Destacadas (Custom API)',
    `${API_BASE}/versus/v1/properties/featured?limit=3`,
    ['id', 'title', 'price', 'featured']
  )) {
    passedTests++;
  }
  
  // Test 4: Configuración del sitio
  totalTests++;
  logSection('4. Endpoint de Configuración del Sitio');
  if (await testEndpoint(
    'Configuración del Sitio',
    `${API_BASE}/versus/v1/config`,
    ['site_name', 'site_url']
  )) {
    passedTests++;
  }
  
  // Test 5: Taxonomías - Tipos de propiedad
  totalTests++;
  logSection('5. Taxonomías - Tipos de Propiedad');
  if (await testEndpoint(
    'Tipos de Propiedad',
    `${API_BASE}/wp/v2/property-type`,
    ['id', 'name', 'slug']
  )) {
    passedTests++;
  }
  
  // Test 6: Taxonomías - Estados
  totalTests++;
  logSection('6. Taxonomías - Estados de Propiedad');
  if (await testEndpoint(
    'Estados de Propiedad',
    `${API_BASE}/wp/v2/property-status`,
    ['id', 'name', 'slug']
  )) {
    passedTests++;
  }
  
  // Test 7: Taxonomías - Ciudades
  totalTests++;
  logSection('7. Taxonomías - Ciudades');
  if (await testEndpoint(
    'Ciudades',
    `${API_BASE}/wp/v2/property-city`,
    ['id', 'name', 'slug']
  )) {
    passedTests++;
  }
  
  // Test 8: Búsqueda avanzada
  totalTests++;
  logSection('8. Endpoint de Búsqueda Avanzada');
  
  const searchBody = {
    per_page: 3,
    min_price: 100000,
    max_price: 500000
  };
  
  log(`\n🔍 Probando: Búsqueda Avanzada de Propiedades`, 'cyan');
  log(`   URL: ${API_BASE}/versus/v1/properties/search`, 'reset');
  log(`   Body: ${JSON.stringify(searchBody)}`, 'reset');
  
  try {
    const response = await fetch(`${API_BASE}/versus/v1/properties/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchBody)
    });
    
    const status = response.status;
    log(`   Status: ${status}`, status === 200 ? 'green' : 'red');
    
    if (status === 200) {
      const data = await response.json();
      logSuccess(`   ✓ Búsqueda funcionando`);
      logSuccess(`   ✓ Propiedades encontradas: ${data.properties?.length || 0}`);
      logSuccess(`   ✓ Total en DB: ${data.total || 0}`);
      passedTests++;
    }
  } catch (error) {
    logError(`   Error: ${error.message}`);
  }
  
  // Test 9: Posts del blog
  totalTests++;
  logSection('9. Posts del Blog');
  if (await testEndpoint(
    'Posts del Blog',
    `${API_BASE}/wp/v2/posts?per_page=3&_embed=true`,
    ['id', 'title', 'slug']
  )) {
    passedTests++;
  }
  
  // Resumen final
  logSection('RESUMEN DE TESTS');
  
  const percentage = Math.round((passedTests / totalTests) * 100);
  
  log(`\n📊 Resultados:`, 'bright');
  log(`   Tests pasados: ${passedTests}/${totalTests}`, 
      passedTests === totalTests ? 'green' : 'yellow');
  log(`   Porcentaje: ${percentage}%`, 
      percentage === 100 ? 'green' : percentage >= 70 ? 'yellow' : 'red');
  
  console.log('\n');
  
  if (passedTests === totalTests) {
    logSuccess('🎉 ¡TODOS LOS TESTS PASARON! WordPress está configurado correctamente.');
  } else if (passedTests >= totalTests * 0.7) {
    logWarning('⚠️  La mayoría de tests pasaron, pero hay algunos problemas.');
    logInfo('Revisa los endpoints que fallaron arriba.');
  } else {
    logError('❌ Varios tests fallaron. WordPress no está configurado correctamente.');
    logInfo('Verifica que:');
    logInfo('  1. WordPress esté corriendo en http://versusandorra.local');
    logInfo('  2. El plugin "Versus Headless API" esté activado');
    logInfo('  3. Easy Real Estate esté instalado y configurado');
  }
  
  console.log('\n');
}

// Ejecutar tests
runTests().catch(error => {
  logError(`\n💥 Error fatal: ${error.message}`);
  process.exit(1);
});
