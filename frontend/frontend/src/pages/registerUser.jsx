import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const RegisterUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/user/register', { username, email, password });
      setMsg('Utilisateur inscrit !');
      setUsername(''); setEmail(''); setPassword('');
      
      setTimeout(() => {
        navigate('/login'); 
      }, 2000);
    } catch {
      setMsg("Erreur d'inscription");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Créer un compte</h2>
      {msg && <p style={{ 
        color: msg.includes('Erreur') ? 'red' : 'green',
        padding: '10px', 
        backgroundColor: msg.includes('Erreur') ? '#ffeeee' : '#eeffee',
        borderRadius: '4px',
        marginBottom: '15px'
      }}>{msg}</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input 
            type="text" 
            placeholder="Nom" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <input 
            type="password" 
            placeholder="Mot de passe" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        
        <button 
          type="submit"
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          S'inscrire
        </button>
      </form>
      
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p>Déjà inscrit? <Link to="/login" style={{ color: '#4CAF50', textDecoration: 'none' }}>Se connecter</Link></p>
      </div>
    </div>
  );
};

export default RegisterUser;