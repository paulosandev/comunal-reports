import { Crown, TrendingUp, Users, DollarSign } from 'lucide-react';
import { formatCurrency } from '../data/kpis';

const TopClientsTable = ({ data, selectedPeriod, selectedMonth }) => {
  const topClients = selectedPeriod === 'trimestre' ? data.topClientesPorMes?.agosto || [] : data.topClientes || [];

  // Calcular estadísticas
  const totalVentas = topClients.reduce((sum, client) => sum + client.ventasTotales, 0);
  const totalPedidos = topClients.reduce((sum, client) => sum + client.pedidos, 0);
  const promedioValor = totalVentas / totalPedidos;

  const getRankingIcon = (ranking) => {
    switch(ranking) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return ranking.toString();
    }
  };

  const getRankingStyle = (ranking) => {
    switch(ranking) {
      case 1: return 'bg-yellow-50 border-l-4 border-yellow-400';
      case 2: return 'bg-gray-50 border-l-4 border-gray-400';
      case 3: return 'bg-orange-50 border-l-4 border-orange-400';
      default: return 'hover:bg-gray-50';
    }
  };

  return (
    <div className="card p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          ⭐ Top 10 Clientas que Más Pagan
        </h3>
        <div className="text-sm text-gray-500">
          {selectedPeriod === 'trimestre' 
            ? 'Agosto 2025 (1-18)' 
            : `${selectedMonth} 2025 ${data.rangoFechas ? `(${data.rangoFechas.inicio} - ${data.rangoFechas.fin})` : ''}`
          }
        </div>
      </div>

      {/* Estadísticas resumidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
          <div className="bg-purple-500 p-2 rounded-lg">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(topClients[0].ventasTotales)}
            </div>
            <div className="text-sm text-gray-600">Top Cliente</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
          <div className="bg-green-500 p-2 rounded-lg">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(totalVentas)}
            </div>
            <div className="text-sm text-gray-600">Total Top 10</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">
              {totalPedidos}
            </div>
            <div className="text-sm text-gray-600">Total Pedidos</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
          <div className="bg-orange-500 p-2 rounded-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(promedioValor)}
            </div>
            <div className="text-sm text-gray-600">Valor Promedio</div>
          </div>
        </div>
      </div>

      {/* Tabla responsive */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <th className="text-left p-4 rounded-tl-lg">Ranking</th>
              <th className="text-left p-4">Cliente</th>
              <th className="text-center p-4">Pedidos</th>
              <th className="text-center p-4">Valor Promedio</th>
              <th className="text-center p-4 rounded-tr-lg">Ventas Totales</th>
            </tr>
          </thead>
          <tbody>
            {topClients.map((client, index) => (
              <tr 
                key={index}
                className={`border-b border-gray-200 transition-colors duration-200 ${getRankingStyle(client.ranking)}`}
              >
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">
                      {getRankingIcon(client.ranking)}
                    </span>
                    {client.ranking <= 3 && (
                      <span className="text-sm font-medium text-gray-600">
                        #{client.ranking}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-gray-900">
                    {client.nombre}
                  </div>
                  {client.ranking === 1 && (
                    <div className="text-xs text-purple-600 font-semibold">
                      👑 Cliente VIP
                    </div>
                  )}
                </td>
                <td className="p-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {client.pedidos}
                  </span>
                </td>
                <td className="p-4 text-center font-medium text-gray-900">
                  {formatCurrency(client.valorPromedio)}
                </td>
                <td className="p-4 text-center">
                  <span className="font-bold text-green-600">
                    {formatCurrency(client.ventasTotales)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="text-blue-500 text-xl">💎</div>
            <div>
              <h4 className="font-semibold text-blue-900">Cliente VIP</h4>
              <p className="text-sm text-blue-700">
                <strong>{topClients[0].nombre}</strong> lidera con {formatCurrency(topClients[0].ventasTotales)} 
                y {topClients[0].pedidos} pedidos. Excelente candidata para programa de lealtad.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-start space-x-3">
            <div className="text-green-500 text-xl">📊</div>
            <div>
              <h4 className="font-semibold text-green-900">Oportunidad</h4>
              <p className="text-sm text-green-700">
                El Top 5 representa el <strong>{selectedPeriod === 'trimestre' 
                  ? ((totalVentas / data.trimestre?.ingresosTotales || 1) * 100).toFixed(1)
                  : ((totalVentas / (data.ingresos?.ingresos || 1)) * 100).toFixed(1)
                }%</strong> de 
                los ingresos {selectedPeriod === 'trimestre' ? 'totales' : 'del mes'}. Enfócate en retener estos clientes clave.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopClientsTable;