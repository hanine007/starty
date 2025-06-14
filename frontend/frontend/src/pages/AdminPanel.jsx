import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminPanel = () => {
  const [scpis, setScpis] = useState([]);
  const [societes, setSocietes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // États pour l'ajout/modification des SCPI
  const [newScpi, setNewScpi] = useState({ name: '', rendement: 0, societeId: '' });
  const [editingScpi, setEditingScpi] = useState(null);
  
  // États pour l'ajout/modification des sociétés
  const [newSociete, setNewSociete] = useState({ name: '', description: '' });
  const [editingSociete, setEditingSociete] = useState(null);
  
  const navigate = useNavigate();

  // Vérification du token admin
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
    } else {
      // Configuration du header d'autorisation avec le token
      api.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
      loadData();
    }
  }, [navigate]);

  // Charger les données des SCPI et sociétés
  const loadData = async () => {
    setLoading(true);
    try {
      const [scpisRes, societesRes] = await Promise.all([
        api.get('/scpis'),
        api.get('/societes')
      ]);
      setScpis(scpisRes.data);
      setSocietes(societesRes.data);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des données");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // FONCTIONS DE GESTION DES SCPI
  
  const handleAddScpi = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/scpis', newScpi);
      setScpis([...scpis, res.data]);
      setNewScpi({ name: '', rendement: 0, societeId: '' });
      alert('SCPI ajoutée avec succès !');
    } catch (err) {
      alert(`Erreur: ${err.response?.data?.message || 'Impossible d\'ajouter la SCPI'}`);
    }
  };

  const handleEditScpi = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/scpis/${editingScpi._id}`, editingScpi);
      setScpis(scpis.map(s => s._id === editingScpi._id ? res.data : s));
      setEditingScpi(null);
      alert('SCPI mise à jour avec succès !');
    } catch (err) {
      alert(`Erreur: ${err.response?.data?.message || 'Impossible de modifier la SCPI'}`);
    }
  };

  const handleDeleteScpi = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette SCPI ?')) {
      try {
        await api.delete(`/scpis/${id}`);
        setScpis(scpis.filter(s => s._id !== id));
        alert('SCPI supprimée avec succès !');
      } catch (err) {
        alert(`Erreur: ${err.response?.data?.message || 'Impossible de supprimer la SCPI'}`);
      }
    }
  };

  // FONCTIONS DE GESTION DES SOCIÉTÉS
  
  const handleAddSociete = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/societes', newSociete);
      setSocietes([...societes, res.data]);
      setNewSociete({ name: '', description: '' });
      alert('Société ajoutée avec succès !');
    } catch (err) {
      alert(`Erreur: ${err.response?.data?.message || 'Impossible d\'ajouter la société'}`);
    }
  };

  const handleEditSociete = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/societes/${editingSociete._id}`, editingSociete);
      setSocietes(societes.map(s => s._id === editingSociete._id ? res.data : s));
      setEditingSociete(null);
      alert('Société mise à jour avec succès !');
    } catch (err) {
      alert(`Erreur: ${err.response?.data?.message || 'Impossible de modifier la société'}`);
    }
  };

  const handleDeleteSociete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette société ? Cela supprimera également toutes les SCPI associées.')) {
      try {
        await api.delete(`/societes/${id}`);
        setSocietes(societes.filter(s => s._id !== id));
        // Rafraîchir les SCPI également car certaines ont pu être supprimées en cascade
        loadData();
        alert('Société supprimée avec succès !');
      } catch (err) {
        alert(`Erreur: ${err.response?.data?.message || 'Impossible de supprimer la société'}`);
      }
    }
  };

  // DÉCONNEXION
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (loading) return <div>Chargement en cours...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Panneau d'administration</h2>
        <button 
          onClick={handleLogout}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#f44336', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Déconnexion
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* SECTION SOCIÉTÉS */}
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
          <h3>Gestion des sociétés</h3>

          {/* Formulaire d'ajout de société  si pas d'édition en cours */}
          {!editingSociete && (
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
              <h4>Ajouter une société</h4>
              <form onSubmit={handleAddSociete}>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Nom:</label>
                  <input
                    type="text"
                    value={newSociete.name}
                    onChange={(e) => setNewSociete({ ...newSociete, name: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                  />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
                  <textarea
                    value={newSociete.description}
                    onChange={(e) => setNewSociete({ ...newSociete, description: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '100px' }}
                  />
                </div>
                <button 
                  type="submit"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Ajouter
                </button>
              </form>
            </div>
          )}

          {/* Formulaire de modification de société  si édition en cours */}
          {editingSociete && (
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
              <h4>Modifier une société</h4>
              <form onSubmit={handleEditSociete}>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Nom:</label>
                  <input
                    type="text"
                    value={editingSociete.name}
                    onChange={(e) => setEditingSociete({ ...editingSociete, name: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                  />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
                  <textarea
                    value={editingSociete.description}
                    onChange={(e) => setEditingSociete({ ...editingSociete, description: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '100px' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    type="submit"
                    style={{ 
                      padding: '8px 16px', 
                      backgroundColor: '#2196F3', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Enregistrer
                  </button>
                  <button 
                    type="button"
                    onClick={() => setEditingSociete(null)}
                    style={{ 
                      padding: '8px 16px', 
                      backgroundColor: '#f44336', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Liste des sociétés */}
          <div>
            <h4>Liste des sociétés</h4>
            {societes.length === 0 ? (
              <p>Aucune société disponible</p>
            ) : (
              <div>
                {societes.map(societe => (
                  <div 
                    key={societe._id} 
                    style={{ 
                      border: '1px solid #ddd', 
                      borderRadius: '4px', 
                      padding: '10px',
                      marginBottom: '10px'
                    }}
                  >
                    <h5>{societe.name}</h5>
                    <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>{societe.description}</p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        onClick={() => setEditingSociete(societe)}
                        style={{ 
                          padding: '5px 10px', 
                          backgroundColor: '#2196F3', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Modifier
                      </button>
                      <button 
                        onClick={() => handleDeleteSociete(societe._id)}
                        style={{ 
                          padding: '5px 10px', 
                          backgroundColor: '#f44336', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* SECTION SCPI */}
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
          <h3>Gestion des SCPI</h3>
          
          {/* Formulaire d'ajout de SCPI */}
          {!editingScpi && (
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
              <h4>Ajouter une SCPI</h4>
              <form onSubmit={handleAddScpi}>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Nom:</label>
                  <input
                    type="text"
                    value={newScpi.name}
                    onChange={(e) => setNewScpi({ ...newScpi, name: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                  />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Rendement (%):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newScpi.rendement}
                    onChange={(e) => setNewScpi({ ...newScpi, rendement: parseFloat(e.target.value) })}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                  />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Société:</label>
                  <select
                    value={newScpi.societeId}
                    onChange={(e) => setNewScpi({ ...newScpi, societeId: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                  >
                    <option value="">-- Sélectionner une société --</option>
                    {societes.map(societe => (
                      <option key={societe._id} value={societe._id}>
                        {societe.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button 
                  type="submit"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Ajouter
                </button>
              </form>
            </div>
          )}
          
          {/* Formulaire de modification de SCPI */}
          {editingScpi && (
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
              <h4>Modifier une SCPI</h4>
              <form onSubmit={handleEditScpi}>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Nom:</label>
                  <input
                    type="text"
                    value={editingScpi.name}
                    onChange={(e) => setEditingScpi({ ...editingScpi, name: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                  />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Rendement (%):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingScpi.rendement}
                    onChange={(e) => setEditingScpi({ ...editingScpi, rendement: parseFloat(e.target.value) })}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                  />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Société:</label>
                  <select
                    value={editingScpi.societeId}
                    onChange={(e) => setEditingScpi({ ...editingScpi, societeId: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                  >
                    {societes.map(societe => (
                      <option key={societe._id} value={societe._id}>
                        {societe.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    type="submit"
                    style={{ 
                      padding: '8px 16px', 
                      backgroundColor: '#2196F3', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Enregistrer
                  </button>
                  <button 
                    type="button"
                    onClick={() => setEditingScpi(null)}
                    style={{ 
                      padding: '8px 16px', 
                      backgroundColor: '#f44336', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Liste des SCPI */}
          <div>
            <h4>Liste des SCPI</h4>
            {scpis.length === 0 ? (
              <p>Aucune SCPI disponible</p>
            ) : (
              <div>
                {scpis.map(scpi => {
                  // Trouver la société associée
                  const societe = societes.find(s => s._id === scpi.societeId);
                  
                  return (
                    <div 
                      key={scpi._id} 
                      style={{ 
                        border: '1px solid #ddd', 
                        borderRadius: '4px', 
                        padding: '10px',
                        marginBottom: '10px'
                      }}
                    >
                      <h5>{scpi.name}</h5>
                      <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>
                        <strong>Rendement:</strong> {scpi.rendement}%
                      </p>
                      <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>
                        <strong>Société:</strong> {societe ? societe.name : 'Inconnue'}
                      </p>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                          onClick={() => setEditingScpi(scpi)}
                          style={{ 
                            padding: '5px 10px', 
                            backgroundColor: '#2196F3', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}
                        >
                          Modifier
                        </button>
                        <button 
                          onClick={() => handleDeleteScpi(scpi._id)}
                          style={{ 
                            padding: '5px 10px', 
                            backgroundColor: '#f44336', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;