import { FC } from 'react';

import styles from './LoadingDots.module.scss';

const LoadingDots: FC = () => {
  return (
    <span className={styles['loading-dots']}>
      <span className={styles['loading-dots-dot']} />
      <span className={styles['loading-dots-dot']} />
      <span className={styles['loading-dots-dot']} />
    </span>
  );
};

export default LoadingDots;
