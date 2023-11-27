import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './EmptyPage.module.scss';
import { AppRoutes } from '../../../constants';

export const EmptyPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>404. Page not found</h1>
      <Link to={AppRoutes.ROOT}>Go to main page</Link>
    </div>
  );
};
