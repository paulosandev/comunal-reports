import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { chartColors } from '../data/kpis';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RetentionChart = ({ data }) => {
  // Datos para gráfico de dona (retención general)
  let totalNuevos, totalRecurrentes;
  
  if (data.trimestre) {
    // Vista trimestral
    totalNuevos = data.trimestre.clientesNuevosTotales || 0;
    totalRecurrentes = data.trimestre.clientesRecurrentesTotales || 0;
  } else {
    // Vista mensual
    totalNuevos = data.clientes?.nuevos || 0;
    totalRecurrentes = data.clientes?.recurrentes || 0;
  }
  
  const donutData = {
    labels: ['Clientas Recurrentes', 'Clientas Nuevas'],
    datasets: [
      {
        data: [totalRecurrentes, totalNuevos],
        backgroundColor: [chartColors.primary, chartColors.accent],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 3,
        hoverOffset: 4,
      },
    ],
  };

  // Datos para gráfico de líneas (evolución mensual)
  let clientesPorMes;
  
  if (data.trimestre) {
    // Vista trimestral - usar datos completos del trimestre
    clientesPorMes = data.clientesPorMes || [];
  } else {
    // Vista mensual - crear array con un solo elemento del mes actual
    clientesPorMes = data.clientesPorMes && data.clientesPorMes.length > 0 
      ? data.clientesPorMes 
      : data.clientes 
        ? [data.clientes] 
        : [];
  }
  
  const lineData = {
    labels: clientesPorMes.map(item => item.mes || 'Mes'),
    datasets: [
      {
        label: 'Clientas Recurrentes',
        data: clientesPorMes.map(item => item.recurrentes || 0),
        borderColor: chartColors.primary,
        backgroundColor: `${chartColors.primary}20`,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: chartColors.primary,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
      },
      {
        label: 'Clientas Nuevas',
        data: clientesPorMes.map(item => item.nuevos || 0),
        borderColor: chartColors.accent,
        backgroundColor: `${chartColors.accent}20`,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: chartColors.accent,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
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
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '60%',
  };

  const lineOptions = {
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
        borderColor: chartColors.primary,
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          }
        },
      },
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
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico de dona - Distribución general */}
      <div className="card p-6 animate-slide-up">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          🎯 Distribución de Clientas
        </h3>
        <div className="chart-container">
          <Doughnut data={donutData} options={donutOptions} />
        </div>
        <div className="mt-4 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {((totalRecurrentes / (totalRecurrentes + totalNuevos)) * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Tasa de Retención Promedio</div>
        </div>
      </div>

      {/* Gráfico de líneas - Evolución mensual */}
      <div className="card p-6 animate-slide-up">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          📊 {data.trimestre ? 'Evolución Mensual' : 'Distribución del Mes'}
        </h3>
        <div className="chart-container">
          <Line data={lineData} options={lineOptions} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
          {clientesPorMes.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded p-2">
              <div className="font-medium text-gray-600">{item.mes}</div>
              <div className="text-blue-600 font-bold">
                {item.porcentajeRetencion !== undefined 
                  ? `${item.porcentajeRetencion}%` 
                  : 'N/A'
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RetentionChart;