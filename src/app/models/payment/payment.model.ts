import { MethodType } from '../methods/methods.model';

export interface IPayment {
    id?: number;
    created?: string;
    contactId?: number;
    methodId?: number;
    methodType?: MethodType;
    amount?: number;
    ownerId?: number;
    ownerLogin?: string;
}

export function createDefaultPayment(): IPayment {
    return {
        contactId: null,
        methodType: null,
        methodId: null,
        amount: null
    };
}
