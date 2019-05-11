exports.up = knex =>
    knex.schema.createTable('book_requests', table => {
        table
            .increments('id')
            .unsigned()
            .primary();
        table.string('name').notNull();
        table.string('email').notNull();
        table.text('description').notNull();
        table.timestamp('created_at').defaultTo(knex.raw('now()'));
        table.timestamp('updated_at').defaultTo(knex.raw('now()'));
    });

exports.down = knex => knex.schema.dropTable('book_requests');
