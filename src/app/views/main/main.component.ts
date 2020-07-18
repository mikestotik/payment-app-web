import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadContacts } from '../../models/contacts/store/contact.action';
import { LoadPaymentAccounts } from '../../models/methods/store/payment-account.action';
import { LoadPaymentCards } from '../../models/methods/store/payment-card.action';
import { LoadPayments } from '../../models/payment/store/payment.action';
import { AppState } from '../../store';

@Component({
    template: '<router-outlet></router-outlet>'
})
export class MainComponent implements OnInit {

    constructor(
        private store: Store<AppState>) {
    }

    public ngOnInit(): void {
        this.store.dispatch(new LoadPayments());
        this.store.dispatch(new LoadContacts());
        this.store.dispatch(new LoadPaymentCards());
        this.store.dispatch(new LoadPaymentAccounts());
    }
}
