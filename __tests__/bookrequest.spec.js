import faker from 'faker';
import supertest from 'supertest';
import User from '@models/User';
import jwt from 'jsonwebtoken';
import config from '@config';
import { app, databaseConnection } from '@server/app';
import { getUser, createUser } from '@tests/utils/helpers';

const server = () => supertest(app);
const bookrequestRoute = '/api/v1/book-request';

describe('BOOK REQUEST API ENDPOINTS', () => {
    beforeAll(async () => {
        await databaseConnection.migrate.latest();
        await databaseConnection('users').truncate();
    });

    afterAll(async () => {
        await databaseConnection('users').truncate();
    });

    it('should return an error if desciption field is not provided', async () => {
        const { status, body } = await server()
            .post(bookrequestRoute)
            .send();

        expect(status).toBe(422);
        expect(body).toMatchSnapshot();
    });

    it.skip('Should to make a book request', async () => {
        const user = getUser();
        const createdUser = await createUser(user);

        const token = jwt.sign(
            { id: createdUser.id, email: createdUser.email },
            config.auth.secret
        );

        const description = faker.lorem.sentences();

        const { status, body } = await server()
            .post(bookrequestRoute)
            .set('x-access-token', token)
            .send({
                description
            });

        expect(status).toBe(201);
        expect(body).toMatchSnapshot();
    });

    it('should get all book requests', async () => {
        const user = getUser();
        const createdUser = await createUser(user);

        const token = jwt.sign(
            { id: createdUser.id, email: createdUser.email },
            config.auth.secret
        );
        const { status } = await server()
            .get(bookrequestRoute)
            .set('x-access-token', token);

        expect(status).toBe(200);
    });
});
