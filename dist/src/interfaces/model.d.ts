export interface User {
    id: number;
    firstName: string;
    latName: string;
    email: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
}
export interface Wallet {
    id?: number;
    balance: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
}
export interface Transaction {
    id: number;
    userId: number;
    amount: number;
    type: string;
    actionType: string;
    creditorId: number;
    receiverId: number;
    createdAt: string;
    updatedAt: string;
}
