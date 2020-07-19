import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { IContact } from '../contacts.model';

export enum ContactActionTypes {
  LOAD = '[Contact] Load',
  LOADED_SUCCESSFUL = '[Contact] Loaded Contacts Success',
  LOADED_FAILURE = '[Contact] Loaded Contacts Failure',
  SAVE = '[Contact] Save',
  SAVED_SUCCESSFUL = '[Contact] Saved Successful',
  SAVED_FAILURE = '[Contact] Saved Failure',
  UPDATE = '[Contact] Update',
  UPDATED_SUCCESSFUL = '[Contact] Updated Successful',
  UPDATED_FAILURE = '[Contact] Updated Failure',
  DELETE = '[Contact] Delete',
  DELETED_SUCCESSFUL = '[Contact] Deleted Success',
  DELETED_FAILURE = '[Contact] Deleted Failure',
  CLEAR = '[Contact] Clear',
}

// Load all
export class LoadContacts implements Action {
  readonly type = ContactActionTypes.LOAD;
}

export class ContactsLoadedSuccessful implements Action {
  readonly type = ContactActionTypes.LOADED_SUCCESSFUL;

  constructor(public payload: { entities: IContact[] }) {}
}

export class ContactsLoadedFailure implements Action {
  readonly type = ContactActionTypes.LOADED_FAILURE;

  constructor(public payload: { error: any }) {}
}

// Save
export class SaveContact implements Action {
  readonly type = ContactActionTypes.SAVE;

  constructor(public payload: { entity: IContact }) {}
}

export class ContactSavedSuccessful implements Action {
  readonly type = ContactActionTypes.SAVED_SUCCESSFUL;

  constructor(public payload: { entity: IContact }) {}
}

export class ContactSavedFailure implements Action {
  readonly type = ContactActionTypes.SAVED_FAILURE;

  constructor(public payload: { error: any }) {}
}

// Update
export class UpdateContact implements Action {
  readonly type = ContactActionTypes.UPDATE;

  constructor(public payload: { entity: IContact }) {}
}

export class ContactUpdatedSuccessful implements Action {
  readonly type = ContactActionTypes.UPDATED_SUCCESSFUL;

  constructor(public payload: { entity: Update<IContact> }) {}
}

export class ContactUpdatedFailure implements Action {
  readonly type = ContactActionTypes.UPDATED_FAILURE;

  constructor(public payload: { error: any }) {}
}

// Delete
export class DeleteContact implements Action {
  readonly type = ContactActionTypes.DELETE;

  constructor(public payload: { id: number }) {}
}

export class ContactDeletedSuccessful implements Action {
  readonly type = ContactActionTypes.DELETED_SUCCESSFUL;

  constructor(public payload: { id: number }) {}
}

export class ContactDeletedFailure implements Action {
  readonly type = ContactActionTypes.DELETED_FAILURE;

  constructor(public payload: { error: any }) {}
}

export class ClearContacts implements Action {
  readonly type = ContactActionTypes.CLEAR;
}

export type ContactActionsUnion =
  | LoadContacts
  | ContactsLoadedSuccessful
  | ContactsLoadedFailure
  | SaveContact
  | ContactSavedSuccessful
  | ContactSavedFailure
  | UpdateContact
  | ContactUpdatedSuccessful
  | ContactUpdatedFailure
  | DeleteContact
  | ContactDeletedSuccessful
  | ContactDeletedFailure
  | ClearContacts;
