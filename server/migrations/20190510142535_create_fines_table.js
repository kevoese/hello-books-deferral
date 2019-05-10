exports.up = knex =>
    knex.schema.createTable('fines', table => {
        table
            .increments('id')
            .unsigned()
            .primary();
        table.integer('user_id').references('users.id');
        table.datetime('created_on').defaultTo(knex.fn.now());
        table.string('type').notNull();
        table.string('description').notNull();
        table.integer('amount').notNull();
        table.enu('status', ['paid', 'unpaid']).defaultTo('unpaid');
        table.datetime('paid_at').defaultTo(null);
    });

exports.down = knex => knex.schema.dropTable('fines');
