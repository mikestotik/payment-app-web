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
    DeletePaymentCard,
    PaymentCardActionTypes, PaymentCardDeletedFailure, PaymentCardDeletedSuccessful, PaymentCardSavedFailure,
    PaymentCardSavedSuccessful,
    PaymentCardsLoadedFailure,
    PaymentCardsLoadedSuccessful, PaymentCardUpdatedFailure, PaymentCardUpdatedSuccessful,
    SavePaymentCard, UpdatePaymentCard
} from './payment-card.action';


@Injectable()
export class PaymentCardEffect {

    @Effect()
    loadContacts$: Observable<Action> = this.actions$.pipe(
        ofType(PaymentCardActionTypes.LOAD),
        switchMap(() => this.methodsService
            .getAllCards()
            .pipe(
                map(entities => new PaymentCardsLoadedSuccessful({ entities })),
                catchError(error => of(new PaymentCardsLoadedFailure({ error })))
            )
        )
    );

    @Effect()
    saveContact$: Observable<Action> = this.actions$.pipe(
        ofType(PaymentCardActionTypes.SAVE),
        switchMap((action: SavePaymentCard) => this.methodsService
            .saveCard(action.payload.entity)
            .pipe(
                map(entity => new PaymentCardSavedSuccessful({ entity })),
                tap(() => this.router.navigateByUrl(ROUTE_CONFIG.METHODS.getRootPath())),
                catchError(error => {
                    // todo: move
                    this.snackBar.open(error.error.title, null, {
                        duration: 3000
                    });
                    return of(new PaymentCardSavedFailure({ error }));
                })
            )
        )
    );

    @Effect()
    updateContact$: Observable<Action> = this.actions$.pipe(
        ofType(PaymentCardActionTypes.UPDATE),
        switchMap((action: UpdatePaymentCard) => this.methodsService
            .updateCard(action.payload.entity)
            .pipe(
                map(entity => new PaymentCardUpdatedSuccessful({ entity: { id: entity.id, changes: entity } })),
                tap(() => this.router.navigateByUrl(ROUTE_CONFIG.METHODS.getRootPath())),
                catchError(error => {
                    // todo: move
                    this.snackBar.open(error.error.title, null, {
                        duration: 3000
                    });
                    return of(new PaymentCardUpdatedFailure({ error }));
                })
            )
        )
    );

    @Effect()
    deleteContact$: Observable<Action> = this.actions$.pipe(
        ofType(PaymentCardActionTypes.DELETE),
        switchMap((action: DeletePaymentCard) => this.methodsService
            .deleteCard(action.payload.id)
            .pipe(
                map(id => new PaymentCardDeletedSuccessful({ id })),
                tap(() => this.router.navigateByUrl(ROUTE_CONFIG.METHODS.getRootPath())),
                catchError(error => of(new PaymentCardDeletedFailure({ error })))
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
