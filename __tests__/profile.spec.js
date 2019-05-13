import supertest from 'supertest';
import { app, databaseConnection } from '@server/app';
import { getUser, createUser, getToken } from '@tests/utils/helpers';

const server = () => supertest(app);
let userToken;
let userId;
let user;

describe('PROFILES API ENDPOINTS', () => {
    beforeAll(async () => {
        await databaseConnection('users').truncate();
        await databaseConnection.migrate.latest();
        user = await createUser(getUser());
        userToken = getToken({ id: user.id, email: user.email });
        const userB = await createUser(getUser());
        userId = userB.id;
    });

    afterAll(async () => {
        await databaseConnection('users').truncate();
        server.close();
    });

    describe('GET PROFILE api/v1/profile', () => {
        'should get profile for authenticated user',
            async () => {
                const { status, body } = await server()
                    .get('/api/v1/profile')
                    .set('x-access-token', userToken);
                expect(status).toBe(200);
                expect(Object.keys(body.data)).toMatchSnapshot();
            };

        it('should get profile for other users', async () => {
            const { status, body } = await server()
                .get(`/api/v1/profile/${userId}`)
                .set('x-access-token', userToken);

            expect(status).toBe(200);
            expect(Object.keys(body.data)).toMatchSnapshot();
        });

        it('should not get profile if userId param is not a number', async () => {
            const { status, body } = await server()
                .get('/api/v1/profile/yui')
                .set('x-access-token', userToken);
            expect(status).toBe(422);
            expect(body).toMatchSnapshot();
        });
    });

    describe('PATCH update profile api/v1/profile', () => {
        it('should not edit profile if all field is empty', async () => {
            const { status, body } = await server()
                .patch('/api/v1/profile')
                .set('x-access-token', userToken)
                .send({});

            expect(status).toBe(422);
            expect(body).toMatchSnapshot();
        });

        it('should not edit profile with an email that already exists', async () => {
            const { status, body } = await server()
                .patch('/api/v1/profile')
                .set('x-access-token', userToken)
                .send({
                    ...user,
                    bio: 'loves reading',
                    avatar: 'profilePic'
                });
            expect(status).toBe(422);
            expect(body).toMatchSnapshot();
        });

        it('should edit profile with valid inputs', async () => {
            const details = await getUser();
            const { status, body } = await server()
                .patch('/api/v1/profile')
                .set('x-access-token', userToken)
                .send({
                    ...details,
                    bio: 'i love football',
                    avatar: 'my pics'
                });

            expect(status).toBe(200);
            expect(Object.keys(body.data)).toMatchSnapshot();
        });
    });
});
