exports.up = knex =>
    knex.schema.table('users', t => {
        t.boolean('by_admin').defaultTo(false);
    });

exports.down = knex =>
    knex.schema.table('users', t => {
        t.dropColumn('by_admin');
    });
