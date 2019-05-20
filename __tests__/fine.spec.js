import Fine from '@models/Fine';
import supertest from 'supertest';
import { app, databaseConnection } from '@server/app';
import {
    getUser,
    createUser,
    createFine,
    getFine,
    getToken
} from '@tests/utils/helpers';

const server = () => supertest(app);
let adminToken;

describe.skip('FINES API ENDPOINTS', () => {
    beforeAll(async () => {
        await databaseConnection.migrate.latest();
        await databaseConnection('users').truncate();
        await databaseConnection('fines').truncate();
        const thisUser = await createUser(getUser());
        const admin = getUser();
        admin.role = 'admin';
        const theAdmin = await createUser(admin);
        await createFine(thisUser.id);
        adminToken = getToken({ id: theAdmin.id, email: theAdmin.email });
    });

    afterAll(async () => {
        await databaseConnection('fines').truncate();
        await databaseConnection('users').truncate();
        server.close();
    });

    describe('GET FINES api/v1/fines', () => {
        it('should get all fines for authenticated user', async () => {
            const user = await createUser(getUser());
            await createFine(user.id);
            const userToken = getToken({ id: user.id, email: user.email });
            const { status, body } = await server()
                .get('/api/v1/fines')
                .set('x-access-token', userToken);
            expect(status).toBe(200);
            expect(body.data.length).toBe(1);
            expect(body.data[0].user_id).toBe(user.id);
        });
    });

    describe('POST CREATE FINE api/v1/fines', () => {
        it('should not create fine if type and description field is empty', async () => {
            const { status, body } = await server()
                .post('/api/v1/fines/1')
                .set('x-access-token', adminToken)
                .send({
                    ...getFine(1),
                    type: '',
                    description: ''
                });

            expect(status).toBe(422);
            expect(body).toMatchSnapshot();
        });

        it('should not create fine if userId param is not a number', async () => {
            const { status, body } = await server()
                .get('/api/v1/fines/bag')
                .set('x-access-token', adminToken)
                .send(getFine(1));
            expect(status).toBe(422);
            expect(body).toMatchSnapshot();
        });

        it('should not create fine if userId does not exists', async () => {
            const { status, body } = await server()
                .post('/api/v1/fines/1545678')
                .set('x-access-token', adminToken)
                .send(getFine(1));
            expect(status).toBe(422);
            expect(body).toMatchSnapshot();
        });

        it('should create a fine with valid inputs', async () => {
            const { status, body } = await server()
                .post('/api/v1/fines/1')
                .set('x-access-token', adminToken)
                .send(getFine(1));

            expect(status).toBe(201);
            expect(body.data.userFine.user_id).toBe('1');
        });
    });

    describe('GET FINE api/v1/fines', () => {
        it('should not get fine if fineId param is not a number', async () => {
            const { status, body } = await server()
                .get('/api/v1/fines/5ku')
                .set('x-access-token', adminToken);
            expect(status).toBe(422);
            expect(body).toMatchSnapshot();
        });

        it('should return a fine', async () => {
            const { status, body } = await server()
                .get('/api/v1/fines/1')
                .set('x-access-token', adminToken);

            expect(status).toBe(200);
            expect(body.data.amount).toBe(50000);
        });
    });
});
