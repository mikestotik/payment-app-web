import { JwtHelper } from '../../utils/jwt.helper';
import { AuthActionsUnion, AuthActionTypes } from './auth.action';

export const REDUCER_KEY_AUTH = 'auth';

export interface AuthState {
  token: string;
}

export const initialState: AuthState = {
  token: getToken()
};

export function authReducer(state = initialState, action: AuthActionsUnion): AuthState {
  switch (action.type) {
    case AuthActionTypes.AUTHENTICATED_SUCCESSFUL: {
      const token = action.payload.token;
      saveToken(token);
      return { ...state, token };
    }

    case AuthActionTypes.RESET_TOKEN: {
      resetToken();
      return { ...state, token: null };
    }

    default: {
      return state;
    }
  }
}

export const getAuthToken = (state: AuthState) => state.token;
export const isAuthTokenExpired = (state: AuthState) => JwtHelper.isTokenExpired(state.token);
export const getAuthTokenPayload = (state: AuthState) => JwtHelper.decodeToken(state.token);


function getToken(): string {
  const token = localStorage.getItem('token');
  return token ? token : null;
}

function saveToken(token: string): void {
  localStorage.setItem('token', token);
}

function resetToken(): void {
  localStorage.removeItem('token');
}
