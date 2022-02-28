"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = (0, tslib_1.__importDefault)(require("../app"));
const supertest_1 = (0, tslib_1.__importDefault)(require("supertest"));
afterAll(() => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    yield new Promise(resolve => setTimeout(() => resolve()));
}));
describe('Testing Authentication', () => {
    const app = new app_1.default();
    const server = app.getServer();
    describe('[POST] /auth/signup', () => {
        it('response should have the Created user data', () => {
            const userData = {
                firstName: "test",
                lastName: "test",
                email: 'test@email.com',
                password: 'q1w2e3r4',
            };
            return (0, supertest_1.default)(server).post('/api/auth/signup').send(userData).expect(201);
        });
    });
    describe('[POST] /auth/login', () => {
        it('response should have return the Authorization token', () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            const userData = {
                email: 'test@email.com',
                password: 'q1w2e3r4',
            };
            return (0, supertest_1.default)(server)
                .post('/api/auth/login')
                .send(userData)
                .expect(200);
        }));
    });
});
//# sourceMappingURL=auth.test.js.map