import classNames from 'classnames';
import {
  ButtonHTMLAttributes,
  FC,
  JSXElementConstructor,
  ReactNode,
} from 'react';

import LoadingDots from '../LoadingDots';

import ST from './Button.module.scss';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  Component?: string | JSXElementConstructor<any>;
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
}): JSX.Element => {
  const classes = classNames(
    ST.button,
    {
      [ST['button--primary']]: level === 'primary',
      [ST['button--secondary']]: level === 'secondary',
    },
    className,
  );

  return (
    <Component {...rest} className={classes} disabled={!!loading}>
      {!!loadingCopy && !!loading ? loadingCopy : children}

      {!!loading && (
        <span className={ST['button-loader']}>
          <LoadingDots />
        </span>
      )}
    </Component>
  );
};

export default Button;
