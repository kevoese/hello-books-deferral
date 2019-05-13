import supertest from 'supertest';
import { app, databaseConnection } from '@server/app';
import { getUser, createUser, superAdminUser } from '@tests/utils/helpers';
import jwt from 'jsonwebtoken';
import config from '@config';

const server = () => supertest(app);

describe('USER API ENDPOINTS', () => {
    beforeAll(async () => {
        await databaseConnection.migrate.latest();
    });
    it('super admin should be able to get users', async () => {
        const user = getUser();
        const admin = await superAdminUser(user);

        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            config.auth.secret
        );

        const { status } = await server()
            .get('/api/v1/users?page=0')
            .set('x-access-token', token);

        expect(status).toBe(200);
    });

    it('Super Admin can update a user field', async () => {
        const user = getUser();
        const admin = await superAdminUser(user);

        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            config.auth.secret
        );

        const norm_user = getUser();
        const { id } = await createUser(norm_user);

        const { status, body } = await server()
            .patch(`/api/v1/users/update/${id}`)
            .set('x-access-token', token)
            .send({
                ...getUser()
            });

        expect(status).toBe(200);
        expect(Object.keys(body)).toMatchSnapshot();
    });

    it('should throw an error if update fields are missing', async () => {
        const user = getUser();
        const admin = await superAdminUser(user);

        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            config.auth.secret
        );

        const norm_user = getUser();
        const { id } = await createUser(norm_user);

        const { status, body } = await server()
            .patch(`/api/v1/users/update/${id}`)
            .set('x-access-token', token)
            .send({});

        expect(status).toBe(422);
        expect(Object.keys(body)).toMatchSnapshot();
    });

    it('super admin can change access level of normal users', async () => {
        const user = getUser();
        const admin = await superAdminUser(user);

        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            config.auth.secret
        );

        const norm_user = getUser();
        const { id } = await createUser(norm_user);

        const { status, body } = await server()
            .patch(`/api/v1/users/change-access-level/${id}`)
            .set('x-access-token', token)
            .send({
                role: 'admin'
            });

        expect(status).toBe(200);
        expect(Object.keys(body)).toMatchSnapshot();
    });

    it('super admin can delete a user', async () => {
        const user = getUser();
        const admin = await superAdminUser(user);

        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            config.auth.secret
        );

        const norm_user = getUser();
        const { id } = await createUser(norm_user);

        const { status, body } = await server()
            .delete(`/api/v1/users/${id}`)
            .set('x-access-token', token);

        expect(status).toBe(200);
        expect(Object.keys(body)).toMatchSnapshot();
    });

    it('should return an error if user does not exist', async () => {
        const user = getUser();
        const admin = await superAdminUser(user);

        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            config.auth.secret
        );

        const { status, body } = await server()
            .delete(`/api/v1/users/474729238`)
            .set('x-access-token', token);

        expect(status).toBe(400);
        expect(Object.keys(body)).toMatchSnapshot();
    });
});
