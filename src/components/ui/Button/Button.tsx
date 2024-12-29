import clsx from 'clsx';
import { ButtonHTMLAttributes, ElementType, FC, ReactNode } from 'react';

import LoadingDots from '@components/ui/LoadingDots';

import styles from './Button.module.scss';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  Component?: string | ElementType;
  href?: string;
  level?: 'primary' | 'secondary';
  loading?: boolean;
  loadingCopy?: string;
}

const Button: FC<IButton> = ({
  children,
  className,
  Component = 'button',
  level = 'primary',
  loading,
  loadingCopy,
  ...rest
}) => {
  const classes = clsx(
    styles.button,
    {
      [styles['button--primary']]: level === 'primary',
      [styles['button--secondary']]: level === 'secondary',
    },
    className,
  );

  return (
    <Component {...rest} className={classes} disabled={!!loading}>
      {!!loadingCopy && !!loading ? loadingCopy : children}

      {!!loading && (
        <span className={styles['button-loader']}>
          <LoadingDots />
        </span>
      )}
    </Component>
  );
};

export default Button;
