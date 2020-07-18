import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPaymentAccount from './payment-account.reducer';
import { PaymentAccountState, REDUCER_KEY_PAYMENT_ACCOUNT } from './payment-account.reducer';

export const selectPaymentAccountState = createFeatureSelector<PaymentAccountState>(REDUCER_KEY_PAYMENT_ACCOUNT);

export const selectAllPaymentAccounts = createSelector(
    selectPaymentAccountState,
    fromPaymentAccount.selectAllPaymentAccounts
);

export const selectPaymentAccountTotal = createSelector(
    selectPaymentAccountState,
    fromPaymentAccount.selectPaymentAccountTotal
);

export const selectPaymentAccountIds = createSelector(
    selectPaymentAccountState,
    fromPaymentAccount.selectPaymentAccountIds
);

export const selectPaymentAccountEntities = createSelector(
    selectPaymentAccountState,
    fromPaymentAccount.selectPaymentAccountEntities
);

export const selectCurrentPaymentAccountId = createSelector(
    selectPaymentAccountState,
    fromPaymentAccount.getSelectedPaymentAccountId
);

export const selectPaymentAccountById = createSelector(
    selectPaymentAccountState,
    fromPaymentAccount.getPaymentAccountById
);

export const selectCurrentPaymentAccount = createSelector(
    selectPaymentAccountEntities,
    selectCurrentPaymentAccountId,
    (userEntities, userId) => userEntities[userId]
);
