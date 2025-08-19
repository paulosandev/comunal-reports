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
import { chartColors } from '../data/kpis';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AttendanceChart = ({ data, selectedPeriod, selectedMonth }) => {
  // Tomar las top 8 clases para mejor visualización
  const clasesData = selectedPeriod === 'trimestre' ? data.clasesAsistenciaPorMes?.agosto || [] : data.clasesAsistencia || [];
  const topClases = clasesData.slice(0, 8);

  const chartData = {
    labels: topClases.map(clase => {
      // Acortar nombres largos para mejor visualización
      if (clase.clase.length > 15) {
        return clase.clase.substring(0, 15) + '...';
      }
      return clase.clase;
    }),
    datasets: [
      {
        label: 'Asistencias',
        data: topClases.map(clase => clase.asistencias),
        backgroundColor: chartColors.gradient.slice(0, topClases.length),
        borderColor: chartColors.gradient.slice(0, topClases.length),
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Gráfico horizontal
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
        callbacks: {
          title: function(context) {
            // Mostrar el nombre completo en el tooltip
            return topClases[context[0].dataIndex].clase;
          },
          label: function(context) {
            const clase = topClases[context.dataIndex];
            return [
              `Asistencias: ${clase.asistencias}`,
              `Reservas: ${clase.reservas}`,
              `Cancelaciones: ${clase.cancelaciones}`,
              `Tasa asistencia: ${((clase.asistencias / clase.reservas) * 100).toFixed(1)}%`
            ];
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

  // Calcular estadísticas
  const totalAsistencias = clasesData.reduce((sum, clase) => sum + clase.asistencias, 0);
  const totalReservas = clasesData.reduce((sum, clase) => sum + clase.reservas, 0);
  const totalCancelaciones = clasesData.reduce((sum, clase) => sum + clase.cancelaciones, 0);
  const tasaAsistenciaPromedio = ((totalAsistencias / totalReservas) * 100).toFixed(1);

  return (
    <div className="card p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          💪 Clases con Mayor Asistencia
        </h3>
        <div className="text-sm text-gray-500">
          {selectedPeriod === 'trimestre' 
            ? 'Agosto 2025 (1-18)' 
            : `${selectedMonth} 2025 ${data.rangoFechas ? `(${data.rangoFechas.inicio} - ${data.rangoFechas.fin})` : ''}`
          }
        </div>
      </div>
      
      <div className="chart-container mb-6">
        <Bar data={chartData} options={options} />
      </div>

      {/* Estadísticas generales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{totalAsistencias}</div>
          <div className="text-sm text-gray-600">Total Asistencias</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{totalReservas}</div>
          <div className="text-sm text-gray-600">Total Reservas</div>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{totalCancelaciones}</div>
          <div className="text-sm text-gray-600">Cancelaciones</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{tasaAsistenciaPromedio}%</div>
          <div className="text-sm text-gray-600">Tasa Asistencia</div>
        </div>
      </div>

      {/* Top 3 clases destacadas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {topClases.slice(0, 3).map((clase, index) => {
          const medallas = ['🥇', '🥈', '🥉'];
          const colores = ['bg-yellow-50 border-yellow-200', 'bg-gray-50 border-gray-200', 'bg-orange-50 border-orange-200'];
          
          return (
            <div key={index} className={`p-4 rounded-lg border ${colores[index]}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl">{medallas[index]}</div>
                <div className="text-lg font-bold text-gray-900">
                  {clase.asistencias}
                </div>
              </div>
              <div className="font-semibold text-gray-800 mb-1">
                {clase.clase}
              </div>
              <div className="text-sm text-gray-600">
                {((clase.asistencias / clase.reservas) * 100).toFixed(1)}% asistencia
              </div>
            </div>
          );
        })}
      </div>

      {/* Insight */}
      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-start space-x-3">
          <div className="text-green-500 text-xl">🎯</div>
          <div>
            <h4 className="font-semibold text-green-900">Clases Estrella</h4>
            <p className="text-sm text-green-700">
              <strong>Sculpt</strong> y <strong>Pilates Mat</strong> son las clases más populares con alta tasa de asistencia. 
              Considera expandir horarios para estas modalidades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;