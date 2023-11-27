import React, { FC, useEffect, useState } from 'react';

import styles from './ResultPage.module.scss';

import { ResultType } from '../../../constants';
import { getResult, getTypePrecision, getTypeSpeed } from './ResultPage.helpers';
import { IResult, IResultData } from './ResultPage.types';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentSymbol, getMistakesCount, getStartTime, getUserInfo } from '../../../store/selectors';
import { IUserData } from '../../../store/store.types';
import { setResultsStorage } from '../../../store/store.helpers';
import { Loader } from '../../ui/Loader/Loader';
import { resetText, resetTraining, setResults } from '../../../store/actions';

export const ResultPage: FC = () => {
  const dispatch = useDispatch();
  const startTime = useSelector(getStartTime);
  const correctSymbol = useSelector(getCurrentSymbol);
  const mistakesCount = useSelector(getMistakesCount);
  const user: IUserData | null = useSelector(getUserInfo);

  const [currentResult, setCurrentResult] = useState<IResult | null>(null);

  const resultsData: IResultData = {
    start: startTime,
    end: new Date().getTime(),
    correctSymbols: correctSymbol,
    mistakes: mistakesCount,
  };

  const result = {
    speed: getTypeSpeed(resultsData),
    precision: getTypePrecision(resultsData),
  };

  useEffect(() => {
    setCurrentResult(result);
  }, []);

  useEffect(() => {
    if (user?.email) {
      const res = setResultsStorage(user.email, result);
      dispatch(setResults(res));
    }

    dispatch(resetTraining());
    dispatch(resetText());
  }, []);

  return (
    <div className={styles.wrapper}>
      {currentResult ? (
        <>
          <h1 className={styles.title}>Так держать! Ваши результаты:</h1>
          <div className={styles.stats}>
            <p className={styles.stats_item}>
              Скорость печати:
              <span>{getResult(ResultType.SPEED, currentResult.speed)}</span>
            </p>
            <p className={styles.stats_item}>
              Точность печати:
              <span>{getResult(ResultType.PRECISION, currentResult.precision)}</span>
            </p>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
