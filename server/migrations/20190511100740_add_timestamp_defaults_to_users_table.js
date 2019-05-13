exports.up = knex =>
    knex.schema.table('users', t => {
        t.timestamp('created_at').defaultTo(knex.raw('now()'));
        t.timestamp('updated_at').defaultTo(knex.raw('now()'));
    });

exports.down = knex =>
    knex.schema.table('users', t => {
        t.dropColumn('created_at');
        t.dropColumn('updated_at');
    });
