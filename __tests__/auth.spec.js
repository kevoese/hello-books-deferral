import supertest from 'supertest';
import { app, databaseConnection } from '@server/app';
import { getUser, createUser } from '@tests/utils/helpers';

const server = () => supertest(app);

describe('AUTH API ENDPOINTS', () => {
    beforeAll(async () => {
        await databaseConnection('users').truncate();
        await databaseConnection.migrate.latest();
    });

    describe('POST SIGN UP api/v1/auth/signup', () => {
        it('should not sign up user if email is empty', async () => {
            const { status, body } = await server()
                .post('/api/v1/auth/signup')
                .send({
                    ...getUser(),
                    email: ''
                });

            expect(status).toBe(422);
            expect(body).toMatchSnapshot();
        });

        it('should sign up user with valid inputs', async () => {
            const user = getUser();
            const { status, body } = await server()
                .post('/api/v1/auth/signup')
                .send(user);

            expect(status).toBe(201);
            expect(body.data.user.email).toBe(user.email);
            expect(Object.keys(body.data)).toMatchSnapshot();
        });

        it('should not sign up user that is already registered', async () => {
            const user = getUser();
            await createUser(user);

            const { status, body } = await server()
                .post('/api/v1/auth/signup')
                .send(user);

            expect(status).toBe(422);
            expect(body).toMatchSnapshot();
        });

        it('should not verify an email with a wrong verification code', async () => {
            const { status, body } = await server()
                .post('/api/v1/auth/verify/:thisistherandomstring')
                .send();

            expect(status).toBe(400);
            expect(body).toMatchSnapshot();
        });

        it('should verify an email with a good verification code', async () => {
            const user = getUser();
            const { email_confirm_code } = await createUser(user);

            const { status, body } = await server().post(
                `/api/v1/auth/verify/${email_confirm_code}`
            );

            expect(status).toBe(200);
            expect(body).toMatchSnapshot();
        });
    });
});
