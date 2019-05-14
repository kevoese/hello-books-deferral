import supertest from 'supertest';
import Author from '@models/Author';
import { app, databaseConnection } from '@server/app';
import { getUser, createUser } from '@tests/utils/helpers';

const server = () => supertest(app);
let author;

const getAuthor = ({ name = 'frank doe' } = {}) => ({
    name
});

describe('AUTHOR API ENDPOINTS', () => {
    beforeAll(async () => {
        await databaseConnection.migrate.latest();
    });

    beforeEach(() => {
        author = { name: 'John Doe' };
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
            const user = getUser();

            await createUser(user);

            const { status, body } = await server()
                .post('/api/v1/authors')
                .send(author);
            expect(status).toBe(201);
            expect(body).toMatchSnapshot();
        });
    });

    describe('GET ALL AUTHOR api/v1/authors', () => {
        it('should not get author if page query is not a number', async () => {
            const { status, body } = await server().get(
                '/api/v1/authors?page=e'
            );

            expect(status).toBe(422);
            expect(body).toMatchSnapshot();
        });

        it('should not get author if limit query is not a number', async () => {
            const { status, body } = await server().get(
                '/api/v1/authors?limit=e'
            );

            expect(status).toBe(422);
            expect(body).toMatchSnapshot();
        });

        it('should get all authors', async () => {
            const firstAuthor = getAuthor();
            firstAuthor.name = 'James Bond';
            const secondAuthor = getAuthor();
            secondAuthor.name = 'James Bond';

            await Author.query().insert([firstAuthor, secondAuthor]);

            const { status, body } = await server().get(
                '/api/v1/authors?page=2&limit=1'
            );

            expect(status).toBe(200);
            expect(body.data.results.length).toBe(1);
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
