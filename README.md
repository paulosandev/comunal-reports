# 📊 Dashboard KPIs Estudio de Fitness

Dashboard interactivo para visualizar y analizar los KPIs principales de un estudio de fitness durante el trimestre Q3 2025 (Junio - Agosto).

## 🚀 Características

- **Dashboard Ejecutivo Completo**: Visualización de métricas clave de negocio
- **Gráficos Interactivos**: Usando Chart.js para visualizaciones dinámicas
- **Diseño Responsive**: Optimizado para desktop, tablet y móvil
- **Análisis Trimestral**: Comparativas mensuales con insights automáticos
- **Exportación de Datos**: Funcionalidad para exportar reportes

## 📈 KPIs Incluidos

### 💰 Ingresos y Ventas
- Ingresos mensuales comparativos
- Análisis de pedidos y valor promedio
- Tendencias de crecimiento

### 👥 Gestión de Clientas
- Clientes nuevos vs recurrentes
- Tasa de retención mensual
- Top clientas por valor de compra

### 🏃‍♀️ Análisis de Servicios
- Planes más vendidos por mes
- Clases con mayor asistencia
- Análisis de cancelaciones

### 🎯 Insights Estratégicos
- Recomendaciones automáticas
- Identificación de oportunidades
- Métricas de rendimiento

## 🛠️ Tecnologías Utilizadas

- **Next.js 14**: Framework de React para aplicaciones web
- **React 18**: Biblioteca de interfaz de usuario
- **Tailwind CSS**: Framework de CSS para estilos
- **Chart.js**: Biblioteca para gráficos interactivos
- **Lucide React**: Iconos modernos
- **Vercel/Netlify**: Plataformas de deployment

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. **Clonar o crear el proyecto**
```bash
mkdir reporte-kpis-estudio
cd reporte-kpis-estudio
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 🚀 Deploy en Vercel

### Opción 1: Deploy desde GitHub

1. **Subir código a GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/reporte-kpis-estudio.git
git push -u origin main
```

2. **Conectar con Vercel**
- Ir a [vercel.com](https://vercel.com)
- Crear cuenta y conectar GitHub
- Seleccionar el repositorio
- Deploy automático

### Opción 2: Deploy directo con Vercel CLI

1. **Instalar Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

## 🌐 Deploy en Netlify

### Opción 1: Deploy desde GitHub

1. **Subir código a GitHub** (igual que Vercel)

2. **Conectar con Netlify**
- Ir a [netlify.com](https://netlify.com)
- New site from Git
- Seleccionar repositorio
- Build command: `npm run build`
- Publish directory: `out`

### Opción 2: Deploy manual

1. **Generar build estático**
```bash
npm run build
```

2. **Subir carpeta `out` a Netlify**
- Arrastrar carpeta `out` a netlify.com

## 📁 Estructura del Proyecto

```
reporte-kpis-estudio/
├── components/           # Componentes React reutilizables
│   ├── SummaryCards.js      # Tarjetas de resumen
│   ├── RevenueChart.js      # Gráfico de ingresos
│   ├── RetentionChart.js    # Gráfico de retención
│   ├── PlansChart.js        # Gráfico de planes
│   ├── AttendanceChart.js   # Gráfico de asistencia
│   └── TopClientsTable.js   # Tabla de top clientes
├── data/                # Datos y configuración
│   └── kpis.js             # Datos de KPIs y funciones
├── pages/               # Páginas de Next.js
│   ├── _app.js             # Configuración de la app
│   └── index.js            # Página principal
├── styles/              # Estilos
│   └── globals.css         # Estilos globales
├── package.json         # Dependencias del proyecto
├── next.config.js       # Configuración de Next.js
├── tailwind.config.js   # Configuración de Tailwind
├── postcss.config.js    # Configuración de PostCSS
└── README.md           # Este archivo
```

## 🎨 Personalización

### Cambiar Datos
Editar el archivo `data/kpis.js` para actualizar:
- Ingresos mensuales
- Información de clientes
- Datos de clases y planes
- Insights personalizados

### Modificar Estilos
- **Colores**: Editar `tailwind.config.js`
- **Componentes**: Modificar archivos en `/components`
- **Layout**: Editar `pages/index.js`

### Agregar Nuevos KPIs
1. Agregar datos en `data/kpis.js`
2. Crear componente en `/components`
3. Importar y usar en `pages/index.js`

## 📊 Datos de Ejemplo

El proyecto incluye datos reales del trimestre Q3 2025:

- **Junio**: $78,820 en ingresos, 48 clientes nuevos
- **Julio**: $129,314 en ingresos, 71 clientes nuevos  
- **Agosto**: $51,920 en ingresos, 33 clientes nuevos
- **Total Trimestre**: $260,054 en ingresos, 152 clientes nuevos

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm run start

# Linting
npm run lint
```

## 🌟 Características Avanzadas

### Exportación de Datos
- Botón de exportar en formato JSON
- Datos listos para integración con otros sistemas

### Responsive Design
- Optimizado para móviles, tablets y desktop
- Gráficos adaptativos según el tamaño de pantalla

### Animaciones
- Transiciones suaves entre secciones
- Efectos de hover y loading

### Accesibilidad
- Contrastes optimizados
- Navegación por teclado
- Etiquetas semánticas

## 🐛 Solución de Problemas

### Error en instalación
```bash
# Limpiar caché
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Error en build
```bash
# Verificar configuración de Next.js
npm run build --debug
```

### Problemas con gráficos
- Verificar que Chart.js esté correctamente instalado
- Revisar configuración de componentes en `/components`

## 📞 Soporte

Para reportar problemas o sugerir mejoras:
1. Revisar la documentación
2. Verificar configuración de dependencias
3. Consultar logs de error en consola

## 📝 Licencia

Este proyecto es de uso libre para fines educativos y comerciales.

---

**Desarrollado con ❤️ para optimizar la gestión de estudios de fitness**

🚀 **¡Listo para deploy!** Sigue las instrucciones de Vercel o Netlify para tener tu dashboard en línea en minutos.