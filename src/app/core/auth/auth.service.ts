import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ROUTE_CONFIG } from '../../config/routes.config';
import { IUserCredentials, LogInResponse } from './auth.model';
import { AuthResource } from './auth.resource';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {

    public cachedRequests: Array<HttpRequest<any>> = [];

    constructor(
        private tokenService: TokenService,
        private authResource: AuthResource,
        private router: Router) {
    }

    public logOut(): void {
        this.tokenService.removeToken();
        this.router.navigate([ ROUTE_CONFIG.AUTH.getSignInPath() ]);
    }

    public logIn(credentials: IUserCredentials): Observable<LogInResponse> {
        return this.authResource.logIn(credentials)
            .pipe(
                tap(response => {
                  console.log(response);
                    this.tokenService.setToken(response.id_token);
                })
            );
    }

    public isAuthenticated(): boolean {
        const token = this.tokenService.getToken();
        const tokenExpired = this.tokenService.isExpired();

        return token && !tokenExpired;
    }

    public collectFailedRequest(request: HttpRequest<any>): void {
        this.cachedRequests.push(request);
    }

    public retryFailedRequests(): void {
        // retry the requests. this method can
        // be called after the token is refreshed
    }

    public forgotPassword(data: { username: string }): Observable<boolean> {
        return new Observable(observer => {
            observer.next(true);
        });
    }
}
