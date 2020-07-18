import { Injectable } from '@angular/core';
import { JwtHelper } from '../utils/jwt.helper';
import { ITokenPayload } from './auth.model';

@Injectable()
export class TokenService {

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public removeToken(): void {
    return localStorage.removeItem('token');
  }

  public isExpired(): boolean {
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    return JwtHelper.isTokenExpired(token);
  }

  public getPayload(): ITokenPayload {
    const token = this.getToken();
    return JwtHelper.decodeToken(token);
  }
}
