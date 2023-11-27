import React, { FC, useEffect } from 'react';

import { Loader } from '../../ui/Loader/Loader';

import styles from './MainPage.module.scss';
import { HelperMessage } from '../../ui/HelperMessage/HelperMessage';
import { TrainingBoard } from '../../views/TrainingBoard/TrainingBoard';
import { getAuthStatus, getCurrentSymbol, getTrainingStatus, getTrainingText } from '../../../store/selectors';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../../constants';
import { fetchTextData } from '../../../store/api-actions';
import { store } from '../../../store';

export const MainPage: FC = () => {
  const navigate = useNavigate();

  const currentText: string | null = useSelector(getTrainingText);
  const currentSymbol = useSelector(getCurrentSymbol);
  const isStarted = useSelector(getTrainingStatus);
  const authStatus = useSelector(getAuthStatus);

  useEffect(() => {
    if (authStatus === AuthorizationStatus.UNKNOWN || currentText) return;
    store.dispatch(fetchTextData());
  }, [authStatus]);

  useEffect(() => {
    if (isStarted && currentSymbol === currentText.length) {
      navigate(AppRoutes.RESULT);
    }
  }, [isStarted, currentSymbol, currentText]);

  return (
    <div className={styles.wrapper}>
      {currentText ? (
        <>
          {!isStarted && (
            <div className={styles.message}>
              <HelperMessage>{'Начните печатать, когда будете готовы!'}</HelperMessage>
            </div>
          )}
          <TrainingBoard />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
