import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus, BaseUrls } from '../constants';
import { AppDispatch, IAuthData, ITextData, IUserData, State } from './store.types';
import { loadText, logoutUser, requireAuth } from './actions';
import { randomNumber } from '../utils/utils';
import { dropToken, saveToken } from '../services/token';

export const checkAuth = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get(`${BaseUrls.AUTHORIZATION}/${APIRoute.LOGIN}`);
  dispatch(requireAuth(AuthorizationStatus.AUTH, data));
});

export const login = createAsyncThunk<
  IUserData,
  IAuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<IUserData>(`${BaseUrls.AUTHORIZATION}/${APIRoute.LOGIN}`, { email, password });
  saveToken(data.token);

  dispatch(requireAuth(AuthorizationStatus.AUTH, data));
  return data;
});

export const logout = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(`${BaseUrls.AUTHORIZATION}/${APIRoute.LOGOUT}`);
  dispatch(logoutUser());
  dropToken();
});

export const fetchTextData = createAsyncThunk<
  ITextData,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchText', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<ITextData>(`${BaseUrls.TEXT}/${randomNumber(149)}`);

  dispatch(loadText(data.body));
  return data;
});
