import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PaymentService } from './payment.service';
import { PaymentEffect } from './store/payment.effect';
import { paymentReducer, REDUCER_KEY_PAYMENTS } from './store/payment.reducer';

@NgModule({
  imports: [
    EffectsModule.forFeature([ PaymentEffect ]),
    StoreModule.forFeature(REDUCER_KEY_PAYMENTS, paymentReducer)
  ],
  providers: [
    PaymentService
  ]
})
export class PaymentModule {}
