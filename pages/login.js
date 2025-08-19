import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Eye, EyeOff, Lock, User, BarChart3 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = login(username, password);
    
    if (success) {
      // Redirigir al dashboard
      router.push('/');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
    
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Login - Informes de KPIs Comunal</title>
        <meta name="description" content="Acceso al dashboard de KPIs de Comunal Studio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center px-4" style={{backgroundColor: '#FAF8F4'}}>
        <div className="max-w-md w-full">
          {/* Logo y Header */}
          <div className="text-center mb-8">
            <div className="p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: '#494438'}}>
              <BarChart3 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{color: '#494438'}}>
              Informes de KPIs Comunal
            </h1>
            <p style={{color: '#B8AB9C'}}>
              Accede al dashboard ejecutivo
            </p>
          </div>

          {/* Formulario de Login */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Iniciar Sesión
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo Usuario */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Usuario
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{'--tw-ring-color': '#494438'}}
                    onFocus={(e) => e.target.style.borderColor = '#494438'}
                    placeholder="Ingresa tu usuario"
                    required
                  />
                </div>
              </div>

              {/* Campo Contraseña */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{'--tw-ring-color': '#494438'}}
                    onFocus={(e) => e.target.style.borderColor = '#494438'}
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 text-center">{error}</p>
                </div>
              )}

              {/* Botón Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'hover:opacity-90'
                }`}
                style={{backgroundColor: loading ? '#9CA3AF' : '#494438'}}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </form>

          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Dashboard ejecutivo • {new Date().getFullYear()} • Comunal Studio
            </p>
          </div>
        </div>
      </div>
    </>
  );
}