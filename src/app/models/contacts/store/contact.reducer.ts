import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IContact } from '../contacts.model';
import { ContactActionsUnion, ContactActionTypes } from './contact.action';

export const REDUCER_KEY_CONTACTS = 'contacts';

export interface ContactState extends EntityState<IContact> {
    selectedId: number | null;
}

export const adapter: EntityAdapter<IContact> = createEntityAdapter<IContact>();

export const initialState = adapter.getInitialState({
    selectedId: null
}) as ContactState;

export function contactReducer(state = initialState, action: ContactActionsUnion): ContactState {
    switch (action.type) {
        case ContactActionTypes.LOADED_SUCCESSFUL: {
            return adapter.setAll(action.payload.entities, state);
        }

        case ContactActionTypes.SAVED_SUCCESSFUL: {
            return adapter.addOne(action.payload.entity, state);
        }

        case ContactActionTypes.UPDATED_SUCCESSFUL: {
            return adapter.updateOne(action.payload.entity, state);
        }

        case ContactActionTypes.DELETED_SUCCESSFUL: {
            return adapter.removeOne(action.payload.id, state);
        }

        case ContactActionTypes.CLEAR: {
            return adapter.removeAll({ ...state, selectedId: null });
        }

        default: {
            return state;
        }
    }
}

export const getSelectedContactId = (state: ContactState) => state.selectedId;
export const getContactById = (state: ContactState, id: number) => state.entities[id];

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectContactIds = selectIds;
export const selectContactEntities = selectEntities;
export const selectAllContacts = selectAll;
export const selectContactTotal = selectTotal;


