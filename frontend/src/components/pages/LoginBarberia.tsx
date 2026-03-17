import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, Scissors, Building2, ArrowLeft } from 'lucide-react';

export default function LoginBarberia() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simular login - aqui iria la llamada al API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirigir al dashboard de barberia
      navigate('/dashboard-barberia-admin');
    } catch (err: any) {
      console.error('Error durante el inicio de sesion:', err);
      setError('Email o contrasena incorrectos.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Background decorativo */}
      <div style={styles.backgroundOverlay} />
      
      <div style={styles.content}>
        {/* Boton volver */}
        <button onClick={() => navigate('/para-barberias')} style={styles.backButton}>
          <ArrowLeft size={20} />
          Volver
        </button>

        <div style={styles.loginCard}>
          {/* Header del card */}
          <div style={styles.cardHeader}>
            <div style={styles.logoContainer}>
              <Scissors size={32} color="#f59e0b" />
            </div>
            <h1 style={styles.title}>BarberTurn</h1>
            <div style={styles.businessBadge}>
              <Building2 size={16} />
              <span>Business</span>
            </div>
          </div>

          <h2 style={styles.subtitle}>Iniciar Sesion</h2>
          <p style={styles.description}>Accede al panel de administracion de tu barberia</p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email de la barberia</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="barberia@ejemplo.com"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Contrasena</label>
              <div style={styles.passwordContainer}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contrasena"
                  style={styles.input}
                  required
                />
                <button
                  type="button"
                  style={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div style={styles.optionsRow}>
              <label style={styles.rememberMe}>
                <input type="checkbox" style={styles.checkbox} />
                <span>Recordarme</span>
              </label>
              <Link to="/recuperar-contrasena-barberia" style={styles.forgotPassword}>
                Olvidaste tu contrasena?
              </Link>
            </div>

            {error && (
              <div style={styles.errorNotification}>
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" style={styles.submitButton} disabled={isLoading}>
              {isLoading ? (
                <span style={styles.loadingText}>Iniciando sesion...</span>
              ) : (
                'Ingresar a mi Barberia'
              )}
            </button>
          </form>

          <div style={styles.divider}>
            <span style={styles.dividerText}>o</span>
          </div>

          <p style={styles.registerText}>
            No tienes una cuenta de barberia?
          </p>
          <Link to="/registro-barberia" style={styles.registerButton}>
            Registrar mi Barberia
          </Link>

          <p style={styles.footer}>
            2024 BarberTurn for Business. Todos los derechos reservados.
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
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundOverlay: {
    position: 'absolute',
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
    maxWidth: '450px',
    padding: '2rem',
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
    transition: 'all 0.2s',
  },
  loginCard: {
    backgroundColor: 'rgba(17, 17, 17, 0.9)',
    border: '1px solid rgba(245, 158, 11, 0.2)',
    borderRadius: '20px',
    padding: '2.5rem',
    backdropFilter: 'blur(20px)',
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  logoContainer: {
    width: '70px',
    height: '70px',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'white',
    margin: 0,
  },
  businessBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    color: '#f59e0b',
    padding: '0.35rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    marginTop: '0.5rem',
  },
  subtitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    margin: '0 0 0.5rem 0',
  },
  description: {
    fontSize: '0.95rem',
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  input: {
    width: '100%',
    padding: '0.9rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
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
    padding: '0.25rem',
  },
  optionsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberMe: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    accentColor: '#f59e0b',
  },
  forgotPassword: {
    color: '#f59e0b',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
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
  },
  submitButton: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#f59e0b',
    color: '#111',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginTop: '0.5rem',
  },
  loadingText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '1.5rem 0',
  },
  dividerText: {
    flex: 1,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '0.9rem',
    position: 'relative',
  },
  registerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontSize: '0.95rem',
    marginBottom: '1rem',
  },
  registerButton: {
    display: 'block',
    width: '100%',
    padding: '0.9rem',
    backgroundColor: 'transparent',
    color: '#f59e0b',
    border: '2px solid #f59e0b',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: 'bold',
    textAlign: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
  },
  footer: {
    marginTop: '2rem',
    fontSize: '0.8rem',
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
  },
};
