import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { chartColors, formatCurrency } from '../data/kpis';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IncomeBreakdownChart = ({ data, selectedPeriod, selectedMonth, resumenTrimestre }) => {
  // Obtener datos según el período seleccionado
  const ingresosPorCategoria = selectedPeriod === 'trimestre' 
    ? resumenTrimestre 
    : data.ingresosPorCategoria || { planes: 0, eventos: 0, articulos: 0, total: 0 };

  // Datos para gráfico de dona
  const donutData = {
    labels: ['Planes Regulares', 'Eventos Especiales', 'Artículos'],
    datasets: [
      {
        data: [
          ingresosPorCategoria.planes || 0,
          ingresosPorCategoria.eventos || 0,
          ingresosPorCategoria.articulos || 0
        ],
        backgroundColor: [
          chartColors.primary,
          chartColors.warning,
          chartColors.success
        ],
        borderColor: ['#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  // Datos para gráfico de barras (comparativo mensual si es trimestre)
  const barData = {
    labels: ['Junio', 'Julio', 'Agosto'],
    datasets: [
      {
        label: 'Planes',
        data: selectedPeriod === 'trimestre' 
          ? [76820, 114285, 51920]
          : [ingresosPorCategoria.planes || 0, 0, 0],
        backgroundColor: chartColors.primary,
        borderRadius: 8,
      },
      {
        label: 'Eventos',
        data: selectedPeriod === 'trimestre' 
          ? [2000, 14990, 0]
          : [ingresosPorCategoria.eventos || 0, 0, 0],
        backgroundColor: chartColors.warning,
        borderRadius: 8,
      },
      {
        label: 'Artículos',
        data: selectedPeriod === 'trimestre' 
          ? [0, 0, 0]
          : [ingresosPorCategoria.articulos || 0, 0, 0],
        backgroundColor: chartColors.success,
        borderRadius: 8,
      },
    ],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0;
            return `${context.label}: ${formatCurrency(context.parsed)} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '60%',
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          font: {
            size: 12,
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          }
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          },
          callback: function(value) {
            return formatCurrency(value);
          }
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  // Datos para gráfico de barras horizontales (vista mensual)
  const monthlyBarData = {
    labels: ['Planes Regulares', 'Eventos Especiales', 'Artículos'],
    datasets: [
      {
        data: [
          ingresosPorCategoria.planes || 0,
          ingresosPorCategoria.eventos || 0,
          ingresosPorCategoria.articulos || 0
        ],
        backgroundColor: [
          chartColors.primary,
          chartColors.warning,
          chartColors.success
        ],
        borderColor: [
          chartColors.primary,
          chartColors.warning,
          chartColors.success
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const monthlyBarOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? ((context.parsed.x / total) * 100).toFixed(1) : 0;
            return `${formatCurrency(context.parsed.x)} (${percentage}%)`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          },
          callback: function(value) {
            return formatCurrency(value);
          }
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          }
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico principal - Dona para trimestre, Barras horizontales para mensual */}
      <div className="card p-6 animate-slide-up">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          💰 Distribución de Ingresos por Categoría
        </h3>
        <div className="chart-container">
          {selectedPeriod === 'trimestre' ? (
            <Doughnut data={donutData} options={donutOptions} />
          ) : (
            <Bar data={monthlyBarData} options={monthlyBarOptions} />
          )}
        </div>
        
        {/* Estadísticas de categorías */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Planes Regulares</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-blue-600">
                {formatCurrency(ingresosPorCategoria.planes || 0)}
              </div>
              <div className="text-xs text-gray-500">
                {selectedPeriod === 'trimestre' ? resumenTrimestre?.porcentajes?.planes || 0 : 
                  (ingresosPorCategoria.total > 0 ? ((ingresosPorCategoria.planes / ingresosPorCategoria.total) * 100).toFixed(1) : 0)}%
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Eventos Especiales</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-yellow-600">
                {formatCurrency(ingresosPorCategoria.eventos || 0)}
              </div>
              <div className="text-xs text-gray-500">
                {selectedPeriod === 'trimestre' ? resumenTrimestre?.porcentajes?.eventos || 0 : 
                  (ingresosPorCategoria.total > 0 ? ((ingresosPorCategoria.eventos / ingresosPorCategoria.total) * 100).toFixed(1) : 0)}%
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Artículos</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-green-600">
                {formatCurrency(ingresosPorCategoria.articulos || 0)}
              </div>
              <div className="text-xs text-gray-500">
                {selectedPeriod === 'trimestre' ? resumenTrimestre?.porcentajes?.articulos || 0 : 
                  (ingresosPorCategoria.total > 0 ? ((ingresosPorCategoria.articulos / ingresosPorCategoria.total) * 100).toFixed(1) : 0)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de barras - Evolución mensual (solo en vista trimestre) */}
      {selectedPeriod === 'trimestre' && (
        <div className="card p-6 animate-slide-up">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            📊 Evolución Mensual por Categoría
          </h3>
          <div className="chart-container">
            <Bar data={barData} options={barOptions} />
          </div>
          
          {/* Insights específicos */}
          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-start space-x-3">
              <div className="text-purple-500 text-xl">💡</div>
              <div>
                <h4 className="font-semibold text-purple-900">Insights de Categorización</h4>
                <ul className="text-sm text-purple-700 mt-2 space-y-1">
                  <li>• <strong>Eventos especiales</strong> generaron {formatCurrency(16990)} en el trimestre</li>
                  <li>• <strong>Julio</strong> fue el mes con más eventos especiales ({formatCurrency(14990)})</li>
                  <li>• Los <strong>planes regulares</strong> representan el {resumenTrimestre?.porcentajes?.planes || 0}% de los ingresos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vista mensual - Detalles específicos */}
      {selectedPeriod === 'mensual' && (
        <div className="card p-6 animate-slide-up">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            📋 Detalles de {selectedMonth}
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-3">Resumen del Mes</h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ingresos Totales:</span>
                  <span className="font-bold">{formatCurrency((ingresosPorCategoria.planes || 0) + (ingresosPorCategoria.eventos || 0) + (ingresosPorCategoria.articulos || 0))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rango de fechas:</span>
                  <span className="text-sm">{data.rangoFechas?.inicio} - {data.rangoFechas?.fin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Días del período:</span>
                  <span className="text-sm">{data.rangoFechas?.dias} días</span>
                </div>
              </div>
            </div>

            {/* Eventos especiales del mes */}
            {ingresosPorCategoria.eventos > 0 && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">🎉 Eventos Especiales</h4>
                <p className="text-sm text-yellow-700">
                  Este mes se generaron <strong>{formatCurrency(ingresosPorCategoria.eventos)}</strong> en eventos especiales.
                  {selectedMonth === 'Junio' && ' Destacando el evento de $2,000 pesos.'}
                  {selectedMonth === 'Julio' && ' Incluyendo clases Hot Barré, Hot Sculpt y eventos temáticos.'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeBreakdownChart;