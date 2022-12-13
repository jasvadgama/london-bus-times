import classNames from 'classnames';
import { FC, InputHTMLAttributes, ReactNode } from 'react';

import ST from './FormRow.module.scss';

interface IFormRow extends InputHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isActionRow?: boolean;
}

const FormRow: FC<IFormRow> = ({ children, isActionRow }) => {
  const classes = classNames(ST['form-row'], {
    [ST['form-row--actions']]: !!isActionRow,
  });

  return <div className={classes}>{children}</div>;
};

export default FormRow;
