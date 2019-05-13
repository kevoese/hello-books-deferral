import faker from 'faker';
import Consola from 'consola';
import Book from '@models/Book';
import { knex } from '@server/app';
import Author from '@models/Author';
import AuthorBook from '@models/AuthorBook';

const getFakeBook = () => ({
    copiesAvailable: faker.random.number(1),
    coverType: faker.random.word('string'),
    description: faker.random.words(4),
    isbn: faker.random.uuid(),
    publisher: faker.fake('{{name.lastName}} {{name.firstName}}'),
    title: faker.random.words(4),
    year: faker.random.number(2011, 2019)
});

const getFakeAuthor = () => ({
    name: faker.fake('{{name.lastName}} {{name.firstName}}')
});

async function createBook() {
    return await Book.query().insert(getFakeBook());
}

async function createAuthor() {
    return await Author.query().insert(getFakeAuthor());
}

async function seed() {
    for (let i = 0; i < 1000; i++) {
        const author = await createAuthor();

        const book = await createBook();

        await AuthorBook.query().insert({
            author: author.id,
            book: book.id
        });
    }
}

seed().then(() => {
    Consola.success('Database seeded successfully.');

    process.exit(0);
});
