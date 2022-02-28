import { Request, Response, NextFunction } from 'express';
import { RequestWithCreateUser } from '../../interfaces/auth';
import AuthService from '../../services/auth/auth';
declare class AuthController {
    authService: AuthService;
    signup: (req: RequestWithCreateUser, res: Response, next: NextFunction) => Promise<void>;
    login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default AuthController;
