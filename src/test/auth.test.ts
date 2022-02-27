import App from '../app';
import request from 'supertest';
import { CreateUser, LoginInput } from '../interfaces/auth';



afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve()));
});

describe('Testing Authentication', () => {
    const app = new App();
    const server = app.getServer();

    describe('[POST] /auth/signup', () => {
        it('response should have the Created user data', () => {
            const userData: CreateUser = {
                firstName: "test",
                lastName: "test",
                email: 'test@email.com',
                password: 'q1w2e3r4',
            };

            return request(server).post('/api/auth/signup').send(userData).expect(201);
        });
    });

    describe('[POST] /auth/login', () => {
        it('response should have return the Authorization token', async () => {
            const userData: LoginInput = {
                email: 'test@email.com',
                password: 'q1w2e3r4',
            };

            return request(server)
                .post('/api/auth/login')
                .send(userData)
                .expect(200);
        });
    });

});
