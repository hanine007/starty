import { useState, useEffect } from "react";
import api from "../services/api";

const Home = () => {
  const [scpis, setScpis] = useState([]);
  const [societes, setSocietes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // etats des filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSociete, setSelectedSociete] = useState("");
  const [rendementMax, setRendementMax] = useState("");
  const [rendementMin, setRendementMin] = useState("");
  // charger les scpis et les societes au chargement de la page
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [scpiResponse, societeResponse] = await Promise.all([
          api.get("/scpis"),
          api.get("/societes"),
        ]);
        setScpis(scpiResponse.data);
        setSocietes(societeResponse.data);
        setError(null);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
        setError("Une erreur s'est produite lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  //  fct de filtrage des scpis
  const getFilteredScpis = () => {
    const noFiltersApplied =
      !searchTerm && !selectedSociete && !rendementMin && !rendementMax;

    if (noFiltersApplied) {
      return scpis;
    }

    return scpis.filter((scpi) => {
      const matchesSearch =
        !searchTerm ||
        scpi.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtre par société
      const matchesSociete =
        // selectedSociete est valeur de l'id de la societe 158 on affiche tous societe avec leur nom et valeur prend id de ces dernier
        !selectedSociete ||
        String(scpi.societeId) === selectedSociete ||
        (typeof scpi.societeId === "object" &&
          String(scpi.societeId._id) === selectedSociete);

      const matchesRendementMin =
        !rendementMin || scpi.rendement >= parseFloat(rendementMin);

      const matchesRendementMax =
        !rendementMax || scpi.rendement <= parseFloat(rendementMax);

      return (
        matchesSearch &&
        matchesSociete &&
        matchesRendementMin &&
        matchesRendementMax
      );
    });
  };
  // nom de la societe par id
  const getSocieteNameById = (id) => {
    // Si une seule société existe, l'utiliser directement
    if (societes.length === 1) return societes[0].name;

    // Sinon essayer de trouver la correspondance
    const societe = societes.find(
      (s) =>
        String(s._id) === (typeof id === "object" ? String(id._id) : String(id))
    );
    return societe ? societe.name : "Inconnue";
  };

  // remettre a 0 les filtres
  const resFiltres = () => {
    setSearchTerm("");
    setRendementMax("");
    setRendementMin("");
    setSelectedSociete("");
  };
  // appeler la fct
  const filtredScpis = getFilteredScpis();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Explorer les SCPI</h2>
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "18px",
          marginBottom: "20px",
        }}
      >
        <h3>Filtrer les SCPI</h3>
        {/* responsive */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          {/*par champ de recherrche */}
          <div>
            <label
              htmlFor="search"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Recherche par nom:
            </label>
            <input
              type="text"
              id="search"
              placeholder="rechercher nom de la scpi"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          {/* par societe */}
          <div>
            <label
              htmlFor="societe"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Societe
            </label>
            <select
              id="societe"
              value={selectedSociete}
              onChange={(e) => setSelectedSociete(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              {/* option vide pour tout afficher */}
              <option>Choisir une société</option>
              {/* listes tous les socites selon l'id qui sera pris dans e.target.value  on preciser ici value a id*/}
              {societes.map((socite) => (
                <option key={socite._id} value={socite._id}>
                  {socite.name}
                </option>
              ))}
            </select>
          </div>
          {/* par rendement min */}
          <div>
            <label
              htmlFor="rendementMin"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Rendement Minimum
            </label>
            <input
              type="number"
              id="rendementMin"
              placeholder="0"
              step="0.01"
              value={rendementMin}
              onChange={(e) => setRendementMin(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          {/* par rendement max */}
          <div>
            <label
              htmlFor="rendementMax"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Rendement max (%):
            </label>
            <input
              type="number"
              id="rendementMax"
              placeholder="10" // Valeur suggérée
              step="0.01"
              value={rendementMax}
              onChange={(e) => setRendementMax(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        </div>
        {/* le bouton reinitiliser */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={resFiltres}
            style={{
              padding: "8px 16px",
              backgroundColor: "#6c757d", // Gris foncé
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer", // Change le curseur en main au survol
            }}
          >
            Reinitialiser les filtres
          </button>
        </div>
      </div>
      {/* Affichage des scpis */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ margin: "0" }}>Résultats</h3>
          <p style={{ margin: "0" }}>{filtredScpis.length} SCPI trouver</p>
        </div>
        {loading ? (
          <p>Chargement des SCPI...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : filtredScpis.length === 0 ? (
          <p>Aucune SCPI trouvée avec ces critères.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {/* parcours des scpis filtrées */}
            {filtredScpis.map((scpi) => (
              <div
                key={scpi._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  backgroundColor: "white",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              >
                <h4 style={{ margin: "0 0 10px 0" }}>{scpi.name}</h4>
                <p style={{ margin: "5px 0" }}>
                  <strong>Société:</strong> {getSocieteNameById(scpi.societeId)}
                </p>
                <p
                  style={{
                    margin: "5px 0",
                    fontWeight: "bold",
                    // Si le rendement est ≥ 5%, le texte est vert, sinon couleur normale
                    color: scpi.rendement >= 5 ? "#28a745" : "inherit",
                  }}
                >
                  <strong>Rendement:</strong> {scpi.rendement}%
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
