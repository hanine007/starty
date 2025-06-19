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
    //  fct de filtrage des scpis
    const getFilteredScpis = ()=>{
        return scpis.filter(scpi=>{
            // includes sert à vérifier si une chaîne de caractères est présente dans une autre
            // par nom
            const matchesSearch= scpi.name.toLowerCase().includes(searchTerm.toLowerCase());
        // par societe 
        const matchesSociete =  ! selectedSociete  || scpi.SocieteId===selectedSociete;
       
          // par rendement min 
        const matchesRendementMin=!rendementMin || scpi.rendement >= rendementMin;    
            // par rendement max
        const matchesRendementMax= !rendementMax || scpi.rendement  <= rendementMax ;
        return matchesSearch && matchesSociete && matchesRendementMin && matchesRendementMax;   

    
    
        });

    };
    // nom de la societe par id
    const getSocieteNameById= (id)=>{
        const societe= societes.find(s=>s._id===id);
        return societe ? societe.name : "Inconnu";
    };
    // remettre a 0 les filtres
    const resFiltres = ()=> {
        searchTerm('');
        setRendementMax('');
        setRendementMin('');
        setSelectedSociete('');
        
    }
    

    return (
        <div>
            <h2>Listes des SCPI et les filter </h2>
            
        </div>
    );

}
export default Home;