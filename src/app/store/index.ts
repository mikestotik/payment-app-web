import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { contactReducer, ContactState } from '../models/contacts/store/contact.reducer';
import { paymentAccountReducer, PaymentAccountState } from '../models/methods/store/payment-account.reducer';
import { paymentCardReducer, PaymentCardState } from '../models/methods/store/payment-card.reducer';
import { paymentReducer, PaymentState } from '../models/payment/store/payment.reducer';

export interface AppState {
    contacts: ContactState;
    paymentCards: PaymentCardState;
    paymentAccounts: PaymentAccountState;
    payments: PaymentState;
}

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return (state: AppState, action: any): AppState => {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}

export const reducers: ActionReducerMap<AppState> = {
    contacts: contactReducer,
    paymentCards: paymentCardReducer,
    paymentAccounts: paymentAccountReducer,
    payments: paymentReducer
};

export const metaReducers: MetaReducer<AppState>[] = [ logger ];
