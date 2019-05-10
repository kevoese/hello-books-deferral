import supertest from 'supertest';
import { app, databaseConnection } from '@server/app';
import { getUser, createUser, createFine, getFine } from '@tests/utils/helpers';
import Fines from '@models/Fines';

const server = () => supertest(app);

describe('FINES API ENDPOINTS', () => {
    beforeAll(async () => {
        await databaseConnection.migrate.latest();
        const user = getUser();
        await createUser(user);
        await createFine(1);
    });

    afterAll(async () => {
        await databaseConnection('fines').truncate();
        await databaseConnection('users').truncate();
    });

    describe('POST CREATE FINE api/v1/fines', () => {
        it('should not create fine if type and description field is empty', async () => {
            const { status, body } = await server()
                .post('/api/v1/fines/1')
                .send({
                    ...getFine(1),
                    type: '',
                    description: ''
                });

            expect(status).toBe(422);
            // expect(body).toMatchSnapshot();
        });

        it('should not create fine if userId param is not a number', async () => {
            const { status, body } = await server().get('/api/v1/fines/bag');
            expect(status).toBe(422);
            // expect(body).toMatchSnapshot();
        });

        it('should not create fine if userId does not exists', async () => {
            const { status, body } = await server().post('/api/v1/fines/5');
            expect(status).toBe(422);
            // expect(body).toMatchSnapshot();
        });

        it('should create a fine with valid inputs', async () => {
            const { status, body } = await server()
                .post('/api/v1/fines/1')
                .send(getFine(1));

            expect(status).toBe(201);
            // expect(body).toMatchSnapshot();
        });
    });

    describe('GET FINE api/v1/authors', () => {
        it('should not get fine if fineId param is not a number', async () => {
            const { status, body } = await server().get('/api/v1/fines/5');
            expect(status).toBe(422);
            expect(body).toMatchSnapshot();
        });

        it('should return a fine', async () => {
            const { status, body } = await server().get('/api/v1/fines/1');

            expect(status).toBe(200);
            expect(body.data.amount).toBe(50000);
            // expect(body).toMatchSnapshot();
        });
    });

    describe('DELETE AUTHOR api/v1/authors', () => {
        it('should delete author with id param valid', async () => {
            const { status, body } = await server().delete('/api/v1/fines/1');
            expect(status).toBe(200);
            // expect(body).toMatchSnapshot();
        });
    });
});
