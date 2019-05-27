exports.up = knex =>
    knex.schema.table('lending_requests', table => {
        table.dropColumn('approvedDate');
        table.dropColumn('status');
        table
            .integer('timesExtended')
            .notNull()
            .defaultTo(0);
    });

exports.down = knex =>
    knex.schema.table('lending_request', table => {
        table.dateTime('approvedDate').nullable();
        table.enu('status', ['approved', 'rejected', 'pending']).notNull();
        table.dropColumn('timesExtended');
    });
