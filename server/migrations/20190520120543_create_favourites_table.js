exports.up = knex =>
    knex.schema.createTable('favourites', table => {
        table
            .increments('id')
            .unsigned()
            .primary();
        table.integer('user_id').unsigned();
        table.integer('favourite_id').unsigned();
        table.string('favourite_type').notNull();
        table.timestamp('created_at').defaultTo(knex.raw('now()'));
        table.timestamp('updated_at').defaultTo(knex.raw('now()'));
    });

exports.down = knex => knex.schema.dropTable('favorites');
