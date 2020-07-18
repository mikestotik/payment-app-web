import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { API_CONFIG } from '../../config/api.config';
import { IUserCredentials, LogInResponse } from './auth.model';

@Injectable()
export class AuthResource {

    protected readonly apiUrl = environment.url.api;

    constructor(
        private http: HttpClient) {
    }

    public logIn(credentials: IUserCredentials): Observable<LogInResponse> {
        return this.http.post<LogInResponse>(`${ this.apiUrl }${ API_CONFIG.AUTH.AUTHENTICATE }`, credentials);
    }
}

