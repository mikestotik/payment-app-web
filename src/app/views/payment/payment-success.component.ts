import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClearActivePayment } from '../../models/payment/store/payment.action';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: [ './payment-success.component.scss' ]
})
export class PaymentSuccessComponent implements OnInit {

  constructor(
    private store: Store<AppState>) {
  }

  public ngOnInit(): void {
    this.store.dispatch(new ClearActivePayment());
  }

}
