import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const RegisterAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate(); // Ajout du hook useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/register', { email, password });
      setMsg("Admin créé !");
      setEmail(''); setPassword('');
      
      // Redirection vers la page de login après 2 secondes
      setTimeout(() => {
        navigate('/admin/login');
      }, 2000);
    } catch {
      setMsg("Erreur lors de l'inscription");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Créer un compte administrateur</h2>
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
            backgroundColor: '#d32f2f', // Couleur rouge pour distinguer l'admin
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          Créer un administrateur
        </button>
      </form>
      
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p>Déjà administrateur? <Link to="/admin/login" style={{ color: '#d32f2f', textDecoration: 'none' }}>Se connecter</Link></p>
      </div>
    </div>
  );
};

export default RegisterAdmin;