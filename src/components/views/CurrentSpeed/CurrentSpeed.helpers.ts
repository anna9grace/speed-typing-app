import { IResultData } from '../../pages/ResultPage/ResultPage.types';

export const INITIAL_RESULT_DATA: IResultData = {
  start: null,
  end: null,
  correctSymbols: 0,
  mistakes: 0,
};

export const RESULT_UPDATE_INTERVAL = 1000;
