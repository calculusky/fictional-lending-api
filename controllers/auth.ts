import { Request, Response, NextFunction } from 'express';
import { CreateUser, LoginInput, RequestWithCreateUser } from '../interfaces/auth';
import AuthService from '../services/auth';


class AuthController {

    public authService = new AuthService();

    public signup = async (req: RequestWithCreateUser, res: Response, next: NextFunction) => {
        const userData: CreateUser = req.user;
        try {

            const createdUser = await this.authService.createUser(userData);

            res.status(201).json({ data: createdUser })

        } catch (error) {
            next(error)
        }
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        const userInput: LoginInput = req.body;
        try {

            const token = await this.authService.loginUser(userInput);

            res.status(201).json({ success: true, token: token })

        } catch (error) {
            next(error)
        }
    }


}

export default AuthController