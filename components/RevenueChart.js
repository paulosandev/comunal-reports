import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { formatCurrency, chartColors } from '../data/kpis';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ data }) => {
  const ingresosMensuales = data.ingresosMensuales || [];
  
  const chartData = {
    labels: ingresosMensuales.map(item => {
      return item.nota ? `${item.mes} ${item.nota}` : item.mes;
    }),
    datasets: [
      {
        label: 'Ingresos',
        data: ingresosMensuales.map(item => item.ingresos),
        backgroundColor: [
          chartColors.primary,
          chartColors.accent,
          chartColors.success
        ],
        borderColor: [
          chartColors.primary,
          chartColors.accent,
          chartColors.success
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: chartColors.primary,
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `Ingresos: ${formatCurrency(context.parsed.y)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: function(value) {
            return formatCurrency(value);
          },
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
    <div className="card p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          📈 Ingresos Mensuales
        </h3>
        <div className="text-sm text-gray-500">
          Total: {formatCurrency(data.trimestre?.ingresosTotales || ingresosMensuales.reduce((sum, item) => sum + item.ingresos, 0))}
        </div>
      </div>
      <div className="chart-container">
        <Bar data={chartData} options={options} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        {ingresosMensuales.map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm font-medium text-gray-600">
              {item.mes}
            </div>
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(item.ingresos)}
            </div>
            <div className="text-xs text-gray-500">
              {item.pedidos} pedidos
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;