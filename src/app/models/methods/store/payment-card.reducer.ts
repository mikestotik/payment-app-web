import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IPaymentCard } from '../methods.model';
import { PaymentCardActionsUnion, PaymentCardActionTypes } from './payment-card.action';

export const REDUCER_KEY_PAYMENT_CARD = 'paymentCards';

export interface PaymentCardState extends EntityState<IPaymentCard> {
    selectedId: number | null;
}

export const adapter: EntityAdapter<IPaymentCard> = createEntityAdapter<IPaymentCard>();

export const initialState = adapter.getInitialState({
    selectedId: null
}) as PaymentCardState;

export function paymentCardReducer(state = initialState, action: PaymentCardActionsUnion): PaymentCardState {
    switch (action.type) {
        case PaymentCardActionTypes.LOADED_SUCCESSFUL: {
            return adapter.setAll(action.payload.entities, state);
        }

        case PaymentCardActionTypes.SAVED_SUCCESSFUL: {
            return adapter.addOne(action.payload.entity, state);
        }

        case PaymentCardActionTypes.UPDATED_SUCCESSFUL: {
            return adapter.updateOne(action.payload.entity, state);
        }

        case PaymentCardActionTypes.DELETED_SUCCESSFUL: {
            return adapter.removeOne(action.payload.id, state);
        }

        case PaymentCardActionTypes.CLEAR: {
            return adapter.removeAll({ ...state, selectedId: null });
        }

        default: {
            return state;
        }
    }
}

export const getSelectedPaymentCardId = (state: PaymentCardState) => state.selectedId;
export const getPaymentCardById = (state: PaymentCardState, id: number) => state.entities[id];

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectPaymentCardIds = selectIds;
export const selectPaymentCardEntities = selectEntities;
export const selectAllPaymentCards = selectAll;
export const selectPaymentCardTotal = selectTotal;


