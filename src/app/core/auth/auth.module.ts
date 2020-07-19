import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthJwtInterceptor } from './interceptors/auth-jwt.interceptor';
import { AuthTokenInterceptor } from './interceptors/auth-token.interceptor';
import { AuthEffect } from './store/auth.effect';
import { authReducer, REDUCER_KEY_AUTH } from './store/auth.reducer';

@NgModule({
  imports: [
    EffectsModule.forFeature([ AuthEffect ]),
    StoreModule.forFeature(REDUCER_KEY_AUTH, authReducer)
  ],
  providers: [
    AuthJwtInterceptor,
    AuthTokenInterceptor,
    AuthGuard,
    AuthService
  ]
})
export class AuthModule {}
