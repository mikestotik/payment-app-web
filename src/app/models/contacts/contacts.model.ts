export interface IContact {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    ownerId?: number;
    ownerLogin?: string;
}
