import React from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import styles from './styles/inputs.module.css';

interface FormInputProps {
  /** Unique id used for the <label> htmlFor and aria linkage */
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  disabled?: boolean;
  /** Optional leading icon rendered inside the input */
  icon?: React.ReactNode;
}

/**
 * Reusable form input with label, leading icon, error message and
 * password-toggle support. WCAG AA compliant (aria-invalid, aria-describedby).
 */
const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  autoComplete,
  disabled = false,
  icon,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === 'password';
  const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  return (
    <div className={styles.group}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && (
          <span aria-hidden="true" style={{ color: '#ef4444', marginLeft: '2px' }}>
            *
          </span>
        )}
      </label>

      <div className={styles.inputWrapper}>
        {icon && (
          <span className={styles.leadingIcon} aria-hidden="true">
            {icon}
          </span>
        )}

        <input
          id={id}
          type={resolvedType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={[
            styles.input,
            hasError ? styles.hasError : '',
            !icon ? styles.noIcon : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />

        {isPassword && (
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            tabIndex={0}
          >
            {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
          </button>
        )}
      </div>

      {hasError && (
        <span id={errorId} role="alert" className={styles.errorMessage}>
          <AlertCircle size={14} aria-hidden="true" />
          {error}
        </span>
      )}
    </div>
  );
};

export default FormInput;
