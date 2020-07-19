import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppState } from '../../../store';
import { getAuthToken } from '../store/auth.selector';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<AppState>) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(getAuthToken).pipe(
      map(token => request.clone({
        setHeaders: {
          Authorization: `Bearer ${ token }`
        }
      })),
      switchMap(request => next.handle(request))
    );
  }
}
