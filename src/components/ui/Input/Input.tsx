import { FC, InputHTMLAttributes, ReactNode } from 'react';

import ST from './Input.module.scss';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
}

const Input: FC<IInput> = ({ children, placeholder, ...rest }) => {
  return (
    <label className={ST.input}>
      <input
        {...rest}
        className={ST.control}
        name={rest.name || rest.id}
        placeholder={placeholder || ''}
      />
      <span className={ST.label}>{children}</span>
    </label>
  );
};

export default Input;
