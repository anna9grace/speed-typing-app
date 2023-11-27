import React, { FC } from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

import { AppRoutes } from '../../../constants';
import { useSelector } from 'react-redux';
import { getUserInfo } from '../../../store/selectors';
import { store } from '../../../store';
import { logout } from '../../../store/api-actions';

export const Header: FC = () => {
  const userInfo = useSelector(getUserInfo);

  const handleOnLogout = () => {
    store.dispatch(logout());
  };

  return (
    <header className={styles.wrapper}>
      <nav className={styles.nav}>
        <Link
          to={AppRoutes.ROOT}
          className={styles.title}
        >
          Тренажер быстрой печати
        </Link>

        <ul className={styles.login_menu}>
          {userInfo?.name ? (
            <>
              <li className={styles.nav_link}>
                <Link to={AppRoutes.STATS}>Статистика {userInfo.name}</Link>
              </li>
              <li className={styles.nav_link}>
                <Link
                  to={AppRoutes.ROOT}
                  onClick={handleOnLogout}
                >
                  Выйти
                </Link>
              </li>
            </>
          ) : (
            <li className={styles.nav_link}>
              <Link to={AppRoutes.LOGIN}>Войти</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
