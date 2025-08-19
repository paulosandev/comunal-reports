import { TrendingUp, Users, RefreshCw, Trophy } from 'lucide-react';
import { formatCurrency } from '../data/kpis';

const SummaryCards = ({ data, selectedPeriod, selectedMonth }) => {
  let cards;
  
  if (selectedPeriod === 'trimestre') {
    cards = [
      {
        title: 'Ingresos Totales Trimestre',
        value: formatCurrency(data.trimestre?.ingresosTotales || 0),
        change: '+64% Jul vs Jun',
        icon: TrendingUp,
        color: 'bg-blue-500',
        bgColor: 'bg-blue-50'
      },
      {
        title: 'Nuevas Clientas',
        value: (data.trimestre?.clientesNuevosTotales || 0).toLocaleString(),
        change: '47% en Julio',
        icon: Users,
        color: 'bg-green-500',
        bgColor: 'bg-green-50'
      },
      {
        title: 'Clientas Recurrentes',
        value: (data.trimestre?.clientesRecurrentesTotales || 0).toLocaleString(),
        change: 'Total trimestre',
        icon: RefreshCw,
        color: 'bg-purple-500',
        bgColor: 'bg-purple-50'
      },
      {
        title: 'Mejor Mes',
        value: 'Julio',
        change: formatCurrency(129275),
        icon: Trophy,
        color: 'bg-orange-500',
        bgColor: 'bg-orange-50'
      }
    ];
  } else {
    // Datos para vista mensual
    const mesCapitalized = selectedMonth;
    cards = [
      {
        title: `Ingresos ${mesCapitalized}`,
        value: formatCurrency(data.ingresos?.ingresos || 0),
        change: `${data.ingresos?.pedidos || 0} pedidos`,
        icon: TrendingUp,
        color: 'bg-blue-500',
        bgColor: 'bg-blue-50'
      },
      {
        title: 'Clientas Nuevas',
        value: (data.clientes?.nuevos || 0).toLocaleString(),
        change: `${mesCapitalized} 2025`,
        icon: Users,
        color: 'bg-green-500',
        bgColor: 'bg-green-50'
      },
      {
        title: 'Clientas Recurrentes',
        value: (data.clientes?.recurrentes || 0).toLocaleString(),
        change: `Retención: ${data.clientes?.porcentajeRetencion || 0}%`,
        icon: RefreshCw,
        color: 'bg-purple-500',
        bgColor: 'bg-purple-50'
      },
      {
        title: 'Total Clientas',
        value: (data.clientes?.total || 0).toLocaleString(),
        change: `${data.rangoFechas?.dias || 0} días`,
        icon: Trophy,
        color: 'bg-orange-500',
        bgColor: 'bg-orange-50'
      }
    ];
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div
            key={index}
            className={`card p-6 ${card.bgColor} border border-gray-100 animate-fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {card.value}
                </p>
                <p className="text-sm text-gray-500">
                  {card.change}
                </p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;