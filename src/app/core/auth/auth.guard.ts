import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ROUTE_CONFIG } from '../../config/routes.config';
import { AppState } from '../../app.state';
import { isAuthTokenExpired } from './store/auth.selector';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<AppState>) {
  }

  public canActivate(): Observable<boolean> {
    return this.store.select(isAuthTokenExpired).pipe(
      map(expired => !expired),
      tap(notExpired => {
        if (!notExpired) {
          this.router.navigate([ ROUTE_CONFIG.AUTH.getSignInPath() ]);
        }
      })
    );
  }
}
