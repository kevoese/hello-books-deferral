

exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('authors', (table) => {
    table.increments('id').primary();
    table.string('name').notNull();
  })
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('authors'),
]);
