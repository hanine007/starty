const Footer = () => {
  return (
    <footer style={{
      padding: '1rem',
      backgroundColor: '#f0f0f0',
      textAlign: 'center',
      marginTop: '2rem'
    }}>
      <small>&copy; {new Date().getFullYear()} - Portail SCPI</small>
    </footer>
  );
};

export default Footer;
