import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromContact from './contact.reducer';
import { ContactState, REDUCER_KEY_CONTACTS } from './contact.reducer';

export const selectContactState = createFeatureSelector<ContactState>(REDUCER_KEY_CONTACTS);

export const selectAllContacts = createSelector(
  selectContactState,
  fromContact.selectAllContacts
);

export const selectContactTotal = createSelector(
  selectContactState,
  fromContact.selectContactTotal
);

export const selectContactIds = createSelector(
  selectContactState,
  fromContact.selectContactIds
);

export const selectContactEntities = createSelector(
  selectContactState,
  fromContact.selectContactEntities
);

export const selectContactById = createSelector(
  selectContactState,
  fromContact.getContactById
);

export const selectCurrentContactId = createSelector(
  selectContactState,
  fromContact.getSelectedContactId
);

export const selectCurrentContact = createSelector(
  selectContactEntities,
  selectCurrentContactId,
  (userEntities, userId) => userEntities[userId]
);
