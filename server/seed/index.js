import faker from 'faker';
import Bcrypt from 'bcryptjs';
import Consola from 'consola';
import Book from '@models/Book';
import User from '@models/User';
import { knex } from '@server/app';
import Author from '@models/Author';
import Fine from '@models/Fine';
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

async function createAdminUser() {
    const admin = await User.query()
        .where('email', 'admin.user@gmail.com')
        .first();

    if (admin) return;

    return await User.query().insert({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin.user@gmail.com',
        email_confirm_code: null,
        password: Bcrypt.hashSync('password'),
        role: 'admin'
    });
}

async function createPatron() {
    const patron = await User.query()
        .where('email', 'patron.user@gmail.com')
        .first();

    if (patron) return;

    return await User.query().insert({
        firstName: 'Patron',
        lastName: 'User',
        email: 'patron.user@gmail.com',
        email_confirm_code: null,
        password: Bcrypt.hashSync('password'),
        role: 'patron'
    });
}

async function createPatronFines() {
    const patron = await User.query()
        .where('email', 'patron.user@gmail.com')
        .first();

    if (
        await Fine.query()
            .where('user_id', patron.id)
            .first()
    )
        return;

    await Fine.query().insert({
        user_id: patron.id,
        type: 'DAMAGED_BOOKS',
        description: 'The user damaged the book titled `Last Airbender`',
        status: 'paid',
        amount: 19500,
        paid_at: new Date()
    });

    await Fine.query().insert({
        user_id: patron.id,
        type: 'MISSING_PAGES',
        description: 'The user lost some pages from the book `First Airbender`',
        status: 'paid',
        amount: 4500,
        paid_at: new Date()
    });
}

async function createSuperAdminUser() {
    const super_admin = await User.query()
        .where('email', 'super.admin@gmail.com')
        .first();

    if (super_admin) return;

    return await User.query().insert({
        firstName: 'Super',
        lastName: 'Admin',
        email: 'super.admin@gmail.com',
        email_confirm_code: null,
        password: Bcrypt.hashSync('password'),
        role: 'super_admin'
    });
}

async function seed() {
    for (let i = 0; i < 5; i++) {
        const author = await createAuthor();

        const book = await createBook();

        await AuthorBook.query().insert({
            author: author.id,
            book: book.id
        });
    }

    await createPatron();
    await createAdminUser();
    await createPatronFines();
    await createSuperAdminUser();
}

seed().then(() => {
    Consola.success('Database seeded successfully.');

    process.exit(0);
});
