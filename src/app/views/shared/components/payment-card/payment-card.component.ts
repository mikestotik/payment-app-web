import { Component, Input, OnInit } from '@angular/core';
import { IPaymentCard } from '../../../../models/methods/methods.model';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: [ './payment-card.component.scss' ]
})
export class PaymentCardComponent implements OnInit {

  @Input()
  public data: IPaymentCard;

  ngOnInit(): void { }

}
