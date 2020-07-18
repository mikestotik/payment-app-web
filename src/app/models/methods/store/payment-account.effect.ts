import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ROUTE_CONFIG } from '../../../config/routes.config';
import { MethodsService } from '../methods.service';
import {
    DeletePaymentAccount,
    PaymentAccountActionTypes,
    PaymentAccountDeletedFailure,
    PaymentAccountDeletedSuccessful,
    PaymentAccountSavedFailure,
    PaymentAccountSavedSuccessful,
    PaymentAccountsLoadedFailure,
    PaymentAccountsLoadedSuccessful,
    PaymentAccountUpdatedFailure,
    PaymentAccountUpdatedSuccessful,
    SavePaymentAccount,
    UpdatePaymentAccount
} from './payment-account.action';

@Injectable()
export class PaymentAccountEffect {

    @Effect()
    loadContacts$: Observable<Action> = this.actions$.pipe(
        ofType(PaymentAccountActionTypes.LOAD),
        switchMap(() => this.methodsService
            .getAllAccounts()
            .pipe(
                map(entities => new PaymentAccountsLoadedSuccessful({ entities })),
                catchError(error => of(new PaymentAccountsLoadedFailure({ error })))
            )
        )
    );

    @Effect()
    saveContact$: Observable<Action> = this.actions$.pipe(
        ofType(PaymentAccountActionTypes.SAVE),
        switchMap((action: SavePaymentAccount) => this.methodsService
            .saveAccount(action.payload.entity)
            .pipe(
                map(entity => new PaymentAccountSavedSuccessful({ entity })),
                tap(() => this.router.navigateByUrl(ROUTE_CONFIG.METHODS.getRootPath())),
                catchError(error => {
                    // todo: move
                    this.snackBar.open(error.error.title, null, {
                        duration: 3000
                    });
                    return of(new PaymentAccountSavedFailure({ error }));
                })
            )
        )
    );

    @Effect()
    updateContact$: Observable<Action> = this.actions$.pipe(
        ofType(PaymentAccountActionTypes.UPDATE),
        switchMap((action: UpdatePaymentAccount) => this.methodsService
            .updateAccount(action.payload.entity)
            .pipe(
                map(entity => new PaymentAccountUpdatedSuccessful({ entity: { id: entity.id, changes: entity } })),
                tap(() => this.router.navigateByUrl(ROUTE_CONFIG.METHODS.getRootPath())),
                catchError(error => {
                    // todo: move
                    this.snackBar.open(error.error.title, null, {
                        duration: 3000
                    });
                    return of(new PaymentAccountUpdatedFailure({ error }));
                })
            )
        )
    );

    @Effect()
    deleteContact$: Observable<Action> = this.actions$.pipe(
        ofType(PaymentAccountActionTypes.DELETE),
        switchMap((action: DeletePaymentAccount) => this.methodsService
            .deleteAccount(action.payload.id)
            .pipe(
                map(id => new PaymentAccountDeletedSuccessful({ id })),
                tap(() => this.router.navigateByUrl(ROUTE_CONFIG.METHODS.getRootPath())),
                catchError(error => of(new PaymentAccountDeletedFailure({ error })))
            )
        )
    );

    constructor(
        private http: HttpClient,
        private actions$: Actions,
        private router: Router,
        private methodsService: MethodsService,
        private snackBar: MatSnackBar) {
    }
}
