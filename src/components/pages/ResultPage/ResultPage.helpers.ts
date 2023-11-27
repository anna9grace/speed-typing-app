import { MILLISECONDS_IN_MINUTE, ResultType } from '../../../constants';
import { IResultData } from './ResultPage.types';

export const getResult = (type: ResultType, result: number) => {
  switch (type) {
    case ResultType.SPEED:
      return `${result} знак/мин`;

    case ResultType.PRECISION:
      return `${result}%`;

    default:
      return '';
  }
};

export const getTypeSpeed = (resultData: IResultData) => {
  if (!resultData.end || !resultData.start) return 0;
  const spendTime = (resultData.end - resultData.start) / MILLISECONDS_IN_MINUTE;
  const symbolsCount = resultData.correctSymbols + resultData.mistakes;

  return Math.round(symbolsCount / spendTime);
};

export const getTypePrecision = (resultData: IResultData) => {
  const symbolsCount = resultData.correctSymbols + resultData.mistakes;
  return Math.round((resultData.correctSymbols / symbolsCount) * 100);
};
