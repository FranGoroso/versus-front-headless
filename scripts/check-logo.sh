#!/bin/bash

# Script de verificación de Logo y Favicon
# Versus Andorra - Setup Check

echo "========================================="
echo "🎨 VERIFICACIÓN: Logo y Favicon"
echo "========================================="
echo ""

PROJECT_ROOT="C:/Users/goros/Local Sites/versusandorra/proyecto-bolt/versus-andorra-plantilla-base"

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para verificar archivo
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        return 0
    else
        echo -e "${RED}✗${NC} $2 - ${RED}FALTA${NC}"
        return 1
    fi
}

echo "📁 Verificando archivos requeridos..."
echo ""

# Contador de archivos faltantes
missing=0

# Verificar logo principal
check_file "$PROJECT_ROOT/public/images/logo-versus-andorra.png" "Logo principal (logo-versus-andorra.png)"
if [ $? -ne 0 ]; then ((missing++)); fi

# Verificar favicons
check_file "$PROJECT_ROOT/public/favicon.ico" "Favicon ICO (favicon.ico)"
if [ $? -ne 0 ]; then ((missing++)); fi

check_file "$PROJECT_ROOT/public/favicon-16x16.png" "Favicon 16x16 (favicon-16x16.png)"
if [ $? -ne 0 ]; then ((missing++)); fi

check_file "$PROJECT_ROOT/public/favicon-32x32.png" "Favicon 32x32 (favicon-32x32.png)"
if [ $? -ne 0 ]; then ((missing++)); fi

check_file "$PROJECT_ROOT/public/apple-touch-icon.png" "Apple Touch Icon (apple-touch-icon.png)"
if [ $? -ne 0 ]; then ((missing++)); fi

echo ""
echo "========================================="

if [ $missing -eq 0 ]; then
    echo -e "${GREEN}✓ TODOS LOS ARCHIVOS ESTÁN PRESENTES${NC}"
    echo ""
    echo "🎉 ¡Configuración completa!"
    echo ""
    echo "Próximos pasos:"
    echo "1. Reiniciar servidor: npm run dev"
    echo "2. Abrir: http://localhost:3000"
    echo "3. Verificar logo en header"
    echo "4. Verificar favicon en pestaña"
else
    echo -e "${RED}✗ FALTAN $missing ARCHIVO(S)${NC}"
    echo ""
    echo "📋 Pasos para completar:"
    echo ""
    echo "1. Lee las instrucciones en: LOGO_TODO.md"
    echo "2. O lee documentación completa: docs/LOGO_FAVICON_SETUP.md"
    echo ""
    echo "Archivos faltantes deben copiarse manualmente."
fi

echo "========================================="
