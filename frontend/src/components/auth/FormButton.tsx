import React from 'react';
import styles from './styles/buttons.module.css';

type Variant = 'primary' | 'secondary' | 'outline';

interface FormButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: Variant;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  /** Accessible label (e.g. used when children is only an icon) */
  ariaLabel?: string;
}

/**
 * Reusable button with loading state, multiple variants and
 * WCAG AA compliance (aria-busy, aria-disabled, focus-visible).
 */
const FormButton: React.FC<FormButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  isLoading = false,
  disabled = false,
  onClick,
  ariaLabel,
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={isLoading}
      aria-disabled={isDisabled}
      aria-label={ariaLabel}
      className={[styles.button, styles[variant]].join(' ')}
    >
      {isLoading && (
        <span className={styles.spinner} aria-hidden="true" />
      )}
      {children}
    </button>
  );
};

export default FormButton;
