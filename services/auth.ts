import { CreateUser, DataStoredInToken, LoginInput } from '../interfaces/auth';
import { User, Wallet } from '../interfaces/model';
import bcrypt from 'bcrypt';
import knex from '../database/knex';
import { HttpException } from '../exceptions/httpException';
import jwt from 'jsonwebtoken';
import { secretKey } from '../config/config';





class AuthService {


    //signup
    public createUser = async (userData: CreateUser) => {
        const user = await this.findUser({ email: userData.email })
        if (user) throw new HttpException(409, 'Account already exists')
        const [userId] = await knex<User>('users').insert(userData);
        if (!userId) throw new HttpException(501, 'Failed to create user');
        //create user wallet
        await knex<Wallet>('wallets').insert({ userId });

        return await this.findUser({ id: userId });

    }


    //login
    public loginUser = async (userInput: LoginInput) => {
        const user: User = await this.findUser({ email: userInput.email }, true);
        if (!user) throw new HttpException(409, 'Wrong email or password');

        const isPasswordMatching: boolean = await bcrypt.compare(userInput.password, user.password);
        if (!isPasswordMatching) throw new HttpException(409, "Wrong email or password");

        return this.createToken(user);

    }



    public findUser = async (where: { id?: number, email?: string }, includePassword: boolean = false) => {
        if (includePassword) {
            const [userRow] = await knex('users').where(where);
            return userRow;
        }
        const [userRow] = await knex('users').where(where).select('id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt');
        return userRow;
    }


    private createToken = (user: User): string => {
        const dataStoredInToken: DataStoredInToken = { id: user.id, email: user.email };
        const expiresIn: number = 60 * 60 * 24;
        return jwt.sign(dataStoredInToken, secretKey.jwtSecret, { expiresIn });
    }
}

export default AuthService;

