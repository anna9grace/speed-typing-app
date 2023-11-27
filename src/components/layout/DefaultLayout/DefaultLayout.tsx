import React, { FC } from 'react';

import styles from './DefaultLayout.module.scss';
import { Header } from '../../views/Header/Header';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Header />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};
