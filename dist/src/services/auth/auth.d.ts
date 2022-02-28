import { CreateUser, LoginInput } from '../../interfaces/auth';
declare class AuthService {
    createUser: (userData: CreateUser) => Promise<any>;
    loginUser: (userInput: LoginInput) => Promise<string>;
    findUser: (where: {
        id?: number;
        email?: string;
    }, includePassword?: boolean) => Promise<any>;
    private createToken;
}
export default AuthService;
