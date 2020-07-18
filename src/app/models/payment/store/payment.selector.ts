import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPayment from './payment.reducer';
import { PaymentState, REDUCER_KEY_PAYMENTS } from './payment.reducer';

export const selectPaymentState = createFeatureSelector<PaymentState>(REDUCER_KEY_PAYMENTS);

export const selectAllPayments = createSelector(
    selectPaymentState,
    fromPayment.selectAllPayments
);

export const selectPaymentTotal = createSelector(
    selectPaymentState,
    fromPayment.selectPaymentTotal
);

export const selectPaymentIds = createSelector(
    selectPaymentState,
    fromPayment.selectPaymentIds
);

export const selectPaymentEntities = createSelector(
    selectPaymentState,
    fromPayment.selectPaymentEntities
);

export const selectCurrentPaymentId = createSelector(
    selectPaymentState,
    fromPayment.getSelectedPaymentId
);

export const selectActivePayment = createSelector(
    selectPaymentState,
    fromPayment.getActivePayment
);

export const selectCurrentPayment = createSelector(
    selectPaymentEntities,
    selectCurrentPaymentId,
    (userEntities, userId) => userEntities[userId]
);
