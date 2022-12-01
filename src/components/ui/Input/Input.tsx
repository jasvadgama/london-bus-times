import { FC, InputHTMLAttributes, ReactNode } from 'react';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
}

const Input: FC<IInput> = ({ children, ...rest }) => {
  return (
    <label>
      <span>{children}</span>
      <input {...rest} name={rest.name || rest.id} />
    </label>
  );
};

export default Input;
