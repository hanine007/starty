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
    return scpis.filter((scpi) => {
      // includes sert à vérifier si une chaîne de caractères est présente dans une autre
      // par nom
      const matchesSearch = scpi.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      // par societe
      const matchesSociete =
        !selectedSociete || scpi.SocieteId === selectedSociete;

      // par rendement min
      const matchesRendementMin =
        !rendementMin || scpi.rendement >= rendementMin;
      // par rendement max
      const matchesRendementMax =
        !rendementMax || scpi.rendement <= rendementMax;
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
    const societe = societes.find((s) => s._id === id);
    return societe ? societe.name : "Inconnu";
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
              <option>Toutes les societes</option>
              {/* listes tous les socites*/}
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
    </div>
  );
};
export default Home;
