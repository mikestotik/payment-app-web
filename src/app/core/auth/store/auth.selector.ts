import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, REDUCER_KEY_AUTH } from './auth.reducer';
import * as fromAuth from './auth.reducer';

export const selectState = createFeatureSelector<AuthState>(REDUCER_KEY_AUTH);

export const getAuthToken = createSelector(
    selectState,
    fromAuth.getAuthToken
);
