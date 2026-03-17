import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight,
  Scissors, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Lock,
  Eye,
  EyeOff,
  MapPin,
  FileText,
  Check,
  AlertCircle,
  Crown,
  Star,
  Zap
} from 'lucide-react';

interface FormData {
  // Datos del propietario
  nombrePropietario: string;
  apellidoPropietario: string;
  emailPropietario: string;
  telefonoPropietario: string;
  password: string;
  confirmPassword: string;
  // Datos de la barberia
  nombreBarberia: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  telefonoBarberia: string;
  emailBarberia: string;
  descripcion: string;
  // Plan
  planSeleccionado: string;
}

const planes = [
  {
    id: 'basico',
    nombre: 'Basico',
    precio: '29.99',
    color: '#64748b',
    icon: <Star size={24} />,
    features: [
      '1 Barberia',
      'Hasta 3 barberos',
      'Gestion de citas basica',
      '1 Banner promocional',
      'Soporte por email'
    ]
  },
  {
    id: 'profesional',
    nombre: 'Profesional',
    precio: '59.99',
    color: '#f59e0b',
    popular: true,
    icon: <Crown size={24} />,
    features: [
      '1 Barberia',
      'Hasta 10 barberos',
      'Gestion de citas avanzada',
      '5 Banners promocionales',
      'Videos y galeria ilimitada',
      'Estadisticas basicas',
      'Soporte prioritario'
    ]
  },
  {
    id: 'enterprise',
    nombre: 'Enterprise',
    precio: '99.99',
    color: '#ef4444',
    icon: <Zap size={24} />,
    features: [
      'Multiples barberias',
      'Barberos ilimitados',
      'Todas las funcionalidades',
      'Banners ilimitados',
      'Estadisticas avanzadas',
      'API personalizada',
      'Gerente de cuenta dedicado'
    ]
  }
];

export default function RegistroBarberia() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    nombrePropietario: '',
    apellidoPropietario: '',
    emailPropietario: '',
    telefonoPropietario: '',
    password: '',
    confirmPassword: '',
    nombreBarberia: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    telefonoBarberia: '',
    emailBarberia: '',
    descripcion: '',
    planSeleccionado: 'profesional',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handlePlanSelect = (planId: string) => {
    setFormData(prev => ({ ...prev, planSeleccionado: planId }));
  };

  const validateStep1 = () => {
    if (!formData.nombrePropietario || !formData.apellidoPropietario || 
        !formData.emailPropietario || !formData.telefonoPropietario ||
        !formData.password || !formData.confirmPassword) {
      setError('Todos los campos son obligatorios');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contrasenas no coinciden');
      return false;
    }
    if (formData.password.length < 8) {
      setError('La contrasena debe tener al menos 8 caracteres');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.nombreBarberia || !formData.direccion || 
        !formData.ciudad || !formData.telefonoBarberia) {
      setError('Todos los campos obligatorios deben ser completados');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep(prev => prev + 1);
    setError('');
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
    setError('');
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Simular registro
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Guardar datos temporalmente
      localStorage.setItem('barberiaRegistro', JSON.stringify(formData));
      
      // Redirigir al dashboard
      navigate('/dashboard-barberia-admin');
    } catch (err) {
      setError('Error al registrar la barberia. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div style={styles.stepIndicator}>
      {[1, 2, 3].map((s) => (
        <div key={s} style={styles.stepWrapper}>
          <div style={{
            ...styles.stepCircle,
            backgroundColor: step >= s ? '#f59e0b' : 'rgba(255, 255, 255, 0.1)',
            color: step >= s ? '#111' : 'rgba(255, 255, 255, 0.5)',
          }}>
            {step > s ? <Check size={16} /> : s}
          </div>
          <span style={{
            ...styles.stepLabel,
            color: step >= s ? '#f59e0b' : 'rgba(255, 255, 255, 0.5)',
          }}>
            {s === 1 ? 'Propietario' : s === 2 ? 'Barberia' : 'Plan'}
          </span>
          {s < 3 && <div style={{
            ...styles.stepLine,
            backgroundColor: step > s ? '#f59e0b' : 'rgba(255, 255, 255, 0.1)',
          }} />}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div style={styles.stepContent}>
      <h3 style={styles.stepTitle}>Datos del Propietario</h3>
      <p style={styles.stepDescription}>Informacion de la persona responsable de la barberia</p>

      <div style={styles.formGrid}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            <User size={16} />
            Nombre
          </label>
          <input
            type="text"
            name="nombrePropietario"
            value={formData.nombrePropietario}
            onChange={handleInputChange}
            placeholder="Tu nombre"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>
            <User size={16} />
            Apellido
          </label>
          <input
            type="text"
            name="apellidoPropietario"
            value={formData.apellidoPropietario}
            onChange={handleInputChange}
            placeholder="Tu apellido"
            style={styles.input}
            required
          />
        </div>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>
          <Mail size={16} />
          Email
        </label>
        <input
          type="email"
          name="emailPropietario"
          value={formData.emailPropietario}
          onChange={handleInputChange}
          placeholder="tu@email.com"
          style={styles.input}
          required
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>
          <Phone size={16} />
          Telefono
        </label>
        <input
          type="tel"
          name="telefonoPropietario"
          value={formData.telefonoPropietario}
          onChange={handleInputChange}
          placeholder="+1 234 567 8900"
          style={styles.input}
          required
        />
      </div>

      <div style={styles.formGrid}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            <Lock size={16} />
            Contrasena
          </label>
          <div style={styles.passwordContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Min. 8 caracteres"
              style={styles.input}
              required
            />
            <button
              type="button"
              style={styles.eyeButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>
            <Lock size={16} />
            Confirmar
          </label>
          <div style={styles.passwordContainer}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Repetir contrasena"
              style={styles.input}
              required
            />
            <button
              type="button"
              style={styles.eyeButton}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div style={styles.stepContent}>
      <h3 style={styles.stepTitle}>Datos de la Barberia</h3>
      <p style={styles.stepDescription}>Informacion de tu negocio</p>

      <div style={styles.inputGroup}>
        <label style={styles.label}>
          <Scissors size={16} />
          Nombre de la Barberia *
        </label>
        <input
          type="text"
          name="nombreBarberia"
          value={formData.nombreBarberia}
          onChange={handleInputChange}
          placeholder="Ej: BarbaFina Premium"
          style={styles.input}
          required
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>
          <MapPin size={16} />
          Direccion *
        </label>
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleInputChange}
          placeholder="Calle, numero, local"
          style={styles.input}
          required
        />
      </div>

      <div style={styles.formGrid}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            <Building2 size={16} />
            Ciudad *
          </label>
          <input
            type="text"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleInputChange}
            placeholder="Tu ciudad"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>
            <MapPin size={16} />
            Codigo Postal
          </label>
          <input
            type="text"
            name="codigoPostal"
            value={formData.codigoPostal}
            onChange={handleInputChange}
            placeholder="00000"
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            <Phone size={16} />
            Telefono de la Barberia *
          </label>
          <input
            type="tel"
            name="telefonoBarberia"
            value={formData.telefonoBarberia}
            onChange={handleInputChange}
            placeholder="+1 234 567 8900"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>
            <Mail size={16} />
            Email de Contacto
          </label>
          <input
            type="email"
            name="emailBarberia"
            value={formData.emailBarberia}
            onChange={handleInputChange}
            placeholder="contacto@barberia.com"
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>
          <FileText size={16} />
          Descripcion (opcional)
        </label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleInputChange}
          placeholder="Describe tu barberia, servicios especiales, ambiente..."
          style={{...styles.input, ...styles.textarea}}
          rows={3}
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div style={styles.stepContent}>
      <h3 style={styles.stepTitle}>Selecciona tu Plan</h3>
      <p style={styles.stepDescription}>Elige el plan que mejor se adapte a tu negocio</p>

      <div style={styles.plansGrid}>
        {planes.map((plan) => (
          <div
            key={plan.id}
            onClick={() => handlePlanSelect(plan.id)}
            style={{
              ...styles.planCard,
              borderColor: formData.planSeleccionado === plan.id ? plan.color : 'rgba(255, 255, 255, 0.1)',
              backgroundColor: formData.planSeleccionado === plan.id ? `${plan.color}10` : 'rgba(255, 255, 255, 0.02)',
            }}
          >
            {plan.popular && (
              <div style={styles.popularBadge}>Mas Popular</div>
            )}
            
            <div style={{...styles.planIcon, backgroundColor: `${plan.color}20`, color: plan.color}}>
              {plan.icon}
            </div>
            
            <h4 style={{...styles.planName, color: plan.color}}>{plan.nombre}</h4>
            
            <div style={styles.planPrice}>
              <span style={styles.currency}>$</span>
              <span style={styles.priceAmount}>{plan.precio}</span>
              <span style={styles.priceFrequency}>/mes</span>
            </div>

            <ul style={styles.planFeatures}>
              {plan.features.map((feature, idx) => (
                <li key={idx} style={styles.planFeatureItem}>
                  <Check size={14} color={plan.color} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {formData.planSeleccionado === plan.id && (
              <div style={{...styles.selectedIndicator, backgroundColor: plan.color}}>
                <Check size={16} />
                Seleccionado
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={styles.trialNote}>
        <Star size={18} color="#f59e0b" />
        <span>Todos los planes incluyen 14 dias de prueba gratis. Sin tarjeta de credito.</span>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.backgroundOverlay} />
      
      <div style={styles.content}>
        <button onClick={() => navigate('/para-barberias')} style={styles.backButton}>
          <ArrowLeft size={20} />
          Volver
        </button>

        <div style={styles.registroCard}>
          {/* Header */}
          <div style={styles.cardHeader}>
            <div style={styles.logoContainer}>
              <Scissors size={28} color="#f59e0b" />
            </div>
            <h1 style={styles.title}>Registrar Barberia</h1>
            <div style={styles.businessBadge}>
              <Building2 size={14} />
              <span>Business</span>
            </div>
          </div>

          {renderStepIndicator()}

          {error && (
            <div style={styles.errorNotification}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          {/* Botones de navegacion */}
          <div style={styles.navigationButtons}>
            {step > 1 && (
              <button onClick={handlePrevStep} style={styles.prevButton}>
                <ArrowLeft size={18} />
                Anterior
              </button>
            )}
            
            {step < 3 ? (
              <button onClick={handleNextStep} style={styles.nextButton}>
                Siguiente
                <ArrowRight size={18} />
              </button>
            ) : (
              <button 
                onClick={handleSubmit} 
                style={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? 'Registrando...' : 'Crear mi Barberia'}
                {!isLoading && <Check size={18} />}
              </button>
            )}
          </div>

          <p style={styles.loginLink}>
            Ya tienes una cuenta?{' '}
            <Link to="/login-barberia" style={styles.link}>
              Iniciar sesion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#0a0a0a',
    position: 'relative',
    overflow: 'auto',
    padding: '2rem 1rem',
  },
  backgroundOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 30% 20%, rgba(245, 158, 11, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '600px',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    marginBottom: '1.5rem',
  },
  registroCard: {
    backgroundColor: 'rgba(17, 17, 17, 0.9)',
    border: '1px solid rgba(245, 158, 11, 0.2)',
    borderRadius: '20px',
    padding: '2rem',
    backdropFilter: 'blur(20px)',
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  logoContainer: {
    width: '60px',
    height: '60px',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.75rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    margin: 0,
  },
  businessBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    color: '#f59e0b',
    padding: '0.25rem 0.6rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    marginTop: '0.5rem',
  },
  stepIndicator: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem',
    gap: '0.5rem',
  },
  stepWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  stepCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    transition: 'all 0.3s',
  },
  stepLabel: {
    fontSize: '0.8rem',
    fontWeight: '500',
    display: 'none',
  },
  stepLine: {
    width: '40px',
    height: '2px',
    transition: 'all 0.3s',
  },
  stepContent: {
    marginBottom: '1.5rem',
  },
  stepTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '0.25rem',
  },
  stepDescription: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '1.5rem',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    marginBottom: '1rem',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  input: {
    width: '100%',
    padding: '0.8rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    color: 'white',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box',
  },
  textarea: {
    resize: 'vertical',
    minHeight: '80px',
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeButton: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
  },
  plansGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  planCard: {
    border: '2px solid',
    borderRadius: '16px',
    padding: '1.25rem',
    cursor: 'pointer',
    transition: 'all 0.3s',
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: '-10px',
    right: '1rem',
    backgroundColor: '#f59e0b',
    color: '#111',
    padding: '0.2rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.7rem',
    fontWeight: 'bold',
  },
  planIcon: {
    width: '45px',
    height: '45px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.75rem',
  },
  planName: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    margin: '0 0 0.5rem 0',
  },
  planPrice: {
    display: 'flex',
    alignItems: 'baseline',
    marginBottom: '0.75rem',
  },
  currency: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  priceAmount: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  priceFrequency: {
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.5)',
    marginLeft: '0.25rem',
  },
  planFeatures: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  planFeatureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.8rem',
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '0.25rem 0.6rem',
    borderRadius: '20px',
  },
  selectedIndicator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.4rem',
    padding: '0.5rem',
    borderRadius: '8px',
    color: '#111',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    marginTop: '1rem',
  },
  trialNote: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '1.5rem',
    padding: '0.75rem',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: '10px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.85rem',
  },
  errorNotification: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  navigationButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  prevButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.8rem 1.5rem',
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '500',
  },
  nextButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.8rem 1.5rem',
    backgroundColor: '#f59e0b',
    color: '#111',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.8rem 2rem',
    backgroundColor: '#22c55e',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  loginLink: {
    textAlign: 'center',
    marginTop: '1.5rem',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.9rem',
  },
  link: {
    color: '#f59e0b',
    textDecoration: 'none',
    fontWeight: '600',
  },
};
