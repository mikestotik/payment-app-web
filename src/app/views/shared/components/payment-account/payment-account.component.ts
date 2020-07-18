import { Component, Input, OnInit } from '@angular/core';
import { IPaymentAccount } from '../../../../models/methods/methods.model';

@Component({
    selector: 'app-payment-account',
    templateUrl: './payment-account.component.html',
    styleUrls: [ './payment-account.component.scss' ]
})
export class PaymentAccountComponent implements OnInit {

    @Input()
    public data: IPaymentAccount;

    ngOnInit(): void { }

}
