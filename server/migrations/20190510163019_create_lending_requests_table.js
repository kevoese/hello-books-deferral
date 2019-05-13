exports.up = knex =>
    knex.schema.createTable('lending_requests', table => {
        table
            .increments('id')
            .unsigned()
            .primary();
        table.integer('user').notNull();
        table.integer('book').notNull();
        table.enu('status', ['approved', 'rejected', 'pending']).notNull();
        table.dateTime('requestDate').notNull();
        table.dateTime('approvedDate').nullable();
        table.dateTime('returnDate').nullable();
        table.boolean('returned').nullable();
    });

exports.down = knex => knex.schema.dropTable('lending_requests');
