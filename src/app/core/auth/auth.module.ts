import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { AuthResource } from './auth.resource';
import { AuthService } from './auth.service';
import { Auth2Service } from './auth2.service';
import { AuthJwtInterceptor } from './interceptors/auth-jwt.interceptor';
import { TokenInterceptor } from './interceptors/auth-token.interceptor';
import { TokenService } from './token.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
                Auth2Service,
                AuthResource,
                AuthJwtInterceptor,
                TokenInterceptor,
                TokenService,
                AuthGuard,
                AuthService
            ]
        };
    }
}
