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
    
    
    return (
        <div>
            <h2>Listes des SCPI et les filter </h2>
            
        </div>
    );

}
export default Home;