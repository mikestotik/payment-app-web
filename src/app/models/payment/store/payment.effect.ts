import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ROUTE_CONFIG } from '../../../config/routes.config';
import { PaymentService } from '../payment.service';
import {
  PaymentActionTypes,
  PaymentSavedFailure,
  PaymentSavedSuccessful,
  PaymentsLoadedFailure,
  PaymentsLoadedSuccessful,
  SavePayment
} from './payment.action';

@Injectable()
export class PaymentEffect {

  @Effect()
  loadPayments$: Observable<Action> = this.actions$.pipe(
    ofType(PaymentActionTypes.LOAD),
    switchMap(() => this.paymentService
      .getAll()
      .pipe(
        map(entities => new PaymentsLoadedSuccessful({ entities })),
        catchError(error => of(new PaymentsLoadedFailure({ error })))
      )
    )
  );

  @Effect()
  savePayment$: Observable<Action> = this.actions$.pipe(
    ofType(PaymentActionTypes.SAVE),
    switchMap((action: SavePayment) => this.paymentService
      .save(action.payload.entity)
      .pipe(
        map(entity => new PaymentSavedSuccessful({ entity })),
        tap(() => this.router.navigateByUrl(ROUTE_CONFIG.PAYMENT.getSuccessPath())),
        catchError(error => of(new PaymentSavedFailure({ error })))
      )
    )
  );

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private router: Router,
    private paymentService: PaymentService) {
  }
}
