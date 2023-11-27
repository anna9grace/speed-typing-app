import React, { FC, useEffect, useRef, useState } from 'react';

import styles from './TrainingBoard.module.scss';

import { Button } from '../../ui/Button/Button';
import classNames from 'classnames';
import { CurrentSpeed } from '../CurrentSpeed/CurrentSpeed';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentSymbol, getLoadingStatus, getTrainingStatus, getTrainingText } from '../../../store/selectors';
import {
  changeCurrentSymbol,
  increaseMistakes,
  resetTraining,
  setIsLoading,
  startTraining,
} from '../../../store/actions';
import { checkSymbol } from './TrainingBoard.helpers';
import { store } from '../../../store';
import { fetchTextData } from '../../../store/api-actions';

export const TrainingBoard: FC = () => {
  const dispatch = useDispatch();
  const symbolRef = useRef<HTMLSpanElement | null>(null);

  const isLoading = useSelector(getLoadingStatus);
  const isStarted = useSelector(getTrainingStatus);
  const currentText = useSelector(getTrainingText);
  const currentSymbol = useSelector(getCurrentSymbol);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [isLoading, isStarted]);

  const reset = () => {
    dispatch(resetTraining());
    setIsError(false);
  };

  const onKeydown = (evt: KeyboardEvent) => {
    if (!checkSymbol(evt.key) || isLoading || !symbolRef?.current) return;

    evt.preventDefault();

    if (!isStarted) {
      dispatch(startTraining());
    }

    if (evt.key === symbolRef.current.textContent) {
      setIsError(false);
      dispatch(changeCurrentSymbol());
    } else {
      setIsError(true);
      dispatch(increaseMistakes());
    }
  };

  const handleOnChangeClick = async () => {
    if (isLoading) return;

    dispatch(setIsLoading(true));
    await store.dispatch(fetchTextData());
    reset();
  };

  const handleOnResetClick = () => {
    if (isLoading) return;
    reset();
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.result}>
          <span>Скорость печати:</span>
          <CurrentSpeed />
        </div>

        <Button
          className={styles.button}
          disabled={isLoading}
          onClick={handleOnChangeClick}
        >
          сменить текст
        </Button>
        <Button
          className={styles.button}
          disabled={isLoading}
          onClick={handleOnResetClick}
        >
          начать заново
        </Button>
      </div>
      <p className={styles.text}>
        <span className={styles.completed}>{currentSymbol > 0 && currentText.slice(0, currentSymbol)}</span>

        <span
          ref={symbolRef}
          className={classNames(styles.current, { [styles.wrong]: isError })}
        >
          {currentText.slice(currentSymbol, currentSymbol + 1)}
        </span>

        <span className={styles.uncompleted}>{currentText.slice(currentSymbol + 1)}</span>
      </p>
    </div>
  );
};
