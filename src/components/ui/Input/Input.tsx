import { FC, InputHTMLAttributes, ReactNode } from 'react';

import styles from './Input.module.scss';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
}

const Input: FC<IInput> = ({ children, placeholder, ...rest }) => {
  return (
    <label className={styles.input}>
      <input
        {...rest}
        className={styles.control}
        name={rest.name || rest.id}
        placeholder={placeholder || ''}
      />
      <span className={styles.label}>{children}</span>
    </label>
  );
};

export default Input;
