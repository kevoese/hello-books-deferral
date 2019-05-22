import faker from 'faker';
import moment from 'moment';
import Book from '@models/Book';
import Author from '@models/Author';
import User from '@models/User';
import LendingRequest from '@models/LendingRequest';
import supertest from 'supertest';
import AuthorBook from '@models/AuthorBook';
import { app, databaseConnection } from '@server/app';
import {
    getUser,
    getToken,
    createUser,
    approvedBook
} from '@tests/utils/helpers';

const server = () => supertest(app);
const booksRoute = '/api/v1/books';

const getBook = ({ isbn = '9789785205862' } = {}) => ({
    title: 'Fine Boys',
    coverType: 'PaperBack',
    isbn,
    price: 500,
    description:
        'A novel depicting the real life story of Eghosa and his Warri friends...',
    publisher: 'Farfina Kachifo',
    year: 2014,
    copiesAvailable: 4
});

describe('BOOK API ENDPOINTS', () => {
    beforeAll(async () => {
        await databaseConnection.migrate.latest();
    });

    describe('ADD BOOKS API ENDPOINT', () => {
        beforeEach(async () => {
            await databaseConnection('books').truncate();
        });

        it('should be able to add a book', async () => {
            const fineBoys = getBook({ isbn: '23ihnv3490nv920327' });

            const { status, body } = await server()
                .post(`${booksRoute}`)
                .send(fineBoys);

            expect(status).toBe(201);
            expect(body).toMatchSnapshot();
        });

        it('should return validation errors if validation fails', async () => {
            const { status, body } = await server()
                .post(`${booksRoute}`)
                .send({});

            expect(status).toBe(422);
            expect(body).toMatchSnapshot();
        });

        it('should return validation error if isbn is not unique', async () => {
            const book = getBook('xx-12-3x-21-3');

            await Book.query().insert(book);

            const { status, body } = await server()
                .post(`${booksRoute}`)
                .send(book);

            expect(status).toBe(422);
            expect(body).toMatchSnapshot();
        });
        it('should attach authors if provided in request', async () => {
            const book = getBook();

            const author1 = await Author.query().insert({
                name: 'John Doe'
            });

            const author2 = await Author.query().insert({
                name: 'Jane Doe'
            });

            const { status, body } = await server()
                .post(`${booksRoute}`)
                .send({
                    ...book,
                    authors: [author1.id, author2.id]
                });

            const authorBook1 = await AuthorBook.query().where({
                book: body.data.book.id,
                author: author1.id
            });

            const authorBook2 = await AuthorBook.query().where({
                book: body.data.book.id,
                author: author2.id
            });

            expect(status).toBe(201);
            expect(authorBook1).toBeTruthy();
            expect(authorBook2).toBeTruthy();
        });
    });
});

describe('GET ALL BOOKS API ENDPOINT', () => {
    afterAll(async () => {
        await databaseConnection('books').truncate();
        server.close();
    });

    it('should not get book if page query is not a number', async () => {
        const { status, body } = await server().get('/api/v1/books?page=e');

        expect(status).toBe(422);
        expect(body).toMatchSnapshot();
    });

    it('should not get book if limit query is not a number', async () => {
        const { status, body } = await server().get('/api/v1/books?limit=e');

        expect(status).toBe(422);
        expect(body).toMatchSnapshot();
    });

    it('should return all books', async () => {
        const firstBook = getBook();
        firstBook.isbn = '128b4v389028074';
        const secondBook = getBook();
        secondBook.isbn = '9204798753002380';

        await Book.query().insert([firstBook, secondBook]);

        const { status, body } = await server().get(
            `${booksRoute}?page=2&limit=1`
        );

        expect(status).toBe(200);
        expect(body.data.results.length).toBe(1);
        expect(body).toMatchSnapshot();
    });

    it('should return the specified Books data', async () => {
        const theBook = getBook();
        theBook.isbn = '23895u0174-82';

        await Book.query().insert(theBook);

        const { status, body } = await server().get(`${booksRoute}/1`);

        expect(status).toBe(200);
        expect(Object.keys(body.data)).toMatchSnapshot();
    });

    it('should return message not exist when book requested doesnt exist', async () => {
        const { status, body } = await server().get(`${booksRoute}/987654`);

        expect(status).toBe(404);
        expect(body).toMatchSnapshot();
    });

    it('should return error when id passed in is not an integer', async () => {
        const { status, body } = await server().get(`${booksRoute}/ab`);

        expect(status).toBe(422);
        expect(body).toMatchSnapshot();
    });
});

describe('DELETE BOOK(S) API ENDPOINT', () => {
    afterAll(async () => {
        await databaseConnection('books').truncate();
        server.close();
    });

    it('should return success message when an existing book is deleted', async () => {
        const theBook = getBook();
        theBook.isbn = '230u10973872032';

        await Book.query().insert(theBook);

        const { status, body } = await server().delete(`${booksRoute}/1`);

        expect(status).toBe(200);
        expect(body).toMatchSnapshot();
    });

    it('should return message not exist when book requested does not exist', async () => {
        const { body, status } = await server().delete(`${booksRoute}/326879`);

        expect(status).toBe(404);
        expect(body).toMatchSnapshot();
    });

    it('should return error when id passed in is not an integer', async () => {
        const { body, status } = await server().delete(`${booksRoute}/ab`);

        expect(status).toBe(422);
        expect(body).toMatchSnapshot();
    });
});

describe.skip('BORROW BOOKS API ENDPOINT', () => {
    afterAll(async () => {
        await databaseConnection('lending_requests').truncate();
        await databaseConnection('books').truncate();
        server.close();
    });

    it('should be able to borrow an existing book from the library', async () => {
        const { id: bookId } = await Book.query().insert({
            ...getBook({ isbn: '39280y000301e23' }),
            copiesAvailable: 1
        });

        const user = await createUser(getUser());

        const patronToken = getToken(user);

        const { body, status } = await server()
            .get(`${booksRoute}/${bookId}/borrow`)
            .set('x-access-token', `${patronToken}`);

        expect(status).toBe(200);
        expect(body).toMatchSnapshot();
    });

    it('should not accept duplicate request for the same book', async () => {
        const { id: bookId } = await Book.query().insert({
            ...getBook({ isbn: '9280y0527274e23' }),
            copiesAvailable: 1
        });

        const { body: response } = await server()
            .post('/api/v1/auth/signup')
            .send(getUser());
        const patronToken = response.data.token;
        const patronId = response.data.user.id;

        await LendingRequest.query().insert({
            user: patronId,
            book: bookId,
            status: 'pending',
            requestDate: moment(new Date())
        });

        const { body, status } = await server()
            .get(`${booksRoute}/${bookId}/borrow`)
            .set('x-access-token', `${patronToken}`);

        expect(status).toBe(403);
        expect(body).toMatchSnapshot();
    });

    it('should return Not found if the book does not exist in the library', async () => {
        const { body: response } = await server()
            .post('/api/v1/auth/signup')
            .send(getUser());
        const patronToken = response.data.token;
        const patronId = response.data.user.id;

        const { body, status } = await server()
            .get(`${booksRoute}/999999/borrow`)
            .set('x-access-token', `${patronToken}`);

        expect(status).toBe(404);
        expect(body).toMatchSnapshot();
    });

    it.only('not be able to borrow a book that is no longer available', async () => {
        const { id: bookId } = await Book.query().insert({
            ...getBook({ isbn: '39280y0780301e23' }),
            copiesAvailable: 1
        });

        const { body: response } = await server()
            .post('/api/v1/auth/signup')
            .send(getUser());
        const patronToken = response.data.token;
        const patronId = response.data.user.id;

        await LendingRequest.query().insert(approvedBook(patronId, bookId));

        const { body, status } = await server()
            .get(`${booksRoute}/${bookId}/borrow`)
            .set('x-access-token', `${patronToken}`);

        expect(status).toBe(404);
        expect(body).toMatchSnapshot();
    });

    it('should be able to extend a borowed book', async () => {
        const { id: bookId } = await Book.query().insert({
            ...getBook({ isbn: '39280y78827301e23' }),
            copiesAvailable: 1
        });

        const { body: response } = await server()
            .post('/api/v1/auth/signup')
            .send(getUser());
        const patronToken = response.data.token;
        const patronId = response.data.user.id;

        await LendingRequest.query().insert(approvedBook(patronId, bookId));

        const { body, status } = await server()
            .patch(`${booksRoute}/${bookId}/extend`)
            .send({ days: 7 })
            .set('x-access-token', `${patronToken}`);

        expect(status).toBe(200);
        expect(body).toMatchSnapshot();
    });

    it('should not be able to extend a book if it is past the return date', async () => {
        const { id: theBookId } = await Book.query().insert({
            ...getBook({ isbn: '392821-0487301e23' }),
            copiesAvailable: 1
        });

        const { body: response } = await server()
            .post('/api/v1/auth/signup')
            .send(getUser());
        const patronToken = response.data.token;
        const patronId = response.data.user.id;

        await LendingRequest.query().insert(approvedBook(patronId, theBookId));
        await LendingRequest.query()
            .patch({
                approvedDate: moment(
                    new Date(new Date().setDate(new Date().getDate() - 35))
                ),
                returnDate: moment(
                    new Date(new Date().setDate(new Date().getDate() - 30))
                )
            })
            .where('book', theBookId)
            .where('user', patronId);

        const { body, status } = await server()
            .patch(`${booksRoute}/${theBookId}/extend`)
            .send({ days: 7 })
            .set('x-access-token', `${patronToken}`);

        expect(status).toBe(400);
        expect(body).toMatchSnapshot();
    });

    it('should not be able to extend a book if user doesnt have the book', async () => {
        const { body: response } = await server()
            .post('/api/v1/auth/signup')
            .send(getUser());
        const patronToken = response.data.token;

        const { body, status } = await server()
            .patch(`${booksRoute}/99999999/extend`)
            .send({ days: 7 })
            .set('x-access-token', `${patronToken}`);

        expect(status).toBe(404);
        expect(body).toMatchSnapshot();
    });

    it('should return validation error for book extension', async () => {
        const { body: response } = await server()
            .post('/api/v1/auth/signup')
            .send(getUser());
        const patronToken = response.data.token;

        const { body, status } = await server()
            .patch(`${booksRoute}/2895030/extend`)
            .send({ days: 'ab' })
            .set('x-access-token', `${patronToken}`);

        expect(status).toBe(422);
        expect(body).toMatchSnapshot();
    });

    it('should not be able to request for a book if borrow limit has been reached', async () => {
        const { id: firstBookId } = await Book.query().insert({
            ...getBook({ isbn: '2190ng42r230pvm93' })
        });
        const { id: secondBookId } = await Book.query().insert({
            ...getBook({ isbn: 'mng2vimq004n329' })
        });
        const { id: thirdBookId } = await Book.query().insert({
            ...getBook({ isbn: 'vn20omvw023m-wrjbpw' })
        });
        const { id: fourthBookId } = await Book.query().insert({
            ...getBook({ isbn: 'wnveb02m3bo-q vo3' })
        });

        const { body: response } = await server()
            .post('/api/v1/auth/signup')
            .send(getUser());
        const patronToken = response.data.token;
        const patronId = response.data.user.id;

        await LendingRequest.query().insert(
            approvedBook(patronId, firstBookId)
        );
        await LendingRequest.query().insert(
            approvedBook(patronId, secondBookId)
        );
        await LendingRequest.query().insert(
            approvedBook(patronId, thirdBookId)
        );

        const { body, status } = await server()
            .get(`${booksRoute}/${fourthBookId}/borrow`)
            .set('x-access-token', `${patronToken}`);

        expect(status).toBe(400);
        expect(body).toMatchSnapshot();
    });
});

describe.skip('LEND BOOKS API ENDPOINT', () => {
    const container = {};

    afterAll(async () => {
        await databaseConnection('lending_requests').truncate();
        await databaseConnection('books').truncate();
        server.close();
    });

    beforeAll(async () => {
        const superUser = getUser();
        const { body } = await server()
            .post('/api/v1/auth/signup')
            .send(superUser);
        container.adminId = body.data.user.id;
        container.adminToken = body.data.token;
        await User.query().patchAndFetchById(container.adminId, {
            role: 'admin'
        });
    });
    it('should be able to accept the request for a book', async () => {
        const { id: theBookId } = await Book.query().insert({
            ...getBook({ isbn: 'uivb23n0-2mobn0vq' })
        });

        const { body: response } = await server()
            .post('/api/v1/auth/signup')
            .send(getUser());
        const patronToken = response.data.token;
        const patronId = response.data.user.id;

        await LendingRequest.query().insert({
            book: theBookId,
            user: patronId,
            status: 'pending',
            requestDate: moment(new Date())
        });

        const { adminToken } = container;

        const { body, status } = await server()
            .patch(`${booksRoute}/${theBookId}/lend/${patronId}`)
            .set('x-access-token', `${adminToken}`);

        expect(status).toBe(200);
        expect(body).toMatchSnapshot();
    });

    it('should not be able to accept the request for a book when borrow limit is exceeded', async () => {
        const { id: firstBookId } = await Book.query().insert({
            ...getBook({ isbn: 'bnmdwp932m2p0mlm' })
        });
        const { id: secondBookId } = await Book.query().insert({
            ...getBook({ isbn: 'wbrlm23032mvpbv' })
        });
        const { id: thirdBookId } = await Book.query().insert({
            ...getBook({ isbn: 'bnio asp-qwv 2wisvmo' })
        });
        const { id: fourthBookId } = await Book.query().insert({
            ...getBook({ isbn: 'nebvwoimpas0qwvemp' })
        });

        const { adminToken } = container;

        const { body: response } = await server()
            .post('/api/v1/auth/signup')
            .send(getUser());
        const patronToken = response.data.token;
        const patronId = response.data.user.id;

        await LendingRequest.query().insert(
            approvedBook(patronId, firstBookId)
        );
        await LendingRequest.query().insert(
            approvedBook(patronId, secondBookId)
        );
        await LendingRequest.query().insert(
            approvedBook(patronId, thirdBookId)
        );

        const { body, status } = await server()
            .patch(`${booksRoute}/${fourthBookId}/lend/${patronId}`)
            .set('x-access-token', `${adminToken}`);

        expect(status).toBe(400);
        expect(body).toMatchSnapshot();
    });

    it('should encounter validation error when deciding on a requested book', async () => {
        const { adminToken } = container;

        const { body, status } = await server()
            .patch(`${booksRoute}/abc/lend/12`)
            .set('x-access-token', `${adminToken}`);

        expect(status).toBe(422);
        expect(body).toMatchSnapshot();
    });

    it('should not be able to accept request for a book if the book is no longer available', async () => {
        const { id: theBookId } = await Book.query().insert({
            ...getBook({ isbn: 'vdneo2pbm40lsdvn' }),
            copiesAvailable: 1
        });

        const { body: response } = await server()
            .post('/api/v1/auth/signup')
            .send(getUser());
        const patronId = response.data.user.id;

        const { body: otherResponse } = await server()
            .post('/api/v1/auth/signup')
            .send(getUser());
        const toluId = otherResponse.data.user.id;

        await LendingRequest.query().insert(approvedBook(toluId, theBookId));

        // await LendingRequest.query().insert({book: theBookId, user: patronId, status: 'pending', requestDate: new Date() });
        await LendingRequest.query().insert({
            user: patronId,
            book: theBookId,
            status: 'pending',
            requestDate: moment(new Date())
        });

        const { adminToken } = container;

        const { body, status } = await server()
            .patch(`${booksRoute}/${theBookId}/lend/${patronId}`)
            .set('x-access-token', `${adminToken}`);

        expect(status).toBe(404);
        expect(body).toMatchSnapshot();
    });
});
