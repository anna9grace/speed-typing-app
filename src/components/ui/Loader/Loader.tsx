import React, { FC } from 'react';
import styles from './Loader.module.scss';

export const Loader: FC = () => {
  return (
    <div
      className={styles.container}
      data-testid="loader"
    >
      <div className={styles.spinner}>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
