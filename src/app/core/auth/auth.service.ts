import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { API_CONFIG } from '../../config/api.config';
import { IUserCredentials, LogInResponse } from './auth.model';

@Injectable()
export class AuthService {

  public readonly cachedRequests: Array<HttpRequest<any>> = [];

  private readonly apiUrl = environment.url.api;

  constructor(
    private http: HttpClient) {
  }

  public authenticate(credentials: IUserCredentials): Observable<LogInResponse> {
    return this.http.post<LogInResponse>(
      `${ this.apiUrl }${ API_CONFIG.AUTH.AUTHENTICATE }`,
      credentials
    );
  }

  public collectFailedRequest(request: HttpRequest<any>): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }
}

