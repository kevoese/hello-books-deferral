import supertest from 'supertest';
import { app, databaseConnection } from '@server/app';

const server = () => supertest(app);
let author;

describe('AUTHOR API ENDPOINTS', () => {
    beforeAll(async () => {
        await databaseConnection.migrate.latest();
        await databaseConnection('authors').truncate();
    });

    beforeEach(() => {
        author = { name: 'john doe' };
    });

    afterAll(async () => {
        await databaseConnection('authors').truncate();
    });

    describe('POST CREATE AUTHOR api/v1/authors', () => {
        it('should not create author if name field is empty', async () => {
            const { status, body } = await server()
                .post('/api/v1/authors')
                .send({
                    ...author,
                    name: ''
                });

            expect(status).toBe(422);
            expect(body).toMatchSnapshot();
        });

        it('should create author with valid inputs', async () => {
            const { status, body } = await server()
                .post('/api/v1/authors')
                .send(author);

            expect(status).toBe(201);
            expect(body).toMatchSnapshot();
        });
    });

    describe('GET AUTHOR api/v1/authors', () => {
        it('should not get author if id param is not a number', async () => {
            const { status, body } = await server().get('/api/v1/authors/d');

            expect(status).toBe(422);
            expect(body).toMatchSnapshot();
        });

        it('should return single author with name query string', async () => {
            const { status, body } = await server().get('/api/v1/authors/1');

            expect(status).toBe(200);
            expect(body.data.name).toBe(author.name);
            expect(body).toMatchSnapshot();
        });
    });

    describe('UPDATE AUTHOR api/v1/authors', () => {
        it('should not update author if name field is empty', async () => {
            const { status, body } = await server()
                .patch('/api/v1/authors/1')
                .send({
                    ...author,
                    name: ''
                });

            expect(status).toBe(422);
            expect(body).toMatchSnapshot();
        });

        it('should update author with valid inputs', async () => {
            const { status, body } = await server()
                .patch('/api/v1/authors/1')
                .send({
                    ...author,
                    name: 'Jane Doe'
                });

            expect(status).toBe(200);
            expect(body.data.name).toBe('Jane Doe');
            expect(body).toMatchSnapshot();
        });
    });

    describe('DELETE AUTHOR api/v1/authors', () => {
        it('should not delete author if id param is not a number', async () => {
            const { status, body } = await server().delete('/api/v1/authors/d');

            expect(status).toBe(422);
            expect(body).toMatchSnapshot();
        });

        it('should delete author with id param valid', async () => {
            const { status, body } = await server().delete('/api/v1/authors/1');

            expect(status).toBe(200);
            expect(body).toMatchSnapshot();
        });
    });
});
