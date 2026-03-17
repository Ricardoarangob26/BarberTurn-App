import React from 'react';
import styles from './styles/auth.module.css';
import './styles/animations.css';

interface AuthCardProps {
  /** Icon element shown in the header logo box */
  logoIcon: React.ReactNode;
  title: string;
  subtitle?: string;
  /** Optional badge text (e.g. "Para Barberias") */
  badge?: string;
  /** Optional icon shown next to badge text */
  badgeIcon?: React.ReactNode;
  children: React.ReactNode;
  /** Footer links/text. Receives pre-built nodes for flexibility */
  footerContent?: React.ReactNode;
  /** Whether to show the copyright line */
  showCopyright?: boolean;
}

/**
 * Reusable card container for authentication forms.
 * Includes an animated header (logo, title, badge) and an optional footer.
 */
const AuthCard: React.FC<AuthCardProps> = ({
  logoIcon,
  title,
  subtitle,
  badge,
  badgeIcon,
  children,
  footerContent,
  showCopyright = true,
}) => {
  return (
    <main
      className={`${styles.card} auth-card-enter`}
      role="main"
      aria-label={title}
    >
      {/* ---- Header ---- */}
      <header className={styles.cardHeader}>
        <div className={styles.logoIcon} aria-hidden="true">
          {logoIcon}
        </div>

        <h1 className={styles.cardTitle}>{title}</h1>

        {subtitle && (
          <p className={styles.cardSubtitle}>{subtitle}</p>
        )}

        {badge && (
          <span className={styles.badge}>
            {badgeIcon && <span aria-hidden="true">{badgeIcon}</span>}
            {badge}
          </span>
        )}
      </header>

      {/* ---- Form content ---- */}
      {children}

      {/* ---- Footer ---- */}
      {(footerContent || showCopyright) && (
        <footer className={styles.cardFooter}>
          {footerContent}
          {showCopyright && (
            <p style={{ marginTop: footerContent ? '0.75rem' : 0 }}>
              © 2024 BarberTurn. Todos los derechos reservados.
            </p>
          )}
        </footer>
      )}
    </main>
  );
};

export { AuthCard };
export default AuthCard;
