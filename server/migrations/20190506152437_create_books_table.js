exports.up = knex =>
    knex.schema.createTable('books', table => {
        table
            .increments('id')
            .unsigned()
            .primary();
        table.string('title').notNull();
        table.string('coverType').notNull();
        table.string('description').notNull();
        table.float('price').notNull();
        table
            .string('isbn')
            .unique()
            .notNull();
        table.string('publisher').notNull();
        table.string('year').notNull();
        table.integer('copiesAvailable').notNull();
    });

exports.down = knex => knex.schema.dropTable('books');
