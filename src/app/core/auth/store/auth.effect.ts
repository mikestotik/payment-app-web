import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ROUTE_CONFIG } from '../../../config/routes.config';
import { LogInResponse } from '../auth.model';
import { AuthService } from '../auth.service';
import { AuthActionTypes, Authenticate, AuthenticatedFailure, AuthenticatedSuccessful } from './auth.action';

@Injectable()
export class AuthEffect {

  @Effect()
  authenticate$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.AUTHENTICATE),
    switchMap((action: Authenticate) => this.authService
      .authenticate(action.payload.credentials)
      .pipe(
        map((response: LogInResponse) => new AuthenticatedSuccessful({ token: response.id_token })),
        tap(() => this.router.navigateByUrl(ROUTE_CONFIG.APP.getRootPath())),
        catchError(error => of(new AuthenticatedFailure({ error })))
      )
    )
  );

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private router: Router,
    private authService: AuthService) {
  }
}
