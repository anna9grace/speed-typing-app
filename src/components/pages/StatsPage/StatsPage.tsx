import React, { FC, useEffect } from 'react';

import styles from './StatsPage.module.scss';
import { AppRoutes, AuthorizationStatus } from '../../../constants';
import { IResult } from '../ResultPage/ResultPage.types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthStatus, getResults, getUserInfo } from '../../../store/selectors';
import { setResults } from '../../../store/actions';
import { getResultsStorage } from '../../../store/store.helpers';

export const StatsPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const results = useSelector(getResults);
  const user = useSelector(getUserInfo);
  const authStatus = useSelector(getAuthStatus);

  useEffect(() => {
    if (results.length || !user) return;

    const cachedResults = getResultsStorage(user.email);
    dispatch(setResults(cachedResults));
  }, []);

  useEffect(() => {
    if (authStatus === AuthorizationStatus.NO_AUTH || !user?.name) {
      navigate(AppRoutes.ROOT);
    }
  }, [authStatus]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        Результаты пользователя <span>{user?.name}</span>
      </h1>
      <div className={styles.stats}>
        {results.length === 0 ? (
          <p className={styles.empty}>У вас пока нет сохраненных результатов</p>
        ) : (
          <ol>
            {results.map((res: IResult, index) => (
              <li key={index}>
                <p>
                  Скорость: <span className={styles.result}>{res.speed}</span>
                </p>
                <p>
                  Точность: <span className={styles.result}>{res.precision}</span>
                </p>
                {index !== results.length - 1 && <hr />}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};
