import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IPaymentAccount } from '../methods.model';
import { PaymentAccountActionsUnion, PaymentAccountActionTypes } from './payment-account.action';

export const REDUCER_KEY_PAYMENT_ACCOUNT = 'paymentAccounts';

export interface PaymentAccountState extends EntityState<IPaymentAccount> {
  selectedId: number | null;
}

export const adapter: EntityAdapter<IPaymentAccount> = createEntityAdapter<IPaymentAccount>();

export const initialState = adapter.getInitialState({
  selectedId: null
}) as PaymentAccountState;

export function paymentAccountReducer(state = initialState, action: PaymentAccountActionsUnion): PaymentAccountState {
  switch (action.type) {
    case PaymentAccountActionTypes.LOADED_SUCCESSFUL: {
      return adapter.setAll(action.payload.entities, state);
    }

    case PaymentAccountActionTypes.SAVED_SUCCESSFUL: {
      return adapter.addOne(action.payload.entity, state);
    }

    case PaymentAccountActionTypes.UPDATED_SUCCESSFUL: {
      return adapter.updateOne(action.payload.entity, state);
    }

    case PaymentAccountActionTypes.DELETED_SUCCESSFUL: {
      return adapter.removeOne(action.payload.id, state);
    }

    case PaymentAccountActionTypes.CLEAR: {
      return adapter.removeAll({ ...state, selectedId: null });
    }

    default: {
      return state;
    }
  }
}

export const getSelectedPaymentAccountId = (state: PaymentAccountState) => state.selectedId;
export const getPaymentAccountById = (state: PaymentAccountState, id: number) => state.entities[id];

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectPaymentAccountIds = selectIds;
export const selectPaymentAccountEntities = selectEntities;
export const selectAllPaymentAccounts = selectAll;
export const selectPaymentAccountTotal = selectTotal;


