import { FC } from 'react';

import ST from './LoadingDots.module.scss';

const LoadingDots: FC = (): JSX.Element => {
  return (
    <span className={ST['loading-dots']}>
      <span className={ST['loading-dots-dot']} />
      <span className={ST['loading-dots-dot']} />
      <span className={ST['loading-dots-dot']} />
    </span>
  );
};

export default LoadingDots;
