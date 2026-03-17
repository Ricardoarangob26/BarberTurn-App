import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Scissors, Building2, AlertCircle } from 'lucide-react';
import AuthLayout from './AuthLayout';
import AuthCard from './AuthCard';
import FormInput from './FormInput';
import FormButton from './FormButton';
import './styles/animations.css';

/**
 * Login screen for barbershop owners (business accounts).
 * Uses the shared AuthLayout / AuthCard / FormInput / FormButton
 * components so the UI stays consistent across all auth flows.
 */
export default function LoginBarberia() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: replace with real API call when the backend endpoint is ready
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));

      // Redirect to the barbershop admin dashboard on success
      navigate('/dashboard-barberia-admin');
    } catch (err: any) {
      console.error('Error durante el inicio de sesión:', err);
      setError('Email o contraseña incorrectos. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const footerContent = (
    <p>
      ¿No tienes cuenta?{' '}
      <Link to="/Registro" className="auth-footer-link" style={footerLinkStyle}>
        Regístrate gratis
      </Link>
    </p>
  );

  return (
    <AuthLayout onBack={() => navigate('/para-barberias')} backLabel="Volver a Para Barberias">
      <AuthCard
        logoIcon={<Scissors size={28} aria-hidden="true" />}
        title="BarberTurn"
        subtitle="Accede al panel de administración de tu barbería"
        badge="Para Barberias"
        badgeIcon={<Building2 size={12} aria-hidden="true" />}
        footerContent={footerContent}
        showCopyright
      >
        <form
          onSubmit={handleSubmit}
          noValidate
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          aria-label="Formulario de inicio de sesión para barberias"
        >
          {/* Global error banner */}
          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="error-shake error-pulse"
              style={errorBannerStyle}
            >
              <AlertCircle size={16} aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <FormInput
            id="email"
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@barberia.com"
            required
            autoComplete="email"
            disabled={isLoading}
            icon={<Building2 size={16} aria-hidden="true" />}
          />

          <FormInput
            id="password"
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="current-password"
            disabled={isLoading}
          />

          {/* Forgot password link */}
          <div style={{ textAlign: 'right', marginTop: '-0.25rem' }}>
            <Link
              to="/recuperar-contrasena"
              style={forgotLinkStyle}
              aria-label="Recuperar contraseña olvidada"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <FormButton
            type="submit"
            variant="primary"
            isLoading={isLoading}
            disabled={!email || !password}
            ariaLabel={isLoading ? 'Iniciando sesión, por favor espera' : 'Iniciar sesión'}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </FormButton>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}

/* ---- Inline styles kept minimal – layout/animation styles live in CSS modules ---- */

const errorBannerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.75rem 1rem',
  backgroundColor: 'rgba(239, 68, 68, 0.1)',
  border: '1px solid rgba(239, 68, 68, 0.3)',
  borderRadius: '8px',
  color: '#f87171',
  fontSize: '0.875rem',
};

const forgotLinkStyle: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.5)',
  textDecoration: 'none',
  fontSize: '0.8rem',
  transition: 'color 0.2s ease',
};

const footerLinkStyle: React.CSSProperties = {
  color: '#f59e0b',
  textDecoration: 'none',
  fontWeight: 600,
};
