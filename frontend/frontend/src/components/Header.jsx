import {Link } from 'react-router-dom';
const Header = () => {
    return (
        <header style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
            <nav>
                <Link to ="/" >Accueil</Link>
                <Link to ="/admin/login">Connexion Admin</Link>
                <Link to ="/admin/panel">Panneau Admin</Link>

            </nav>
        </header>
    )
}

export default Header;
