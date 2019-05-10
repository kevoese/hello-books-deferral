exports.up = knex =>
    knex.schema.createTable('author_book', table => {
        table
            .increments('id')
            .unsigned()
            .primary();

        table.integer('author').unsigned();

        table.integer('book').unsigned();
    });

exports.down = knex => knex.schema.dropTable('author_book');
