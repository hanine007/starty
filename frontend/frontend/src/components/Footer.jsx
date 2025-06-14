import { Link } from 'react-router-dom';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#2c3e50',
    color: '#f0f0f0',
    padding: '2rem 0',
    marginTop: '2rem'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem'
  };

  const sectionStyle = {
    marginBottom: '1rem'
  };

  const headingStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: 'white'
  };

  const linkStyle = {
    color: '#f0f0f0',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '0.5rem'
  };

  const copyrightStyle = {
    borderTop: '1px solid #4a6282',
    marginTop: '1.5rem',
    paddingTop: '1.5rem',
    textAlign: 'center'
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Portail SCPI</h3>
          <p>Votre plateforme de gestion de Sociétés Civiles de Placement Immobilier.</p>
        </div>
        
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Liens rapides</h3>
          <Link to="/" style={linkStyle}>Accueil</Link>
          <Link to="/admin/login" style={linkStyle}>Administration</Link>
          <Link to="/register" style={linkStyle}>Inscription</Link>
        </div>
        
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Contact</h3>
          <p style={linkStyle}>Email: contact@portail-scpi.fr</p>
          <p style={linkStyle}>Téléphone: +33 </p>
        </div>
      </div>
      
      <div style={copyrightStyle}>
        <small>&copy; {new Date().getFullYear()} - Portail SCPI. Tous droits réservés.</small>
      </div>
    </footer>
  );
};

export default Footer;