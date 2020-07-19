import { Action } from '@ngrx/store';
import { IUserCredentials } from '../auth.model';

export enum AuthActionTypes {
  AUTHENTICATE = '[Auth] Authenticate',
  AUTHENTICATED_SUCCESSFUL = '[Auth] Authenticated Success',
  AUTHENTICATED_FAILURE = '[Auth] Authenticated Failure',
  RESET_TOKEN = '[Auth] Clear token',
}

export class Authenticate implements Action {
  readonly type = AuthActionTypes.AUTHENTICATE;

  constructor(public payload: { credentials: IUserCredentials }) {}
}

export class AuthenticatedSuccessful implements Action {
  readonly type = AuthActionTypes.AUTHENTICATED_SUCCESSFUL;

  constructor(public payload: { token: string }) {}
}

export class AuthenticatedFailure implements Action {
  readonly type = AuthActionTypes.AUTHENTICATED_FAILURE;

  constructor(public payload: { error: any }) {}
}

export class ResetAuthToken implements Action {
  readonly type = AuthActionTypes.RESET_TOKEN;
}

export type AuthActionsUnion =
  | Authenticate
  | AuthenticatedSuccessful
  | AuthenticatedFailure
  | ResetAuthToken;
