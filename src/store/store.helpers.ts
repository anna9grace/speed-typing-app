import { IResult } from '../components/pages/ResultPage/ResultPage.types';

const RESULTS_KEY_NAME = 'results';

export const getResultsStorage = (email: string): IResult[] => {
  const cachedData = localStorage.getItem(RESULTS_KEY_NAME);
  const results = cachedData ? JSON.parse(cachedData)[email] : [];

  return results;
};

export const setResultsStorage = (email: string, result: IResult): IResult[] => {
  const cachedData = localStorage.getItem(RESULTS_KEY_NAME);
  const allResults = cachedData ? JSON.parse(cachedData) : {};
  const updatedResults = [...(allResults[email] ?? []), result];

  localStorage.setItem(
    RESULTS_KEY_NAME,
    JSON.stringify({
      ...allResults,
      [email]: updatedResults,
    }),
  );

  return updatedResults;
};
