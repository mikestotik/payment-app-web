import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AuthModule } from './core/auth/auth.module';
import { JwtInterceptorService } from './core/auth/interceptors/jwt-interceptor.service';
import { TokenInterceptor } from './core/auth/interceptors/token-interceptor.service';
import { entityConfig } from './entity-metadata';
import { ContactsModule } from './models/contacts/contacts.module';
import { ContactEffect } from './models/contacts/store/contact.effect';
import { MethodsModule } from './models/methods/methods.module';
import { PaymentAccountEffect } from './models/methods/store/payment-account.effect';
import { PaymentCardEffect } from './models/methods/store/payment-card.effect';
import { PaymentModule } from './models/payment/payment.module';
import { PaymentEffect } from './models/payment/store/payment.effect';

import { AppRoutingModule } from './routing/app.routing';
import { AuthEffects } from './models/auth/auth.effect';
import { metaReducers, reducers } from './store';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AuthModule.forRoot(),
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        }),
        EffectsModule.forRoot([
            AuthEffects,
            ContactEffect,
            PaymentCardEffect,
            PaymentAccountEffect,
            PaymentEffect
        ]),
        StoreRouterConnectingModule.forRoot(),
        EntityDataModule.forRoot(entityConfig),
        ContactsModule,
        MethodsModule,
        PaymentModule,
        MatSnackBarModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptorService,
            multi: true
        }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
