import { FC } from 'react';

import styles from './ErrorMessage.module.scss';
import { IErrorMessageProps } from './ErrorMessage.types';

const ErrorMessage: FC<IErrorMessageProps> = ({ children }) => {
  return <p className={styles['error-message']}>{children}</p>;
};

export default ErrorMessage;
