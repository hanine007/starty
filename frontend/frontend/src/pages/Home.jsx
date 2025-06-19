import { useState,useEffect } from  "react";
import api from "../services/api";



const Home =()=>{
    const [scpis, setScpis] = useState([]);
    const [societes, setSocietes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // etats des filtres
    const [searchTerm,setSearchTerm] = useState("");
    const [selectedSociete, setSelectedSociete] = useState("");
    const [rendementMax, setRendementMax] = useState("");
    const [rendementMin, setRendementMin] = useState("");
    // charger les scpis et les societes au chargement de la page 
    useEffect(()=>{
        const fetchData= async ()=>{
            setLoading(true);
            try{
                const [scpiResponse, societeResponse] = await Promise.all([
                    api.get('/scpis'),
                    api.get('/societes')
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

    return (
        <div>
            <h2>Listes des SCPI et les filter </h2>
            
        </div>
    );

}
export default Home;