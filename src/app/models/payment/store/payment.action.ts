import { Action } from '@ngrx/store';
import { IPayment } from '../payment.model';

export enum PaymentActionTypes {
  LOAD = '[Payment] Load',
  LOADED_SUCCESSFUL = '[Payment] Loaded Success',
  LOADED_FAILURE = '[Payment] Loaded Failure',
  SAVE = '[Payment] Save',
  SAVED_SUCCESSFUL = '[Payment] Saved Successful',
  SAVED_FAILURE = '[Payment] Saved Failure',
  SET_ACTIVE = '[Payment] Set Active',
  UPDATE_ACTIVE = '[Payment] Update Active',
  CLEAR_ACTIVE = '[Payment] Clear Active',
}

// Load all
export class LoadPayments implements Action {
  readonly type = PaymentActionTypes.LOAD;
}

export class PaymentsLoadedSuccessful implements Action {
  readonly type = PaymentActionTypes.LOADED_SUCCESSFUL;

  constructor(public payload: { entities: IPayment[] }) {}
}

export class PaymentsLoadedFailure implements Action {
  readonly type = PaymentActionTypes.LOADED_FAILURE;

  constructor(public payload: { error: any }) {}
}

// Save
export class SavePayment implements Action {
  readonly type = PaymentActionTypes.SAVE;

  constructor(public payload: { entity: IPayment }) {}
}

export class PaymentSavedSuccessful implements Action {
  readonly type = PaymentActionTypes.SAVED_SUCCESSFUL;

  constructor(public payload: { entity: IPayment }) {}
}

export class PaymentSavedFailure implements Action {
  readonly type = PaymentActionTypes.SAVED_FAILURE;

  constructor(public payload: { error: any }) {}
}

// Active
export class SetActivePayment implements Action {
  readonly type = PaymentActionTypes.SET_ACTIVE;

  constructor(public payload: { entity: IPayment }) {}
}

export class UpdateActivePayment implements Action {
  readonly type = PaymentActionTypes.UPDATE_ACTIVE;

  constructor(public payload: { entity: IPayment }) {}
}

export class ClearActivePayment implements Action {
  readonly type = PaymentActionTypes.CLEAR_ACTIVE;
}

export type PaymentActionsUnion =
  | LoadPayments
  | PaymentsLoadedSuccessful
  | PaymentsLoadedFailure
  | SavePayment
  | PaymentSavedSuccessful
  | PaymentSavedFailure
  | SetActivePayment
  | UpdateActivePayment
  | ClearActivePayment;
