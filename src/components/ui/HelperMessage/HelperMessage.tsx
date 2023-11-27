import React, { FC } from 'react';
import styles from './HelperMessage.module.scss';

interface HelperMessageProps {
  children: React.ReactNode;
}

export const HelperMessage: FC<HelperMessageProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <p>{children}</p>
    </div>
  );
};
