/**
 * 🔍 SCRIPT DE DIAGNÓSTICO DE PRECIOS
 * 
 * Instrucciones:
 * 1. Abre http://versusandorra.local/wp-json/wp/v2/properties?per_page=5
 * 2. Presiona F12 (DevTools)
 * 3. Ve a la pestaña "Console"
 * 4. Copia y pega TODO este código
 * 5. Presiona Enter
 * 
 * El script te mostrará:
 * - Dónde está cada campo de precio en WordPress
 * - Cuál precio se usaría en el frontend
 * - Resumen de propiedades con/sin precio
 */

(async function diagnosticoPreciosCompleto() {
  console.clear();
  console.log('%c═══════════════════════════════════════════════════════════', 'color: #E6E258; font-weight: bold; font-size: 16px');
  console.log('%c🔍 DIAGNÓSTICO COMPLETO DE PRECIOS - VERSUS ANDORRA', 'color: #E6E258; font-weight: bold; font-size: 18px');
  console.log('%c═══════════════════════════════════════════════════════════', 'color: #E6E258; font-weight: bold; font-size: 16px');
  console.log('');
  
  try {
    console.log('%c⏳ Solicitando propiedades desde WordPress...', 'color: #666');
    const url = 'http://versusandorra.local/wp-json/wp/v2/properties?per_page=10&_embed=true';
    console.log(`   URL: ${url}`);
    console.log('');
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const properties = await response.json();
    
    if (!properties || properties.length === 0) {
      console.log('%c❌ No se encontraron propiedades', 'color: red; font-weight: bold');
      console.log('');
      console.log('%c💡 Verifica que:', 'color: orange');
      console.log('   • Tienes propiedades creadas en WordPress');
      console.log('   • El plugin Easy Real Estate está activo');
      return;
    }
    
    console.log(`%c✅ ${properties.length} propiedades obtenidas de WordPress`, 'color: green; font-weight: bold');
    console.log('');
    console.log('%c═══════════════════════════════════════════════════════════', 'color: #E6E258');
    console.log('');
    
    // Analizar cada propiedad
    let conPrecio = 0;
    let sinPrecio = 0;
    
    properties.forEach((prop, i) => {
      console.group(`%c📦 ${i + 1}. ${prop.title.rendered}`, 'font-weight: bold; font-size: 14px; color: #333');
      console.log(`%cID: ${prop.id}`, 'color: #666');
      console.log(`%cSlug: ${prop.slug}`, 'color: #666');
      console.log('');
      
      // Buscar precio en todas las ubicaciones posibles
      console.log('%c🔎 Buscando precio en múltiples ubicaciones...', 'color: #666; font-style: italic');
      console.log('');
      
      const ubicaciones = {
        'property_meta.property_price': prop.property_meta?.property_price,
        'property_meta.price': prop.property_meta?.price,
        'acf.property_price': prop.acf?.property_price,
        'acf.price': prop.acf?.price,
        'meta.property_price': prop.meta?.property_price,
      };
      
      let precioEncontrado = null;
      let ubicacionEncontrada = null;
      
      Object.entries(ubicaciones).forEach(([ubicacion, valor]) => {
        const icono = valor ? '✅' : '❌';
        const estilo = valor ? 'color: green' : 'color: #ccc';
        console.log(`   ${icono} %c${ubicacion}: ${valor || '(vacío)'}`, estilo);
        
        if (valor && !precioEncontrado) {
          precioEncontrado = valor;
          ubicacionEncontrada = ubicacion;
        }
      });
      
      console.log('');
      
      // Resultado final
      if (precioEncontrado) {
        console.log(`%c💰 PRECIO ENCONTRADO: ${precioEncontrado}`, 'color: green; font-weight: bold; font-size: 14px');
        console.log(`   Ubicación: ${ubicacionEncontrada}`);
        conPrecio++;
      } else {
        console.log(`%c⚠️ SIN PRECIO CONFIGURADO`, 'color: red; font-weight: bold; font-size: 14px');
        console.log(`   %cResultado en frontend: "Consultar precio"`, 'color: orange');
        sinPrecio++;
      }
      
      console.log('');
      console.groupEnd();
    });
    
    // Resumen final
    console.log('%c═══════════════════════════════════════════════════════════', 'color: #E6E258; font-weight: bold');
    console.log('%c📊 RESUMEN FINAL', 'color: #E6E258; font-weight: bold; font-size: 16px');
    console.log('%c═══════════════════════════════════════════════════════════', 'color: #E6E258; font-weight: bold');
    console.log('');
    console.log(`%c✅ Con precio configurado: ${conPrecio}/${properties.length}`, conPrecio > 0 ? 'color: green; font-weight: bold; font-size: 14px' : 'color: red; font-weight: bold; font-size: 14px');
    console.log(`%c❌ Sin precio configurado: ${sinPrecio}/${properties.length}`, sinPrecio > 0 ? 'color: red; font-weight: bold; font-size: 14px' : 'color: green; font-weight: bold; font-size: 14px');
    console.log('');
    
    // Recomendaciones
    if (sinPrecio > 0) {
      console.log('%c═══════════════════════════════════════════════════════════', 'color: orange; font-weight: bold');
      console.log('%c⚠️ ACCIÓN REQUERIDA', 'color: orange; font-weight: bold; font-size: 16px');
      console.log('%c═══════════════════════════════════════════════════════════', 'color: orange; font-weight: bold');
      console.log('');
      console.log('%cAlgunas propiedades no tienen precio configurado.', 'color: orange; font-weight: bold');
      console.log('');
      console.log('%cPara solucionarlo:', 'color: orange');
      console.log('1. Ve a WordPress Admin: http://versusandorra.local/wp-admin/edit.php?post_type=properties');
      console.log('2. Edita cada propiedad sin precio');
      console.log('3. Busca el campo "Price" o "Precio"');
      console.log('4. Ingresa el precio (ej: 500000)');
      console.log('5. Guarda cambios');
      console.log('');
      console.log('%c💡 Después de guardar, el precio aparecerá automáticamente en el frontend.', 'color: #666; font-style: italic');
    } else {
      console.log('%c═══════════════════════════════════════════════════════════', 'color: green; font-weight: bold');
      console.log('%c🎉 ¡PERFECTO! TODAS LAS PROPIEDADES TIENEN PRECIO', 'color: green; font-weight: bold; font-size: 16px');
      console.log('%c═══════════════════════════════════════════════════════════', 'color: green; font-weight: bold');
      console.log('');
      console.log('%cTodos los precios están configurados correctamente.', 'color: green; font-weight: bold');
      console.log('%cLos precios deberían aparecer en el frontend.', 'color: green');
      console.log('');
      console.log('%c💡 Si aún no aparecen en http://localhost:3000/propiedades', 'color: #666; font-style: italic');
      console.log('%c   prueba reiniciar el servidor: npm run dev', 'color: #666; font-style: italic');
    }
    
  } catch (error) {
    console.log('');
    console.log('%c═══════════════════════════════════════════════════════════', 'color: red; font-weight: bold');
    console.log('%c❌ ERROR AL CONECTAR CON WORDPRESS', 'color: red; font-weight: bold; font-size: 16px');
    console.log('%c═══════════════════════════════════════════════════════════', 'color: red; font-weight: bold');
    console.log('');
    console.error('%cError:', 'color: red; font-weight: bold', error.message);
    console.log('');
    console.log('%c💡 Posibles causas:', 'color: orange');
    console.log('   • WordPress no está corriendo');
    console.log('   • La URL no es http://versusandorra.local');
    console.log('   • Problemas de CORS (poco probable en local)');
    console.log('');
    console.log('%c🔧 Soluciones:', 'color: orange');
    console.log('   1. Verifica que Local by Flywheel esté corriendo');
    console.log('   2. Verifica la URL en: Settings → General en WordPress Admin');
    console.log('   3. Prueba abrir: http://versusandorra.local/wp-json/wp/v2/properties');
  }
  
  console.log('');
  console.log('%c═══════════════════════════════════════════════════════════', 'color: #E6E258; font-weight: bold');
  console.log('');
})();
