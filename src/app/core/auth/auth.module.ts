import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { AuthResource } from './auth.resource';
import { AuthService } from './auth.service';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { TokenInterceptor } from './interceptors/token-interceptor.service';
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
                AuthService,
                AuthResource,
                JwtInterceptorService,
                TokenInterceptor,
                TokenService,
                AuthGuard
            ]
        };
    }
}
