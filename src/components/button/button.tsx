import { ButtonHTMLAttributes, FC, ReactNode, memo } from 'react';

import { Spinner } from '../spinner/spinner';

import './button.scss';

interface ButtonProps extends ButtonHTMLAttributes<unknown> {
  children?: ReactNode;
  loading?: boolean;
}

export const Button: FC<ButtonProps> = memo(({ children, disabled, loading, ...buttonProps }) => {
  return (
    <button
      type="button"
      className={['button', disabled ? 'button_disabled' : '', loading ? 'button_loading' : '']
        .filter(Boolean)
        .join(' ')}
      {...buttonProps}
    >
      <div className="button__inner">
        {children}
        {loading && <Spinner className="button__spinner" size={20} />}
      </div>
    </button>
  );
});
