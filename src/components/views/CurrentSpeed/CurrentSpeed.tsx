import React, { FC, useEffect, useState } from 'react';
import styles from './CurrentSpeed.module.scss';

import { ResultType } from '../../../constants';
import { getResult, getTypeSpeed } from '../../pages/ResultPage/ResultPage.helpers';
import { INITIAL_RESULT_DATA, RESULT_UPDATE_INTERVAL } from './CurrentSpeed.helpers';
import { useSelector } from 'react-redux';
import { getCurrentSymbol, getMistakesCount, getStartTime, getTrainingStatus } from '../../../store/selectors';

export const CurrentSpeed: FC = () => {
  const isStarted = useSelector(getTrainingStatus);
  const startTime = useSelector(getStartTime);
  const correctSymbolsCount = useSelector(getCurrentSymbol);
  const mistakesCount = useSelector(getMistakesCount);

  const [result, setResult] = useState(getTypeSpeed(INITIAL_RESULT_DATA));
  const [timePassed, setTimePassed] = useState(0);

  useEffect(() => {
    let updateTimer: NodeJS.Timer | null = null;
    let time = 0;

    if (isStarted) {
      updateTimer = setInterval(() => {
        time++;
        setTimePassed(time);
      }, RESULT_UPDATE_INTERVAL);
    }

    return () => {
      setResult(getTypeSpeed(INITIAL_RESULT_DATA));
      updateTimer && clearInterval(updateTimer);
    };
  }, [isStarted]);

  useEffect(() => {
    const currentResult = getTypeSpeed({
      start: startTime,
      end: new Date().getTime(),
      correctSymbols: correctSymbolsCount,
      mistakes: mistakesCount,
    });

    setResult(currentResult);
  }, [timePassed, isStarted]);

  return <span className={styles.root}>{getResult(ResultType.SPEED, result)}</span>;
};
