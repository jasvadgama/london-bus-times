import clsx from 'clsx';
import { FC, InputHTMLAttributes, ReactNode } from 'react';

import styles from './FormRow.module.scss';

interface IFormRow extends InputHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isActionRow?: boolean;
}

const FormRow: FC<IFormRow> = ({ children, isActionRow }) => {
  const classes = clsx(styles['form-row'], {
    [styles['form-row--actions']]: !!isActionRow,
  });

  return <div className={classes}>{children}</div>;
};

export default FormRow;
