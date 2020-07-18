import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IPayment } from '../payment.model';
import { PaymentActionsUnion, PaymentActionTypes } from './payment.action';

export const REDUCER_KEY_PAYMENTS = 'payments';

export interface PaymentState extends EntityState<IPayment> {
    selectedId: number | null;
    active: IPayment;
}

export const adapter: EntityAdapter<IPayment> = createEntityAdapter<IPayment>();

export const initialState = adapter.getInitialState({
    selectedId: null,
    active: null
}) as PaymentState;

export function paymentReducer(state = initialState, action: PaymentActionsUnion): PaymentState {
    switch (action.type) {
        case PaymentActionTypes.LOADED_SUCCESSFUL: {
            return adapter.setAll(action.payload.entities, state);
        }

        case PaymentActionTypes.SAVED_SUCCESSFUL: {
            return adapter.addOne(action.payload.entity, state);
        }

        case PaymentActionTypes.SET_ACTIVE: {
            if (!state.active) {
                return {
                    ...state,
                    active: action.payload.entity
                };
            } else {
                return state;
            }
        }

        case PaymentActionTypes.UPDATE_ACTIVE: {
            return {
                ...state,
                active: {
                    ...state.active,
                    ...action.payload.entity
                }
            };
        }

        case PaymentActionTypes.CLEAR_ACTIVE: {
            return { ...state, active: null };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedPaymentId = (state: PaymentState) => state.selectedId;
export const getActivePayment = (state: PaymentState) => state.active;

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectPaymentIds = selectIds;
export const selectPaymentEntities = selectEntities;
export const selectAllPayments = selectAll;
export const selectPaymentTotal = selectTotal;


