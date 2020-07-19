import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPaymentCard from './payment-card.reducer';
import { PaymentCardState, REDUCER_KEY_PAYMENT_CARD } from './payment-card.reducer';

export const selectPaymentCardState = createFeatureSelector<PaymentCardState>(REDUCER_KEY_PAYMENT_CARD);

export const selectAllPaymentCards = createSelector(
  selectPaymentCardState,
  fromPaymentCard.selectAllPaymentCards
);

export const selectPaymentCardTotal = createSelector(
  selectPaymentCardState,
  fromPaymentCard.selectPaymentCardTotal
);

export const selectPaymentCardIds = createSelector(
  selectPaymentCardState,
  fromPaymentCard.selectPaymentCardIds
);

export const selectPaymentCardEntities = createSelector(
  selectPaymentCardState,
  fromPaymentCard.selectPaymentCardEntities
);

export const selectCurrentPaymentCardId = createSelector(
  selectPaymentCardState,
  fromPaymentCard.getSelectedPaymentCardId
);

export const selectPaymentCardById = createSelector(
  selectPaymentCardState,
  fromPaymentCard.getPaymentCardById
);

export const selectCurrentPaymentCard = createSelector(
  selectPaymentCardEntities,
  selectCurrentPaymentCardId,
  (userEntities, userId) => userEntities[userId]
);
