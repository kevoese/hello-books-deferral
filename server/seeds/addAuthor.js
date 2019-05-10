import faker from 'faker';

const createAuthors = () => ({
    name: faker.fake('{{name.lastName}} {{name.firstName}}')
});

// populate authors
let authors = [];

let countAuthor = 2000;
for (let i = 0; i < countAuthor; i++) {
    authors.push(createAuthors());
}

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('authors')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('authors').insert(authors);
        });
};
