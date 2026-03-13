import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Scissors, 
  Users, 
  Calendar, 
  Image, 
  Video, 
  BarChart3, 
  Shield, 
  Clock, 
  Star, 
  ChevronRight,
  Check,
  ArrowLeft
} from 'lucide-react';

const ParaBarberias: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Scissors size={32} />,
      title: "Crea tu Barberia",
      description: "Registra tu negocio en minutos. Personaliza tu perfil con logo, descripcion, horarios y ubicacion para que tus clientes te encuentren facilmente."
    },
    {
      icon: <Users size={32} />,
      title: "Gestiona tus Barberos",
      description: "Agrega a tu equipo de barberos, asigna horarios individuales, especialidades y permite que cada uno gestione sus propias citas."
    },
    {
      icon: <Calendar size={32} />,
      title: "Gestion de Citas",
      description: "Sistema completo de reservas online. Tus clientes podran agendar citas 24/7 y recibiran recordatorios automaticos."
    },
    {
      icon: <Image size={32} />,
      title: "Banners Promocionales",
      description: "Agrega banners atractivos para promocionar ofertas especiales, nuevos servicios o eventos en tu barberia."
    },
    {
      icon: <Video size={32} />,
      title: "Videos y Galeria",
      description: "Muestra tu trabajo con videos de cortes, transformaciones y una galeria de fotos que inspire a tus clientes."
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Estadisticas y Reportes",
      description: "Accede a metricas detalladas: ingresos, citas completadas, barberos mas solicitados y tendencias de tu negocio."
    }
  ];

  const benefits = [
    "Aumenta tu visibilidad online",
    "Reduce las cancelaciones con recordatorios",
    "Ahorra tiempo en gestion administrativa",
    "Fideliza a tus clientes con la app",
    "Recibe pagos anticipados de reservas",
    "Soporte tecnico personalizado 24/7"
  ];

  const plans = [
    {
      name: "Basico",
      price: "29.99",
      color: "#64748b",
      features: [
        "1 Barberia",
        "Hasta 3 barberos",
        "Gestion de citas basica",
        "1 Banner promocional",
        "Soporte por email"
      ]
    },
    {
      name: "Profesional",
      price: "59.99",
      color: "#f59e0b",
      popular: true,
      features: [
        "1 Barberia",
        "Hasta 10 barberos",
        "Gestion de citas avanzada",
        "5 Banners promocionales",
        "Videos y galeria ilimitada",
        "Estadisticas basicas",
        "Soporte prioritario"
      ]
    },
    {
      name: "Enterprise",
      price: "99.99",
      color: "#ef4444",
      features: [
        "Multiples barberias",
        "Barberos ilimitados",
        "Todas las funcionalidades",
        "Banners ilimitados",
        "Estadisticas avanzadas",
        "API personalizada",
        "Gerente de cuenta dedicado"
      ]
    }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <button onClick={() => navigate('/')} style={styles.backButton}>
          <ArrowLeft size={20} />
          Volver
        </button>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>BarberTurn <span style={styles.forBusiness}>for Business</span></h1>
        </div>
        <button onClick={() => navigate('/Registro')} style={styles.registerButton}>
          Registrar mi Barberia
        </button>
      </header>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h2 style={styles.heroTitle}>
            Lleva tu Barberia al <span style={styles.highlight}>Siguiente Nivel</span>
          </h2>
          <p style={styles.heroSubtitle}>
            La plataforma todo-en-uno para gestionar tu barberia, 
            conectar con mas clientes y hacer crecer tu negocio.
          </p>
          <div style={styles.heroCTA}>
            <button onClick={() => navigate('/Registro')} style={styles.ctaButton}>
              Comenzar Gratis
              <ChevronRight size={20} />
            </button>
            <span style={styles.ctaNote}>14 dias de prueba gratuita</span>
          </div>
        </div>
        <div style={styles.heroVisual}>
          <div style={styles.mockupCard}>
            <div style={styles.mockupHeader}>
              <Scissors size={24} color="#f59e0b" />
              <span>Tu Barberia</span>
            </div>
            <div style={styles.mockupStats}>
              <div style={styles.statItem}>
                <span style={styles.statNumber}>150+</span>
                <span style={styles.statLabel}>Citas este mes</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statNumber}>4.9</span>
                <span style={styles.statLabel}>Calificacion</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <h3 style={styles.sectionTitle}>Todo lo que necesitas para tu negocio</h3>
        <p style={styles.sectionSubtitle}>
          Herramientas poderosas disenadas especificamente para barberias modernas
        </p>
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} style={styles.featureCard}>
              <div style={styles.featureIcon}>{feature.icon}</div>
              <h4 style={styles.featureTitle}>{feature.title}</h4>
              <p style={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section style={styles.benefitsSection}>
        <div style={styles.benefitsContent}>
          <h3 style={styles.sectionTitle}>Por que elegir BarberTurn?</h3>
          <div style={styles.benefitsList}>
            {benefits.map((benefit, index) => (
              <div key={index} style={styles.benefitItem}>
                <div style={styles.benefitCheck}>
                  <Check size={18} color="#f59e0b" />
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.benefitsStats}>
          <div style={styles.bigStat}>
            <span style={styles.bigStatNumber}>500+</span>
            <span style={styles.bigStatLabel}>Barberias activas</span>
          </div>
          <div style={styles.bigStat}>
            <span style={styles.bigStatNumber}>50K+</span>
            <span style={styles.bigStatLabel}>Citas gestionadas</span>
          </div>
          <div style={styles.bigStat}>
            <span style={styles.bigStatNumber}>98%</span>
            <span style={styles.bigStatLabel}>Satisfaccion</span>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={styles.pricingSection}>
        <h3 style={styles.sectionTitle}>Planes y Precios</h3>
        <p style={styles.sectionSubtitle}>Elige el plan que mejor se adapte a tu negocio</p>
        <div style={styles.pricingGrid}>
          {plans.map((plan, index) => (
            <div 
              key={index} 
              style={{
                ...styles.pricingCard,
                ...(plan.popular ? styles.popularCard : {}),
                borderColor: plan.color
              }}
            >
              {plan.popular && <div style={styles.popularBadge}>Mas Popular</div>}
              <h4 style={{...styles.planName, color: plan.color}}>{plan.name}</h4>
              <div style={styles.planPrice}>
                <span style={styles.currency}>$</span>
                <span style={styles.priceAmount}>{plan.price}</span>
                <span style={styles.priceFrequency}>/mes</span>
              </div>
              <ul style={styles.planFeatures}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} style={styles.planFeatureItem}>
                    <Check size={16} color={plan.color} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                style={{
                  ...styles.planButton,
                  backgroundColor: plan.popular ? plan.color : 'transparent',
                  color: plan.popular ? '#111' : plan.color,
                  border: `2px solid ${plan.color}`
                }}
                onClick={() => alert(`Seleccionaste el plan ${plan.name}`)}
              >
                Elegir Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <Shield size={48} color="#f59e0b" />
          <h3 style={styles.ctaTitle}>Comienza hoy mismo</h3>
          <p style={styles.ctaDescription}>
            Unete a cientos de barberias que ya confian en BarberTurn 
            para gestionar su negocio de manera eficiente.
          </p>
          <button onClick={() => navigate('/Registro')} style={styles.ctaButtonLarge}>
            Registrar mi Barberia Gratis
            <ChevronRight size={24} />
          </button>
          <div style={styles.ctaFeatures}>
            <span><Clock size={16} /> Configuracion en 5 minutos</span>
            <span><Star size={16} /> Sin tarjeta de credito</span>
            <span><Shield size={16} /> Cancelacion sin costo</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>2024 BarberTurn for Business. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    color: 'white',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
    borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
  },
  forBusiness: {
    color: '#f59e0b',
    fontSize: '0.9rem',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  registerButton: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#f59e0b',
    color: '#111',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  heroSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '3rem',
    flexWrap: 'wrap' as const,
  },
  heroContent: {
    flex: 1,
    minWidth: '300px',
  },
  heroTitle: {
    fontSize: '3rem',
    lineHeight: 1.2,
    marginBottom: '1.5rem',
  },
  highlight: {
    color: '#f59e0b',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '2rem',
    lineHeight: 1.6,
  },
  heroCTA: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
  },
  ctaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 2rem',
    backgroundColor: '#f59e0b',
    color: '#111',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: 'fit-content',
  },
  ctaNote: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  heroVisual: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    minWidth: '300px',
  },
  mockupCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    borderRadius: '16px',
    padding: '2rem',
    width: '100%',
    maxWidth: '350px',
  },
  mockupHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1.5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  mockupStats: {
    display: 'flex',
    gap: '2rem',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  statLabel: {
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  featuresSection: {
    padding: '4rem 2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  sectionTitle: {
    fontSize: '2rem',
    textAlign: 'center' as const,
    marginBottom: '0.75rem',
  },
  sectionSubtitle: {
    fontSize: '1rem',
    textAlign: 'center' as const,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '3rem',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '2rem',
    transition: 'all 0.3s ease',
  },
  featureIcon: {
    width: '60px',
    height: '60px',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#f59e0b',
    marginBottom: '1.25rem',
  },
  featureTitle: {
    fontSize: '1.25rem',
    marginBottom: '0.75rem',
    color: 'white',
  },
  featureDescription: {
    fontSize: '0.95rem',
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 1.6,
  },
  benefitsSection: {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    gap: '3rem',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
  },
  benefitsContent: {
    flex: 1,
    minWidth: '300px',
  },
  benefitsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    marginTop: '2rem',
  },
  benefitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    fontSize: '1.05rem',
  },
  benefitCheck: {
    width: '28px',
    height: '28px',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitsStats: {
    flex: 1,
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2rem',
  },
  bigStat: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(245, 158, 11, 0.2)',
    borderRadius: '12px',
  },
  bigStatNumber: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  bigStatLabel: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  pricingSection: {
    padding: '4rem 2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  pricingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  pricingCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '2px solid',
    borderRadius: '20px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column' as const,
    position: 'relative' as const,
  },
  popularCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.05)',
    transform: 'scale(1.02)',
  },
  popularBadge: {
    position: 'absolute' as const,
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#f59e0b',
    color: '#111',
    padding: '0.35rem 1rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
  planName: {
    fontSize: '1.5rem',
    textAlign: 'center' as const,
    marginBottom: '1rem',
  },
  planPrice: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: '1.5rem',
  },
  currency: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  priceAmount: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  priceFrequency: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.5)',
    marginLeft: '0.25rem',
  },
  planFeatures: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  planFeatureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '0.95rem',
  },
  planButton: {
    padding: '0.9rem',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
  },
  ctaSection: {
    padding: '5rem 2rem',
    textAlign: 'center' as const,
  },
  ctaContent: {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '1rem',
  },
  ctaTitle: {
    fontSize: '2rem',
  },
  ctaDescription: {
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 1.6,
    marginBottom: '1rem',
  },
  ctaButtonLarge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1.25rem 2.5rem',
    backgroundColor: '#f59e0b',
    color: '#111',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  ctaFeatures: {
    display: 'flex',
    gap: '2rem',
    marginTop: '1.5rem',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.9rem',
  },
  footer: {
    padding: '2rem',
    textAlign: 'center' as const,
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '0.9rem',
  },
};

export default ParaBarberias;
