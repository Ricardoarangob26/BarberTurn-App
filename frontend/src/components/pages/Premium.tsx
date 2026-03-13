import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star, Shield, Zap, Info } from 'lucide-react';

const Premium: React.FC = () => {
  const navigate = useNavigate();

  const membershipPlans = [
    {
      id: 1,
      name: "Silver",
      price: "9.99",
      color: "#94a3b8", // Gris Plata
      features: [
        "Reserva estándar con 5% de descuento",
        "Elección básica de barbero",
        "Bebida de cortesía (Agua/Café)",
        "Penalización reducida por cancelación"
      ]
    },
    {
      id: 2,
      name: "Gold",
      price: "19.99",
      color: "#fbbf24", // Amarillo Oro
      features: [
        "Prioridad de reserva (24h de antelación)",
        "Selección de barbero garantizada",
        "Cerveza o bebida premium de cortesía",
        "10% de descuento en productos capilares",
        "Lavado de cabello incluido"
      ]
    },
    {
      id: 3,
      name: "Black VIP",
      price: "29.99",
      color: "#f87171", // Rojo Suave para VIP / o mantener Dark
      features: [
        "Reserva inmediata sin tiempos de espera",
        "Elección de barbero Master garantizada",
        "Bar abierto premium ilimitado",
        "Toalla caliente y masaje facial relajante",
        "20% de descuento en productos capilares",
        "Sin penalización por cancelación tardía"
      ]
    }
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title} onClick={() => navigate('/')} className="clickable-logo">
          BarberTurn <span style={styles.premiumBadge}><Star size={20} fill="#f59e0b" color="#f59e0b" /> PREMIUM</span>
        </h1>
      </header>

      <main style={styles.main}>
        <div style={styles.contentWrapper}>
          <div style={styles.heroSection}>
            <h2 style={styles.heroTitle}>Eleva tu Estilo al Siguiente Nivel</h2>
            <p style={styles.heroSubtitle}>
              La membresía exclusiva para los caballeros que exigen la máxima excelencia y comodidad.
            </p>
          </div>

          <div style={styles.cardContainer}>
            {membershipPlans.map((plan) => (
              <div key={plan.id} style={{
                ...styles.glassCard,
                borderColor: `rgba(${hexToRgb(plan.color)}, 0.3)`,
                boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(${hexToRgb(plan.color)}, 0.1)`
              }}>
                <div style={{ ...styles.cardHeader, borderBottom: `1px solid rgba(${hexToRgb(plan.color)}, 0.2)` }}>
                  <h3 style={{ ...styles.cardTitle, color: plan.color }}>{plan.name}</h3>
                  <div style={{ ...styles.priceContainer, color: plan.color }}>
                    <span style={styles.currency}>$</span>
                    <span style={styles.price}>{plan.price}</span>
                    <span style={styles.period}>/mes</span>
                  </div>
                </div>

                <ul style={styles.featureList}>
                  {plan.features.map((feature, index) => (
                    <li key={index} style={styles.featureItem}>
                      <Check size={20} color={plan.color} style={{ minWidth: '20px' }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  style={{ ...styles.subscribeBtn, backgroundColor: plan.color, color: plan.name === 'Silver' ? '#000' : '#111827' }}
                  onClick={() => alert(`Funcionalidad de compra para plan ${plan.name} en construcción.`)}
                >
                  ADQUIRIR AHORA
                </button>
              </div>
            ))}

            <div style={styles.infoCards}>
              <div style={styles.infoCard}>
                <Shield size={32} color="#f59e0b" />
                <h4>Garantía de Satisfacción</h4>
                <p>Corte perfeccionado hasta que estés 100% satisfecho o te devolvemos tu dinero.</p>
              </div>
              <div style={styles.infoCard}>
                <Zap size={32} color="#f59e0b" />
                <h4>Atención Inmediata</h4>
                <p>Sáltate la fila en todos nuestros locales y accede a reservas express de último minuto.</p>
              </div>
              <div style={styles.infoCard}>
                <Info size={32} color="#f59e0b" />
                <h4>Soporte VIP</h4>
                <p>Línea directa de WhatsApp 24/7 con nuestro equipo de gerencia.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Utility to easily inject specific colors to RGBA backgrounds/borders
const hexToRgb = (hex: string) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ?
    `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '245, 158, 11'; // Default Gold fallback
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url('/assets/imgs/background-gallery.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    color: 'white',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  header: {
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
  },
  premiumBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    border: '1px solid #f59e0b',
    color: '#f59e0b',
    fontSize: '1rem',
    padding: '5px 15px',
    borderRadius: '20px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
  },
  main: {
    flex: 1,
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    maxWidth: '1200px', // Ampliado para caber 3 tarjetas holgadamente
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  heroSection: {
    textAlign: 'center' as const,
    marginBottom: '20px',
  },
  heroTitle: {
    fontSize: '3rem',
    color: '#f59e0b',
    marginBottom: '10px',
    textShadow: '0 2px 10px rgba(245, 158, 11, 0.3)',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    color: '#d1d5db',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '40px',
    alignItems: 'start',
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    transition: 'transform 0.3s ease',
    cursor: 'default'
  },
  cardHeader: {
    textAlign: 'center' as const,
    borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
    paddingBottom: '20px',
  },
  cardTitle: {
    fontSize: '1.5rem',
    color: 'white',
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    marginBottom: '15px',
  },
  priceContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    color: '#f59e0b',
  },
  currency: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    position: 'relative' as const,
    top: '-15px',
    marginRight: '5px',
  },
  price: {
    fontSize: '4rem',
    fontWeight: 'bold',
    lineHeight: 1,
  },
  period: {
    fontSize: '1rem',
    color: '#9ca3af',
    marginLeft: '5px',
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    fontSize: '1.1rem',
    color: '#e5e7eb',
  },
  subscribeBtn: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#f59e0b',
    color: '#111827',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: 'auto', // Esto empujará el botón al fondo de la tarjeta si la lista de features difiere
  },
  infoCards: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  infoCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    padding: '25px',
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
    textAlign: 'center',
  },
};

export default Premium;
