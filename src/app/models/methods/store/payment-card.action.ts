import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { IPaymentCard } from '../methods.model';

export enum PaymentCardActionTypes {
    LOAD = '[PaymentCard] Load',
    LOADED_SUCCESSFUL = '[PaymentCard] Loaded Success',
    LOADED_FAILURE = '[PaymentCard] Loaded Failure',
    SAVE = '[PaymentCard] Save',
    SAVED_SUCCESSFUL = '[PaymentCard] Saved Successful',
    SAVED_FAILURE = '[PaymentCard] Saved Failure',
    UPDATE = '[PaymentCard] Update',
    UPDATED_SUCCESSFUL = '[PaymentCard] Updated Successful',
    UPDATED_FAILURE = '[PaymentCard] Updated Failure',
    DELETE = '[PaymentCard] Delete',
    DELETED_SUCCESSFUL = '[PaymentCard] Deleted Success',
    DELETED_FAILURE = '[PaymentCard] Deleted Failure',
    CLEAR = '[PaymentCard] Clear',
}

// Load all
export class LoadPaymentCards implements Action {
    readonly type = PaymentCardActionTypes.LOAD;
}

export class PaymentCardsLoadedSuccessful implements Action {
    readonly type = PaymentCardActionTypes.LOADED_SUCCESSFUL;

    constructor(public payload: { entities: IPaymentCard[] }) {}
}

export class PaymentCardsLoadedFailure implements Action {
    readonly type = PaymentCardActionTypes.LOADED_FAILURE;

    constructor(public payload: { error: any }) {}
}

// Save
export class SavePaymentCard implements Action {
    readonly type = PaymentCardActionTypes.SAVE;

    constructor(public payload: { entity: IPaymentCard }) {}
}

export class PaymentCardSavedSuccessful implements Action {
    readonly type = PaymentCardActionTypes.SAVED_SUCCESSFUL;

    constructor(public payload: { entity: IPaymentCard }) {}
}

export class PaymentCardSavedFailure implements Action {
    readonly type = PaymentCardActionTypes.SAVED_FAILURE;

    constructor(public payload: { error: any }) {}
}

// Update
export class UpdatePaymentCard implements Action {
    readonly type = PaymentCardActionTypes.UPDATE;

    constructor(public payload: { entity: IPaymentCard }) {}
}

export class PaymentCardUpdatedSuccessful implements Action {
    readonly type = PaymentCardActionTypes.UPDATED_SUCCESSFUL;

    constructor(public payload: { entity: Update<IPaymentCard> }) {}
}

export class PaymentCardUpdatedFailure implements Action {
    readonly type = PaymentCardActionTypes.UPDATED_FAILURE;

    constructor(public payload: { error: any }) {}
}

// Delete
export class DeletePaymentCard implements Action {
    readonly type = PaymentCardActionTypes.DELETE;

    constructor(public payload: { id: number }) {}
}

export class PaymentCardDeletedSuccessful implements Action {
    readonly type = PaymentCardActionTypes.DELETED_SUCCESSFUL;

    constructor(public payload: { id: number }) {}
}

export class PaymentCardDeletedFailure implements Action {
    readonly type = PaymentCardActionTypes.DELETED_FAILURE;

    constructor(public payload: { error: any }) {}
}

// Clear
export class ClearPaymentCards implements Action {
    readonly type = PaymentCardActionTypes.CLEAR;
}

export type PaymentCardActionsUnion =
    | LoadPaymentCards
    | PaymentCardsLoadedSuccessful
    | PaymentCardsLoadedFailure
    | SavePaymentCard
    | PaymentCardSavedSuccessful
    | PaymentCardSavedFailure
    | UpdatePaymentCard
    | PaymentCardUpdatedSuccessful
    | PaymentCardUpdatedFailure
    | DeletePaymentCard
    | PaymentCardDeletedSuccessful
    | PaymentCardDeletedFailure
    | ClearPaymentCards;
