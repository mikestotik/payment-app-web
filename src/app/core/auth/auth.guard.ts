import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ROUTE_CONFIG } from '../../config/routes.config';
import { TokenService } from './token.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router) {}

  public canActivate(): boolean {
    if (this.tokenService.isExpired()) {
      this.router.navigate([ ROUTE_CONFIG.AUTH.getSignInPath() ]);
      return false;
    }
    return true;
  }
}
