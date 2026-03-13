import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Phone, Scissors, ArrowRight } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>BarberTurn</h1>
        <img src="/assets/imgs/logoBarberTurn.png" alt="BarberTurn Logo" style={styles.logo} />
        <p style={styles.tagline}>
          RESERVA TU CORTE DE CABELLO EN LA COMODIDAD DE TU HOGAR...
        </p>
        
        <div style={styles.buttonGrid}>
          <Link to="/premium" style={{...styles.button,}}>
            PREMIUM
          </Link>
          <Link to="/Galeria-Seleccionable" style={styles.button}>
            GALERIA
          </Link>
          <Link to="/Reserva-Turno" style={styles.button}>
            TURNOS
          </Link>
          <Link to="/iniciar-sesion" style={styles.button}>
            INICIAR
          </Link>
        </div>

        {/* Seccion para barberias */}
        <div style={styles.barberiaSection}>
          <div style={styles.barberiaContent}>
            <Scissors size={28} color="#f59e0b" />
            <div style={styles.barberiaText}>
              <span style={styles.barberiaQuestion}>Eres una barberia?</span>
              <span style={styles.barberiaSubtext}>Lleva tu negocio al siguiente nivel</span>
            </div>
            <Link to="/para-barberias" style={styles.barberiaButton}>
              Ingresa aqui
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
      
      <footer style={styles.footer}>
        <a href="#" style={styles.socialIcon} aria-label="Instagram">
          <Instagram />
        </a>
        <a href="#" style={styles.socialIcon} aria-label="YouTube">
          <Youtube />
        </a>
        <a href="#" style={styles.socialIcon} aria-label="Llamar">
          <Phone />
        </a>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    backgroundImage: 'url("/assets/imgs/background-gallery.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    textAlign: 'center' as const,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  logo: {
    width: '100px',
    height: '100px',
    marginBottom: '1rem',
  },
  tagline: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    maxWidth: '600px',
  },
  buttonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    width: '100%',
    maxWidth: '400px',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: 'white',
    color: 'black',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  premiumButton: {
    gridColumn: '1 / -1',
    backgroundColor: '#FFD700',
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  socialIcon: {
    color: 'white',
    margin: '0 0.5rem',
    transition: 'color 0.3s',
  },
  barberiaSection: {
    marginTop: '2.5rem',
    width: '100%',
    maxWidth: '500px',
    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    borderRadius: '12px',
    padding: '1.25rem',
    backdropFilter: 'blur(10px)',
  },
  barberiaContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    flexWrap: 'wrap' as const,
  },
  barberiaText: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    gap: '0.25rem',
  },
  barberiaQuestion: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  barberiaSubtext: {
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  barberiaButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1.2rem',
    backgroundColor: '#f59e0b',
    color: '#111827',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
  },
};

export default Index;
