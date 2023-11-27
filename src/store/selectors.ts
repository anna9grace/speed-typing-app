import { IStoreState } from './store.types';

export const getTrainingStatus = (state: IStoreState) => state.isTrainingStarted;
export const getTrainingText = (state: IStoreState) => state.trainingText;
export const getCurrentSymbol = (state: IStoreState) => state.currentSymbol;
export const getStartTime = (state: IStoreState) => state.startTime;
export const getMistakesCount = (state: IStoreState) => state.mistakesCount;
export const getUserInfo = (state: IStoreState) => state.userInfo;
export const getAuthStatus = (state: IStoreState) => state.authorizationStatus;
export const getLoadingStatus = (state: IStoreState) => state.isLoading;
export const getResults = (state: IStoreState) => state.results;
