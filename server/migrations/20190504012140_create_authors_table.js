exports.up = knex =>
  knex.schema.createTable("authors", table => {
    table.increments("id").primary();
    table.string("name").notNull();
  });

exports.down = knex => knex.schema.dropTable("authors");
