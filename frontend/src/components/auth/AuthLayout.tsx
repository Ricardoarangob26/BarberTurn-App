import React from 'react';
import { ArrowLeft } from 'lucide-react';
import styles from './styles/auth.module.css';
import './styles/responsive.css';

interface AuthLayoutProps {
  children: React.ReactNode;
  /** Called when the back button is clicked. Omit to hide the button. */
  onBack?: () => void;
  /** Accessible label for the back button */
  backLabel?: string;
}

/**
 * Full-page layout for authentication screens.
 * Provides the dark background with decorative radial-gradient orbs
 * and an optional "back" button in the top-left corner.
 */
const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  onBack,
  backLabel = 'Volver',
}) => {
  return (
    <div className={styles.layout}>
      {onBack && (
        <button
          type="button"
          className={styles.backButton}
          onClick={onBack}
          aria-label={backLabel}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>{backLabel}</span>
        </button>
      )}

      {children}
    </div>
  );
};

export default AuthLayout;
