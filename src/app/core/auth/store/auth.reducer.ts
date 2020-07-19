import { AuthActionsUnion, AuthActionTypes } from './auth.action';

export const REDUCER_KEY_AUTH = 'auth';

export interface AuthState {
  token: string;
}

export const initialState: AuthState = {
  token: null
};

export function authReducer(state = initialState, action: AuthActionsUnion): AuthState {
  switch (action.type) {
    case AuthActionTypes.AUTHENTICATED_SUCCESSFUL: {
      return { ...state, token: action.payload.token };
    }

    case AuthActionTypes.RESET_TOKEN: {
      return { ...state, token: null };
    }

    default: {
      return state;
    }
  }
}

export const getAuthToken = (state: AuthState) => state.token;
