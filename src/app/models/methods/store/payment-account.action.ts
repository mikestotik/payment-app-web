import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { IPaymentAccount } from '../methods.model';

export enum PaymentAccountActionTypes {
    LOAD = '[PaymentAccount] Load',
    LOADED_SUCCESSFUL = '[PaymentAccount] Loaded Success',
    LOADED_FAILURE = '[PaymentAccount] Loaded Failure',
    SAVE = '[PaymentAccount] Save',
    SAVED_SUCCESSFUL = '[PaymentAccount] Saved Successful',
    SAVED_FAILURE = '[PaymentAccount] Saved Failure',
    UPDATE = '[PaymentAccount] Update',
    UPDATED_SUCCESSFUL = '[PaymentAccount] Updated Successful',
    UPDATED_FAILURE = '[PaymentAccount] Updated Failure',
    DELETE = '[PaymentAccount] Delete',
    DELETED_SUCCESSFUL = '[PaymentAccount] Deleted Success',
    DELETED_FAILURE = '[PaymentAccount] Deleted Failure',
    CLEAR = '[PaymentAccount] Clear',
}

// Load all
export class LoadPaymentAccounts implements Action {
    readonly type = PaymentAccountActionTypes.LOAD;
}

export class PaymentAccountsLoadedSuccessful implements Action {
    readonly type = PaymentAccountActionTypes.LOADED_SUCCESSFUL;

    constructor(public payload: { entities: IPaymentAccount[] }) {}
}

export class PaymentAccountsLoadedFailure implements Action {
    readonly type = PaymentAccountActionTypes.LOADED_FAILURE;

    constructor(public payload: { error: any }) {}
}

// Save
export class SavePaymentAccount implements Action {
    readonly type = PaymentAccountActionTypes.SAVE;

    constructor(public payload: { entity: IPaymentAccount }) {}
}

export class PaymentAccountSavedSuccessful implements Action {
    readonly type = PaymentAccountActionTypes.SAVED_SUCCESSFUL;

    constructor(public payload: { entity: IPaymentAccount }) {}
}

export class PaymentAccountSavedFailure implements Action {
    readonly type = PaymentAccountActionTypes.SAVED_FAILURE;

    constructor(public payload: { error: any }) {}
}

// Update
export class UpdatePaymentAccount implements Action {
    readonly type = PaymentAccountActionTypes.UPDATE;

    constructor(public payload: { entity: IPaymentAccount }) {}
}

export class PaymentAccountUpdatedSuccessful implements Action {
    readonly type = PaymentAccountActionTypes.UPDATED_SUCCESSFUL;

    constructor(public payload: { entity: Update<IPaymentAccount> }) {}
}

export class PaymentAccountUpdatedFailure implements Action {
    readonly type = PaymentAccountActionTypes.UPDATED_FAILURE;

    constructor(public payload: { error: any }) {}
}

// Delete
export class DeletePaymentAccount implements Action {
    readonly type = PaymentAccountActionTypes.DELETE;

    constructor(public payload: { id: number }) {}
}

export class PaymentAccountDeletedSuccessful implements Action {
    readonly type = PaymentAccountActionTypes.DELETED_SUCCESSFUL;

    constructor(public payload: { id: number }) {}
}

export class PaymentAccountDeletedFailure implements Action {
    readonly type = PaymentAccountActionTypes.DELETED_FAILURE;

    constructor(public payload: { error: any }) {}
}

// Clear
export class ClearPaymentAccounts implements Action {
    readonly type = PaymentAccountActionTypes.CLEAR;
}

export type PaymentAccountActionsUnion =
    | LoadPaymentAccounts
    | PaymentAccountsLoadedSuccessful
    | PaymentAccountsLoadedFailure
    | SavePaymentAccount
    | PaymentAccountSavedSuccessful
    | PaymentAccountSavedFailure
    | UpdatePaymentAccount
    | PaymentAccountUpdatedSuccessful
    | PaymentAccountUpdatedFailure
    | DeletePaymentAccount
    | PaymentAccountDeletedSuccessful
    | PaymentAccountDeletedFailure
    | ClearPaymentAccounts;
