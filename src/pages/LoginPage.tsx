import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://rovalverde.alwaysdata.net/login.php', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.status === 'success') {
        login(data.user);
        navigate('/admin'); // Al loguearse, lo mandamos al CRUD
      } else {
        setError(data.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="min-h-screen bg-brand-light-gray flex items-center justify-center font-jakarta px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-t-4 border-brand-green">
        <h2 className="text-3xl font-bold text-brand-dark mb-2 text-center">Iniciar Sesión</h2>
        <p className="text-gray-500 text-center mb-8">Acceso administrativo</p>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm font-bold">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
              placeholder="ejemplo@email.com"
              required 
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
              placeholder="******"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-brand-dark text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors shadow-md"
          >
            Ingresar al Sistema
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;