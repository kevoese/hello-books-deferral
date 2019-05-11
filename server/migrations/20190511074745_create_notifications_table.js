exports.up = knex =>
    knex.schema.createTable('notifications', table => {
        table
            .increments('id')
            .unsigned()
            .primary();
        table.string('type').notNull();
        table.string('data').notNull();
        table.string('email').notNull();
        table.datetime('read_at').nullable();
        table.timestamp('sent_on').defaultTo(knex.raw('now()'));
    });

exports.down = knex => knex.schema.dropTable('notifications');
