import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import config from '@config';
import { app, databaseConnection } from '@server/app';
import { getUser, createUser } from '@tests/utils/helpers';

const server = () => supertest(app);
const notificationRoute = '/api/v1/notifications/';

describe('NOTIFICATION API ENDPOINTS', () => {
    beforeAll(async () => {
        await databaseConnection.migrate.latest();
        await databaseConnection('users').truncate();
        await databaseConnection('authors').truncate();
        await databaseConnection('notifications').truncate();
    });

    afterAll(async () => {
        await databaseConnection('authors').truncate();
        await databaseConnection('notifications').truncate();
    });

    describe('GET IN-APP NOTIFICATION api/v1/notifications/:email', () => {
        it('should not get notifications if email param is invalid', async () => {
            const user = getUser();

            const createdUser = await createUser(user);

            const token = jwt.sign(
                { id: createdUser.id, email: createdUser.email },
                config.auth.secret
            );

            const { status, body } = await server()
                .get(`${notificationRoute}+d`)
                .set('x-access-token', token);

            expect(status).toBe(422);
            expect(body).toMatchSnapshot();
        });

        it('should return user notifications with email param', async () => {
            const user = getUser();
            const createdUser = await createUser(user);

            const token = jwt.sign(
                { id: createdUser.id, email: createdUser.email },
                config.auth.secret
            );

            const { status, body } = await server()
                .get(`${notificationRoute}+johndoe@gmail.com`)
                .set('x-access-token', token);

            expect(status).toBe(200);
            expect(body).toMatchSnapshot();
        });
        it('should not get notification if notification id param is invalid', async () => {
            const user = getUser();

            const createdUser = await createUser(user);

            const token = jwt.sign(
                { id: createdUser.id, email: createdUser.email },
                config.auth.secret
            );

            const { status, body } = await server()
                .get(`${notificationRoute}+sample@email.com/e`)
                .set('x-access-token', token);

            expect(status).toBe(422);
            expect(body).toMatchSnapshot();
        });

        it('SAMPLE NOTIFICATION -> should create author with valid inputs and send user notification', async () => {
            const { status, body } = await server()
                .post('/api/v1/authors')
                .send({ id: 10, name: 'john doe' });

            expect(status).toBe(201);
            expect(body).toMatchSnapshot();
        });
    });
});
