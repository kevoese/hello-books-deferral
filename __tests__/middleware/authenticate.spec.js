import config from '@config';
import jwt from 'jsonwebtoken';
import User from '@models/User';
import { Response, getUser } from '@tests/utils/helpers';
import { app, databaseConnection } from '@server/app';
import {
    isAuthenticated,
    userExists,
    isSuperAdmin,
    isAdmin
} from '@middleware/auth/authenticate';

describe('Auth middleware', () => {
    it('should return an error if token is not provided', async () => {
        const req = {
            headers: {}
        };

        const res = new Response();
        const statusSpy = jest.spyOn(res, 'status');
        const jsendSpy = jest.spyOn(res, 'jsend');
        const next = () => {};
        isAuthenticated(req, res, next);
        expect(statusSpy).toHaveBeenCalledWith(400);
        expect(jsendSpy).toHaveBeenCalledWith({ message: 'Unauthenticated' });
    });

    // it('should return an error if token is invalid', async () => {
    //     const token = jwt.sign(
    //         { id: 2, email: 'random@me.com' },
    //         config.auth.secret
    //     );

    //     const req = {
    //         headers: {
    //             'x-access-token': token
    //         }
    //     };

    //     const res = new Response();
    //     const statusSpy = jest.spyOn(res, 'status');
    //     const jsendSpy = jest.spyOn(res, 'jsend');
    //     const next = () => {};

    //     await isAuthenticated(req, res, next);
    //     expect(statusSpy).toHaveBeenCalledWith(400);
    //     expect(jsendSpy).toHaveBeenCalledWith({ message: 'Unauthenticated' });
    // });

    it('should return 500 error when any deep error occurred', async () => {
        const token = 'fdbfhbdfhbddfbbdjfb.dfdjfddf.dvbdd';

        const req = {
            headers: {
                'x-access-token': token
            }
        };

        const res = new Response();
        const statusSpy = jest.spyOn(res, 'status');
        const jsendSpy = jest.spyOn(res, 'jsend');
        const next = () => {};

        await isAuthenticated(req, res, next);
        expect(statusSpy).toHaveBeenCalledWith(500);
        expect(jsendSpy).toHaveBeenCalledWith({ message: 'Unauthenticated' });
    });

    it('should return an error if is not an admin', () => {
        const req = {
            user: {
                role: null
            }
        };

        const res = new Response();
        const statusSpy = jest.spyOn(res, 'status');
        const jsendSpy = jest.spyOn(res, 'jsend');
        const next = jest.fn();
        isAdmin(req, res, next);
        expect(statusSpy).toHaveBeenCalledWith(403);
        expect(jsendSpy).toHaveBeenCalledWith({ message: 'UnAuthorised' });
    });

    it('should call the next function if isAdmin', () => {
        const req = {
            user: {
                role: 'admin'
            }
        };

        const res = new Response();
        const next = jest.fn();
        isAdmin(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    // it('should call the next function if user is valid', async () => {
    //     const user = getUser();

    //     const createdUser = await User.query().insert({
    //         email: user.email,
    //         password: user.password,
    //         firstName: user.firstName,
    //         lastName: user.lastName
    //     });

    //     const token = jwt.sign(
    //         { id: createdUser.id, email: createdUser.email },
    //         config.auth.secret
    //     );

    //     const req = {
    //         headers: {
    //             'x-access-token': token
    //         }
    //     };
    //     const res = new Response();
    //     const next = jest.fn();

    //     await isAuthenticated(req, res, next);

    //     expect(next).toHaveBeenCalled();
    // });

    it('should return 500 error when any deep error occurred', async () => {
        const token = 'fdbfhbdfhbddfbbdjfb.dfdjfddf.dvbdd';

        const req = {
            headers: {
                'x-access-token': token
            }
        };

        const res = new Response();
        const statusSpy = jest.spyOn(res, 'status');
        const jsendSpy = jest.spyOn(res, 'jsend');
        const next = () => {};

        await isAuthenticated(req, res, next);
        expect(statusSpy).toHaveBeenCalledWith(500);
        expect(jsendSpy).toHaveBeenCalledWith({ message: 'Unauthenticated' });
    });

    it('should return an error if is not an admin', () => {
        const req = {
            user: {
                role: null
            }
        };

        const res = new Response();
        const statusSpy = jest.spyOn(res, 'status');
        const jsendSpy = jest.spyOn(res, 'jsend');
        const next = jest.fn();
        isAdmin(req, res, next);
        expect(statusSpy).toHaveBeenCalledWith(403);
        expect(jsendSpy).toHaveBeenCalledWith({ message: 'UnAuthorised' });
    });

    it('should call the next function if isAdmin', () => {
        const req = {
            user: {
                role: 'admin'
            }
        };

        const res = new Response();
        const next = jest.fn();
        isAdmin(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    it('should return an error if not super admin', () => {
        const req = {
            user: {
                role: null
            }
        };

        const res = new Response();
        const statusSpy = jest.spyOn(res, 'status');
        const jsendSpy = jest.spyOn(res, 'jsend');
        const next = jest.fn();

        isSuperAdmin(req, res, next);

        expect(statusSpy).toHaveBeenCalledWith(403);
        expect(jsendSpy).toHaveBeenCalledWith({
            message: 'UnAuthorised'
        });
    });

    it('should call next  if super admin is valid', () => {
        const req = {
            user: {
                role: 'super_admin'
            }
        };

        const res = new Response();
        const next = jest.fn();

        isSuperAdmin(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    // it('should call the next function if user exist', async () => {
    //     const user = getUser();

    //     const createdUser = await User.query().insert({
    //         email: user.email,
    //         password: user.password,
    //         firstName: user.firstName,
    //         lastName: user.lastName
    //     });

    //     const req = {
    //         params: {
    //             user_id: createdUser.id
    //         }
    //     };
    //     const res = new Response();
    //     const next = jest.fn();

    //     await userExists(req, res, next);

    //     expect(next).toHaveBeenCalled();
    // });
});
