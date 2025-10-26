/**
 * Script simple para verificar precios en WordPress
 * 
 * Uso: Abre tu navegador y ve a:
 * http://localhost:10005/wp-json/wp/v2/properties?per_page=5
 * 
 * Luego ejecuta este script en la consola del navegador:
 * 1. Abre DevTools (F12)
 * 2. Ve a la pestaña Console
 * 3. Copia y pega todo este código
 * 4. Presiona Enter
 */

(async function checkPrices() {
  console.log('%c🔍 VERIFICACIÓN DE PRECIOS', 'font-size: 20px; font-weight: bold; color: #E6E258');
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #E6E258');
  
  try {
    const response = await fetch('http://localhost:10005/wp-json/wp/v2/properties?per_page=5&_embed=true');
    const properties = await response.json();
    
    console.log(`\n✅ ${properties.length} propiedades obtenidas\n`);
    
    properties.forEach((prop, i) => {
      console.group(`%c📦 ${i + 1}. ${prop.title.rendered}`, 'font-weight: bold; color: #333');
      
      // Mostrar todas las ubicaciones posibles del precio
      console.log('🔎 Buscando precio en:');
      console.log('  property_meta?.property_price:', prop.property_meta?.property_price);
      console.log('  property_meta?.price:', prop.property_meta?.price);
      console.log('  acf?.property_price:', prop.acf?.property_price);
      console.log('  acf?.price:', prop.acf?.price);
      console.log('  meta?.property_price:', prop.meta?.property_price);
      
      // Determinar qué precio se usaría
      const finalPrice = prop.property_meta?.property_price 
                      || prop.property_meta?.price 
                      || prop.acf?.property_price 
                      || prop.acf?.price 
                      || prop.meta?.property_price
                      || '';
      
      console.log(`\n%c💰 Precio final usado: ${finalPrice || '❌ SIN PRECIO'}`, 
                  finalPrice ? 'color: green; font-weight: bold' : 'color: red; font-weight: bold');
      
      console.groupEnd();
      console.log('');
    });
    
    // Resumen
    const withPrice = properties.filter(p => 
      p.property_meta?.property_price || 
      p.property_meta?.price || 
      p.acf?.property_price || 
      p.acf?.price
    ).length;
    
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #E6E258');
    console.log(`%c📊 RESUMEN: ${withPrice}/${properties.length} con precio`, 'font-size: 16px; font-weight: bold');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #E6E258');
    
    if (withPrice === 0) {
      console.log('%c⚠️ NINGUNA propiedad tiene precio. Posibles causas:', 'color: orange; font-weight: bold');
      console.log('  1. Los campos de precio están vacíos en WordPress');
      console.log('  2. El campo se llama diferente');
      console.log('  3. El plugin Easy Real Estate no está configurado correctamente');
      console.log('\n💡 Revisa una propiedad en WordPress Admin:');
      console.log('   http://localhost:10005/wp-admin/post.php?post=' + properties[0].id + '&action=edit');
    }
    
  } catch (error) {
    console.error('%c❌ ERROR:', 'color: red; font-weight: bold', error.message);
    console.log('\n💡 Verifica que WordPress esté corriendo en http://localhost:10005');
  }
})();
