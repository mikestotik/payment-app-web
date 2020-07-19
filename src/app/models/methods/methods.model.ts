export interface IPaymentCard {
  id?: number;
  fullName: string;
  cardNumber: number;
  expiryMonth: number;
  expiryYear: number;
  ownerId?: number;
  ownerLogin?: string;
}

export interface IPaymentAccount {
  id?: number;
  accountName: string;
  accountNumber: string;
  bsb: string;
  ownerId?: number;
  ownerLogin?: string;
}

export enum MethodType {
  CARD = 'CARD',
  ACCOUNT = 'ACCOUNT'
}
