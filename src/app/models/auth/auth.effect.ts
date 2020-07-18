import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { AuthResource } from '../../core/auth/auth.resource';

@Injectable()
export class AuthEffects {
  // Listen for the 'LOGIN' action
  // @Effect()
  // login$: Observable<Action> = this.actions$.pipe(
  //     ofType('LOGIN'),
  //     mergeMap(action =>
  //         this.authResource.logIn(action.payload).pipe(
  //             // If successful, dispatch success action with result
  //             map(data => ({ type: 'LOGIN_SUCCESS', payload: data })),
  //             // If request fails, dispatch failed action
  //             catchError(() => of({ type: 'LOGIN_FAILED' }))
  //         )
  //     )
  // );

  constructor(private http: HttpClient, private actions$: Actions, private authResource: AuthResource) {}
}
