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

const PlansChart = ({ data, selectedPeriod, selectedMonth }) => {
  // Obtener todos los planes únicos
  const allPlans = ['1 Clase', '4 Clases', '8 Clases', '12 Clases', '16 Clases', '20 Clases'];

  // Preparar datos para el gráfico según el período seleccionado
  let chartData;
  
  if (selectedPeriod === 'trimestre') {
    chartData = {
      labels: allPlans,
      datasets: [
        {
          label: 'Junio',
          data: allPlans.map(plan => {
            const planData = data.planesPorMes?.junio?.find(p => p.plan === plan);
            return planData ? planData.pedidos : 0;
          }),
          backgroundColor: chartColors.primary,
          borderColor: chartColors.primary,
          borderWidth: 1,
          borderRadius: {
            topLeft: 4,
            topRight: 4,
          },
        },
        {
          label: 'Julio',
          data: allPlans.map(plan => {
            const planData = data.planesPorMes?.julio?.find(p => p.plan === plan);
            return planData ? planData.pedidos : 0;
          }),
          backgroundColor: chartColors.accent,
          borderColor: chartColors.accent,
          borderWidth: 1,
          borderRadius: {
            topLeft: 4,
            topRight: 4,
          },
        },
        {
          label: 'Agosto',
          data: allPlans.map(plan => {
            const planData = data.planesPorMes?.agosto?.find(p => p.plan === plan);
            return planData ? planData.pedidos : 0;
          }),
          backgroundColor: chartColors.success,
          borderColor: chartColors.success,
          borderWidth: 1,
          borderRadius: {
            topLeft: 4,
            topRight: 4,
          },
        },
      ],
    };
  } else {
    // Vista mensual individual
    const planesDelMes = data.planes || [];
    chartData = {
      labels: planesDelMes.map(plan => plan.plan),
      datasets: [
        {
          label: 'Pedidos',
          data: planesDelMes.map(plan => plan.pedidos),
          backgroundColor: chartColors.gradient.slice(0, planesDelMes.length),
          borderColor: chartColors.gradient.slice(0, planesDelMes.length),
          borderWidth: 2,
          borderRadius: 8,
        },
      ],
    };
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: chartColors.primary,
        borderWidth: 1,
        callbacks: {
          afterLabel: function(context) {
            // Obtener ventas para el tooltip
            const mes = context.dataset.label.toLowerCase();
            const plan = context.label;
            let planData;
            
            // En vista mensual, usar data.planes directamente
            if (selectedPeriod === 'mensual') {
              planData = data.planes?.find(p => p.plan === plan);
            } else {
              // En vista trimestral, usar planesPorMes
              if (mes === 'junio') {
                planData = data.planesPorMes?.junio?.find(p => p.plan === plan);
              } else if (mes === 'julio') {
                planData = data.planesPorMes?.julio?.find(p => p.plan === plan);
              } else {
                planData = data.planesPorMes?.agosto?.find(p => p.plan === plan);
              }
            }
            
            return planData ? `Ventas: ${formatCurrency(planData.ventas)}` : '';
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
            size: 11,
          }
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  // Calcular plan más vendido según el período
  const getPlanMasVendido = (planes) => {
    return planes.reduce((max, plan) => 
      plan.pedidos > max.pedidos ? plan : max
    );
  };

  let topPlanes;
  if (selectedPeriod === 'trimestre') {
    topPlanes = {
      junio: getPlanMasVendido(data.planesPorMes?.junio || []),
      julio: getPlanMasVendido(data.planesPorMes?.julio || []),
      agosto: getPlanMasVendido(data.planesPorMes?.agosto || []),
    };
  } else {
    const planesDelMes = data.planes || [];
    topPlanes = planesDelMes.length > 0 ? getPlanMasVendido(planesDelMes) : null;
  }

  return (
    <div className="card p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          🏃‍♀️ {selectedPeriod === 'trimestre' ? 'Planes Más Vendidos por Mes' : `Planes Más Vendidos - ${selectedMonth}`}
        </h3>
        <div className="text-sm text-gray-500">
          {selectedPeriod === 'trimestre' ? 'Pedidos por paquete' : `${data.rangoFechas ? `${data.rangoFechas.inicio} - ${data.rangoFechas.fin}` : ''}`}
        </div>
      </div>
      
      <div className="chart-container mb-6">
        <Bar data={chartData} options={options} />
      </div>

      {/* Resumen de planes más vendidos */}
      {selectedPeriod === 'trimestre' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {Object.entries(topPlanes).map(([mes, plan]) => (
            <div key={mes} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-sm font-medium text-gray-600 capitalize mb-1">
                {mes}
              </div>
              <div className="text-lg font-bold text-gray-900">
                {plan.plan}
              </div>
              <div className="text-sm text-gray-500">
                {plan.pedidos} pedidos • {formatCurrency(plan.ventas)}
              </div>
            </div>
          ))}
        </div>
      ) : topPlanes && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 text-center mt-6">
          <div className="text-sm font-medium text-gray-600 mb-2">
            Plan más vendido del mes
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {topPlanes.plan}
          </div>
          <div className="text-lg text-gray-600">
            {topPlanes.pedidos} pedidos • {formatCurrency(topPlanes.ventas)}
          </div>
        </div>
      )}

      {/* Insight adicional */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="text-blue-500 text-xl">💡</div>
          <div>
            <h4 className="font-semibold text-blue-900">Insight</h4>
            <p className="text-sm text-blue-700">
              Los paquetes de <strong>4 y 12 clases</strong> mantienen consistencia en ventas. 
              El paquete de <strong>1 clase</strong> es ideal para captar nuevas clientas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansChart;