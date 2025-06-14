import { Link } from 'react-router-dom';

const Header = () => {
    const headerStyle = {
        padding: '1rem 2rem',
        backgroundColor: '#2c3e50',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        color: 'white'
    };

    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
    };

    const logoStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'white',
        textDecoration: 'none'
    };

    const linksContainerStyle = {
        display: 'flex',
        gap: '1rem'
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        transition: 'background-color 0.3s'
    };

    // Pour simuler un effet hover (à utiliser avec onMouseEnter/onMouseLeave)
    const handleMouseEnter = (e) => {
        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    };

    const handleMouseLeave = (e) => {
        e.target.style.backgroundColor = 'transparent';
    };

    return (
        <header style={headerStyle}>
            <nav style={navStyle}>
                <Link to="/" style={logoStyle}>Portail SCPI</Link>
                
                <div style={linksContainerStyle}>
                    <Link 
                        to="/" 
                        style={linkStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        Accueil
                    </Link>
                    <Link 
                        to="/admin/login" 
                        style={linkStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        Connexion Admin
                    </Link>
                    <Link 
                        to="/admin/panel" 
                        style={linkStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        Panneau Admin
                    </Link>
                    <Link 
                        to="/register" 
                        style={linkStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        S'inscrire
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;