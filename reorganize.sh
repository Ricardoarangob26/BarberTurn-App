#!/bin/bash
# Script de reorganización automática - Ejecutar en la raíz del repositorio

set -e  # Detener si hay error

echo "🚀 Iniciando reorganización del proyecto BarberTurn-App..."

# Paso 1: Crear estructura de carpetas
echo "📁 Creando carpetas..."
mkdir -p backend frontend docs

# Paso 2: Mover archivos del backend (desanidando)
echo "📦 Moviendo backend..."
if [ -d "BackendProyecto-main/BackendProyecto-main" ]; then
    cp -r BackendProyecto-main/BackendProyecto-main/* backend/ 2>/dev/null || true
    rm -rf BackendProyecto-main
fi

# Paso 3: Mover archivos del frontend (desanidando)
echo "📦 Moviendo frontend..."
if [ -d "BarberTurn--main/BarberTurn--main" ]; then
    cp -r BarberTurn--main/BarberTurn--main/* frontend/ 2>/dev/null || true
    rm -rf BarberTurn--main
fi

# Paso 4: Crear carpeta de documentación
echo "📚 Organizando documentación..."
mkdir -p docs
touch docs/DATABASE.md
touch docs/DEPLOYMENT.md

echo "✅ Reorganización completada!"
echo ""
echo "Nueva estructura:"
echo "BarberTurn-App/"
echo "├── backend/"
echo "├── frontend/"
echo "├── docs/"
echo "├── README.md"
echo "├── SETUP.md"
echo "├── ARCHITECTURE.md"
echo "└── .gitignore"