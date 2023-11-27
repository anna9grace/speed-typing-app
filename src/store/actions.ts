import { createAction } from '@reduxjs/toolkit';

export const ActionType = {
  START_TRAINING: 'training/startTraining',
  RESET_TRAINING: 'training/resetTraining',
  RESET_TEXT: 'training/resetText',
  INCREASE_MISTAKES: 'training/increaseMistakes',
  CHANGE_CURRENT_SYMBOL: 'training/changeCurrentSymbol',
  LOAD_TEXT: 'data/loadText',
  SET_IS_LOADING: 'data/setIsLoading',
  SET_RESULTS: 'data/setResults',
  REQUIRE_AUTH: 'user/checkAuth',
  LOGOUT: 'user/logout',
};

export const startTraining = createAction(ActionType.START_TRAINING);
export const resetTraining = createAction(ActionType.RESET_TRAINING);
export const resetText = createAction(ActionType.RESET_TEXT);

export const increaseMistakes = createAction(ActionType.INCREASE_MISTAKES, () => ({
  payload: 1,
}));

export const changeCurrentSymbol = createAction(ActionType.CHANGE_CURRENT_SYMBOL, () => ({
  payload: 1,
}));

export const loadText = createAction(ActionType.LOAD_TEXT, text => ({
  payload: text,
}));

export const setResults = createAction(ActionType.SET_RESULTS, results => ({
  payload: results,
}));

export const requireAuth = createAction(ActionType.REQUIRE_AUTH, (status, data = {}) => ({
  payload: {
    authStatus: status,
    authInfo: data ? data : {},
  },
}));

export const logoutUser = createAction(ActionType.LOGOUT);

export const setIsLoading = createAction(ActionType.SET_IS_LOADING, status => ({
  payload: status,
}));
