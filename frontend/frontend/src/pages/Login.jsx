
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Login =()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleLogin= async(e)=>{
    e.preventDefault();
    setError("");
    try{
        const response = await api.post("/admin/login",{email,password})
        localStorage.setItem("token",response.data.token);
        navigate("/admin/panel");
    }catch{
        setError("    Identifiant incorrrect");
    }
    };





     return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Connexion Admin</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '1rem' }}
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '1rem' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
