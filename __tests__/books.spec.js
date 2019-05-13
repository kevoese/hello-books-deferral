import faker from 'faker';
import Book from '@models/Book';
import Author from '@models/Author';
import supertest from 'supertest';
import AuthorBook from '@models/AuthorBook';
import { app, databaseConnection } from '@server/app';

const server = () => supertest(app);
const booksRoute = '/api/v1/books';

const getBook = ({ isbn = '9789785205862' } = {}) => ({
    title: 'Fine Boys',
    coverType: 'PaperBack',
    isbn,
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
