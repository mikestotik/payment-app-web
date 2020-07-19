import { Component, Input, OnInit } from '@angular/core';
import { IPayment } from '../../../../models/payment/payment.model';

@Component({
  selector: 'app-payment-transaction',
  templateUrl: './payment-transaction.component.html',
  styleUrls: [ './payment-transaction.component.scss' ]
})
export class PaymentTransactionComponent implements OnInit {

  @Input()
  public data: IPayment;

  constructor() { }

  ngOnInit(): void { }

}
