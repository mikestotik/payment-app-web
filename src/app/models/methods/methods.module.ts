import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MethodsService } from './methods.service';
import { PaymentAccountEffect } from './store/payment-account.effect';
import { paymentAccountReducer, REDUCER_KEY_PAYMENT_ACCOUNT } from './store/payment-account.reducer';
import { PaymentCardEffect } from './store/payment-card.effect';
import { paymentCardReducer, REDUCER_KEY_PAYMENT_CARD } from './store/payment-card.reducer';

@NgModule({
  imports: [
    EffectsModule.forFeature([
      PaymentAccountEffect,
      PaymentCardEffect
    ]),
    StoreModule.forFeature(REDUCER_KEY_PAYMENT_CARD, paymentCardReducer),
    StoreModule.forFeature(REDUCER_KEY_PAYMENT_ACCOUNT, paymentAccountReducer)
  ],
  providers: [
    MethodsService
  ]
})
export class MethodsModule {}
