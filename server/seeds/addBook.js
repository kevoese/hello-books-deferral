import faker from 'faker';

const createBooks = () => ({
    copiesAvailable: faker.random.number(1),
    coverType: faker.random.word('string'),
    description: faker.random.words(4),
    isbn: faker.random.uuid(),
    publisher: faker.fake('{{name.lastName}} {{name.firstName}}'),
    title: faker.random.words(4),
    year: faker.random.number(2011, 2019)
});

// populate books
let books = [];

let count = 2000;
for (let i = 0; i < count; i++) {
    books.push(createBooks());
}

exports.seed = async function(knex, Promise) {
    // Deletes all existing entries
    await knex('books').del();

    // Inserts seed entries
    await knex('books').insert(books);
};
