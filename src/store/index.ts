import { createAPI } from '../services/api';

import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import { requireAuth } from './actions';
import { AuthorizationStatus } from '../constants';

export const api = createAPI(() => store.dispatch(requireAuth(AuthorizationStatus.NO_AUTH)));

export const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
