import faker from 'faker';
import supertest from 'supertest';
import User from '@models/User';
import Favourite from '@models/Favourite';
import jwt from 'jsonwebtoken';
import config from '@config';
import { app, databaseConnection } from '@server/app';
import { getUser, createUser, createAuthor } from '@tests/utils/helpers';

const server = () => supertest(app);
const favouriteAuthorRoute = '/api/v1/favourite/author';

describe('FAVOURITE API ENDPOINTS', () => {
    beforeAll(async () => {
        await databaseConnection.migrate.latest();
        await databaseConnection('users').truncate();
    });

    afterAll(async () => {
        await databaseConnection('favourites').truncate();
    });

    it('it should favourite an author', async () => {
        const author = await createAuthor();
        const user = getUser();
        const createdUser = await createUser(user);

        const token = jwt.sign(
            {
                id: createdUser.id,
                email: createdUser.email
            },
            config.auth.secret
        );
        const { status, body } = await server()
            .post(favouriteAuthorRoute)
            .set('x-access-token', token)
            .send({
                author_id: author.id
            });

        expect(status).toBe(201);
        expect(Object.keys(body)).toMatchSnapshot();
    });

    it('Should unfavourite an author', async () => {
        const author = await createAuthor();
        const user = getUser();
        const createdUser = await createUser(user);
        const fav = await Favourite.query().insert({
            user_id: createdUser.id,
            favourite_id: author.id,
            favourite_type: 'author'
        });

        const token = jwt.sign(
            {
                id: createdUser.id,
                email: createdUser.email
            },
            config.auth.secret
        );
        const { status, body } = await server()
            .delete(`${favouriteAuthorRoute}/${fav.id}`)
            .set('x-access-token', token);

        expect(status).toBe(203);
        expect(Object.keys(body)).toMatchSnapshot();
    });
});
