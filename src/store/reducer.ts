import { createReducer } from '@reduxjs/toolkit';
import {
  changeCurrentSymbol,
  increaseMistakes,
  loadText,
  logoutUser,
  requireAuth,
  resetTraining,
  setResults,
  setIsLoading,
  startTraining,
  resetText,
} from './actions';
import { AuthorizationStatus } from '../constants';
import { IStoreState } from './store.types';

const initialState: IStoreState = {
  isTrainingStarted: false,
  startTime: null,
  currentSymbol: 0,
  mistakesCount: 0,
  trainingText: '',
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  userInfo: null,
  results: [],
  isLoading: true,
};

const reducer = createReducer(initialState, builder => {
  builder
    .addCase(startTraining, state => {
      state.isTrainingStarted = true;
      state.startTime = new Date().getTime();
    })
    .addCase(resetTraining, state => {
      state.isTrainingStarted = false;
      state.currentSymbol = 0;
      state.startTime = null;
      state.mistakesCount = 0;
    })
    .addCase(resetText, state => {
      state.trainingText = '';
    })
    .addCase(loadText, (state, action) => {
      state.trainingText = action.payload;
      state.isLoading = false;
    })
    .addCase(changeCurrentSymbol, (state, action) => {
      state.currentSymbol = state.currentSymbol + action.payload;
    })
    .addCase(increaseMistakes, (state, action) => {
      state.mistakesCount = state.mistakesCount + action.payload;
    })
    .addCase(requireAuth, (state, action) => {
      state.authorizationStatus = action.payload.authStatus;
      state.userInfo = action.payload.authInfo;
    })
    .addCase(logoutUser, state => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      state.userInfo = null;
      state.results = [];
    })
    .addCase(setIsLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setResults, (state, action) => {
      state.results = action.payload;
    });
});

export default reducer;
