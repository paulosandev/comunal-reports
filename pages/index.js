import Head from 'next/head';
import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Calendar, ChevronDown, ArrowUpDown, LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

// Importar componentes
import SummaryCards from '../components/SummaryCards';
import RevenueChart from '../components/RevenueChart';
import RetentionChart from '../components/RetentionChart';
import PlansChart from '../components/PlansChart';
import AttendanceChart from '../components/AttendanceChart';
import TopClientsTable from '../components/TopClientsTable';
import IncomeBreakdownChart from '../components/IncomeBreakdownChart';

// Importar datos
import { reportData, getDatosPorMes, compararMeses, getResumenIngresosTrimestre } from '../data/kpis';

export default function Home() {
  const { isAuthenticated, user, loading, logout, requireAuth } = useAuth();
  const { isAuthenticated: authRequired, loading: authLoading } = requireAuth();
  
  const [selectedPeriod, setSelectedPeriod] = useState('trimestre');
  const [selectedMonth, setSelectedMonth] = useState('Agosto');
  const [compareMonth, setCompareMonth] = useState('Julio');
  const [showComparison, setShowComparison] = useState(false);

  const meses = ['Junio', 'Julio', 'Agosto'];
  const datosActuales = selectedPeriod === 'trimestre' ? reportData : getDatosPorMes(selectedMonth);
  const comparacionDatos = showComparison ? compararMeses(selectedMonth, compareMonth) : null;
  const resumenIngresosTrimestre = getResumenIngresosTrimestre();

  // Mostrar loading mientras se verifica la autenticación
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, no mostrar el dashboard (el hook redirigirá al login)
  if (!isAuthenticated) {
    return null;
  }


  return (
    <>
      <Head>
        <title>Informes de KPIs Comunal - Q3 2025</title>
        <meta name="description" content="Dashboard de KPIs para Comunal Studio - Trimestre Q3 2025" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen" style={{background: 'linear-gradient(to bottom right, #FAF8F4, #EDEDED)'}}>
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg" style={{backgroundColor: '#494438'}}>
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold" style={{color: '#494438'}}>
                    Informes de KPIs Comunal
                  </h1>
                  <p className="text-sm" style={{color: '#B8AB9C'}}>
                    Trimestre Q3 2025 • Junio - Agosto
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Usuario logueado */}
                <div className="flex items-center space-x-2 text-sm" style={{color: '#B8AB9C'}}>
                  <User className="w-4 h-4" />
                  <span>Bienvenido, {user?.username}</span>
                </div>
                
                {/* Selector de período/mes */}
                <div className="flex items-center space-x-2">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                    style={{'--tw-ring-color': '#494438'}}
                    onFocus={(e) => e.target.style.borderColor = '#494438'}
                  >
                    <option value="trimestre">Trimestre Completo</option>
                    <option value="mensual">Por Mes</option>
                  </select>
                  
                  {selectedPeriod === 'mensual' && (
                    <>
                      <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                    style={{'--tw-ring-color': '#494438'}}
                    onFocus={(e) => e.target.style.borderColor = '#494438'}
                      >
                        {meses.map(mes => (
                          <option key={mes} value={mes}>{mes}</option>
                        ))}
                      </select>
                      
                      <button
                        onClick={() => setShowComparison(!showComparison)}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-colors border ${
                          showComparison 
                            ? 'border-opacity-50' 
                            : 'bg-gray-100 text-gray-600 border-gray-300'
                        }`}
                        style={{
                          backgroundColor: showComparison ? '#DDAEA8' : '#F3F4F6',
                          color: showComparison ? '#494438' : '#6B7280',
                          borderColor: showComparison ? '#DDAEA8' : '#D1D5DB'
                        }}
                      >
                        <ArrowUpDown className="w-4 h-4" />
                        <span>Comparar</span>
                      </button>
                      
                      {showComparison && (
                        <select
                          value={compareMonth}
                          onChange={(e) => setCompareMonth(e.target.value)}
                          className="rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 border"
                          style={{
                            backgroundColor: '#DDAEA8',
                            borderColor: '#DDAEA8',
                            color: '#494438',
                            '--tw-ring-color': '#494438'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#494438'}
                        >
                          {meses.filter(mes => mes !== selectedMonth).map(mes => (
                            <option key={mes} value={mes}>vs {mes}</option>
                          ))}
                        </select>
                      )}
                    </>
                  )}
                </div>

                <div className="flex items-center space-x-2 text-sm" style={{color: '#B8AB9C'}}>
                  <Calendar className="w-4 h-4" />
                  <span>
                    {selectedPeriod === 'trimestre' 
                      ? 'Trimestre Q3 2025' 
                      : `${datosActuales.rangoFechas?.inicio || ''} - ${datosActuales.rangoFechas?.fin || ''}`
                    }
                  </span>
                </div>

                {/* Botón de logout */}
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors hover:opacity-80"
                  style={{color: '#DDAEA8', backgroundColor: 'rgba(221, 174, 168, 0.1)'}}
                  title="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Salir</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              📊 Dashboard Ejecutivo
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {selectedPeriod === 'trimestre' 
                ? 'Análisis completo de KPIs de Comunal Studio para el trimestre Q3 2025. Datos procesados de junio, julio y agosto con insights para la toma de decisiones.'
                : `Análisis detallado de KPIs para ${selectedMonth} 2025. Período: ${datosActuales.rangoFechas?.inicio} - ${datosActuales.rangoFechas?.fin} (${datosActuales.rangoFechas?.dias} días).`
              }
            </p>
            
            {/* Panel de comparación */}
            {showComparison && comparacionDatos && (
              <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">
                  📈 Comparación: {selectedMonth} vs {compareMonth}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-gray-600">Ingresos</div>
                    <div className={`font-bold ${comparacionDatos.ingresos.diferencia > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {comparacionDatos.ingresos.diferencia > 0 ? '+' : ''}{comparacionDatos.ingresos.porcentajeCambio}%
                    </div>
                    <div className="text-xs text-gray-500">
                      ${comparacionDatos.ingresos.diferencia.toLocaleString()} MXN
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-gray-600">Clientes Nuevos</div>
                    <div className={`font-bold ${comparacionDatos.clientesNuevos.diferencia > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {comparacionDatos.clientesNuevos.diferencia > 0 ? '+' : ''}{comparacionDatos.clientesNuevos.diferencia}
                    </div>
                    <div className="text-xs text-gray-500">
                      {comparacionDatos.clientesNuevos.mes1} vs {comparacionDatos.clientesNuevos.mes2}
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-gray-600">Retención</div>
                    <div className={`font-bold ${comparacionDatos.retencion.diferencia > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {comparacionDatos.retencion.diferencia > 0 ? '+' : ''}{comparacionDatos.retencion.diferencia.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {comparacionDatos.retencion.mes1}% vs {comparacionDatos.retencion.mes2}%
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Summary Cards */}
          <SummaryCards data={datosActuales} selectedPeriod={selectedPeriod} selectedMonth={selectedMonth} />

          {/* Main Charts Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            <RevenueChart data={selectedPeriod === 'trimestre' ? reportData : datosActuales} />
            <div className="xl:col-span-1">
              <RetentionChart data={selectedPeriod === 'trimestre' ? reportData : datosActuales} />
            </div>
          </div>

          {/* Income Breakdown Chart */}
          <div className="mb-8">
            <IncomeBreakdownChart 
              data={datosActuales} 
              selectedPeriod={selectedPeriod} 
              selectedMonth={selectedMonth}
              resumenTrimestre={resumenIngresosTrimestre}
            />
          </div>

          {/* Plans Chart */}
          <div className="mb-8">
            <PlansChart data={datosActuales} selectedPeriod={selectedPeriod} selectedMonth={selectedMonth} />
          </div>

          {/* Attendance Chart */}
          <div className="mb-8">
            <AttendanceChart data={datosActuales} selectedPeriod={selectedPeriod} selectedMonth={selectedMonth} />
          </div>

          {/* Top Clients Table */}
          <div className="mb-8">
            <TopClientsTable data={datosActuales} selectedPeriod={selectedPeriod} selectedMonth={selectedMonth} />
          </div>

          {/* Key Insights */}
          <div className="card p-8 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              🎯 Insights Clave para la Gerencia
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reportData.insights.map((insight, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <div className="text-3xl mb-3">{insight.icon}</div>
                  <h4 className="font-semibold text-gray-800 mb-2">{insight.title}</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{insight.value}</div>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Items */}
          <div className="card p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
              Recomendaciones Estratégicas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">💼 Gestión de Clientas</h4>
                <p className="text-sm text-gray-600">
                  Implementar programa VIP para las top 10 clientas que representan un alto valor.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">📅 Optimización de Horarios</h4>
                <p className="text-sm text-gray-600">
                  Expandir horarios de Sculpt y Pilates Mat por su alta demanda y asistencia.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">🎯 Estrategia de Paquetes</h4>
                <p className="text-sm text-gray-600">
                  Promover paquetes de 12 clases como opción premium con mejor rentabilidad.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 py-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Reporte generado automáticamente • {new Date().toLocaleDateString('es-MX')} • 
              <span className="font-medium"> Comunal Studio Dashboard</span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}