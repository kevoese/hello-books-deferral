
exports.up = knex => knex.schema.createTable('users', (table) => {
    table.increments('id').unsigned().primary();
    table.string('firstName').notNull();
    table.string('lastName').notNull();
    table.string('email').unique().notNull();
    table.string('password').notNull();
  });

exports.down = knex => knex.schema.dropTable('users');
