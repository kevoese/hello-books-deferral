import { createServer } from 'http';
import supertest from 'supertest';
import { server as app } from '@server/app';

const server = () => supertest(app);

describe('APP HOST /', () => {
    test('should return Hello Books Deferral', async () => {
        const { status, body } = await server().get('/');

        expect(status).toBe(200);
        /* expect(body).toMatchSnapshot(); */
    });
});
