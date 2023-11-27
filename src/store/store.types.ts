import { ILoginForm } from '../components/pages/LoginPage/LoginPage.forms';
import { IResult } from '../components/pages/ResultPage/ResultPage.types';
import { AuthorizationStatus } from '../constants';
import { store } from '.';

export interface IStoreState {
  isTrainingStarted: boolean;
  currentSymbol: number;
  startTime: number | null;
  mistakesCount: number;
  trainingText: string;
  authorizationStatus: AuthorizationStatus;
  isLoading: boolean;
  userInfo: IUserData | null;
  results: IResult[];
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export interface ITextData {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

export interface IAuthData {
  email: string;
  password: string;
}

export interface IUserData {
  id: number;
  email: string;
  name: string;
  token: string;
}

export type StoredResults = Record<'string', IResult[]>;
