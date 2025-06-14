import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post('/admin/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('adminToken', token);
      navigate('/admin/panel');
    } catch  {
      alert('Erreur de connexion');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login Admin</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-2 p-2 border"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border"
      />

      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Connexion
      </button>

      <div className="text-center mt-4">
        <p>
          Pas encore inscrit ?{' '}
          <Link to="/admin/register" className="text-blue-600 underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;