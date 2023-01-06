import { FC } from 'react';

import ST from './ErrorMessage.module.scss';
import { IErrorMessageProps } from './ErrorMessage.types';

const ErrorMessage: FC<IErrorMessageProps> = ({ children }): JSX.Element => {
  return <p className={ST['error-message']}>{children}</p>;
};

export default ErrorMessage;
