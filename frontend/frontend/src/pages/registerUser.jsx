// pages/RegisterUser.jsx
import { useState } from 'react';
import api from '../services/api';

const RegisterUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/user/register', { username, email, password });
      setMsg('Utilisateur inscrit !');
      setUsername(''); setEmail(''); setPassword('');
    } catch {
      setMsg("Erreur d'inscription");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Créer un compte</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nom" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">S’inscrire</button>
      </form>
    </div>
  );
};

export default RegisterUser;
