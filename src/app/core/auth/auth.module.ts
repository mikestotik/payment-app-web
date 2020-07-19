import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthJwtInterceptor } from './interceptors/auth-jwt.interceptor';
import { AuthTokenInterceptor } from './interceptors/auth-token.interceptor';

@NgModule({
  providers: [
    AuthJwtInterceptor,
    AuthTokenInterceptor,
    AuthGuard,
    AuthService
  ]
})
export class AuthModule {}
