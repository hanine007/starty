import { useState } from 'react';
import api from '../services/api';

const RegisterAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/register', { email, password });
      setMsg(" Admin créé !");
      setEmail(''); setPassword('');
    } catch {
      setMsg(" Erreur lors de l'inscription");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Créer un admin</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default RegisterAdmin;
