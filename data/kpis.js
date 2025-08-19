export const reportData = {
    // Rangos de fechas por mes
    rangosFechas: {
      junio: { inicio: '1 Jun 2025', fin: '30 Jun 2025', dias: 30 },
      julio: { inicio: '1 Jul 2025', fin: '31 Jul 2025', dias: 31 },
      agosto: { inicio: '1 Ago 2025', fin: '18 Ago 2025', dias: 18 }
    },

    // Resumen trimestre
    trimestre: {
      ingresosTotales: 260015,
      clientesNuevosTotales: 152,
      clientesRecurrentesTotales: 324,
      periodoCompleto: 'Junio - Agosto 2025'
    },

    // Categorización de ingresos por tipo
    ingresosPorCategoria: {
      junio: {
        planes: 76820, // Planes regulares de 1, 4, 8, 12, 16, 20 clases
        eventos: 2000, // Evento especial: Ludim Iván Martínez Díaz
        articulos: 0
      },
      julio: {
        planes: 114285, // Planes regulares
        eventos: 14990, // Clases especiales Hot Barré, Hot Sculpt, etc.
        articulos: 0
      },
      agosto: {
        planes: 51920, // Planes regulares
        eventos: 0, // No se identificaron eventos especiales claros
        articulos: 0
      }
    },
  
    // Datos mensuales
    ingresosMensuales: [
      { mes: 'Junio', ingresos: 78820, pedidos: 1348 },
      { mes: 'Julio', ingresos: 129275, pedidos: 1881 },
      { mes: 'Agosto', ingresos: 51920, pedidos: 919, nota: '(1-18 días)' }
    ],
  
    // Clientes por mes
    clientesPorMes: [
      { 
        mes: 'Junio', 
        nuevos: 48, 
        recurrentes: 98, 
        total: 146,
        porcentajeRetencion: 67.1 
      },
      { 
        mes: 'Julio', 
        nuevos: 71, 
        recurrentes: 121, 
        total: 192,
        porcentajeRetencion: 63.0 
      },
      { 
        mes: 'Agosto', 
        nuevos: 33, 
        recurrentes: 105, 
        total: 138,
        porcentajeRetencion: 76.1 
      }
    ],
  
    // Planes más vendidos por mes
    planesPorMes: {
      junio: [
        { plan: '1 Clase', pedidos: 92, ventas: 9200 },
        { plan: '4 Clases', pedidos: 36, ventas: 12960 },
        { plan: '8 Clases', pedidos: 22, ventas: 14960 },
        { plan: '12 Clases', pedidos: 17, ventas: 15300 },
        { plan: '16 Clases', pedidos: 4, ventas: 4400 },
        { plan: '20 Clases', pedidos: 16, ventas: 20000 }
      ],
      julio: [
        { plan: '1 Clase', pedidos: 123, ventas: 13150 },
        { plan: '4 Clases', pedidos: 55, ventas: 21165 },
        { plan: '8 Clases', pedidos: 25, ventas: 18190 },
        { plan: '12 Clases', pedidos: 33, ventas: 31050 },
        { plan: '16 Clases', pedidos: 7, ventas: 8030 },
        { plan: '20 Clases', pedidos: 17, ventas: 22450 }
      ],
      agosto: [
        { plan: '1 Clase', pedidos: 77, ventas: 8470 },
        { plan: '4 Clases', pedidos: 30, ventas: 11850 },
        { plan: '8 Clases', pedidos: 10, ventas: 7500 },
        { plan: '12 Clases', pedidos: 12, ventas: 11880 },
        { plan: '16 Clases', pedidos: 2, ventas: 2420 },
        { plan: '20 Clases', pedidos: 7, ventas: 9800 }
      ]
    },
  
    // Clases con asistencia por mes
    clasesAsistenciaPorMes: {
      junio: [
        { clase: 'Pilates Mat', asistencias: 305, reservas: 244, cancelaciones: 57 },
        { clase: 'Sculpt', asistencias: 273, reservas: 218, cancelaciones: 54 },
        { clase: 'Barré | Full body', asistencias: 238, reservas: 159, cancelaciones: 74 },
        { clase: 'Barré | Lower body', asistencias: 164, reservas: 130, cancelaciones: 32 },
        { clase: 'Barré | Upper body', asistencias: 119, reservas: 96, cancelaciones: 22 },
        { clase: 'Vinyasa Yoga', asistencias: 42, reservas: 39, cancelaciones: 3 },
        { clase: 'Sculpt de despecho', asistencias: 33, reservas: 29, cancelaciones: 3 },
        { clase: 'Neón Barré | Full body 🌈', asistencias: 22, reservas: 14, cancelaciones: 6 },
        { clase: 'Yin yoga', asistencias: 12, reservas: 10, cancelaciones: 2 },
        { clase: 'Burn & Glow', asistencias: 3, reservas: 3, cancelaciones: 0 }
      ],
      julio: [
        { clase: 'Pilates Mat', asistencias: 432, reservas: 317, cancelaciones: 96 },
        { clase: 'Sculpt', asistencias: 350, reservas: 256, cancelaciones: 84 },
        { clase: 'Barré | Full body', asistencias: 349, reservas: 241, cancelaciones: 103 },
        { clase: 'Barré | Lower body', asistencias: 245, reservas: 174, cancelaciones: 57 },
        { clase: 'Barré | Upper body', asistencias: 131, reservas: 101, cancelaciones: 26 },
        { clase: 'Barré | Principiantes', asistencias: 58, reservas: 42, cancelaciones: 14 },
        { clase: 'Vinyasa Yoga', asistencias: 52, reservas: 47, cancelaciones: 5 },
        { clase: 'Yin yoga', asistencias: 29, reservas: 20, cancelaciones: 8 },
        { clase: 'Hot Barré | Full body', asistencias: 14, reservas: 10, cancelaciones: 4 },
        { clase: 'Hot Sculpt', asistencias: 13, reservas: 10, cancelaciones: 2 },
        { clase: 'Yoga', asistencias: 10, reservas: 9, cancelaciones: 1 },
        { clase: 'Pilates', asistencias: 7, reservas: 6, cancelaciones: 1 },
        { clase: 'Sculpt | Sesión privada', asistencias: 1, reservas: 0, cancelaciones: 1 }
      ],
      agosto: [
        { clase: 'Sculpt', asistencias: 223, reservas: 169, cancelaciones: 53 },
        { clase: 'Pilates Mat', asistencias: 212, reservas: 165, cancelaciones: 42 },
        { clase: 'Barré | Full body', asistencias: 202, reservas: 153, cancelaciones: 39 },
        { clase: 'Barré | Upper body', asistencias: 94, reservas: 74, cancelaciones: 15 },
        { clase: 'Barré | Lower body', asistencias: 77, reservas: 55, cancelaciones: 19 },
        { clase: 'Funcional', asistencias: 12, reservas: 8, cancelaciones: 4 },
        { clase: 'Dance fitness', asistencias: 9, reservas: 8, cancelaciones: 1 },
        { clase: 'Fit Dance & Choreo', asistencias: 4, reservas: 4, cancelaciones: 0 },
        { clase: 'Pilates', asistencias: 2, reservas: 2, cancelaciones: 0 }
      ]
    },
  
    // Top clientas por mes
    topClientesPorMes: {
      junio: [
        { ranking: 1, nombre: 'Litzy Valdez', pedidos: 30, valorPromedio: 83.33, ventasTotales: 2500 },
        { ranking: 2, nombre: 'Adriana Ceballos', pedidos: 33, valorPromedio: 71.21, ventasTotales: 2350 },
        { ranking: 3, nombre: 'Fernanda Manzanilla', pedidos: 22, valorPromedio: 98.18, ventasTotales: 2160 },
        { ranking: 4, nombre: 'Ludim Iván Martínez Díaz', pedidos: 1, valorPromedio: 2000.00, ventasTotales: 2000 },
        { ranking: 5, nombre: 'Verónica Vargas', pedidos: 35, valorPromedio: 51.43, ventasTotales: 1800 }
      ],
      julio: [
        { ranking: 1, nombre: 'Greta Esquitin', pedidos: 55, valorPromedio: 66.36, ventasTotales: 3650 },
        { ranking: 2, nombre: 'Aceneth Cruz', pedidos: 40, valorPromedio: 85.00, ventasTotales: 3400 },
        { ranking: 3, nombre: 'Adriana Ceballos', pedidos: 60, valorPromedio: 55.00, ventasTotales: 3300 },
        { ranking: 4, nombre: 'Laura Chao', pedidos: 42, valorPromedio: 70.00, ventasTotales: 2940 },
        { ranking: 5, nombre: 'Rubí Álvarez', pedidos: 28, valorPromedio: 102.86, ventasTotales: 2880 }
      ],
      agosto: [
        { ranking: 1, nombre: 'Gabriela Alejandra Hernández Pérez', pedidos: 16, valorPromedio: 100.63, ventasTotales: 1610 },
        { ranking: 2, nombre: 'Gaby Falco', pedidos: 12, valorPromedio: 116.67, ventasTotales: 1400 },
        { ranking: 3, nombre: 'Victoria Lugo', pedidos: 12, valorPromedio: 116.67, ventasTotales: 1400 },
        { ranking: 4, nombre: 'Fernanda Manzanilla', pedidos: 14, valorPromedio: 100.00, ventasTotales: 1400 },
        { ranking: 5, nombre: 'Alexia Lozada', pedidos: 9, valorPromedio: 155.56, ventasTotales: 1400 }
      ]
    },
  
    // Insights principales
    insights: [
      {
        icon: '📈',
        title: 'Crecimiento Excepcional',
        description: 'Julio registró un crecimiento del 64% respecto a Junio',
        value: '+64%',
        trend: 'up'
      },
      {
        icon: '🎯',
        title: 'Alta Retención',
        description: 'Agosto muestra la mejor tasa de retención del trimestre',
        value: '76.1%',
        trend: 'up'
      },
      {
        icon: '💪',
        title: 'Clases Populares',
        description: 'Sculpt y Pilates Mat dominan en asistencia',
        value: '435',
        trend: 'stable'
      },
      {
        icon: '💰',
        title: 'Paquetes Premium',
        description: 'Los paquetes de 12 clases generan más ingresos por pedido',
        value: '$990',
        trend: 'up'
      }
    ]
  };
  
  // Función para formatear montos
  export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  };
  
  // Función para calcular porcentajes
  export const calculatePercentage = (part, total) => {
    return ((part / total) * 100).toFixed(1);
  };
  
  // Función para obtener datos por mes
  export const getDatosPorMes = (mes) => {
    const mesKey = mes.toLowerCase();
    const mesCapitalized = mes.charAt(0).toUpperCase() + mes.slice(1).toLowerCase();
    
    const clientesMes = reportData.clientesPorMes.find(item => item.mes === mesCapitalized) || {};
    
    return {
      topClientes: reportData.topClientesPorMes[mesKey] || [],
      clasesAsistencia: reportData.clasesAsistenciaPorMes[mesKey] || [],
      planes: reportData.planesPorMes[mesKey] || [],
      rangoFechas: reportData.rangosFechas[mesKey] || {},
      ingresos: reportData.ingresosMensuales.find(item => item.mes === mesCapitalized) || {},
      ingresosPorCategoria: reportData.ingresosPorCategoria[mesKey] || { planes: 0, eventos: 0, articulos: 0 },
      clientes: {
        ...clientesMes,
        mes: mesCapitalized // Asegurar que tiene la propiedad mes
      },
      // Agregar datos completos para compatibilidad con componentes
      ingresosMensuales: reportData.ingresosMensuales.filter(item => item.mes === mesCapitalized),
      clientesPorMes: clientesMes.mes ? [clientesMes] : [],
      trimestre: null // Indicador de que estamos en vista mensual
    };
  };

  // Función para obtener resumen de ingresos por categoría del trimestre
  export const getResumenIngresosTrimestre = () => {
    const totalPlanes = 
      reportData.ingresosPorCategoria.junio.planes +
      reportData.ingresosPorCategoria.julio.planes +
      reportData.ingresosPorCategoria.agosto.planes;
    
    const totalEventos = 
      reportData.ingresosPorCategoria.junio.eventos +
      reportData.ingresosPorCategoria.julio.eventos +
      reportData.ingresosPorCategoria.agosto.eventos;
    
    const totalArticulos = 
      reportData.ingresosPorCategoria.junio.articulos +
      reportData.ingresosPorCategoria.julio.articulos +
      reportData.ingresosPorCategoria.agosto.articulos;
    
    const total = totalPlanes + totalEventos + totalArticulos;
    
    return {
      planes: totalPlanes,
      eventos: totalEventos,
      articulos: totalArticulos,
      total: total,
      porcentajes: {
        planes: total > 0 ? ((totalPlanes / total) * 100).toFixed(1) : 0,
        eventos: total > 0 ? ((totalEventos / total) * 100).toFixed(1) : 0,
        articulos: total > 0 ? ((totalArticulos / total) * 100).toFixed(1) : 0
      }
    };
  };
  
  // Función para comparar meses
  export const compararMeses = (mes1, mes2) => {
    const datos1 = getDatosPorMes(mes1);
    const datos2 = getDatosPorMes(mes2);
    
    const comparacion = {
      ingresos: {
        mes1: datos1.ingresos.ingresos || 0,
        mes2: datos2.ingresos.ingresos || 0,
        diferencia: (datos1.ingresos.ingresos || 0) - (datos2.ingresos.ingresos || 0),
        porcentajeCambio: datos2.ingresos.ingresos ? 
          (((datos1.ingresos.ingresos || 0) - (datos2.ingresos.ingresos || 0)) / (datos2.ingresos.ingresos || 1) * 100).toFixed(1) : 0
      },
      clientesNuevos: {
        mes1: datos1.clientes.nuevos || 0,
        mes2: datos2.clientes.nuevos || 0,
        diferencia: (datos1.clientes.nuevos || 0) - (datos2.clientes.nuevos || 0)
      },
      retencion: {
        mes1: datos1.clientes.porcentajeRetencion || 0,
        mes2: datos2.clientes.porcentajeRetencion || 0,
        diferencia: (datos1.clientes.porcentajeRetencion || 0) - (datos2.clientes.porcentajeRetencion || 0)
      }
    };
    
    return comparacion;
  };
  
  // Colores para gráficos - Basados en la identidad de Comunal Studio
  export const chartColors = {
    primary: '#494438',     // Marrón oscuro principal
    secondary: '#B8AB9C',   // Beige/Marrón claro
    accent: '#DDAEA8',      // Rosa palo
    success: '#8A9A7A',     // Verde tierra (derivado)
    warning: '#D4A574',     // Ocre (derivado)
    info: '#9B9B9B',        // Gris neutro (derivado)
    gradient: [
      'rgba(73, 68, 56, 0.8)',    // Marrón oscuro
      'rgba(184, 171, 156, 0.8)', // Beige
      'rgba(221, 174, 168, 0.8)', // Rosa palo
      'rgba(138, 154, 122, 0.8)', // Verde tierra
      'rgba(212, 165, 116, 0.8)', // Ocre
      'rgba(155, 155, 155, 0.8)'  // Gris neutro
    ]
  };