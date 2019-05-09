exports.up = knex =>
  knex.schema.createTable("author_book", table => {
    table
      .integer("author")
      .unsigned()
      .references("id")
      .inTable("authors")
      .onDelete("CASCADE")
      .index();
    table
      .integer("book")
      .unsigned()
      .references("id")
      .inTable("books")
      .onDelete("CASCADE")
      .index();
  });

exports.down = knex => knex.schema.dropTable("author_book");
