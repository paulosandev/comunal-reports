import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const authStatus = localStorage.getItem('isAuthenticated');
      const userData = localStorage.getItem('user');
      
      if (authStatus === 'true' && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (username, password) => {
    const CREDENTIALS = [
      { username: 'admin', password: 'fitness2025' },
      { username: 'Caro', password: 'fitness2025' },
      { username: 'Kari', password: 'fitness2025' }
    ];

    const validUser = CREDENTIALS.find(cred => 
      cred.username === username && cred.password === password
    );

    if (validUser) {
      const userData = { 
        username, 
        loginTime: new Date().toISOString() 
      };
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  };

  const requireAuth = () => {
    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push('/login');
      }
    }, [loading, isAuthenticated]);

    return { isAuthenticated, loading };
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    requireAuth,
    checkAuthStatus
  };
};