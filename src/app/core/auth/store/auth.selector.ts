import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import { AuthState, REDUCER_KEY_AUTH } from './auth.reducer';

export const selectState = createFeatureSelector<AuthState>(REDUCER_KEY_AUTH);

export const getAuthToken = createSelector(
  selectState,
  fromAuth.getAuthToken
);

export const isAuthTokenExpired = createSelector(
  selectState,
  fromAuth.isAuthTokenExpired
);

export const getAuthTokenPayload = createSelector(
  selectState,
  fromAuth.getAuthTokenPayload
);
