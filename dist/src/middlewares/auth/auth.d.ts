import { Request, Response, NextFunction } from 'express';
import { RequestWithCreateUser, RequestWithUser } from '../../interfaces/auth';
import AuthService from '../../services/auth/auth';
declare class AuthMiddleware {
    authService: AuthService;
    validateSignup: (req: RequestWithCreateUser, res: Response, next: NextFunction) => Promise<void>;
    validateLogin: (req: Request, res: Response, next: NextFunction) => void;
    authenticateUser: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}
export default AuthMiddleware;
