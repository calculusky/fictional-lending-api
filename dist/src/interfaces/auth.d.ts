import { Request } from 'express';
import { User } from '../interfaces/model';
export interface CreateUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export interface RequestWithCreateUser extends Request {
    user: CreateUser;
}
export interface LoginInput {
    email: string;
    password: string;
}
export interface DataStoredInToken {
    id: number;
    email: string;
}
export interface RequestWithUser extends Request {
    user: User;
}
